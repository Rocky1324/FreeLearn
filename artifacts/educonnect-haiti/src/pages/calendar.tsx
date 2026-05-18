import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, X, Clock, Bell } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { courses } from "@/data/courses";
import { useLanguage } from "@/hooks/use-language";

type Session = { courseId: string; duration: number };
type CalendarData = { [dateKey: string]: Session[] };

interface AcademicEvent {
  date: string;
  title: string;
  type: "exam" | "holiday" | "start" | "end" | "deadline";
}

const ACADEMIC_EVENTS: AcademicEvent[] = [
  { date: "2025-09-08", title: "Rentrée scolaire 2025-2026", type: "start" },
  { date: "2025-10-17", title: "Fête de la Dessalinienne", type: "holiday" },
  { date: "2025-11-01", title: "Fête de la Toussaint", type: "holiday" },
  { date: "2025-11-18", title: "Jour de la Vertières", type: "holiday" },
  { date: "2025-12-05", title: "Jour de la Découverte", type: "holiday" },
  { date: "2025-12-22", title: "Début des vacances de Noël", type: "holiday" },
  { date: "2026-01-01", title: "Fête de l'Indépendance (1er janv.)", type: "holiday" },
  { date: "2026-01-02", title: "Fête des Ancêtres", type: "holiday" },
  { date: "2026-01-07", title: "Reprise des cours", type: "start" },
  { date: "2026-02-16", title: "Début du Carnaval", type: "holiday" },
  { date: "2026-02-18", title: "Fin du Carnaval", type: "holiday" },
  { date: "2026-03-02", title: "Lundi Gras", type: "holiday" },
  { date: "2026-03-16", title: "Début des révisions bac blanc", type: "exam" },
  { date: "2026-03-27", title: "Vendredi Saint", type: "holiday" },
  { date: "2026-04-14", title: "Fin du 2e trimestre", type: "end" },
  { date: "2026-04-14", title: "Début vacances de Pâques", type: "holiday" },
  { date: "2026-04-27", title: "Reprise des cours (3e trimestre)", type: "start" },
  { date: "2026-05-01", title: "Fête du Travail", type: "holiday" },
  { date: "2026-05-18", title: "Fête du Drapeau et de l'Université", type: "holiday" },
  { date: "2026-06-01", title: "Début des révisions examens d'État", type: "exam" },
  { date: "2026-06-15", title: "Examens d'État — 9ème AF", type: "exam" },
  { date: "2026-06-22", title: "Examens BAC — Rhétorique", type: "exam" },
  { date: "2026-06-29", title: "Examens BAC — Philo / NS", type: "exam" },
  { date: "2026-07-15", title: "Clôture de l'année scolaire", type: "end" },
  { date: "2026-08-15", title: "Assomption", type: "holiday" },
];

const EVENT_STYLES: Record<AcademicEvent["type"], string> = {
  exam: "bg-red-100 text-red-800 border-red-200",
  holiday: "bg-amber-100 text-amber-800 border-amber-200",
  start: "bg-green-100 text-green-800 border-green-200",
  end: "bg-blue-100 text-blue-800 border-blue-200",
  deadline: "bg-purple-100 text-purple-800 border-purple-200",
};

const EVENT_DOT: Record<AcademicEvent["type"], string> = {
  exam: "bg-red-500",
  holiday: "bg-amber-500",
  start: "bg-green-500",
  end: "bg-blue-500",
  deadline: "bg-purple-500",
};

const EVENT_LABEL: Record<AcademicEvent["type"], string> = {
  exam: "Examen",
  holiday: "Congé",
  start: "Début",
  end: "Fin",
  deadline: "Date limite",
};

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

function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function getEventsForDate(key: string): AcademicEvent[] {
  return ACADEMIC_EVENTS.filter(e => e.date === key);
}

