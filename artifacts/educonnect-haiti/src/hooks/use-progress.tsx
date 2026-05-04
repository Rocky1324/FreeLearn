import { useEffect, useState, useCallback } from "react";
import { progressApi } from "@/lib/api";
import { useAuth } from "./use-auth";

export function useProgress() {
  const { user } = useAuth();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setDone({}); setLoaded(true); return; }
    try {
      const { done } = await progressApi.getAll();
      setDone(done);
    } catch {
      setDone({});
    } finally {
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const isDone = (chapterId: string) => !!done[chapterId];

  const toggle = async (chapterId: string, courseId: string) => {
    const current = !!done[chapterId];
    setDone((d) => ({ ...d, [chapterId]: !current }));
    try {
      const { done: newDone } = await progressApi.toggle(chapterId, courseId);
      setDone((d) => ({ ...d, [chapterId]: newDone }));
    } catch {
      setDone((d) => ({ ...d, [chapterId]: current }));
    }
  };

  const courseStats = (chapters: { id: string }[]) => {
    const n = chapters.filter((c) => done[c.id]).length;
    return {
      done: n,
      total: chapters.length,
      pct: chapters.length ? Math.round((n / chapters.length) * 100) : 0,
    };
  };

  return { isDone, toggle, courseStats, done, loaded };
}
