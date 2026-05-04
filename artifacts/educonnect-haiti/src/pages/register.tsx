import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Eye, EyeOff, Check, X } from "lucide-react";

function PwRule({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`flex items-center gap-1 text-xs ${ok ? "text-green-600" : "text-muted-foreground"}`}>
      {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} {label}
    </span>
  );
}

export default function Register() {
  const { register } = useAuth();
  const [, navigate] = useLocation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
  };
  const pwOk = Object.values(rules).every(Boolean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwOk) { setError("Le mot de passe ne respecte pas les critères."); return; }
    setError("");
    setLoading(true);
    try {
      await register(email, password, fullName);
      navigate("/cours");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/Logo.jpeg" alt="Logo" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-serif font-bold text-2xl text-primary">EduConnect Haïti</span>
          </Link>
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-muted-foreground mt-1">Commencez votre parcours d'apprentissage</p>
        </div>

        <form onSubmit={submit} className="space-y-4 bg-card border rounded-2xl p-6 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Nom complet</label>
            <Input
              type="text"
              placeholder="Marie Dupont"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Mot de passe</label>
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {password && (
              <div className="grid grid-cols-2 gap-1 mt-2">
                <PwRule ok={rules.length} label="8 caractères min." />
                <PwRule ok={rules.upper} label="Une majuscule" />
                <PwRule ok={rules.lower} label="Une minuscule" />
                <PwRule ok={rules.digit} label="Un chiffre" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading || !pwOk}>
            {loading ? "Création…" : "Créer mon compte"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="text-primary hover:underline font-medium">
            Se connecter
          </Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Retour à l'accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
