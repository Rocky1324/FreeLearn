import { Router } from "express";
import rateLimit from "express-rate-limit";
import { eq, and, gt } from "drizzle-orm";
import { db, usersTable, refreshTokensTable } from "@workspace/db";
import {
  hashPassword,
  verifyPassword,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashRefreshToken,
  generateRefreshTokenExpiry,
  validatePasswordStrength,
  isAccountLocked,
  getLockoutTime,
  MAX_FAILED_ATTEMPTS,
} from "../lib/auth.js";
import { authenticate, type AuthenticatedRequest } from "../middlewares/authenticate.js";
import { z } from "zod";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives. Réessayez dans 15 minutes." },
  skipSuccessfulRequests: true,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop d'inscriptions depuis cette adresse IP." },
});

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

const ACCESS_COOKIE_TTL = 15 * 60 * 1000;
const REFRESH_COOKIE_TTL = 7 * 24 * 60 * 60 * 1000;

const registerSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(8),
  fullName: z.string().min(2).max(100),
});

const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

function toSafeUser(user: typeof usersTable.$inferSelect) {
  const { passwordHash, failedLoginAttempts, lockedUntil, ...safe } = user;
  return safe;
}

router.post("/register", registerLimiter, async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Données invalides", details: parsed.error.issues });
    return;
  }

  const { email, password, fullName } = parsed.data;

  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    res.status(400).json({ error: passwordError });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, normalizedEmail))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({ error: "Un compte avec cet e-mail existe déjà" });
    return;
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(usersTable)
    .values({
      email: normalizedEmail,
      passwordHash,
      fullName: fullName.trim(),
      role: "student",
    })
    .returning();

  const safeUser = toSafeUser(user);
  const accessToken = signAccessToken(safeUser);
  const refreshToken = signRefreshToken(user.id);
  const tokenHash = hashRefreshToken(refreshToken);

  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash,
    expiresAt: generateRefreshTokenExpiry(),
  });

  res
    .cookie("access_token", accessToken, { ...COOKIE_OPTS, maxAge: ACCESS_COOKIE_TTL })
    .cookie("refresh_token", refreshToken, { ...COOKIE_OPTS, maxAge: REFRESH_COOKIE_TTL })
    .status(201)
    .json({ user: safeUser });
});

router.post("/login", authLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "E-mail et mot de passe requis" });
    return;
  }

  const { email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, normalizedEmail))
    .limit(1);

  const GENERIC_ERROR = "E-mail ou mot de passe incorrect";

  if (!user) {
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));
    res.status(401).json({ error: GENERIC_ERROR });
    return;
  }

  if (isAccountLocked(user.lockedUntil)) {
    res.status(429).json({
      error: "Compte temporairement verrouillé suite à trop de tentatives. Réessayez dans 15 minutes.",
    });
    return;
  }

  const valid = await verifyPassword(password, user.passwordHash);

  if (!valid) {
    const newAttempts = user.failedLoginAttempts + 1;
    const shouldLock = newAttempts >= MAX_FAILED_ATTEMPTS;

    await db
      .update(usersTable)
      .set({
        failedLoginAttempts: newAttempts,
        lockedUntil: shouldLock ? getLockoutTime() : null,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, user.id));

    res.status(401).json({ error: GENERIC_ERROR });
    return;
  }

  await db
    .update(usersTable)
    .set({
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLogin: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(usersTable.id, user.id));

  const safeUser = toSafeUser(user);
  const accessToken = signAccessToken(safeUser);
  const refreshToken = signRefreshToken(user.id);
  const tokenHash = hashRefreshToken(refreshToken);

  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash,
    expiresAt: generateRefreshTokenExpiry(),
  });

  res
    .cookie("access_token", accessToken, { ...COOKIE_OPTS, maxAge: ACCESS_COOKIE_TTL })
    .cookie("refresh_token", refreshToken, { ...COOKIE_OPTS, maxAge: REFRESH_COOKIE_TTL })
    .json({ user: safeUser });
});

router.post("/logout", async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;

  if (refreshToken) {
    const tokenHash = hashRefreshToken(refreshToken);
    await db
      .update(refreshTokensTable)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokensTable.tokenHash, tokenHash));
  }

  res
    .clearCookie("access_token", COOKIE_OPTS)
    .clearCookie("refresh_token", COOKIE_OPTS)
    .json({ message: "Déconnecté avec succès" });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    res.status(401).json({ error: "Refresh token manquant" });
    return;
  }

  let payload: { sub: number };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    res.clearCookie("access_token", COOKIE_OPTS).clearCookie("refresh_token", COOKIE_OPTS);
    res.status(401).json({ error: "Refresh token invalide ou expiré" });
    return;
  }

  const tokenHash = hashRefreshToken(refreshToken);
  const [storedToken] = await db
    .select()
    .from(refreshTokensTable)
    .where(
      and(
        eq(refreshTokensTable.tokenHash, tokenHash),
        eq(refreshTokensTable.userId, payload.sub),
        gt(refreshTokensTable.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!storedToken || storedToken.revokedAt) {
    res.clearCookie("access_token", COOKIE_OPTS).clearCookie("refresh_token", COOKIE_OPTS);
    res.status(401).json({ error: "Refresh token révoqué" });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, payload.sub))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Utilisateur introuvable" });
    return;
  }

  await db
    .update(refreshTokensTable)
    .set({ revokedAt: new Date() })
    .where(eq(refreshTokensTable.id, storedToken.id));

  const safeUser = toSafeUser(user);
  const newAccessToken = signAccessToken(safeUser);
  const newRefreshToken = signRefreshToken(user.id);
  const newTokenHash = hashRefreshToken(newRefreshToken);

  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash: newTokenHash,
    expiresAt: generateRefreshTokenExpiry(),
  });

  res
    .cookie("access_token", newAccessToken, { ...COOKIE_OPTS, maxAge: ACCESS_COOKIE_TTL })
    .cookie("refresh_token", newRefreshToken, { ...COOKIE_OPTS, maxAge: REFRESH_COOKIE_TTL })
    .json({ user: safeUser });
});

router.get("/me", authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.user.sub))
    .limit(1);

  if (!user) {
    res.status(404).json({ error: "Utilisateur introuvable" });
    return;
  }

  res.json({ user: toSafeUser(user) });
});

export default router;
