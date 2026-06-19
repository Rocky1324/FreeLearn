export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function request<T = unknown>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body !== undefined ? { "Content-Type": "application/json" } : {},
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  } catch (err) {
    console.error("Erreur de connexion API:", err);
    throw new ApiError(0, "Pas de connexion internet. Vérifiez votre réseau et réessayez.");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, (data as any).error ?? "Une erreur est survenue. Réessayez.");
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.error("Réponse non-JSON reçue. Type:", contentType, "URL:", `${API_BASE_URL}${path}`);
    throw new ApiError(0, "Une erreur est survenue. Réessayez.");
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T = unknown>(path: string) => request<T>("GET", path),
  post: <T = unknown>(path: string, body: unknown) =>
    request<T>("POST", path, body),
  patch: <T = unknown>(path: string, body: unknown) =>
    request<T>("PATCH", path, body),
  del: <T = unknown>(path: string) => request<T>("DELETE", path),
};
