import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/data/courses";
import {
  saveLessonVideo,
  deleteLessonVideo,
  listLessonVideos,
  saveYoutubeId,
  deleteYoutubeId,
  listYoutubeIds,
  extractYoutubeId,
} from "@/lib/lesson-storage";
import { toast } from "sonner";
import {
  CheckCircle2,
  Trash2,
  Upload,
  Info,
  Save,
  Youtube,
  X,
  Download,
  Wifi,
  WifiOff,
  ChevronDown,
  ChevronUp,
  LogOut,
  QrCode,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { AdminLoginScreen } from "@/components/AdminLoginScreen";
import { QRCodeModal } from "@/components/QRCodeModal";

export default function Admin() {
  const { authed, login, logout, error: authError, loading: authLoading } = useAdminAuth();
  const [stored, setStored] = useState<string[]>([]);
  const [ytIds, setYtIds] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [urlDrafts, setUrlDrafts] = useState<Record<string, string>>({});
  const [downloading, setDownloading] = useState<Record<string, number | null>>({});
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [qrCourse, setQrCourse] = useState<{ id: string; title: string } | null>(null);
  const abortRefs = useRef<Record<string, AbortController>>({});

  const refresh = async () => {
    try {
      const [keys, ids] = await Promise.all([listLessonVideos(), listYoutubeIds()]);
      setStored(keys);
      setYtIds(ids);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleUpload = async (chapterId: string, file: File) => {
    if (!file.type.startsWith("video/")) {
      toast.error("Veuillez choisir un fichier vidéo (MP4, WebM…).");
      return;
    }
    const MAX = 500 * 1024 * 1024;
    if (file.size > MAX) {
      toast.error("Fichier trop lourd (max 500 Mo).");
      return;
    }
    try {
      await saveLessonVideo(chapterId, file);
      toast.success("Vidéo enregistrée pour ce chapitre.");
      refresh();
    } catch (e) {
      console.error(e);
      toast.error("Échec de l'enregistrement.");
    }
  };

  const handleDownloadFromUrl = async (chapterId: string) => {
    const url = urlDrafts[chapterId]?.trim();
    if (!url) return;

    const controller = new AbortController();
    abortRefs.current[chapterId] = controller;
    setDownloading((d) => ({ ...d, [chapterId]: 0 }));

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("video/") && !contentType.includes("octet-stream")) {
        const guessedType = url.toLowerCase().endsWith(".mp4")
          ? "video/mp4"
          : url.toLowerCase().endsWith(".webm")
          ? "video/webm"
          : "video/mp4";

        const reader = response.body?.getReader();
        const chunks: Uint8Array[] = [];
        let received = 0;
        const total = Number(response.headers.get("content-length")) || 0;

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            if (total > 0) {
              setDownloading((d) => ({ ...d, [chapterId]: Math.round((received / total) * 100) }));
            }
          }
        }

        const blob = new Blob(chunks, { type: guessedType });
        await saveLessonVideo(chapterId, blob);
      } else {
        const reader = response.body?.getReader();
        const chunks: Uint8Array[] = [];
        let received = 0;
        const total = Number(response.headers.get("content-length")) || 0;

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            if (total > 0) {
              setDownloading((d) => ({ ...d, [chapterId]: Math.round((received / total) * 100) }));
            }
          }
        }
        const blob = new Blob(chunks, { type: contentType });
        await saveLessonVideo(chapterId, blob);
      }

      toast.success("Vidéo téléchargée et sauvegardée hors-ligne !");
      setUrlDrafts((d) => ({ ...d, [chapterId]: "" }));
      refresh();
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") {
        toast.info("Téléchargement annulé.");
      } else {
        console.error(e);
        toast.error(
          "Impossible de télécharger la vidéo. Vérifiez que le lien est direct (MP4/WebM) et accessible.",
        );
      }
    } finally {
      setDownloading((d) => {
        const next = { ...d };
        delete next[chapterId];
        return next;
      });
      delete abortRefs.current[chapterId];
    }
  };

  const handleCancelDownload = (chapterId: string) => {
    abortRefs.current[chapterId]?.abort();
  };

  const handleDelete = async (chapterId: string) => {
    try {
      await deleteLessonVideo(chapterId);
      toast.success("Vidéo retirée.");
      refresh();
    } catch (e) {
      console.error(e);
      toast.error("Échec de la suppression.");
    }
  };

  const handleSaveYoutube = async (chapterId: string) => {
    const raw = drafts[chapterId] ?? "";
    const id = extractYoutubeId(raw);
    if (!id) {
      toast.error("URL YouTube invalide. Exemple : https://youtu.be/abc123XYZ_0");
      return;
    }
    try {
      await saveYoutubeId(chapterId, id);
      toast.success("Vidéo YouTube enregistrée pour ce chapitre.");
      setDrafts((d) => ({ ...d, [chapterId]: "" }));
      refresh();
    } catch (e) {
      console.error(e);
      toast.error("Échec de l'enregistrement.");
    }
  };

  const handleClearYoutube = async (chapterId: string) => {
    try {
      await deleteYoutubeId(chapterId);
      toast.success("Vidéo YouTube retirée. Le cours utilisera la vidéo par défaut.");
      refresh();
    } catch (e) {
      console.error(e);
      toast.error("Échec de la suppression.");
    }
  };

  const getOfflineStats = () => {
    let chaptersWithVideo = 0;
    let total = 0;
    for (const course of courses) {
      for (const chapter of course.chapters) {
        total++;
        if (stored.includes(chapter.id) || ytIds[chapter.id] || chapter.youtubeId) {
          chaptersWithVideo++;
        }
      }
    }
    return { chaptersWithVideo, total, offlineOnly: stored.length };
  };

  const stats = getOfflineStats();

  if (!authed) {
    return (
      <AdminLoginScreen
        onLogin={login}
        error={authError}
        loading={authLoading}
      />
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif">
            Espace Enseignant
          </h1>
          <Button variant="ghost" size="sm" onClick={logout} className="shrink-0 text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
        <p className="text-muted-foreground mb-8">
          Gérez les vidéos de chaque chapitre. Les vidéos MP4 sauvegardées
          fonctionnent <strong>100% hors-ligne</strong>. Les liens YouTube
          nécessitent une connexion internet.
        </p>

        {/* Stats banner */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.offlineOnly}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <WifiOff className="w-3.5 h-3.5" /> Vidéos hors-ligne
            </p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.chaptersWithVideo}</p>
            <p className="text-xs text-muted-foreground mt-1">Chapitres avec vidéo</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground mt-1">Chapitres au total</p>
          </div>
        </div>

        {/* How-to guide */}
        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-4 mb-8 flex gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed space-y-2">
            <p className="font-bold">Comment rendre les vidéos disponibles hors-ligne ?</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>
                <strong>Via une URL directe</strong> (recommandé) — Copiez un lien MP4 direct
                depuis Google Drive, Dropbox, ou un serveur local. Le site télécharge et stocke
                la vidéo dans le navigateur.
              </li>
              <li>
                <strong>Via un fichier local</strong> — Branchez une clé USB avec les vidéos
                MP4 et téléversez-les directement depuis votre appareil.
              </li>
              <li>
                <strong>Via un lien YouTube</strong> — Fonctionne en ligne uniquement. Utile
                pour les appareils avec connexion.
              </li>
            </ol>
            <p className="text-xs text-blue-700 mt-2">
              Les vidéos sont stockées dans ce navigateur uniquement. Pour partager avec tous
              les élèves, chaque appareil doit répéter l'opération (ou utiliser un réseau local).
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const courseOfflineCount = course.chapters.filter((ch) =>
                stored.includes(ch.id),
              ).length;
              const isExpanded = expandedCourse === course.id;

              return (
                <section key={course.id} className="border rounded-2xl bg-card overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 hover:bg-muted/30 transition-colors">
                    {/* Expand zone */}
                    <button
                      className="flex-1 text-left flex items-center gap-4 min-w-0"
                      onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                    >
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-bold leading-tight">{course.title}</h2>
                        <p className="text-sm text-muted-foreground">
                          {course.subject} · {course.level} ·{" "}
                          {course.chapters.length} chapitre
                          {course.chapters.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {courseOfflineCount > 0 && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                            <WifiOff className="w-3 h-3" />
                            {courseOfflineCount}/{course.chapters.length}
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* QR Button */}
                    <button
                      onClick={() => setQrCourse({ id: course.id, title: course.title })}
                      title="Générer un QR code pour ce cours"
                      className="shrink-0 p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                    >
                      <QrCode className="w-5 h-5" />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t px-5 py-4 space-y-5">
                      {course.chapters.map((chapter) => {
                        const hasFile = stored.includes(chapter.id);
                        const customYt = ytIds[chapter.id];
                        const draft = drafts[chapter.id] ?? "";
                        const urlDraft = urlDrafts[chapter.id] ?? "";
                        const progress = downloading[chapter.id];
                        const isDownloading = progress !== undefined && progress !== null;

                        return (
                          <div
                            key={chapter.id}
                            className="p-4 rounded-xl bg-muted/40 border space-y-4"
                          >
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <div className="min-w-0">
                                <p className="font-medium">{chapter.title}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  {hasFile ? (
                                    <>
                                      <WifiOff className="w-3 h-3 text-green-600" />
                                      <span className="text-green-700 font-medium">Vidéo hors-ligne disponible</span>
                                    </>
                                  ) : customYt ? (
                                    <>
                                      <Wifi className="w-3 h-3 text-yellow-600" />
                                      <span className="text-yellow-700">YouTube (connexion requise)</span>
                                    </>
                                  ) : chapter.youtubeId ? (
                                    <>
                                      <Wifi className="w-3 h-3 text-yellow-600" />
                                      <span className="text-yellow-700">Vidéo par défaut YouTube (connexion requise)</span>
                                    </>
                                  ) : (
                                    <span className="text-muted-foreground">Aucune vidéo configurée</span>
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {hasFile && (
                                  <span className="inline-flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                    MP4 hors-ligne
                                  </span>
                                )}
                                {customYt && !hasFile && (
                                  <span className="inline-flex items-center text-xs text-red-700 bg-red-100 px-2 py-1 rounded">
                                    <Youtube className="w-3.5 h-3.5 mr-1" />
                                    YouTube actif
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Download from URL */}
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                <Download className="w-3.5 h-3.5" /> Télécharger depuis une URL (hors-ligne)
                              </label>
                              {isDownloading ? (
                                <div className="space-y-2">
                                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                    <div
                                      className="bg-primary h-3 rounded-full transition-all"
                                      style={{ width: `${progress ?? 0}%` }}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">
                                      {progress === 0
                                        ? "Connexion…"
                                        : `Téléchargement : ${progress}%`}
                                    </p>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-red-600 h-7"
                                      onClick={() => handleCancelDownload(chapter.id)}
                                    >
                                      Annuler
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <Input
                                    type="url"
                                    inputMode="url"
                                    placeholder="https://… lien direct vers un fichier .mp4"
                                    value={urlDraft}
                                    onChange={(e) =>
                                      setUrlDrafts((d) => ({
                                        ...d,
                                        [chapter.id]: e.target.value,
                                      }))
                                    }
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleDownloadFromUrl(chapter.id)}
                                    disabled={!urlDraft.trim()}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Télécharger
                                  </Button>
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Lien direct MP4/WebM (Google Drive, Dropbox, serveur local…). La vidéo sera stockée dans ce navigateur.
                              </p>
                            </div>

                            {/* Upload local file */}
                            <div className="space-y-2 pt-2 border-t">
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5" /> Téléverser un fichier local
                              </label>
                              <div className="flex items-center gap-2 flex-wrap">
                                <label className="cursor-pointer">
                                  <input
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const f = e.target.files?.[0];
                                      if (f) handleUpload(chapter.id, f);
                                      e.target.value = "";
                                    }}
                                  />
                                  <Button asChild size="sm" variant="outline">
                                    <span>
                                      <Upload className="w-4 h-4 mr-2" />
                                      {hasFile ? "Remplacer le MP4" : "Choisir un MP4"}
                                    </span>
                                  </Button>
                                </label>
                                {hasFile && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-600"
                                    onClick={() => handleDelete(chapter.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Supprimer
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* YouTube URL */}
                            <div className="space-y-2 pt-2 border-t">
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                <Youtube className="w-3.5 h-3.5" /> Lien YouTube (connexion requise)
                              </label>
                              {customYt && (
                                <div className="flex items-center gap-2 text-xs bg-background border rounded px-3 py-2">
                                  <span className="text-muted-foreground">Actuel :</span>
                                  <a
                                    href={`https://www.youtube.com/watch?v=${customYt}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline truncate"
                                  >
                                    youtu.be/{customYt}
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleClearYoutube(chapter.id)}
                                    className="ml-auto text-red-600 hover:text-red-800"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                  type="url"
                                  inputMode="url"
                                  placeholder="https://www.youtube.com/watch?v=…"
                                  value={draft}
                                  onChange={(e) =>
                                    setDrafts((d) => ({
                                      ...d,
                                      [chapter.id]: e.target.value,
                                    }))
                                  }
                                  className="flex-1"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSaveYoutube(chapter.id)}
                                  disabled={!draft.trim()}
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Enregistrer
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {qrCourse && (
        <QRCodeModal
          courseTitle={qrCourse.title}
          courseUrl={`${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/cours/${qrCourse.id}`}
          onClose={() => setQrCourse(null)}
        />
      )}
    </Layout>
  );
}