function getEventsForMonth(y: number, m: number): AcademicEvent[] {
  const prefix = `${y}-${String(m + 1).padStart(2, "0")}`;
  return ACADEMIC_EVENTS.filter(e => e.date.startsWith(prefix))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export default function CalendarPage() {
  const { t } = useLanguage();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [addCourseId, setAddCourseId] = useState(courses[0]?.id ?? "");
  const [addDuration, setAddDuration] = useState(30);
  const [data, setData] = useLocalStorage<CalendarData>("study-calendar", {});

  const DAYS = t.calendar.days;
  const MONTHS = t.calendar.months;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay + 6) % 7;

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const addSession = () => {
    if (!selected || !addCourseId) return;
    setData(d => ({ ...d, [selected]: [...(d[selected] ?? []), { courseId: addCourseId, duration: addDuration }] }));
  };

  const removeSession = (key: string, idx: number) => {
    setData(d => { const sessions = [...(d[key] ?? [])]; sessions.splice(idx, 1); return { ...d, [key]: sessions }; });
  };

  const totalThisMonth = Object.entries(data)
    .filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .reduce((acc, [, sessions]) => acc + sessions.reduce((a, s) => a + s.duration, 0), 0);

  const monthEvents = getEventsForMonth(year, month);
  const selectedEvents = selected ? getEventsForDate(selected) : [];

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Layout>
      <div className="bg-muted/30 py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-4xl font-bold font-serif">{t.calendar.title}</h1>
          </div>
          <p className="text-muted-foreground">{t.calendar.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold font-serif">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const key = dateKey(year, month, day);
                const sessions = data[key] ?? [];
                const events = getEventsForDate(key);
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const isSelected = selected === key;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(isSelected ? null : key)}
                    className={`min-h-[72px] p-1.5 rounded-xl border text-left transition-all flex flex-col ${
                      isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : isToday ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-muted/40 bg-card"
                    }`}
                  >
                    <span className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                    }`}>
                      {day}
                    </span>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {events.slice(0, 1).map((ev, ei) => (
                        <span key={ei} className={`text-[9px] px-1 py-0.5 rounded font-bold truncate border ${EVENT_STYLES[ev.type]}`}>
                          {ev.title.length > 14 ? ev.title.slice(0, 13) + "…" : ev.title}
                        </span>
                      ))}
                      {sessions.slice(0, events.length >= 1 ? 1 : 2).map((s, si) => {
                        const c = courses.find((c) => c.id === s.courseId);
                        return (
                          <span key={si} className={`text-[10px] px-1.5 py-0.5 rounded font-medium truncate ${getColor(c?.subject ?? "")}`}>
                            {c?.subject ?? "Cours"}
                          </span>
                        );
                      })}
                      {sessions.length + events.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">+{sessions.length + events.length - 3}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-muted/40 rounded-xl border flex items-center gap-4">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold">{MONTHS[month]} {year}</p>
                <p className="text-sm text-muted-foreground">
                  {t.calendar.totalPlanned} <span className="font-bold text-primary">{totalThisMonth} min</span>
                  {totalThisMonth >= 60 && ` (${Math.floor(totalThisMonth / 60)}h${totalThisMonth % 60 > 0 ? (totalThisMonth % 60) + "min" : ""})`}
                </p>
              </div>
            </div>

            {monthEvents.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-base">Événements scolaires — {MONTHS[month]}</h3>
                </div>
                <div className="space-y-2">
                  {monthEvents.map((ev, i) => {
                    const d = new Date(ev.date + "T12:00");
                    const dayNum = d.getDate();
                    return (
                      <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${EVENT_STYLES[ev.type]}`}>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${EVENT_DOT[ev.type]}`} />
                        <span className="font-bold w-8 shrink-0">{dayNum}</span>
                        <span className="flex-1 font-medium">{ev.title}</span>
                        <span className="text-xs font-bold uppercase opacity-70 shrink-0">{EVENT_LABEL[ev.type]}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  {(["exam", "holiday", "start", "end"] as const).map(type => (
                    <div key={type} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${EVENT_DOT[type]}`} />
                      <span className="text-muted-foreground">{EVENT_LABEL[type]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            {selected ? (
              <div className="bg-card border rounded-2xl p-6 space-y-5 sticky top-20">
                <h3 className="font-bold text-lg">
                  {new Date(selected + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </h3>

                {selectedEvents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Événements officiels</p>
                    {selectedEvents.map((ev, i) => (
                      <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${EVENT_STYLES[ev.type]}`}>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${EVENT_DOT[ev.type]}`} />
                        <div className="flex-1">
                          <p className="font-semibold">{ev.title}</p>
                          <p className="text-xs opacity-70">{EVENT_LABEL[ev.type]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  {selectedEvents.length > 0 && (
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Mes sessions</p>
                  )}
                  {(data[selected] ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.calendar.noSession}</p>
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

                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-semibold">{t.calendar.addSession}</p>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium">{t.calendar.course}</label>
                    <select
                      className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
                      value={addCourseId}
                      onChange={(e) => setAddCourseId(e.target.value)}
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.subject} — {c.level}</option>
                      ))}
                    </select>
                    <label className="text-xs text-muted-foreground font-medium">{t.calendar.duration}</label>
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
                    <Plus className="w-4 h-4 mr-2" /> {t.calendar.add}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/30 border border-dashed rounded-2xl p-8 text-center text-muted-foreground">
                  <Calendar className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">{t.calendar.clickDay}</p>
                </div>

                <div className="bg-card border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-primary" />
                    <p className="font-bold text-sm">Prochain événement</p>
                  </div>
                  {(() => {
                    const todayStr = today.toISOString().split("T")[0];
                    const next = ACADEMIC_EVENTS.find(e => e.date >= todayStr);
                    if (!next) return <p className="text-sm text-muted-foreground">Aucun événement à venir.</p>;
                    const d = new Date(next.date + "T12:00");
                    const diffDays = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <div className={`px-4 py-3 rounded-xl border text-sm ${EVENT_STYLES[next.type]}`}>
                        <p className="font-bold">{next.title}</p>
                        <p className="text-xs mt-1 opacity-80">
                          {d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                          {diffDays === 0 ? " — Aujourd'hui !" : diffDays === 1 ? " — Demain" : ` — Dans ${diffDays} jours`}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
