import { useState } from "react";

const SESSION_KEY = "educonnect_admin_session";
// SHA-256 hash of "S1G42026"
const CORRECT_HASH = "c618b41d4f77ca24f95a5325b3c0db8a5f1159e43aaad1f7cb9525ee5656c751";

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (password: string) => {
    setLoading(true);
    setError(false);
    try {
      const hash = await sha256(password);
      if (hash === CORRECT_HASH) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setAuthed(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return { authed, login, logout, error, loading };
}
