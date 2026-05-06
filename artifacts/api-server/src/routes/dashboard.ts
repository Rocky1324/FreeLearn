import { Router, Request, Response } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "@workspace/db";
import { userProgressTable } from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";

const router = Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;

  try {
    const progress = await db
      .select()
      .from(userProgressTable)
      .where(eq(userProgressTable.userId, user.id))
      .orderBy(desc(userProgressTable.completedAt));

    const dateSet = new Set(
      progress.map((p: typeof progress[0]) => p.completedAt.toISOString().split("T")[0]),
    );

    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (dateSet.has(key)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    const courseProgress: Record<string, string[]> = {};
    for (const p of progress) {
      if (!courseProgress[p.courseId]) courseProgress[p.courseId] = [];
      courseProgress[p.courseId].push(p.chapterId);
    }

    const totalCompleted = progress.length;
    const estimatedStudyHours =
      Math.round(((totalCompleted * 20) / 60) * 10) / 10;

    res.json({
      streak,
      totalCompleted,
      estimatedStudyHours,
      courseProgress,
      recentActivity: progress.slice(0, 10).map((p: typeof progress[0]) => ({
        courseId: p.courseId,
        chapterId: p.chapterId,
        completedAt: p.completedAt,
      })),
    });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
