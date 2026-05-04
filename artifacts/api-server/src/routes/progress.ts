import { Router } from "express";
import { db, chapterProgressTable } from "@workspace/db";
import { authenticate } from "../middlewares/authenticate.js";
import { eq, and } from "drizzle-orm";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const rows = await db
    .select()
    .from(chapterProgressTable)
    .where(eq(chapterProgressTable.userId, userId));

  const done: Record<string, boolean> = {};
  for (const r of rows) {
    done[r.chapterId] = true;
  }
  res.json({ done });
});

router.post("/:chapterId", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const { chapterId } = req.params;
  const { courseId } = req.body as { courseId?: string };

  if (!courseId) {
    res.status(400).json({ error: "courseId requis" });
    return;
  }

  const existing = await db
    .select()
    .from(chapterProgressTable)
    .where(
      and(
        eq(chapterProgressTable.userId, userId),
        eq(chapterProgressTable.chapterId, chapterId),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(chapterProgressTable)
      .where(
        and(
          eq(chapterProgressTable.userId, userId),
          eq(chapterProgressTable.chapterId, chapterId),
        ),
      );
    res.json({ done: false });
  } else {
    await db
      .insert(chapterProgressTable)
      .values({ userId, chapterId, courseId });
    res.json({ done: true });
  }
});

export default router;
