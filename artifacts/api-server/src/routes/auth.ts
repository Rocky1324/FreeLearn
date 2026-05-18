import { Router } from "express";
import { randomBytes, createHash } from "node:crypto";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@workspace/db";
import { usersTable, sessionsTable } from "@workspace/db/schema";

const router = Router();

const TEACHER_CODE = process.env.TEACHER_REGISTRATION_CODE || "TEACHER2026";
const BCRYPT_ROUNDS = 12;
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives. Réessayez dans 15 minutes." },
});

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function setSession(res: any, token: string): void {
  res.cookie("session", token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: SESSION_MS,
    secure: true, // Doit être true pour sameSite: "none"
    path: "/",
  });
}

router.post("/register", authLimiter, async (req, res) => {
  const { email, displayName, password, teacherCode } = req.body ?? {};

  if (
    typeof email !== "string" ||
    typeof displayName !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json({ error: "Données invalides." });
    return;
  }

  if (displayName.trim().length < 2) {
    res.status(400).json({ error: "Le nom doit avoir au moins 2 caractères." });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "Le mot de passe doit avoir au moins 8 caractères." });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Email invalide." });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const role = teacherCode === TEACHER_CODE ? "teacher" : "student";

  try {
    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({ error: "Cet email est déjà utilisé." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const [user] = await db
      .insert(usersTable)
      .values({ email: normalizedEmail, displayName: displayName.trim(), passwordHash, role })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        displayName: usersTable.displayName,
        role: usersTable.role,
      });

    const token = randomBytes(32).toString("hex");
    await db.insert(sessionsTable).values({
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + SESSION_MS),
    });

    setSession(res, token);
    res.status(201).json({ user });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Email ou mot de passe invalide." });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    const user = rows[0];
    const dummyHash = "$2a$12$dummyhashfortimingattackprevention.aaaaaaaaaaaaa";

    if (user && !user.passwordHash) {
      res.status(401).json({ error: "Ce compte utilise la connexion Google. Veuillez vous connecter avec Google." });
      return;
    }

    const valid = user
      ? await bcrypt.compare(password, user.passwordHash!)
      : await bcrypt.compare(password, dummyHash);

    if (!user || !valid) {
      res.status(401).json({ error: "Email ou mot de passe incorrect." });
      return;
    }

    const token = randomBytes(32).toString("hex");
    await db.insert(sessionsTable).values({
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + SESSION_MS),
    });

    setSession(res, token);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/logout", async (req, res) => {
  const token = (req as any).cookies?.session as string | undefined;
  if (token) {
    await db
      .delete(sessionsTable)
      .where(eq(sessionsTable.tokenHash, hashToken(token)))
      .catch(() => {});
  }
  res.clearCookie("session", { path: "/" });
  res.json({ ok: true });
});

router.get("/me", async (req, res) => {
  const token = (req as any).cookies?.session as string | undefined;
  if (!token) {
    res.status(401).json({ error: "Non connecté." });
    return;
  }

  const now = new Date();
  try {
    const rows = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        displayName: usersTable.displayName,
        role: usersTable.role,
      })
      .from(sessionsTable)
      .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
      .where(
        and(
          eq(sessionsTable.tokenHash, hashToken(token)),
          gt(sessionsTable.expiresAt, now),
        ),
      )
      .limit(1);

    if (!rows.length) {
      res.clearCookie("session", { path: "/" });
      res.status(401).json({ error: "Session expirée." });
      return;
    }

    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
