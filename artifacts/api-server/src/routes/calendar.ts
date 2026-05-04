import { Router } from "express";
import { db, calendarSessionsTable } from "@workspace/db";
import { authenticate } from "../middlewares/authenticate.js";
import { eq, and } from "drizzle-orm";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const rows = await db
    .select()
    .from(calendarSessionsTable)
    .where(eq(calendarSessionsTable.userId, userId))
    .orderBy(calendarSessionsTable.date);

  const data: Record<string, { id: number; courseId: string; durationMinutes: number }[]> = {};
  for (const r of rows) {
    if (!data[r.date]) data[r.date] = [];
    data[r.date].push({ id: r.id, courseId: r.courseId, durationMinutes: r.durationMinutes });
  }
  res.json({ data });
});

router.post("/", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const { date, courseId, durationMinutes } = req.body as {
    date?: string;
    courseId?: string;
    durationMinutes?: number;
  };

  if (!date || !courseId || !durationMinutes) {
    res.status(400).json({ error: "date, courseId et durationMinutes requis" });
    return;
  }

  const [row] = await db
    .insert(calendarSessionsTable)
    .values({ userId, date, courseId, durationMinutes })
    .returning();

  res.status(201).json({ session: row });
});

router.delete("/:sessionId", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const sessionId = parseInt(req.params.sessionId, 10);

  if (isNaN(sessionId)) {
    res.status(400).json({ error: "ID de session invalide" });
    return;
  }

  const deleted = await db
    .delete(calendarSessionsTable)
    .where(
      and(
        eq(calendarSessionsTable.id, sessionId),
        eq(calendarSessionsTable.userId, userId),
      ),
    )
    .returning();

  if (deleted.length === 0) {
    res.status(404).json({ error: "Session introuvable" });
    return;
  }

  res.json({ message: "Session supprimée" });
});

export default router;
