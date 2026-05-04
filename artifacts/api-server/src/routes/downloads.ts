import { Router } from "express";
import { db, downloadedCoursesTable } from "@workspace/db";
import { authenticate } from "../middlewares/authenticate.js";
import { eq, and } from "drizzle-orm";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const rows = await db
    .select()
    .from(downloadedCoursesTable)
    .where(eq(downloadedCoursesTable.userId, userId));

  const downloaded: Record<string, boolean> = {};
  for (const r of rows) {
    downloaded[r.courseId] = true;
  }
  res.json({ downloaded });
});

router.post("/:courseId", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const { courseId } = req.params;

  await db
    .insert(downloadedCoursesTable)
    .values({ userId, courseId })
    .onConflictDoNothing();

  res.status(201).json({ downloaded: true });
});

router.delete("/:courseId", authenticate, async (req, res) => {
  const userId = req.user!.sub;
  const { courseId } = req.params;

  await db
    .delete(downloadedCoursesTable)
    .where(
      and(
        eq(downloadedCoursesTable.userId, userId),
        eq(downloadedCoursesTable.courseId, courseId),
      ),
    );

  res.json({ downloaded: false });
});

export default router;
