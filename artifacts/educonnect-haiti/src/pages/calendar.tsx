import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, X, Clock, Bell, RefreshCw, Play, Square, CheckCircle2, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useLanguage } from "@/hooks/use-language";
import { useGoogleCalendar, GoogleCalendarEvent } from "@/hooks/use-google";
import { api } from "@/lib/api";
import { toast } from "sonner";

type Session = { subject: string; duration: number; completed?: boolean };
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

const SESSION_COLORS = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
];

function getSessionColor(subject: string) {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) hash = subject.charCodeAt(i) + ((hash << 5) - hash);
  return SESSION_COLORS[Math.abs(hash) % SESSION_COLORS.length];
}

function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function getEventsForDate(key: string): AcademicEvent[] {
  return ACADEMIC_EVENTS.filter(e => e.date === key);
}

function getEventsForMonth(y: number, m: number): AcademicEvent[] {
  const prefix = `${y}-${String(m + 1).padStart(2, "0")}`;
  return ACADEMIC_EVENTS.filter(e => e.date.startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date));
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface TimerModalProps {
  session: Session;
  dateKey: string;
  onClose: () => void;
  onComplete: (completedMinutes: number) => void;
}

function TimerModal({ session, onClose, onComplete }: TimerModalProps) {
  const totalSeconds = session.duration * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAt = useRef<number>(Date.now());
  const elapsedOnStop = useRef<number>(0);

  const start = useCallback(() => {
    startedAt.current = Date.now();
    setRunning(true);
    setStopped(false);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    setStopped(true);
    elapsedOnStop.current = Math.round((totalSeconds - secondsLeft) / 60);
  }, [secondsLeft, totalSeconds]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setStopped(true);
          onComplete(session.duration);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running, session.duration, onComplete]);

  const pct = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);
  const isDone = secondsLeft === 0;

  const handleFinishEarly = () => {
    const elapsed = Math.max(1, Math.round((totalSeconds - secondsLeft) / 60));
    onComplete(elapsed);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border rounded-2xl p-8 w-full max-w-sm shadow-xl text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSessionColor(session.subject)}`}>
            {session.subject}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-6">{session.duration} min planifiées</p>

        <div className="relative w-36 h-36 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke="currentColor" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
              className={isDone ? "text-green-500" : "text-primary"}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold tabular-nums ${isDone ? "text-green-500" : ""}`}>
              {formatTime(secondsLeft)}
            </span>
            {!isDone && <span className="text-xs text-muted-foreground mt-1">{pct}%</span>}
          </div>
        </div>

        {isDone ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              Session terminée !
            </div>
            <Button className="w-full" onClick={onClose}>Fermer</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {!running && !stopped ? (
              <Button className="w-full" onClick={start}>
                <Play className="w-4 h-4 mr-2" /> Démarrer
              </Button>
            ) : running ? (
              <Button variant="outline" className="w-full" onClick={stop}>
                <Square className="w-4 h-4 mr-2" /> Arrêter
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button className="flex-1" onClick={start}>
                  <Play className="w-4 h-4 mr-2" /> Reprendre
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleFinishEarly}>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Terminer
                </Button>
              </div>
            )}
            {(running || stopped) && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={handleFinishEarly}>
                Marquer comme terminé maintenant
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { t } = useLanguage();
  const { syncAcademicEvents, addStudySession, fetchGoogleEvents, syncing, loadingEvents } = useGoogleCalendar();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [addSubject, setAddSubject] = useState("");
  const [addDuration, setAddDuration] = useState(30);
  const [data, setData] = useLocalStorage<CalendarData>("study-calendar-v2", {});
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [activeTimer, setActiveTimer] = useState<{ dateKey: string; idx: number } | null>(null);

  const DAYS = t.calendar.days;
  const MONTHS = t.calendar.months;

  useEffect(() => {
    fetchGoogleEvents().then(setGoogleEvents);
  }, [fetchGoogleEvents]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay + 6) % 7;

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const getGoogleEventsForDate = (key: string): GoogleCalendarEvent[] => {
    return googleEvents.filter(ev => {
      const d = ev.start?.date || ev.start?.dateTime?.split("T")[0];
      return d === key;
    });
  };

  const hasGoogleEventsForDate = (key: string) => getGoogleEventsForDate(key).length > 0;

  const addSession = async () => {
    if (!selected || !addSubject.trim()) return;
    const subject = addSubject.trim();
    setData(d => ({ ...d, [selected]: [...(d[selected] ?? []), { subject, duration: addDuration }] }));
    setAddSubject("");

    try {
      await addStudySession(
        `[FreeLearn] Révision — ${subject}`,
        `Session de révision de ${addDuration} min`,
        selected,
        selected,
      );
    } catch {
      // silently ignore — Google not connected
    }
  };

  const removeSession = (key: string, idx: number) => {
    setData(d => {
      const sessions = [...(d[key] ?? [])];
      sessions.splice(idx, 1);
      return { ...d, [key]: sessions };
    });
  };

  const handleTimerComplete = async (dateKey: string, idx: number, completedMinutes: number) => {
    const session = data[dateKey]?.[idx];
    if (!session) return;

    setData(d => {
      const sessions = [...(d[dateKey] ?? [])];
      sessions[idx] = { ...sessions[idx], completed: true };
      return { ...d, [dateKey]: sessions };
    });

    try {
      await api.post("/api/sessions", {
        subject: session.subject,
        plannedMinutes: session.duration,
        completedMinutes,
      });
      toast.success(`Session "${session.subject}" enregistrée — ${completedMinutes} min complétées !`);
    } catch {
      toast.error("Impossible d'enregistrer la session.");
    }

    setActiveTimer(null);
  };

  const handleSyncAllToGoogle = async () => {
    const todayStr = today.toISOString().split("T")[0];
    const futureEvents = ACADEMIC_EVENTS.filter(e => e.date >= todayStr);
    try {
      await syncAcademicEvents(futureEvents);
      const updated = await fetchGoogleEvents();
      setGoogleEvents(updated);
    } catch {
      // already toasted in hook
    }
  };

  const totalThisMonth = Object.entries(data)
    .filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .reduce((acc, [, sessions]) => acc + sessions.reduce((a, s) => a + s.duration, 0), 0);

  const monthEvents = getEventsForMonth(year, month);
  const selectedAcademicEvents = selected ? getEventsForDate(selected) : [];
  const selectedGoogleEvents = selected ? getGoogleEventsForDate(selected) : [];

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Layout>
      {activeTimer && data[activeTimer.dateKey]?.[activeTimer.idx] && (
        <TimerModal
          session={data[activeTimer.dateKey][activeTimer.idx]}
          dateKey={activeTimer.dateKey}
          onClose={() => setActiveTimer(null)}
          onComplete={(mins) => handleTimerComplete(activeTimer.dateKey, activeTimer.idx, mins)}
        />
      )}

      <div className="bg-muted/30 py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-bold font-serif">{t.calendar.title}</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncAllToGoogle}
              disabled={syncing || loadingEvents}
              className="flex items-center gap-2 text-sm"
            >
              {syncing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              Sync Google Calendar
            </Button>
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
                const hasGoogle = hasGoogleEventsForDate(key);
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
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                      }`}>
                        {day}
                      </span>
                      {hasGoogle && (
                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" title="Événement Google" />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {events.slice(0, 1).map((ev, ei) => (
                        <span key={ei} className={`text-[9px] px-1 py-0.5 rounded font-bold truncate border ${EVENT_STYLES[ev.type]}`}>
                          {ev.title.length > 14 ? ev.title.slice(0, 13) + "…" : ev.title}
                        </span>
                      ))}
                      {sessions.slice(0, events.length >= 1 ? 1 : 2).map((s, si) => (
                        <span key={si} className={`text-[10px] px-1.5 py-0.5 rounded font-medium truncate ${getSessionColor(s.subject)} ${s.completed ? "opacity-60 line-through" : ""}`}>
                          {s.subject.length > 12 ? s.subject.slice(0, 11) + "…" : s.subject}
                        </span>
                      ))}
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
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span className="text-muted-foreground">Google Calendar</span>
                  </div>
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

                {selectedAcademicEvents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Événements officiels</p>
                    {selectedAcademicEvents.map((ev, i) => (
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

                {selectedGoogleEvents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google Calendar
                    </p>
                    {selectedGoogleEvents.map((ev, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-blue-50 border border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200">
                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{ev.summary ?? "Événement"}</p>
                          {ev.start?.dateTime && (
                            <p className="text-xs opacity-70">
                              {new Date(ev.start.dateTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          )}
                        </div>
                        <ExternalLink className="w-3 h-3 opacity-50 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  {(selectedAcademicEvents.length > 0 || selectedGoogleEvents.length > 0) && (
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Mes sessions</p>
                  )}
                  {(data[selected] ?? []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.calendar.noSession}</p>
                  ) : (
                    (data[selected] ?? []).map((s, idx) => (
                      <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${getSessionColor(s.subject)} ${s.completed ? "opacity-60" : ""}`}>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold truncate max-w-[130px] ${s.completed ? "line-through" : ""}`}>{s.subject}</p>
                          <p className="text-xs opacity-80">
                            {s.duration} min{s.completed && " · ✓ Complétée"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {!s.completed && (
                            <button
                              onClick={() => setActiveTimer({ dateKey: selected, idx })}
                              className="p-1 rounded hover:bg-black/10 transition-colors"
                              title="Démarrer le timer"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => removeSession(selected, idx)}
                            className="p-1 rounded hover:bg-black/10 transition-colors opacity-60 hover:opacity-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-semibold">{t.calendar.addSession}</p>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-medium">Matière / Sujet</label>
                    <Input
                      placeholder="ex: Mathématiques, Histoire, Anglais…"
                      value={addSubject}
                      onChange={(e) => setAddSubject(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") addSession(); }}
                    />
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
                  <Button className="w-full" onClick={addSession} disabled={!addSubject.trim()}>
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

                <div className="bg-card border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <p className="font-bold text-sm">Google Calendar</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Synchronisez les événements scolaires et importez vos événements Google dans l'app.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={handleSyncAllToGoogle}
                    disabled={syncing || loadingEvents}
                  >
                    {syncing || loadingEvents ? (
                      <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3 h-3 mr-1.5" />
                    )}
                    {loadingEvents ? "Chargement…" : "Synchroniser"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
