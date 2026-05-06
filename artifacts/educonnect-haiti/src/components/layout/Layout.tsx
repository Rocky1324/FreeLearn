import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Menu,
  X,
  Globe,
  WifiOff,
  MapPin,
  Moon,
  Sun,
  Layers,
  Calendar,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [lowConnexion, setLowConnexion] = useLocalStorage("connexion-faible", false);
  const [location] = useLocation();
  const { theme, toggle: toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/cours", label: "Cours" },
    { href: "/fiches", label: "Fiches" },
    { href: "/calendrier", label: "Calendrier" },
    { href: "/orientation", label: "Orientation" },
    { href: "/opportunites", label: "Opportunités" },
    { href: "/ecoles", label: "Écoles" },
    { href: "/centres", label: "Centres" },
    ...(user?.role === "teacher" ? [{ href: "/admin", label: "Enseignants" }] : []),
  ];

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <div className={`min-h-screen flex flex-col ${lowConnexion ? "connexion-faible" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="overflow-hidden rounded-lg">
              <img src="/Logo.jpeg" alt="FreeLearn Logo" className="h-9 w-9 object-cover" />
            </div>
            <span className="font-serif font-bold text-xl text-primary hidden sm:inline-block">FreeLearn</span>
            <span className="font-serif font-bold text-xl text-primary sm:hidden">FreeLearn</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User menu (desktop) */}
            {user && (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.displayName.split(" ")[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border rounded-xl shadow-lg z-40 py-1 overflow-hidden">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm truncate">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        {user.role === "teacher" && (
                          <span className="inline-flex mt-1 items-center text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                            <GraduationCap className="w-3 h-3 mr-1" />
                            Enseignant
                          </span>
                        )}
                      </div>
                      <Link
                        href="/tableau-de-bord"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                        Tableau de bord
                      </Link>
                      {user.role === "teacher" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          Espace enseignant
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden border-b bg-background">
            <div className="container py-4 flex flex-col space-y-1 px-4 mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile user section */}
              {user && (
                <div className="pt-2 mt-1 border-t space-y-1">
                  <Link
                    href="/tableau-de-bord"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Tableau de bord
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-destructive hover:bg-muted transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion ({user.displayName.split(" ")[0]})
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Logo.jpeg" alt="FreeLearn Logo" className="h-8 w-8 object-cover rounded" />
              <span className="font-serif font-bold text-xl">FreeLearn</span>
            </div>
            <p className="text-primary-foreground/80 max-w-sm">
              Donner à chaque jeune haïtien les mêmes chances de réussir grâce à une éducation accessible, moderne et ancrée dans notre réalité.
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/60 pt-4">
              <button
                onClick={() => setLowConnexion(!lowConnexion)}
                className="flex items-center hover:text-white transition-colors"
              >
                <WifiOff className="h-4 w-4 mr-2" />
                Mode connexion faible {lowConnexion ? "(Activé)" : "(Désactivé)"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">Zones Desservies</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Cité Soleil</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Bel-Air</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Martissant</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Plateau Central</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">Ressources</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="/cours">Catalogue de cours</Link></li>
              <li className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /><Link href="/fiches">Fiches de révision</Link></li>
              <li className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><Link href="/calendrier">Calendrier d'étude</Link></li>
              <li><Link href="/opportunites">Bourses et concours</Link></li>
              <li className="flex items-center gap-1.5"><LayoutDashboard className="h-3.5 w-3.5" /><Link href="/tableau-de-bord">Tableau de bord</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} FreeLearn. Fièrement construit pour la jeunesse.
        </div>
      </footer>
    </div>
  );
}
