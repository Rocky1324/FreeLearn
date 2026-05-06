import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface ProgressRow {
  chapterId: string;
  courseId: string;
}

export function useProgress() {
  const queryClient = useQueryClient();

  const { data: rows = [] } = useQuery<ProgressRow[]>({
    queryKey: ["progress"],
    queryFn: () => api.get<ProgressRow[]>("/api/progress"),
    staleTime: 30_000,
  });

  const doneSet = new Set(rows.map((r) => r.chapterId));

  const mutation = useMutation({
    mutationFn: ({
      chapterId,
      courseId,
      done,
    }: {
      chapterId: string;
      courseId: string;
      done: boolean;
    }) => api.post("/api/progress/chapter", { chapterId, courseId, done }),
    onMutate: async ({ chapterId, courseId, done }) => {
      await queryClient.cancelQueries({ queryKey: ["progress"] });
      const prev = queryClient.getQueryData<ProgressRow[]>(["progress"]);
      queryClient.setQueryData<ProgressRow[]>(["progress"], (old = []) =>
        done
          ? [...old, { chapterId, courseId }]
          : old.filter((r) => r.chapterId !== chapterId),
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev !== undefined)
        queryClient.setQueryData(["progress"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const isDone = (chapterId: string) => doneSet.has(chapterId);

  const toggle = (chapterId: string, courseId: string) => {
    mutation.mutate({ chapterId, courseId, done: !doneSet.has(chapterId) });
  };

  const courseStats = (chapters: { id: string }[]) => {
    const n = chapters.filter((c) => doneSet.has(c.id)).length;
    return {
      done: n,
      total: chapters.length,
      pct: chapters.length ? Math.round((n / chapters.length) * 100) : 0,
    };
  };

  return { isDone, toggle, courseStats };
}
