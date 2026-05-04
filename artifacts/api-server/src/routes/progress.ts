import { Router } from "express";
import { db, chapterProgressTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authenticate, type AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const rows = await db
    .select()
    .from(chapterProgressTable)
    .where(eq(chapterProgressTable.userId, userId));

  const done: Record<string, boolean> = {};
  for (const row of rows) {
    done[row.chapterId] = true;
  }
  res.json({ done });
});

router.post("/:chapterId", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const { chapterId } = req.params;
  const { courseId } = req.body as { courseId?: string };

  if (!courseId) {
    res.status(400).json({ error: "courseId requis" });
    return;
  }

  const [existing] = await db
    .select()
    .from(chapterProgressTable)
    .where(
      and(
        eq(chapterProgressTable.userId, userId),
        eq(chapterProgressTable.chapterId, chapterId),
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .delete(chapterProgressTable)
      .where(eq(chapterProgressTable.id, existing.id));
    res.json({ done: false });
  } else {
    await db.insert(chapterProgressTable).values({ userId, chapterId, courseId });
    res.json({ done: true });
  }
});

export default router;
