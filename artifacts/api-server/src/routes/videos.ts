import { Router, type Request, type Response } from "express";
import { db, chapterVideosTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const ADMIN_KEY = process.env.ADMIN_KEY ?? "S1G42026";

const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

function checkAdminKey(req: Request, res: Response): boolean {
  const key = req.headers["x-admin-key"] as string | undefined;
  if (key === ADMIN_KEY) return true;
  res.status(403).json({ error: "Clé admin invalide" });
  return false;
}

function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (YOUTUBE_ID_REGEX.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.replace(/^\//, "");
      return YOUTUBE_ID_REGEX.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v") ?? "";
        return YOUTUBE_ID_REGEX.test(id) ? id : null;
      }
      const m = url.pathname.match(/^\/(embed|shorts|live)\/([^/?#]+)/);
      if (m && YOUTUBE_ID_REGEX.test(m[2])) return m[2];
    }
  } catch {
    return null;
  }
  return null;
}

router.get("/", async (_req, res) => {
  const rows = await db.select().from(chapterVideosTable);
  const videos: Record<string, string> = {};
  for (const row of rows) {
    videos[row.chapterId] = row.youtubeId;
  }
  res.json({ videos });
});

router.put("/:chapterId", async (req, res) => {
  if (!checkAdminKey(req, res)) return;
  const { chapterId } = req.params;
  const { youtubeUrl } = req.body as { youtubeUrl?: string };

  if (!youtubeUrl) { res.status(400).json({ error: "youtubeUrl requis" }); return; }

  const youtubeId = extractYoutubeId(youtubeUrl);
  if (!youtubeId) { res.status(400).json({ error: "URL YouTube invalide" }); return; }

  const [existing] = await db
    .select().from(chapterVideosTable)
    .where(eq(chapterVideosTable.chapterId, chapterId)).limit(1);

  if (existing) {
    await db.update(chapterVideosTable)
      .set({ youtubeId, updatedAt: new Date() })
      .where(eq(chapterVideosTable.chapterId, chapterId));
  } else {
    await db.insert(chapterVideosTable).values({ chapterId, youtubeId });
  }
  res.json({ chapterId, youtubeId });
});

router.delete("/:chapterId", async (req, res) => {
  if (!checkAdminKey(req, res)) return;
  const { chapterId } = req.params;
  await db.delete(chapterVideosTable).where(eq(chapterVideosTable.chapterId, chapterId));
  res.json({ message: "Vidéo YouTube retirée" });
});

export default router;
