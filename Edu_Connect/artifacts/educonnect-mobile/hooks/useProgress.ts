import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const KEY = "ch-progress";

export function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => v && setDone(JSON.parse(v)))
      .catch(() => {});
  }, []);

  const persist = useCallback((next: Record<string, boolean>) => {
    setDone(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const isDone = (chapterId: string) => !!done[chapterId];

  const toggle = (chapterId: string) => {
    const next = { ...done, [chapterId]: !done[chapterId] };
    persist(next);
  };

  const courseStats = (chapters: { id: string }[]) => {
    const n = chapters.filter((c) => done[c.id]).length;
    return {
      done: n,
      total: chapters.length,
      pct: chapters.length ? Math.round((n / chapters.length) * 100) : 0,
    };
  };

  return { isDone, toggle, courseStats };
}
