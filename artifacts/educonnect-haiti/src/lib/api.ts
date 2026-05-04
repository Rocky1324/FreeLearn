const API_BASE = "/api";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorMessage = "Une erreur est survenue";
    try {
      const data = await res.json();
      errorMessage = data.error ?? errorMessage;
    } catch {
      // ignore
    }
    throw new ApiError(errorMessage, res.status);
  }

  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type SafeUser = {
  id: number;
  email: string;
  fullName: string;
  role: "student" | "teacher" | "admin";
  isVerified: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
};

export const authApi = {
  register: (data: { email: string; password: string; fullName: string }) =>
    request<{ user: SafeUser }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<{ user: SafeUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request<{ message: string }>("/auth/logout", { method: "POST" }),

  me: () => request<{ user: SafeUser }>("/auth/me"),

  refresh: () =>
    request<{ user: SafeUser }>("/auth/refresh", { method: "POST" }),
};

export const progressApi = {
  getAll: () => request<{ done: Record<string, boolean> }>("/progress"),

  toggle: (chapterId: string, courseId: string) =>
    request<{ done: boolean }>(`/progress/${encodeURIComponent(chapterId)}`, {
      method: "POST",
      body: JSON.stringify({ courseId }),
    }),
};

export type CalendarSession = {
  id: number;
  courseId: string;
  durationMinutes: number;
};

export const calendarApi = {
  getAll: () =>
    request<{ data: Record<string, CalendarSession[]> }>("/calendar"),

  add: (date: string, courseId: string, durationMinutes: number) =>
    request<{ session: CalendarSession & { date: string } }>("/calendar", {
      method: "POST",
      body: JSON.stringify({ date, courseId, durationMinutes }),
    }),

  remove: (sessionId: number) =>
    request<{ message: string }>(`/calendar/${sessionId}`, {
      method: "DELETE",
    }),
};

export const downloadsApi = {
  getAll: () =>
    request<{ downloaded: Record<string, boolean> }>("/downloads"),

  add: (courseId: string) =>
    request<{ downloaded: boolean }>(`/downloads/${encodeURIComponent(courseId)}`, {
      method: "POST",
    }),

  remove: (courseId: string) =>
    request<{ downloaded: boolean }>(`/downloads/${encodeURIComponent(courseId)}`, {
      method: "DELETE",
    }),
};
