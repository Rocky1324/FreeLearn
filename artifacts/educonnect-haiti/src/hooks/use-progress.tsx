import { useLocalStorage } from "./use-local-storage";

export function useProgress() {
  const [done, setDone] = useLocalStorage<Record<string, boolean>>("ch-progress", {});

  const isDone = (chapterId: string) => !!done[chapterId];

  const toggle = (chapterId: string) =>
    setDone((d) => ({ ...d, [chapterId]: !d[chapterId] }));

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
