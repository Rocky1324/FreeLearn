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
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AuthUser>("/api/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.post<{ user: AuthUser }>("/api/auth/login", {
      email,
      password,
    });
    setUser(data.user);
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
  };

  const logout = async () => {
    await api.post("/api/auth/logout", {}).catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
