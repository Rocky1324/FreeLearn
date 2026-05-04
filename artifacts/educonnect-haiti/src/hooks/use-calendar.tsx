import { useEffect, useState, useCallback } from "react";
import { calendarApi } from "@/lib/api";
import { useAuth } from "./use-auth";

export type CalendarData = Record<string, { id: number; courseId: string; durationMinutes: number }[]>;

export function useCalendar() {
  const { user } = useAuth();
  const [data, setData] = useState<CalendarData>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setData({}); setLoaded(true); return; }
    try {
      const { data } = await calendarApi.getAll();
      setData(data);
    } catch {
      setData({});
    } finally {
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const addSession = async (date: string, courseId: string, durationMinutes: number) => {
    const { session } = await calendarApi.add({ date, courseId, durationMinutes });
    setData((prev) => {
      const next = { ...prev };
      if (!next[date]) next[date] = [];
      next[date] = [...next[date], { id: session.id, courseId, durationMinutes }];
      return next;
    });
    return session;
  };

  const removeSession = async (date: string, sessionId: number) => {
    await calendarApi.remove(sessionId);
    setData((prev) => {
      const next = { ...prev };
      if (next[date]) {
        next[date] = next[date].filter((s) => s.id !== sessionId);
        if (next[date].length === 0) delete next[date];
      }
      return next;
    });
  };

  const totalMinutes = Object.values(data).flat().reduce((sum, s) => sum + s.durationMinutes, 0);

  const streak = (() => {
    const dates = Object.keys(data).sort().reverse();
    if (!dates.length) return 0;
    let count = 0;
    const today = new Date();
    for (let i = 0; i < dates.length; i++) {
      const d = new Date(dates[i] + "T12:00:00");
      const diffDays = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === i || diffDays === i + 1) count++;
      else break;
    }
    return count;
  })();

  return { data, loaded, addSession, removeSession, totalMinutes, streak };
}
