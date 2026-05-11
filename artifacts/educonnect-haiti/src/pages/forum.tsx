import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import {
  MessageSquare,
  Plus,
  CheckCircle2,
  Pin,
  ChevronLeft,
  Trash2,
  ThumbsUp,
  Send,
  BookOpen,
  X,
  WifiOff,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { api, ApiError } from "@/lib/api";
import { useOnlineStatus } from "@/hooks/use-online-status";

type Category = "mathematiques" | "sciences" | "francais" | "histoire" | "anglais" | "general";

interface PostSummary {
  id: number;
  title: string;
  body: string;
  category: Category;
  pinned: boolean;
  solved: boolean;
  createdAt: string;
  authorId: number;
  authorName: string;
  authorRole: "student" | "teacher";
  replyCount: number;
}

interface Reply {
  id: number;
  body: string;
  accepted: boolean;
  createdAt: string;
  authorId: number;
  authorName: string;
  authorRole: "student" | "teacher";
}

interface PostDetail {
  post: Omit<PostSummary, "replyCount">;
  replies: Reply[];
}

const CATEGORIES: Category[] = ["mathematiques", "sciences", "francais", "histoire", "anglais", "general"];

const CATEGORY_COLORS: Record<Category, string> = {
  mathematiques: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  sciences: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300",
  francais: "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
  histoire: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  anglais: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300",
  general: "bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300",
};

function timeAgo(dateStr: string, lang: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (lang === "ht") {
    if (mins < 1) return "kounye a";
    if (mins < 60) return `${mins} min de sa`;
    if (hours < 24) return `${hours}h de sa`;
    return `${days} jou de sa`;
  }
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  if (hours < 24) return `il y a ${hours}h`;
  return `il y a ${days} j`;
}

export default function Forum() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [, navigate] = useLocation();
  const isOnline = useOnlineStatus();

  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("general");
  const [replyText, setReplyText] = useState("");

  const postsQuery = useQuery<PostSummary[]>({
    queryKey: ["forum-posts", activeCategory],
    queryFn: () => {
      const path = activeCategory === "all"
        ? "/api/forum"
        : `/api/forum?category=${activeCategory}`;
      return api.get<PostSummary[]>(path);
    },
  });

  const postDetailQuery = useQuery<PostDetail>({
    queryKey: ["forum-post", selectedPostId],
    queryFn: () => api.get<PostDetail>(`/api/forum/${selectedPostId}`),
    enabled: selectedPostId !== null,
  });

  const createPostMutation = useMutation({
    mutationFn: (data: { title: string; body: string; category: Category }) => 
      api.post<PostSummary>("/api/forum", data),
    onSuccess: (post: PostSummary) => {
      qc.invalidateQueries({ queryKey: ["forum-posts"] });
      setShowNewPost(false);
      setNewTitle("");
      setNewBody("");
      setNewCategory("general");
      setSelectedPostId(post.id);
    },
    onError: (e: Error) => toast({ title: e.message, variant: "destructive" }),
  });

  const replyMutation = useMutation({
    mutationFn: (body: string) => 
      api.post<Reply>(`/api/forum/${selectedPostId}/replies`, { body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forum-post", selectedPostId] });
      qc.invalidateQueries({ queryKey: ["forum-posts"] });
      setReplyText("");
    },
    onError: (e: Error) => toast({ title: e.message, variant: "destructive" }),
  });

  const acceptMutation = useMutation({
    mutationFn: (replyId: number) => 
      api.patch<Reply>(`/api/forum/${selectedPostId}/replies/${replyId}/accept`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forum-post", selectedPostId] });
      qc.invalidateQueries({ queryKey: ["forum-posts"] });
    },
    onError: (e: Error) => toast({ title: e.message, variant: "destructive" }),
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => 
      api.del<{ ok: boolean }>(`/api/forum/${postId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forum-posts"] });
      setSelectedPostId(null);
    },
    onError: (e: Error) => toast({ title: e.message, variant: "destructive" }),
  });

  const deleteReplyMutation = useMutation({
    mutationFn: ({ postId, replyId }: { postId: number; replyId: number }) => 
      api.del<{ ok: boolean }>(`/api/forum/${postId}/replies/${replyId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forum-post", selectedPostId] });
      qc.invalidateQueries({ queryKey: ["forum-posts"] });
    },
    onError: (e: Error) => toast({ title: e.message, variant: "destructive" }),
  });

  const canModerate = (authorId: number) =>
    user?.id === authorId || user?.role === "teacher";

  if (selectedPostId !== null) {
    const detail = postDetailQuery.data;
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <button
            onClick={() => setSelectedPostId(null)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.forum.back}
          </button>

          {postDetailQuery.isLoading && (
            <div className="text-center py-20 text-muted-foreground">{t.forum.loading}</div>
          )}

          {detail && (
            <>
              <div className="bg-card border rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[detail.post.category]}`}>
                      {t.forum.categories[detail.post.category]}
                    </span>
                    {detail.post.pinned && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 flex items-center gap-1">
                        <Pin className="w-3 h-3" />{t.forum.pinned}
                      </span>
                    )}
                    {detail.post.solved && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />{t.forum.solved}
                      </span>
                    )}
                  </div>
                  {canModerate(detail.post.authorId) && (
                    <button
                      onClick={() => {
                        if (confirm(t.forum.confirmDelete)) deletePostMutation.mutate(detail.post.id);
                      }}
                      className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h1 className="text-xl font-bold mb-3">{detail.post.title}</h1>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed mb-4">{detail.post.body}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                    {detail.post.authorName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{detail.post.authorName}</span>
                  {detail.post.authorRole === "teacher" && (
                    <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                      <BookOpen className="w-3 h-3 mr-0.5" />{t.forum.teacher}
                    </span>
                  )}
                  <span>·</span>
                  <span>{timeAgo(detail.post.createdAt, lang)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  {detail.replies.length} {detail.replies.length === 1 ? t.forum.reply : t.forum.replies}
                </h2>
                {detail.replies.length === 0 && (
                  <p className="text-center text-muted-foreground py-8 bg-card border rounded-2xl">
                    {t.forum.noReplies}
                  </p>
                )}
                {detail.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`bg-card border rounded-2xl p-5 relative ${reply.accepted ? "border-emerald-400 dark:border-emerald-600" : ""}`}
                  >
                    {reply.accepted && (
                      <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />{t.forum.accepted}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed mb-4">{reply.body}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                          {reply.authorName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{reply.authorName}</span>
                        {reply.authorRole === "teacher" && (
                          <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                            <BookOpen className="w-3 h-3 mr-0.5" />{t.forum.teacher}
                          </span>
                        )}
                        <span>·</span>
                        <span>{timeAgo(reply.createdAt, lang)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {!reply.accepted && canModerate(detail.post.authorId) && (
                          <button
                            onClick={() => acceptMutation.mutate(reply.id)}
                            className="flex items-center gap-1 text-xs text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 px-2 py-1 rounded-lg transition-colors"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />{t.forum.acceptAnswer}
                          </button>
                        )}
                        {canModerate(reply.authorId) && (
                          <button
                            onClick={() => deleteReplyMutation.mutate({ postId: selectedPostId!, replyId: reply.id })}
                            className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                isOnline ? (
                <div className="bg-card border rounded-2xl p-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t.forum.writeReply}
                    rows={3}
                    className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={() => replyMutation.mutate(replyText)}
                      disabled={replyText.trim().length < 2 || replyMutation.isPending}
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      {t.forum.sendReply}
                    </Button>
                  </div>
                </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-sm text-amber-800">
                    <WifiOff className="w-4 h-4 shrink-0" />
                    <span>Vous êtes hors-ligne. Reconnectez-vous pour répondre.</span>
                  </div>
                )
              ) : (
                <p className="text-center text-muted-foreground text-sm py-4">{t.forum.loginToPost}</p>
              )}
            </>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="w-7 h-7 text-primary" />
              {t.forum.title}
            </h1>
            <p className="text-muted-foreground mt-1">{t.forum.subtitle}</p>
          </div>
          {user && (
            <Button
              onClick={() => setShowNewPost(true)}
              className="shrink-0"
              disabled={!isOnline}
              title={!isOnline ? "Connexion internet requise" : undefined}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {t.forum.newPost}
            </Button>
          )}
        </div>

        {showNewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card border rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-lg">{t.forum.newPost}</h2>
                <button onClick={() => setShowNewPost(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t.forum.category}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{t.forum.categories[cat]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t.forum.postTitle}</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={t.forum.postTitlePlaceholder}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t.forum.postBody}</label>
                  <textarea
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder={t.forum.postBodyPlaceholder}
                    rows={5}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-background resize-none"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>{t.forum.cancel}</Button>
                  <Button
                    onClick={() => createPostMutation.mutate({ title: newTitle, body: newBody, category: newCategory })}
                    disabled={newTitle.trim().length < 5 || newBody.trim().length < 10 || createPostMutation.isPending || !isOnline}
                    title={!isOnline ? "Connexion internet requise" : undefined}
                  >
                    {t.forum.publish}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t.forum.allCategories}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.forum.categories[cat]}
            </button>
          ))}
        </div>

        {postsQuery.isLoading && (
          <div className="text-center py-20 text-muted-foreground">{t.forum.loading}</div>
        )}
        {postsQuery.isError && (
          <div className="text-center py-20 text-destructive">{t.forum.error}</div>
        )}

        {postsQuery.data && postsQuery.data.length === 0 && (
          <div className="text-center py-20">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">{t.forum.noPosts}</p>
            {!user && <p className="text-muted-foreground text-sm mt-2">{t.forum.loginToPost}</p>}
          </div>
        )}

        <div className="space-y-3">
          {postsQuery.data?.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="w-full text-left bg-card border rounded-2xl p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[post.category]}`}>
                      {t.forum.categories[post.category]}
                    </span>
                    {post.pinned && (
                      <span className="text-xs text-orange-600 flex items-center gap-0.5">
                        <Pin className="w-3 h-3" />{t.forum.pinned}
                      </span>
                    )}
                    {post.solved && (
                      <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />{t.forum.solved}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.body}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                        {post.authorName.charAt(0).toUpperCase()}
                      </div>
                      <span>{post.authorName}</span>
                      {post.authorRole === "teacher" && (
                        <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                          <BookOpen className="w-3 h-3 mr-0.5" />{t.forum.teacher}
                        </span>
                      )}
                    </div>
                    <span>·</span>
                    <span>{timeAgo(post.createdAt, lang)}</span>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-center gap-0.5 text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-medium">{post.replyCount}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
