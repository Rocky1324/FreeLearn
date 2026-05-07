import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Flame,
  BookOpen,
  Clock,
  Trophy,
  ChevronRight,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/data/courses";
import { useLanguage } from "@/hooks/use-language";

interface DashboardData {
  streak: number;
  totalCompleted: number;
  estimatedStudyHours: number;
  courseProgress: Record<string, string[]>;
  recentActivity: {
    courseId: string;
    chapterId: string;
    completedAt: string;
  }[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: () => api.get<DashboardData>("/api/dashboard"),
    staleTime: 60_000,
  });

  const coursesInProgress = courses
    .map((course) => {
      const completed = data?.courseProgress[course.id] ?? [];
      const total = course.chapters.length;
      const pct = total ? Math.round((completed.length / total) * 100) : 0;
      return { course, completed: completed.length, total, pct };
    })
    .filter((c) => c.completed > 0)
    .sort((a, b) => b.pct - a.pct);

  const allCoursesStarted = coursesInProgress.length;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-muted-foreground text-sm font-medium mb-1">
            {t.dashboard.subtitle}
          </p>
          <h1 className="text-3xl font-bold font-serif">
            {t.dashboard.greeting}, {user?.displayName?.split(" ")[0]} 👋
          </h1>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Flame className="w-5 h-5 text-orange-500" />}
            iconBg="bg-orange-100 dark:bg-orange-950/30"
            label={t.dashboard.streakLabel}
            value={`${data?.streak ?? 0}`}
            sub={t.dashboard.streakSub}
          />
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-primary" />}
            iconBg="bg-primary/10"
            label={t.dashboard.chaptersLabel}
            value={`${data?.totalCompleted ?? 0}`}
            sub={t.dashboard.chaptersSub}
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-blue-500" />}
            iconBg="bg-blue-100 dark:bg-blue-950/30"
            label={t.dashboard.hoursLabel}
            value={`${data?.estimatedStudyHours ?? 0}h`}
            sub={t.dashboard.hoursSub}
          />
          <StatCard
            icon={<Trophy className="w-5 h-5 text-amber-500" />}
            iconBg="bg-amber-100 dark:bg-amber-950/30"
            label={t.dashboard.coursesLabel}
            value={`${allCoursesStarted}`}
            sub={t.dashboard.coursesSub}
          />
        </div>

        {/* Course progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              {t.dashboard.progressTitle}
            </h2>
            <Link href="/cours">
              <Button variant="ghost" size="sm" className="gap-1">
                {t.dashboard.allCourses} <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {coursesInProgress.length === 0 ? (
            <div className="bg-card border rounded-2xl p-10 text-center shadow-sm">
              <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="font-semibold text-lg mb-1">{t.dashboard.noCoursesTitle}</p>
              <p className="text-muted-foreground text-sm mb-5">{t.dashboard.noCoursesHint}</p>
              <Link href="/cours">
                <Button>{t.dashboard.browseCourses}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {coursesInProgress.map(({ course, completed, total, pct }) => (
                <Link key={course.id} href={`/cours/${course.id}`}>
                  <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                          {course.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {course.subject} · {course.level}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-bold text-primary">{pct}%</span>
                        <p className="text-xs text-muted-foreground">{completed}/{total}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        {data?.recentActivity && data.recentActivity.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-5">{t.dashboard.recentTitle}</h2>
            <div className="bg-card border rounded-2xl shadow-sm divide-y">
              {data.recentActivity.map((a, i) => {
                const course = courses.find((c) => c.id === a.courseId);
                const chapter = course?.chapters.find((ch) => ch.id === a.chapterId);
                const locale = lang === "ht" ? "fr-HT" : "fr-HT";
                const date = new Date(a.completedAt).toLocaleDateString(locale, { day: "numeric", month: "short" });
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{chapter?.title ?? a.chapterId}</p>
                      <p className="text-xs text-muted-foreground">{course?.title ?? a.courseId}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function StatCard({
  icon, iconBg, label, value, sub,
}: {
  icon: React.ReactNode; iconBg: string; label: string; value: string; sub: string;
}) {
  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-0.5">{value}</div>
      <div className="text-xs font-medium text-foreground/80 mb-0.5">{label}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
