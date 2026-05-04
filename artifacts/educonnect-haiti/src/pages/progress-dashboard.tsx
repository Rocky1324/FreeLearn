import { Layout } from "@/components/layout/Layout";
import { useProgress } from "@/hooks/use-progress";
import { useCalendar } from "@/hooks/use-calendar";
import { useDownloads } from "@/hooks/use-downloads";
import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/data/courses";
import { Link } from "wouter";
import { BookOpen, Clock, Flame, Download, Trophy, ChevronRight, CheckCircle2 } from "lucide-react";

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div
        className="h-2 rounded-full bg-primary transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ProgressDashboard() {
  const { user } = useAuth();
  const { done, loaded: progressLoaded, courseStats } = useProgress();
  const { totalMinutes, streak, loaded: calLoaded } = useCalendar();
  const { downloaded, loaded: dlLoaded } = useDownloads();

  const loaded = progressLoaded && calLoaded && dlLoaded;

  const totalChapters = courses.reduce((sum, c) => sum + c.chapters.length, 0);
  const completedChapters = Object.values(done).filter(Boolean).length;
  const overallPct = totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const downloadedCount = Object.values(downloaded).filter(Boolean).length;

  const coursesWithProgress = courses
    .map((c) => ({ ...c, stats: courseStats(c.chapters) }))
    .filter((c) => c.stats.done > 0)
    .sort((a, b) => b.stats.pct - a.stats.pct);

  const completedCourses = courses.filter((c) => {
    const s = courseStats(c.chapters);
    return s.pct === 100;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-1">Mon Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Bonjour{user ? `, ${user.fullName.split(" ")[0]}` : ""} ! Voici votre avancement.
          </p>
        </div>

        {!loaded ? (
          <div className="text-muted-foreground animate-pulse">Chargement…</div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border rounded-2xl p-5 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary">{overallPct}%</p>
                <p className="text-xs text-muted-foreground mt-1">Progression globale</p>
              </div>

              <div className="bg-card border rounded-2xl p-5 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{streak}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Jour{streak !== 1 ? "s" : ""} de suite
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-5 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">
                  {totalHours > 0 ? `${totalHours}h` : `${remainingMinutes}m`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Temps d'étude</p>
              </div>

              <div className="bg-card border rounded-2xl p-5 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{downloadedCount}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Cours hors-ligne
                </p>
              </div>
            </div>

            {/* Overall progress bar */}
            <div className="bg-card border rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">Progression globale</h2>
                <span className="text-sm font-medium text-primary">
                  {completedChapters} / {totalChapters} chapitres
                </span>
              </div>
              <ProgressBar pct={overallPct} />
              {completedCourses.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  {completedCourses.length} cours terminé{completedCourses.length > 1 ? "s" : ""} : {completedCourses.map((c) => c.title).join(", ")}
                </p>
              )}
            </div>

            {/* Per-course progress */}
            <div className="bg-card border rounded-2xl p-6 mb-6">
              <h2 className="font-bold text-lg mb-4">Progression par cours</h2>
              {coursesWithProgress.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Aucun cours commencé. <Link href="/cours" className="text-primary hover:underline">Parcourir les cours</Link></p>
                </div>
              ) : (
                <div className="space-y-5">
                  {coursesWithProgress.map((c) => (
                    <Link key={c.id} href={`/cours/${c.id}`} className="block group">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="min-w-0 pr-4">
                          <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                            {c.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{c.subject} · {c.level}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-sm font-bold ${c.stats.pct === 100 ? "text-green-600" : "text-primary"}`}>
                            {c.stats.pct}%
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                      <ProgressBar pct={c.stats.pct} />
                      <p className="text-xs text-muted-foreground mt-1">
                        {c.stats.done} / {c.stats.total} chapitre{c.stats.total > 1 ? "s" : ""}
                        {c.stats.pct === 100 && (
                          <span className="ml-2 text-green-600 font-medium">✓ Terminé</span>
                        )}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* All courses not started */}
            {courses.length > coursesWithProgress.length && (
              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4">Cours non commencés</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courses
                    .filter((c) => !coursesWithProgress.find((cp) => cp.id === c.id))
                    .map((c) => (
                      <Link key={c.id} href={`/cours/${c.id}`} className="flex items-center gap-3 p-3 rounded-xl border hover:border-primary hover:bg-primary/5 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{c.title}</p>
                          <p className="text-xs text-muted-foreground">{c.subject} · {c.level}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
