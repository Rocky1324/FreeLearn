import { useState, useEffect, useCallback } from "react";
import { downloadsApi } from "@/lib/api";

export function useDownloads() {
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    downloadsApi
      .getAll()
      .then(({ downloaded: d }) => setDownloaded(d))
      .catch(() => setDownloaded({}))
      .finally(() => setIsLoading(false));
  }, []);

  const isDownloaded = useCallback(
    (courseId: string) => !!downloaded[courseId],
    [downloaded],
  );

  const markDownloaded = useCallback(async (courseId: string) => {
    setDownloaded((d) => ({ ...d, [courseId]: true }));
    try {
      await downloadsApi.add(courseId);
    } catch {
      setDownloaded((d) => ({ ...d, [courseId]: false }));
    }
  }, []);

  const removeDownload = useCallback(async (courseId: string) => {
    setDownloaded((d) => ({ ...d, [courseId]: false }));
    try {
      await downloadsApi.remove(courseId);
    } catch {
      setDownloaded((d) => ({ ...d, [courseId]: true }));
    }
  }, []);

  return { isDownloaded, markDownloaded, removeDownload, isLoading };
}
