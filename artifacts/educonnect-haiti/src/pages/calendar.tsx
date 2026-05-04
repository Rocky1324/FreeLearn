import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, X, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { courses } from "@/data/courses";

type Session = { courseId: string; duration: number };
type CalendarData = { [dateKey: string]: Session[] };

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const SUBJECT_COLORS: Record<string, string> = {
  Français: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Mathématiques: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "Sciences Naturelles": "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  Histoire: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Dissertation: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

function getColor(subject: string) {
  return SUBJECT_COLORS[subject] ?? "bg-primary/10 text-primary dark:bg-primary/20";
}

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [addCourseId, setAddCourseId] = useState(courses[0]?.id ?? "");
  const [addDuration, setAddDuration] = useState(30);
  const [data, setData] = useLocalStorage<CalendarData>("study-calendar", {});

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert to Mon-first: Sun=6, Mon=0, ...
  const startOffset = (firstDay + 6) % 7;

  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };

  const addSession = () => {
    if (!selected || !addCourseId) return;
    setData((d) => ({
      ...d,
      [selected]: [...(d[selected] ?? []), { courseId: addCourseId, duration: addDuration }],
    }));
  };

  const removeSession = (key: string, idx: number) => {
    setData((d) => {
      const sessions = [...(d[key] ?? [])];
      sessions.splice(idx, 1);
      return { ...d, [key]: sessions };
    });
  };

  const totalThisMonth = Object.entries(data)
    .filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .reduce((acc, [, sessions]) => acc + sessions.reduce((a, s) => a + s.duration, 0), 0);

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Layout>
      <div className="bg-muted/30 py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-4xl font-bold font-serif">Calendrier d'étude</h1>
          </div>
          <p className="text-muted-foreground">Planifie tes sessions de révision et suis ton rythme de travail.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar */}
          <div className="flex-1">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold font-serif">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const key = dateKey(year, month, day);
                const sessions = data[key] ?? [];
                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();
                const isSelected = selected === key;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(isSelected ? null : key)}
                    className={`min-h-[72px] p-1.5 rounded-xl border text-left transition-all flex flex-col ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : isToday
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-muted/40 bg-card"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {sessions.slice(0, 2).map((s, si) => {
                        const c = courses.find((c) => c.id === s.courseId);
                        return (
                          <span
                            key={si}
                            className={`text-[10px] px-1.5 py-0.5 rounded font-medium truncate ${getColor(c?.subject ?? "")}`}
                          >
                            {c?.subject ?? "Cours"}
                          </span>
                        );
                      })}
                      {sessions.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{sessions.length - 2}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Monthly stats */}
            <div className="mt-6 p-4 bg-muted/40 rounded-xl border flex items-center gap-4">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold">{MONTHS[month]} {year}</p>
                <p className="text-sm text-muted-foreground">
                  Total planifié : <span className="font-bold text-primary">{totalThisMonth} min</span>
                  {totalThisMonth >= 60 && ` (${Math.floor(totalThisMonth / 60)}h${totalThisMonth % 60 > 0 ? (totalThisMonth % 60) + "min" : ""})`}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar — selected day */}
          <div className="w-full lg:w-80 shrink-0">
            {selected ? (
              <div className="bg-card border rounded-2xl p-6 space-y-5 sticky top-20">
                <h3 className="font-bold text-lg">
                  {new Date(selected + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </h3>

                {/* Existing sessions */}
                <div className="space-y-2">
                  {(data[selected] ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucune session planifiée.</p>
                  ) : (
                    (data[selected] ?? []).map((s, idx) => {
                      const c = courses.find((c) => c.id === s.courseId);
                      return (
                        <div key={idx} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${getColor(c?.subject ?? "")}`}>
                          <div>
                            <p className="font-semibold truncate max-w-[160px]">{c?.title ?? "Cours"}</p>
                            <p className="text-xs opacity-80">{s.duration} min</p>
                          </div>
                          <button onClick={() => removeSession(selected, idx)} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Add session */}
                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-semibold">Ajouter une session</p>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium">Cours</label>
                    <select
                      className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
                      value={addCourseId}
                      onChange={(e) => setAddCourseId(e.target.value)}
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.subject} — {c.level}</option>
                      ))}
                    </select>
                    <label className="text-xs text-muted-foreground font-medium">Durée</label>
                    <div className="flex gap-2 flex-wrap">
                      {[15, 30, 45, 60, 90].map((d) => (
                        <button
                          key={d}
                          onClick={() => setAddDuration(d)}
                          className={`px-3 py-1 text-sm rounded-full border transition-all ${
                            addDuration === d ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                          }`}
                        >
                          {d} min
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" onClick={addSession}>
                    <Plus className="w-4 h-4 mr-2" /> Ajouter
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border border-dashed rounded-2xl p-8 text-center text-muted-foreground">
                <Calendar className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Clique sur un jour pour planifier ou voir tes sessions d'étude.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
