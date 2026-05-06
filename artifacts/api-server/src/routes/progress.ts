import { Router, Request, Response } from "express";
import { eq, and } from "drizzle-orm";
import { db } from "@workspace/db";
import { userProgressTable } from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";

const router = Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  try {
    const rows = await db
      .select()
      .from(userProgressTable)
      .where(eq(userProgressTable.userId, user.id));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/chapter", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const { chapterId, courseId, done } = req.body ?? {};

  if (typeof chapterId !== "string" || typeof courseId !== "string" || typeof done !== "boolean") {
    res.status(400).json({ error: "Données invalides." });
    return;
  }

  try {
    if (done) {
      await db
        .insert(userProgressTable)
        .values({ userId: user.id, courseId, chapterId })
        .onConflictDoNothing();
    } else {
      await db
        .delete(userProgressTable)
        .where(
          and(
            eq(userProgressTable.userId, user.id),
            eq(userProgressTable.chapterId, chapterId),
          ),
        );
    }
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
