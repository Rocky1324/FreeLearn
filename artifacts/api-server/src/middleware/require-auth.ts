import { Request, Response, NextFunction } from "express";
import { createHash } from "node:crypto";
import { db } from "@workspace/db";
import { sessionsTable, usersTable } from "@workspace/db/schema";
import { eq, and, gt } from "drizzle-orm";

export interface AuthRequest extends Request {
  user: {
    id: number;
    email: string;
    displayName: string;
    role: "student" | "teacher";
  };
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = (req as any).cookies?.session as string | undefined;
  if (!token) {
    res.status(401).json({ error: "Authentification requise." });
    return;
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
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
          eq(sessionsTable.tokenHash, tokenHash),
          gt(sessionsTable.expiresAt, now),
        ),
      )
      .limit(1);

    if (!rows.length) {
      res.clearCookie("session", { path: "/" });
      res.status(401).json({ error: "Session invalide ou expirée." });
      return;
    }

    (req as AuthRequest).user = rows[0] as AuthRequest["user"];
    next();
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
}
