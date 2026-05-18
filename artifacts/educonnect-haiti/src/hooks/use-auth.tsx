import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api, ApiError } from "@/lib/api";

export interface AuthUser {
  id: number;
  email: string;
  displayName: string;
  role: "student" | "teacher";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    displayName: string,
    password: string,
    teacherCode?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // On initialise avec l'utilisateur stocké localement s'il existe
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("educonnect_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AuthUser>("/api/auth/me")
      .then((userData) => {
        setUser(userData);
        localStorage.setItem("educonnect_user", JSON.stringify(userData));
      })
      .catch(() => {
        // En cas d'erreur (ex: hors ligne), on garde l'utilisateur local s'il existe
        // On ne le supprime que si le serveur confirme explicitement (401)
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.post<{ user: AuthUser }>("/api/auth/login", {
      email,
      password,
    });
    setUser(data.user);
    localStorage.setItem("educonnect_user", JSON.stringify(data.user));
  };

  const register = async (
    email: string,
    displayName: string,
    password: string,
    teacherCode?: string,
  ) => {
    const data = await api.post<{ user: AuthUser }>("/api/auth/register", {
      email,
      displayName,
      password,
      teacherCode,
    });
    setUser(data.user);
    localStorage.setItem("educonnect_user", JSON.stringify(data.user));
  };

  const logout = async () => {
    await api.post("/api/auth/logout", {}).catch(() => {});
    setUser(null);
    localStorage.removeItem("educonnect_user");
  };

  const deleteAccount = async () => {
    await api.del("/api/auth/account");
    setUser(null);
    localStorage.removeItem("educonnect_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
