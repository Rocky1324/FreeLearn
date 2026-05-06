export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

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
    // Erreur réseau (ex: le serveur n'est pas joignable ou l'URL est mauvaise)
    console.error("Erreur de connexion API:", err);
    throw new ApiError(
      0,
      `Impossible de contacter le serveur. Vérifiez que l'URL de l'API est correcte (${API_BASE_URL})`
    );
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, (data as any).error ?? `Erreur serveur (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T = unknown>(path: string) => request<T>("GET", path),
  post: <T = unknown>(path: string, body: unknown) =>
    request<T>("POST", path, body),
  del: <T = unknown>(path: string) => request<T>("DELETE", path),
};
