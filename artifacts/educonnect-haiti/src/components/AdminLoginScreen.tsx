import { useState, FormEvent } from "react";
import { Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onLogin: (password: string) => Promise<void> | void;
  error: boolean;
  loading: boolean;
}

export function AdminLoginScreen({ onLogin, error, loading }: Props) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim()) onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden shadow-sm mb-2 border">
            <img src="/Logo.jpeg" alt="EduConnect Haïti Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold font-serif">EduConnect Haïti</h1>
          <p className="text-muted-foreground text-sm">Espace Enseignant</p>
        </div>

        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground border-b pb-4">
            <Lock className="w-4 h-4" />
            Accès réservé aux enseignants
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mot de passe</label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className={`pr-10 ${error ? "border-red-500 focus-visible:ring-red-400" : ""}`}
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  Mot de passe incorrect. Veuillez réessayer.
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!password.trim() || loading}
            >
              {loading ? "Vérification…" : "Accéder à l'Espace Enseignant"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Vous n'êtes pas enseignant ?{" "}
          <a href="/" className="text-primary hover:underline">
            Retour à l'accueil
          </a>
        </p>
      </div>
    </div>
  );
}
