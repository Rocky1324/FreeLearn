import { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, DownloadCloud, CheckCircle2, PlayCircle, BookText, PenTool, Check, X, Lightbulb, Layers } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProgress } from "@/hooks/use-progress";
import { courses } from "@/data/courses";
import { getLessonVideo, getYoutubeId } from "@/lib/lesson-storage";
import { toast } from "sonner";

export default function CourseDetail() {
  const [, params] = useRoute("/cours/:id");
  const [, navigate] = useLocation();
  const courseId = params?.id;
  const course = courses.find(c => c.id === courseId);
  const courseIndex = courses.findIndex(c => c.id === courseId);
  const nextCourse = courseIndex >= 0 ? courses[courseIndex + 1] : undefined;

  const [downloadedCourses, setDownloadedCourses] = useLocalStorage<Record<string, boolean>>("downloaded-courses", {});
  const { isDone, toggle: toggleDone, courseStats } = useProgress();
  const [activeChapterId, setActiveChapterId] = useState(course?.chapters[0]?.id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [customYoutubeId, setCustomYoutubeId] = useState<string | null>(null);

  const isDownloaded = downloadedCourses[courseId || ""] || false;
  const activeChapterIdSafe = activeChapterId || course?.chapters[0]?.id;

  useEffect(() => {
    if (!activeChapterIdSafe) return;
    let revoke: string | null = null;
    setUploadedVideoUrl(null);
    setCustomYoutubeId(null);
    getLessonVideo(activeChapterIdSafe).then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        revoke = url;
        setUploadedVideoUrl(url);
      }
    }).catch(() => {});
    getYoutubeId(activeChapterIdSafe).then((id) => {
      if (id) setCustomYoutubeId(id);
    }).catch(() => {});
    return () => { if (revoke) URL.revokeObjectURL(revoke); };
  }, [activeChapterIdSafe]);

  if (!course) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Cours introuvable</h1>
          <Link href="/cours">
            <Button>Retour au catalogue</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const activeChapter = course.chapters.find(c => c.id === activeChapterId) || course.chapters[0];

  const handleDownload = async () => {
    if (!courseId || !course) return;
    const base = import.meta.env.BASE_URL;
    const mediaUrls = course.chapters
      .map((c) => (c as { mp4Url?: string }).mp4Url)
      .filter((u): u is string => !!u)
      .map((u) => `${base}${u}`);

    if (isDownloaded) {
      const newDownloads = { ...downloadedCourses };
      delete newDownloads[courseId];
      setDownloadedCourses(newDownloads);
      if (mediaUrls.length && navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({ type: "REMOVE_MEDIA", urls: mediaUrls });
      }
      toast.success("Cours retiré du mode hors-ligne");
      return;
    }

    if (mediaUrls.length) {
      try {
        const reg = await navigator.serviceWorker?.ready;
        if (reg?.active) {
          reg.active.postMessage({ type: "CACHE_MEDIA", urls: mediaUrls });
        }
      } catch (err) {
        console.warn("SW caching failed", err);
      }
    }
    setDownloadedCourses({ ...downloadedCourses, [courseId]: true });
    toast.success(
      mediaUrls.length
        ? "Cours et vidéo téléchargés pour la lecture hors-ligne"
        : "Cours téléchargé pour une lecture hors-ligne",
    );
  };

  const goToNextChapter = () => {
    if (!course) return;
    const idx = course.chapters.findIndex(c => c.id === activeChapter.id);
    const next = course.chapters[idx + 1];
    if (next) {
      setActiveChapterId(next.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (nextCourse) {
      navigate(`/cours/${nextCourse.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isLastChapter = course
    ? course.chapters.findIndex(c => c.id === activeChapter.id) === course.chapters.length - 1
    : false;

  const handleAnswer = (exerciseIdx: number, optionIdx: number) => {
    if (submitted[activeChapter.id]) return;
    setAnswers({ ...answers, [`${activeChapter.id}-${exerciseIdx}`]: optionIdx });
  };

  const handleVerify = () => {
    setSubmitted({ ...submitted, [activeChapter.id]: true });
    toast.success("Exercices corrigés !");
  };

  return (
    <Layout>
      {/* Course Header */}
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <Link href="/cours" className="inline-flex items-center text-primary-foreground/80 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au catalogue
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="flex gap-3 flex-wrap">
                <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                  {course.subject}
                </span>
                <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                  {course.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">{course.title}</h1>
              <p className="text-primary-foreground/80 text-lg">{course.description}</p>
              {/* Progress bar */}
              {(() => {
                const stats = courseStats(course.chapters);
                return (
                  <div className="space-y-1.5 max-w-xs">
                    <div className="flex justify-between text-xs text-primary-foreground/70">
                      <span>{stats.done}/{stats.total} chapitres terminés</span>
                      <span className="font-bold">{stats.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${stats.pct}%` }} />
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleDownload}
                variant={isDownloaded ? "outline" : "secondary"} 
                className={isDownloaded ? "bg-green-500/20 text-white border-green-400 hover:bg-green-500/30" : "font-bold"}
              >
                {isDownloaded ? (
                  <><CheckCircle2 className="mr-2 h-4 w-4" /> Disponible hors-ligne</>
                ) : (
                  <><DownloadCloud className="mr-2 h-4 w-4" /> Télécharger (Hors-ligne)</>
                )}
              </Button>
              <Link href={`/fiches/${courseId}`}>
                <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white/10">
                  <Layers className="mr-2 h-4 w-4" /> Fiches de révision
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile chapter tabs (horizontal scroll) */}
      <div className="lg:hidden border-b bg-card overflow-x-auto flex-none">
        <div className="flex min-w-max px-4 py-3 gap-2">
          {course.chapters.map((chapter, idx) => (
            <button
              key={chapter.id}
              onClick={() => {
                setActiveChapterId(chapter.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-all ${
                activeChapterId === chapter.id
                  ? "bg-primary/5 border-primary text-primary"
                  : "bg-background border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                activeChapterId === chapter.id ? "bg-primary text-white" : "bg-muted-foreground/20 text-muted-foreground"
              }`}>{idx + 1}</span>
              Ch. {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chapter Navigation — desktop sidebar only */}
          <div className="hidden lg:block w-1/3 xl:w-1/4 space-y-4">
            <h3 className="font-bold text-lg mb-4">Contenu du cours</h3>
            <div className="flex flex-col space-y-2">
              {course.chapters.map((chapter, idx) => {
                const done = isDone(chapter.id);
                return (
                  <button
                    key={chapter.id}
                    onClick={() => setActiveChapterId(chapter.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      activeChapterId === chapter.id 
                        ? "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20" 
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {done ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <div className={`mt-0.5 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 ${
                          activeChapterId === chapter.id ? "bg-primary text-white" : "bg-muted-foreground/20 text-muted-foreground"
                        }`}>
                          {idx + 1}
                        </div>
                      )}
                      <span className={`font-medium ${done ? "text-green-700 dark:text-green-400" : activeChapterId === chapter.id ? "text-primary" : "text-foreground"}`}>
                        {chapter.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Content */}
          <div className="w-full lg:w-2/3 xl:w-3/4 space-y-8">
            <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
              {/* Video player */}
              {(() => {
                const localMp4 = (activeChapter as { mp4Url?: string }).mp4Url;
                const bundledOffline = isDownloaded && !!localMp4;
                const useUploaded = !!uploadedVideoUrl;
                const useLocal = useUploaded || bundledOffline;
                const videoSrc = useUploaded
                  ? uploadedVideoUrl!
                  : bundledOffline
                  ? `${import.meta.env.BASE_URL}${localMp4}`
                  : "";
                return (
                  <div className="aspect-video bg-slate-900 relative">
                    {useLocal ? (
                      <video
                        key={`local-${activeChapter.id}-${useUploaded ? "u" : "b"}`}
                        className="w-full h-full"
                        src={videoSrc}
                        controls
                        playsInline
                      />
                    ) : (customYoutubeId || activeChapter.youtubeId) ? (
                      <iframe
                        key={`${activeChapter.id}-${customYoutubeId || activeChapter.youtubeId}`}
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${customYoutubeId || activeChapter.youtubeId}?rel=0&modestbranding=1`}
                        title={`Vidéo de la leçon : ${activeChapter.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center gap-4">
                        <PlayCircle className="w-14 h-14 text-white/40" />
                        <div>
                          <p className="font-semibold text-white/80 mb-1">Trouver une vidéo sur ce sujet</p>
                          <p className="text-xs text-white/50 max-w-xs">
                            Clique sur le bouton ci-dessous pour rechercher directement une vidéo explicative.
                          </p>
                        </div>
                        {activeChapter.youtubeSearch && (
                          <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeChapter.youtubeSearch)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm shadow-lg"
                          >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Rechercher sur YouTube
                          </a>
                        )}
                      </div>
                    )}
                    {useLocal && (
                      <span className="absolute top-4 right-4 text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30 backdrop-blur-sm z-10">
                        Lecture hors-ligne
                      </span>
                    )}
                    {isDownloaded && !localMp4 && (
                      <span className="absolute top-4 right-4 text-xs font-bold bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/30 backdrop-blur-sm z-10">
                        Vidéo en ligne uniquement
                      </span>
                    )}
                  </div>
                );
              })()}
              {activeChapter.youtubeSearch && (customYoutubeId || activeChapter.youtubeId) && (
                <div className="px-6 md:px-8 pt-4 -mb-2">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeChapter.youtubeSearch)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Voir d'autres vidéos sur ce sujet sur YouTube →
                  </a>
                </div>
              )}
              
              {/* Written Summary */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2 font-bold text-lg text-primary border-b pb-4">
                  <BookText className="w-5 h-5" />
                  <h3>Résumé de la leçon</h3>
                </div>
                <div className="prose max-w-none text-foreground/80">
                  <p className="text-lg leading-relaxed">{activeChapter.summary}</p>
                </div>
              </div>
            </div>

            {/* Examples */}
            {activeChapter.examples && activeChapter.examples.length > 0 && (
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 font-bold text-lg text-primary border-b pb-4">
                  <Lightbulb className="w-5 h-5" />
                  <h3>Exemples résolus</h3>
                </div>
                <div className="space-y-4">
                  {activeChapter.examples.map((ex, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="font-bold text-amber-900 mb-2">{ex.title}</p>
                      <p className="text-amber-900/90 whitespace-pre-line leading-relaxed text-sm">
                        {ex.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exercises */}
            <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2 font-bold text-lg text-primary border-b pb-4">
                <PenTool className="w-5 h-5" />
                <h3>Exercices d'application</h3>
              </div>

              <div className="space-y-8">
                {activeChapter.exercises.map((ex, eIdx) => {
                  const ansKey = `${activeChapter.id}-${eIdx}`;
                  const selectedOpt = answers[ansKey];
                  const isSubmitted = submitted[activeChapter.id];
                  const isCorrect = selectedOpt === ex.answer;

                  return (
                    <div key={eIdx} className="space-y-4">
                      <p className="font-medium text-lg">{eIdx + 1}. {ex.question}</p>
                      <div className="grid gap-3">
                        {ex.options.map((opt, oIdx) => {
                          let btnClass = "justify-start h-auto py-3 px-4 text-left font-normal border-2 bg-transparent";
                          let icon = null;

                          if (isSubmitted) {
                            if (oIdx === ex.answer) {
                              btnClass = "justify-start h-auto py-3 px-4 text-left font-bold border-green-500 bg-green-50 text-green-900";
                              icon = <Check className="w-5 h-5 text-green-600 ml-auto shrink-0" />;
                            } else if (selectedOpt === oIdx) {
                              btnClass = "justify-start h-auto py-3 px-4 text-left font-normal border-red-500 bg-red-50 text-red-900 opacity-70";
                              icon = <X className="w-5 h-5 text-red-600 ml-auto shrink-0" />;
                            } else {
                              btnClass = "justify-start h-auto py-3 px-4 text-left font-normal border-muted bg-transparent opacity-50";
                            }
                          } else {
                            if (selectedOpt === oIdx) {
                              btnClass = "justify-start h-auto py-3 px-4 text-left font-bold border-primary bg-primary/5 text-primary";
                            } else {
                              btnClass = "justify-start h-auto py-3 px-4 text-left font-normal hover:bg-muted";
                            }
                          }

                          return (
                            <Button 
                              key={oIdx} 
                              variant="outline" 
                              className={btnClass}
                              onClick={() => handleAnswer(eIdx, oIdx)}
                              disabled={isSubmitted}
                            >
                              <div className="flex items-center w-full">
                                <span className="mr-3 w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 bg-background">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="flex-1">{opt}</span>
                                {icon}
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                      {isSubmitted && ex.explanation && (
                        <div className={`rounded-lg p-4 text-sm border ${isCorrect ? "bg-green-50 border-green-200 text-green-900" : "bg-red-50 border-red-200 text-red-900"}`}>
                          <p className="font-bold mb-1">
                            {isCorrect ? "Bonne réponse !" : "Explication :"}
                          </p>
                          <p className="leading-relaxed">{ex.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!submitted[activeChapter.id] && Object.keys(answers).filter(k => k.startsWith(activeChapter.id)).length > 0 && (
                <div className="pt-6 border-t mt-8">
                  <Button size="lg" className="w-full sm:w-auto" onClick={handleVerify}>
                    Vérifier mes réponses
                  </Button>
                </div>
              )}

              {/* Chapter completion toggle */}
              <div className="pt-6 border-t mt-4">
                <button
                  onClick={() => {
                    toggleDone(activeChapter.id);
                    if (!isDone(activeChapter.id)) toast.success("Chapitre marqué comme terminé !");
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    isDone(activeChapter.id)
                      ? "bg-green-50 border-green-300 text-green-700 dark:bg-green-950/30 dark:border-green-700 dark:text-green-400"
                      : "bg-card border-border text-muted-foreground hover:border-green-300 hover:text-green-600"
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${isDone(activeChapter.id) ? "text-green-500" : "text-muted-foreground/40"}`} />
                  {isDone(activeChapter.id) ? "Chapitre terminé ✓" : "Marquer comme terminé"}
                </button>
              </div>

              {submitted[activeChapter.id] && (
                <div className="pt-6 border-t mt-8 flex flex-col sm:flex-row gap-4 items-center bg-muted/30 p-6 rounded-xl">
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-1">Excellent travail !</p>
                    <p className="text-muted-foreground text-sm">
                      {!isLastChapter
                        ? "Tu as terminé ce chapitre. Prêt pour la suite ?"
                        : nextCourse
                        ? `Tu as terminé tout le cours ! Continue avec : ${nextCourse.title}.`
                        : "Tu as terminé tous les cours disponibles. Bravo !"}
                    </p>
                  </div>
                  {!isLastChapter ? (
                    <Button variant="secondary" onClick={goToNextChapter}>
                      Chapitre suivant <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : nextCourse ? (
                    <Button variant="secondary" onClick={goToNextChapter}>
                      Cours suivant <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Link href="/cours">
                      <Button variant="secondary">
                        Retour au catalogue <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}