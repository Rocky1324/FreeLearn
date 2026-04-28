import { useEffect, useState } from "react";
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
import { CheckCircle2, Trash2, Upload, Info, Save, Youtube, X } from "lucide-react";

export default function Admin() {
  const [stored, setStored] = useState<string[]>([]);
  const [ytIds, setYtIds] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

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
    const MAX = 200 * 1024 * 1024;
    if (file.size > MAX) {
      toast.error("Fichier trop lourd (max 200 Mo).");
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
          Espace Enseignant
        </h1>
        <p className="text-muted-foreground mb-6">
          Pour chaque chapitre, attachez une vidéo YouTube ou téléversez un
          fichier MP4 / WebM. Si les deux sont présents, la vidéo téléversée
          (qui marche hors-ligne) est prioritaire.
        </p>

        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-8 flex gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong>Stockage local uniquement.</strong> Les vidéos et liens
            YouTube enregistrés ici sont sauvegardés dans ce navigateur (sur
            cet appareil). Ils ne sont pas partagés avec les autres élèves.
            Pour distribuer une leçon à toute votre classe, déposez le MP4
            dans le dossier{" "}
            <code className="bg-amber-100 px-1 rounded">public/lessons/</code>{" "}
            du projet, ou ajoutez l'identifiant YouTube directement dans{" "}
            <code className="bg-amber-100 px-1 rounded">src/data/courses.ts</code>.
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : (
          <div className="space-y-8">
            {courses.map((course) => (
              <section key={course.id} className="border rounded-2xl p-6 bg-card">
                <h2 className="text-xl font-bold mb-1">{course.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.subject} · {course.level}
                </p>
                <div className="space-y-6">
                  {course.chapters.map((chapter) => {
                    const hasFile = stored.includes(chapter.id);
                    const customYt = ytIds[chapter.id];
                    const draft = drafts[chapter.id] ?? "";
                    return (
                      <div
                        key={chapter.id}
                        className="p-4 rounded-xl bg-muted/40 border space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="min-w-0">
                            <p className="font-medium">{chapter.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {hasFile && customYt
                                ? "Fichier MP4 et lien YouTube actifs · le MP4 est joué en priorité"
                                : hasFile
                                ? "Fichier MP4 actif"
                                : customYt
                                ? "Lien YouTube personnalisé actif"
                                : chapter.youtubeId
                                ? "Vidéo par défaut du cours"
                                : "Aucune vidéo (le résumé et les exercices restent disponibles)"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {customYt && (
                              <span className="inline-flex items-center text-xs text-red-700 bg-red-100 px-2 py-1 rounded">
                                <Youtube className="w-3.5 h-3.5 mr-1" />
                                Lien actif
                              </span>
                            )}
                            {hasFile && (
                              <span className="inline-flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                MP4 actif
                              </span>
                            )}
                          </div>
                        </div>

                        {/* YouTube URL row */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                            <Youtube className="w-3.5 h-3.5" /> Lien YouTube
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
                                title="Retirer le lien"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              type="url"
                              inputMode="url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              value={draft}
                              onChange={(e) =>
                                setDrafts((d) => ({
                                  ...d,
                                  [chapter.id]: e.target.value,
                                }))
                              }
                              className="flex-1"
                              data-testid={`input-youtube-${chapter.id}`}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSaveYoutube(chapter.id)}
                              disabled={!draft.trim()}
                              data-testid={`button-save-youtube-${chapter.id}`}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Enregistrer
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Acceptés : URL complète, lien partagé{" "}
                            <code className="bg-muted px-1 rounded">youtu.be/…</code>
                            , ou identifiant à 11 caractères.
                          </p>
                        </div>

                        {/* MP4 upload row */}
                        <div className="space-y-2 pt-2 border-t">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" /> Fichier vidéo (hors-ligne)
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
                                  {hasFile ? "Remplacer le MP4" : "Téléverser un MP4"}
                                </span>
                              </Button>
                            </label>
                            {hasFile && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(chapter.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer le MP4
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
