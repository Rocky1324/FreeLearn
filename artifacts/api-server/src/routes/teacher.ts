import { Router, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { teacherVideosTable } from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";
import { requireTeacher } from "../middleware/require-teacher";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(teacherVideosTable);
    const map: Record<string, string> = {};
    for (const v of rows) map[v.chapterId] = v.youtubeId;
    res.json(map);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post(
  "/",
  requireAuth,
  requireTeacher as any,
  async (req: Request, res: Response) => {
    const user = (req as AuthRequest).user;
    const { chapterId, youtubeId } = req.body ?? {};

    if (typeof chapterId !== "string" || typeof youtubeId !== "string") {
      res.status(400).json({ error: "Données invalides." });
      return;
    }
    if (youtubeId.length !== 11) {
      res.status(400).json({ error: "L'identifiant YouTube doit avoir 11 caractères." });
      return;
    }

    try {
      await db
        .insert(teacherVideosTable)
        .values({ teacherId: user.id, chapterId, youtubeId })
        .onConflictDoUpdate({
          target: teacherVideosTable.chapterId,
          set: { youtubeId, updatedAt: new Date() },
        });
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: "Erreur serveur." });
    }
  },
);

router.delete(
  "/:chapterId",
  requireAuth,
  requireTeacher as any,
  async (req: Request, res: Response) => {
    const { chapterId } = req.params;
    try {
      await db
        .delete(teacherVideosTable)
        .where(eq(teacherVideosTable.chapterId, chapterId));
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: "Erreur serveur." });
    }
  },
);

export default router;
