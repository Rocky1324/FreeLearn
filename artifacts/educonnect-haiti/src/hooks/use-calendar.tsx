import { useState, useEffect, useCallback } from "react";
import { calendarApi, type CalendarSession } from "@/lib/api";

export type CalendarData = Record<string, CalendarSession[]>;

export function useCalendar() {
  const [data, setData] = useState<CalendarData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    calendarApi
      .getAll()
      .then(({ data: d }) => setData(d))
      .catch(() => setData({}))
      .finally(() => setIsLoading(false));
  }, []);

  const addSession = useCallback(
    async (date: string, courseId: string, durationMinutes: number) => {
      const { session } = await calendarApi.add(date, courseId, durationMinutes);
      setData((d) => ({
        ...d,
        [date]: [...(d[date] ?? []), { id: session.id, courseId, durationMinutes }],
      }));
    },
    [],
  );

  const removeSession = useCallback(async (date: string, sessionId: number) => {
    setData((d) => ({
      ...d,
      [date]: (d[date] ?? []).filter((s) => s.id !== sessionId),
    }));
    try {
      await calendarApi.remove(sessionId);
    } catch {
      const { data: fresh } = await calendarApi.getAll();
      setData(fresh);
    }
  }, []);

  return { data, addSession, removeSession, isLoading };
}
