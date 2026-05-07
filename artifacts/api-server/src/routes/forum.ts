import { Router, Request, Response } from "express";
import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  forumPostsTable,
  forumRepliesTable,
  usersTable,
} from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";

const router = Router();

const VALID_CATEGORIES = ["mathematiques", "sciences", "francais", "histoire", "anglais", "general"] as const;
type Category = typeof VALID_CATEGORIES[number];

function isValidCategory(v: unknown): v is Category {
  return VALID_CATEGORIES.includes(v as Category);
}

router.get("/", async (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;

  try {
    const replyCountSq = db
      .select({
        postId: forumRepliesTable.postId,
        count: sql<number>`cast(count(*) as int)`.as("count"),
      })
      .from(forumRepliesTable)
      .groupBy(forumRepliesTable.postId)
      .as("reply_counts");

    const query = db
      .select({
        id: forumPostsTable.id,
        title: forumPostsTable.title,
        body: forumPostsTable.body,
        category: forumPostsTable.category,
        pinned: forumPostsTable.pinned,
        solved: forumPostsTable.solved,
        createdAt: forumPostsTable.createdAt,
        authorId: forumPostsTable.authorId,
        authorName: usersTable.displayName,
        authorRole: usersTable.role,
        replyCount: sql<number>`coalesce(${replyCountSq.count}, 0)`,
      })
      .from(forumPostsTable)
      .innerJoin(usersTable, eq(forumPostsTable.authorId, usersTable.id))
      .leftJoin(replyCountSq, eq(forumPostsTable.id, replyCountSq.postId))
      .orderBy(desc(forumPostsTable.pinned), desc(forumPostsTable.createdAt))
      .limit(100);

    const rows = category && isValidCategory(category)
      ? await query.where(eq(forumPostsTable.category, category))
      : await query;

    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.get("/:postId", async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);
  if (isNaN(postId)) { res.status(400).json({ error: "ID invalide." }); return; }

  try {
    const [post] = await db
      .select({
        id: forumPostsTable.id,
        title: forumPostsTable.title,
        body: forumPostsTable.body,
        category: forumPostsTable.category,
        pinned: forumPostsTable.pinned,
        solved: forumPostsTable.solved,
        createdAt: forumPostsTable.createdAt,
        authorId: forumPostsTable.authorId,
        authorName: usersTable.displayName,
        authorRole: usersTable.role,
      })
      .from(forumPostsTable)
      .innerJoin(usersTable, eq(forumPostsTable.authorId, usersTable.id))
      .where(eq(forumPostsTable.id, postId))
      .limit(1);

    if (!post) { res.status(404).json({ error: "Post introuvable." }); return; }

    const replies = await db
      .select({
        id: forumRepliesTable.id,
        body: forumRepliesTable.body,
        accepted: forumRepliesTable.accepted,
        createdAt: forumRepliesTable.createdAt,
        authorId: forumRepliesTable.authorId,
        authorName: usersTable.displayName,
        authorRole: usersTable.role,
      })
      .from(forumRepliesTable)
      .innerJoin(usersTable, eq(forumRepliesTable.authorId, usersTable.id))
      .where(eq(forumRepliesTable.postId, postId))
      .orderBy(desc(forumRepliesTable.accepted), forumRepliesTable.createdAt);

    res.json({ post, replies });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const { title, body, category } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length < 5) {
    res.status(400).json({ error: "Le titre doit avoir au moins 5 caractères." }); return;
  }
  if (typeof body !== "string" || body.trim().length < 10) {
    res.status(400).json({ error: "Le message doit avoir au moins 10 caractères." }); return;
  }
  if (!isValidCategory(category)) {
    res.status(400).json({ error: "Catégorie invalide." }); return;
  }

  try {
    const [post] = await db
      .insert(forumPostsTable)
      .values({ authorId: user.id, title: title.trim(), body: body.trim(), category })
      .returning();
    res.status(201).json(post);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.delete("/:postId", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const postId = parseInt(req.params.postId, 10);
  if (isNaN(postId)) { res.status(400).json({ error: "ID invalide." }); return; }

  try {
    const [post] = await db.select({ authorId: forumPostsTable.authorId })
      .from(forumPostsTable).where(eq(forumPostsTable.id, postId)).limit(1);
    if (!post) { res.status(404).json({ error: "Post introuvable." }); return; }
    if (post.authorId !== user.id && user.role !== "teacher") {
      res.status(403).json({ error: "Non autorisé." }); return;
    }
    await db.delete(forumPostsTable).where(eq(forumPostsTable.id, postId));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.patch("/:postId/solved", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const postId = parseInt(req.params.postId, 10);
  if (isNaN(postId)) { res.status(400).json({ error: "ID invalide." }); return; }

  try {
    const [post] = await db.select({ authorId: forumPostsTable.authorId })
      .from(forumPostsTable).where(eq(forumPostsTable.id, postId)).limit(1);
    if (!post) { res.status(404).json({ error: "Post introuvable." }); return; }
    if (post.authorId !== user.id && user.role !== "teacher") {
      res.status(403).json({ error: "Non autorisé." }); return;
    }
    const [updated] = await db.update(forumPostsTable)
      .set({ solved: true })
      .where(eq(forumPostsTable.id, postId))
      .returning();
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/:postId/replies", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const postId = parseInt(req.params.postId, 10);
  if (isNaN(postId)) { res.status(400).json({ error: "ID invalide." }); return; }

  const { body } = req.body ?? {};
  if (typeof body !== "string" || body.trim().length < 2) {
    res.status(400).json({ error: "La réponse est trop courte." }); return;
  }

  try {
    const [post] = await db.select({ id: forumPostsTable.id })
      .from(forumPostsTable).where(eq(forumPostsTable.id, postId)).limit(1);
    if (!post) { res.status(404).json({ error: "Post introuvable." }); return; }

    const [reply] = await db
      .insert(forumRepliesTable)
      .values({ postId, authorId: user.id, body: body.trim() })
      .returning();
    res.status(201).json(reply);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.patch("/:postId/replies/:replyId/accept", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const postId = parseInt(req.params.postId, 10);
  const replyId = parseInt(req.params.replyId, 10);
  if (isNaN(postId) || isNaN(replyId)) { res.status(400).json({ error: "ID invalide." }); return; }

  try {
    const [post] = await db.select({ authorId: forumPostsTable.authorId })
      .from(forumPostsTable).where(eq(forumPostsTable.id, postId)).limit(1);
    if (!post) { res.status(404).json({ error: "Post introuvable." }); return; }
    if (post.authorId !== user.id && user.role !== "teacher") {
      res.status(403).json({ error: "Non autorisé." }); return;
    }
    await db.update(forumRepliesTable)
      .set({ accepted: false })
      .where(eq(forumRepliesTable.postId, postId));
    const [updated] = await db.update(forumRepliesTable)
      .set({ accepted: true })
      .where(and(eq(forumRepliesTable.id, replyId), eq(forumRepliesTable.postId, postId)))
      .returning();
    await db.update(forumPostsTable).set({ solved: true }).where(eq(forumPostsTable.id, postId));
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.delete("/:postId/replies/:replyId", requireAuth, async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const replyId = parseInt(req.params.replyId, 10);
  if (isNaN(replyId)) { res.status(400).json({ error: "ID invalide." }); return; }

  try {
    const [reply] = await db.select({ authorId: forumRepliesTable.authorId })
      .from(forumRepliesTable).where(eq(forumRepliesTable.id, replyId)).limit(1);
    if (!reply) { res.status(404).json({ error: "Réponse introuvable." }); return; }
    if (reply.authorId !== user.id && user.role !== "teacher") {
      res.status(403).json({ error: "Non autorisé." }); return;
    }
    await db.delete(forumRepliesTable).where(eq(forumRepliesTable.id, replyId));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
