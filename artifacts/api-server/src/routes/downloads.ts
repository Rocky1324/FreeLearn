import { Router } from "express";
import { db, downloadedCoursesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authenticate, type AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const rows = await db
    .select()
    .from(downloadedCoursesTable)
    .where(eq(downloadedCoursesTable.userId, userId));

  const downloaded: Record<string, boolean> = {};
  for (const row of rows) {
    downloaded[row.courseId] = true;
  }
  res.json({ downloaded });
});

router.post("/:courseId", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.sub;
  const { courseId } = req.params;

  const [existing] = await db
    .select()
    .from(downloadedCoursesTable)
    .where(
      and(
        eq(downloadedCoursesTable.userId, userId),
        eq(downloadedCoursesTable.courseId, courseId),
      ),
    )
    .limit(1);

  if (!existing) {
    await db.insert(downloadedCoursesTable).values({ userId, courseId });
  }

  res.status(201).json({ downloaded: true });
});

router.delete("/:courseId", authenticate as import("express").RequestHandler, async (req: AuthenticatedRequest, res) => {
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
