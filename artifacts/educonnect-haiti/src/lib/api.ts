const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const authApi = {
  register: (data: { email: string; password: string; fullName: string }) =>
    apiFetch<{ user: User }>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    apiFetch<{ user: User }>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  logout: () => apiFetch<{ message: string }>("/auth/logout", { method: "POST" }),
  me: () => apiFetch<{ user: User }>("/auth/me"),
  refresh: () => apiFetch<{ user: User }>("/auth/refresh", { method: "POST" }),
};

export const progressApi = {
  getAll: () => apiFetch<{ done: Record<string, boolean> }>("/progress"),
  toggle: (chapterId: string, courseId: string) =>
    apiFetch<{ done: boolean }>(`/progress/${chapterId}`, {
      method: "POST",
      body: JSON.stringify({ courseId }),
    }),
};

export const calendarApi = {
  getAll: () => apiFetch<{ data: Record<string, { id: number; courseId: string; durationMinutes: number }[]> }>("/calendar"),
  add: (data: { date: string; courseId: string; durationMinutes: number }) =>
    apiFetch<{ session: CalendarSession }>("/calendar", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  remove: (sessionId: number) =>
    apiFetch<{ message: string }>(`/calendar/${sessionId}`, { method: "DELETE" }),
};

export const downloadsApi = {
  getAll: () => apiFetch<{ downloaded: Record<string, boolean> }>("/downloads"),
  add: (courseId: string) =>
    apiFetch<{ downloaded: boolean }>(`/downloads/${courseId}`, { method: "POST" }),
  remove: (courseId: string) =>
    apiFetch<{ downloaded: boolean }>(`/downloads/${courseId}`, { method: "DELETE" }),
};

export const videosApi = {
  getAll: () => apiFetch<{ videos: Record<string, string> }>("/videos"),
  set: (chapterId: string, youtubeUrl: string, adminKey?: string) =>
    apiFetch<{ chapterId: string; youtubeId: string }>(`/videos/${chapterId}`, {
      method: "PUT",
      body: JSON.stringify({ youtubeUrl }),
      headers: adminKey ? { "Content-Type": "application/json", "x-admin-key": adminKey } : undefined,
    }),
  remove: (chapterId: string, adminKey?: string) =>
    apiFetch<{ message: string }>(`/videos/${chapterId}`, {
      method: "DELETE",
      headers: adminKey ? { "Content-Type": "application/json", "x-admin-key": adminKey } : undefined,
    }),
};

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  isVerified: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarSession {
  id: number;
  userId: number;
  date: string;
  courseId: string;
  durationMinutes: number;
  createdAt: string;
}
