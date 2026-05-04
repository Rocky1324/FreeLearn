import { useEffect, useState, useCallback } from "react";
import { downloadsApi } from "@/lib/api";
import { useAuth } from "./use-auth";

export function useDownloads() {
  const { user } = useAuth();
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setDownloaded({}); setLoaded(true); return; }
    try {
      const { downloaded } = await downloadsApi.getAll();
      setDownloaded(downloaded);
    } catch {
      setDownloaded({});
    } finally {
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const isDownloaded = (courseId: string) => !!downloaded[courseId];

  const toggle = async (courseId: string) => {
    const current = !!downloaded[courseId];
    setDownloaded((d) => ({ ...d, [courseId]: !current }));
    try {
      if (current) {
        await downloadsApi.remove(courseId);
        setDownloaded((d) => ({ ...d, [courseId]: false }));
      } else {
        await downloadsApi.add(courseId);
        setDownloaded((d) => ({ ...d, [courseId]: true }));
      }
    } catch {
      setDownloaded((d) => ({ ...d, [courseId]: current }));
    }
  };

  return { isDownloaded, toggle, downloaded, loaded };
}
