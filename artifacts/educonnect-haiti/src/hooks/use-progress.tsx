import { useState, useEffect, useCallback } from "react";
import { progressApi } from "@/lib/api";

export function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    progressApi
      .getAll()
      .then(({ done: d }) => setDone(d))
      .catch(() => setDone({}))
      .finally(() => setIsLoading(false));
  }, []);

  const isDone = useCallback(
    (chapterId: string) => !!done[chapterId],
    [done],
  );

  const toggle = useCallback(async (chapterId: string, courseId: string) => {
    const prev = !!done[chapterId];
    setDone((d) => ({ ...d, [chapterId]: !prev }));
    try {
      const { done: newDone } = await progressApi.toggle(chapterId, courseId);
      setDone((d) => ({ ...d, [chapterId]: newDone }));
    } catch {
      setDone((d) => ({ ...d, [chapterId]: prev }));
    }
  }, [done]);

  const courseStats = useCallback(
    (chapters: { id: string }[]) => {
      const n = chapters.filter((c) => done[c.id]).length;
      return {
        done: n,
        total: chapters.length,
        pct: chapters.length ? Math.round((n / chapters.length) * 100) : 0,
      };
    },
    [done],
  );

  return { isDone, toggle, courseStats, isLoading };
}
