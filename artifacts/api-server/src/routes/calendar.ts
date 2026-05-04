import { Router } from "express";
import { db, calendarSessionsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authenticate, type AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const rows = await db
    .select()
    .from(calendarSessionsTable)
    .where(eq(calendarSessionsTable.userId, userId))
    .orderBy(calendarSessionsTable.date);

  const data: Record<string, { id: number; courseId: string; durationMinutes: number }[]> = {};
  for (const row of rows) {
    if (!data[row.date]) data[row.date] = [];
    data[row.date].push({ id: row.id, courseId: row.courseId, durationMinutes: row.durationMinutes });
  }
  res.json({ data });
});

router.post("/", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
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

router.delete("/:sessionId", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const sessionId = parseInt(req.params.sessionId, 10);

  if (isNaN(sessionId)) {
    res.status(400).json({ error: "ID de session invalide" });
    return;
  }

  await db
    .delete(calendarSessionsTable)
    .where(
      and(
        eq(calendarSessionsTable.id, sessionId),
        eq(calendarSessionsTable.userId, userId),
      ),
    );

  res.json({ message: "Session supprimée" });
});

export default router;
