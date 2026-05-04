import { Router } from "express";
import rateLimit from "express-rate-limit";
import { db, usersTable, refreshTokensTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";
import {
  hashPassword,
  verifyPassword,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashRefreshToken,
  generateRefreshTokenExpiry,
  isAccountLocked,
  getLockoutTime,
  validatePasswordStrength,
  MAX_FAILED_ATTEMPTS,
} from "../lib/auth.js";
import { authenticate, type AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Trop de tentatives d'inscription. Réessayez dans une heure." },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Trop de tentatives de connexion. Réessayez dans 15 minutes." },
});

function setTokenCookies(res: import("express").Response, accessToken: string, refreshToken: string) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
  });
}

router.post("/auth/register", registerLimiter, async (req, res) => {
  const { email, password, fullName } = req.body as {
    email?: string;
    password?: string;
    fullName?: string;
  };

  if (!email || !password || !fullName) {
    res.status(400).json({ error: "Email, mot de passe et nom complet requis" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Email invalide" });
    return;
  }

  const pwError = validatePasswordStrength(password);
  if (pwError) {
    res.status(400).json({ error: pwError });
    return;
  }

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({ error: "Un compte avec cet email existe déjà" });
    return;
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(usersTable)
    .values({
      email: email.toLowerCase(),
      fullName,
      passwordHash,
      role: "student",
    })
    .returning({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      isVerified: usersTable.isVerified,
      lastLogin: usersTable.lastLogin,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user.id);

  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash: hashRefreshToken(refreshToken),
    expiresAt: generateRefreshTokenExpiry(),
  });

  setTokenCookies(res, accessToken, refreshToken);
  res.status(201).json({ user });
});

router.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: "Email et mot de passe requis" });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Email ou mot de passe incorrect" });
    return;
  }

  if (isAccountLocked(user.lockedUntil)) {
    res.status(423).json({
      error: "Compte temporairement verrouillé. Réessayez dans 15 minutes.",
    });
    return;
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    const attempts = user.failedAttempts + 1;
    const lockout = attempts >= MAX_FAILED_ATTEMPTS ? getLockoutTime() : null;
    await db
      .update(usersTable)
      .set({ failedAttempts: attempts, lockedUntil: lockout, updatedAt: new Date() })
      .where(eq(usersTable.id, user.id));

    res.status(401).json({ error: "Email ou mot de passe incorrect" });
    return;
  }

  await db
    .update(usersTable)
    .set({ failedAttempts: 0, lockedUntil: null, lastLogin: new Date(), updatedAt: new Date() })
    .where(eq(usersTable.id, user.id));

  const safeUser = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    isVerified: user.isVerified,
    lastLogin: new Date(),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  const accessToken = signAccessToken(safeUser);
  const refreshToken = signRefreshToken(user.id);

  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash: hashRefreshToken(refreshToken),
    expiresAt: generateRefreshTokenExpiry(),
  });

  setTokenCookies(res, accessToken, refreshToken);
  res.json({ user: safeUser });
});

router.post("/auth/logout", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (refreshToken) {
    const hash = hashRefreshToken(refreshToken);
    await db.delete(refreshTokensTable).where(eq(refreshTokensTable.tokenHash, hash));
  }
  res.clearCookie("access_token");
  res.clearCookie("refresh_token", { path: "/api/auth" });
  res.json({ message: "Déconnecté avec succès" });
});

router.get("/auth/me", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const [user] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      isVerified: usersTable.isVerified,
      lastLogin: usersTable.lastLogin,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) {
    res.status(404).json({ error: "Utilisateur introuvable" });
    return;
  }
  res.json({ user });
});

router.post("/auth/refresh", async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ error: "Refresh token manquant" });
    return;
  }

  let payload: { sub: number };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    res.status(401).json({ error: "Refresh token invalide ou expiré" });
    return;
  }

  const hash = hashRefreshToken(refreshToken);
  const [token] = await db
    .select()
    .from(refreshTokensTable)
    .where(
      and(
        eq(refreshTokensTable.tokenHash, hash),
        gt(refreshTokensTable.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!token) {
    res.status(401).json({ error: "Refresh token révoqué ou expiré" });
    return;
  }

  await db.delete(refreshTokensTable).where(eq(refreshTokensTable.id, token.id));

  const [user] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      isVerified: usersTable.isVerified,
      lastLogin: usersTable.lastLogin,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, payload.sub))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Utilisateur introuvable" });
    return;
  }

  const newAccessToken = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user.id);

  await db.insert(refreshTokensTable).values({
    userId: user.id,
    tokenHash: hashRefreshToken(newRefreshToken),
    expiresAt: generateRefreshTokenExpiry(),
  });

  setTokenCookies(res, newAccessToken, newRefreshToken);
  res.json({ user });
});

export default router;
