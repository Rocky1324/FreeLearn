import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { ApiError } from "@/lib/api";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: "Faible", color: "bg-destructive" };
  if (score <= 4) return { score, label: "Moyen", color: "bg-yellow-500" };
  return { score, label: "Fort", color: "bg-green-500" };
}

const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: "Au moins 8 caractères" },
  { test: (p: string) => /[A-Z]/.test(p), label: "Une majuscule" },
  { test: (p: string) => /[a-z]/.test(p), label: "Une minuscule" },
  { test: (p: string) => /[0-9]/.test(p), label: "Un chiffre" },
];

export default function Register() {
  const [, navigate] = useLocation();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const strengthBars = Math.ceil((strength.score / 6) * 4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!PASSWORD_RULES.every((r) => r.test(password))) {
      setError("Le mot de passe ne respecte pas les exigences de sécurité");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, fullName.trim());
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-12">
        <Link href="/" className="flex items-center space-x-3">
          <div className="bg-primary-foreground/20 p-2 rounded-xl">
            <BookOpen className="h-7 w-7" />
          </div>
          <span className="font-serif font-bold text-2xl">EduConnect Haïti</span>
        </Link>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif leading-snug">
            Rejoignez des milliers d'étudiants qui apprennent avec EduConnect
          </h2>
          <ul className="space-y-3 text-primary-foreground/80">
            {[
              "Cours gratuits en mathématiques, sciences, français et plus",
              "Fiches de révision pour les examens officiels",
              "Carte des écoles et centres d'apprentissage",
              "Accès hors connexion disponible",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-primary-foreground/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-primary-foreground/50 text-sm">
          Inscription gratuite · Aucune carte bancaire requise
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center space-x-2 mb-8">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="font-serif font-bold text-xl text-primary">EduConnect Haïti</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-serif text-foreground">Créer un compte</h1>
            <p className="text-muted-foreground">
              Déjà inscrit ?{" "}
              <Link href="/connexion" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                Nom complet
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jean-Baptiste Pierre"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Adresse e-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Créez un mot de passe sécurisé"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          bar <= strengthBars ? strength.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Force :{" "}
                    <span
                      className={
                        strength.score <= 2
                          ? "text-destructive"
                          : strength.score <= 4
                            ? "text-yellow-600"
                            : "text-green-600"
                      }
                    >
                      {strength.label}
                    </span>
                  </p>
                  <ul className="grid grid-cols-2 gap-1">
                    {PASSWORD_RULES.map((rule) => (
                      <li key={rule.label} className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2
                          className={`h-3.5 w-3.5 ${
                            rule.test(password) ? "text-green-500" : "text-muted-foreground/50"
                          }`}
                        />
                        <span
                          className={
                            rule.test(password) ? "text-foreground" : "text-muted-foreground"
                          }
                        >
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création du compte…
                </>
              ) : (
                "Créer mon compte gratuitement"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              En vous inscrivant, vous acceptez nos conditions d'utilisation. Vos données sont protégées.
            </p>
          </form>

          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
