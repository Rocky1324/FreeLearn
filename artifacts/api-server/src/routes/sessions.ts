import { Router, Request, Response } from "express";
import { eq, desc, sum } from "drizzle-orm";
import { db } from "@workspace/db";
import { studySessionsTable } from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";

const router = Router();

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const { subject, plannedMinutes, completedMinutes } = req.body ?? {};

  if (
    typeof subject !== "string" || !subject.trim() ||
    typeof plannedMinutes !== "number" ||
    typeof completedMinutes !== "number"
  ) {
    res.status(400).json({ error: "Données invalides." });
    return;
  }

  try {
    const [session] = await db
      .insert(studySessionsTable)
      .values({
        userId: user.id,
        subject: subject.trim(),
        plannedMinutes,
        completedMinutes,
      })
      .returning();
    res.status(201).json({ session });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  try {
    const sessions = await db
      .select()
      .from(studySessionsTable)
      .where(eq(studySessionsTable.userId, user.id))
      .orderBy(desc(studySessionsTable.completedAt))
      .limit(50);
    res.json({ sessions });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.get("/stats", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  try {
    const result = await db
      .select({ totalMinutes: sum(studySessionsTable.completedMinutes) })
      .from(studySessionsTable)
      .where(eq(studySessionsTable.userId, user.id));
    const totalMinutes = Number(result[0]?.totalMinutes ?? 0);
    res.json({ totalMinutes });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
