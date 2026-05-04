import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X, Globe, WifiOff, MapPin, Moon, Sun, Layers, Calendar, BarChart2, LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lowConnexion, setLowConnexion] = useLocalStorage("connexion-faible", false);
  const [location] = useLocation();
  const { theme, toggle: toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const authedLinks = [
    { href: "/cours", label: "Cours" },
    { href: "/progression", label: "Progression" },
    { href: "/fiches", label: "Fiches" },
    { href: "/calendrier", label: "Calendrier" },
    { href: "/orientation", label: "Orientation" },
    { href: "/opportunites", label: "Opportunités" },
    { href: "/centres", label: "Centres" },
  ];

  const publicLinks = [
    { href: "/a-propos", label: "À propos" },
  ];

  const navLinks = user ? authedLinks : publicLinks;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${lowConnexion ? "connexion-faible" : ""}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Link href={user ? "/cours" : "/"} className="flex items-center space-x-2">
            <div className="overflow-hidden rounded-lg">
              <img src="/Logo.jpeg" alt="EduConnect Haïti Logo" className="h-9 w-9 object-cover" />
            </div>
            <span className="font-serif font-bold text-xl text-primary hidden sm:inline-block">EduConnect Haïti</span>
            <span className="font-serif font-bold text-xl text-primary sm:hidden">EduConnect</span>
          </Link>

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
            {user?.role === "teacher" || user?.role === "admin" ? (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === "/admin" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Enseignants
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">{user.fullName.split(" ")[0]}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/connexion">
                  <Button variant="ghost" size="sm">Se connecter</Button>
                </Link>
                <Link href="/inscription">
                  <Button size="sm">S'inscrire</Button>
                </Link>
              </div>
            )}

            <button className="lg:hidden p-2 text-foreground" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

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
              {(user?.role === "teacher" || user?.role === "admin") && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location === "/admin" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Espace Enseignant
                </Link>
              )}
              <div className="pt-2 border-t mt-2">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-lg text-muted-foreground hover:bg-muted w-full"
                  >
                    <LogOut className="h-4 w-4" /> Déconnexion ({user.fullName.split(" ")[0]})
                  </button>
                ) : (
                  <>
                    <Link href="/connexion" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-lg text-muted-foreground hover:bg-muted">
                      <LogIn className="h-4 w-4" /> Se connecter
                    </Link>
                    <Link href="/inscription" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-lg text-muted-foreground hover:bg-muted">
                      <UserPlus className="h-4 w-4" /> S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-primary text-primary-foreground py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Logo.jpeg" alt="EduConnect Haïti Logo" className="h-8 w-8 object-cover rounded" />
              <span className="font-serif font-bold text-xl">EduConnect Haïti</span>
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
              {user && (
                <>
                  <li className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /><Link href="/cours">Catalogue de cours</Link></li>
                  <li className="flex items-center gap-1.5"><BarChart2 className="h-3.5 w-3.5" /><Link href="/progression">Ma progression</Link></li>
                  <li className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /><Link href="/fiches">Fiches de révision</Link></li>
                  <li className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><Link href="/calendrier">Calendrier d'étude</Link></li>
                </>
              )}
              <li><Link href="/opportunites">Bourses et concours</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} EduConnect Haïti. Fièrement construit pour la jeunesse.
        </div>
      </footer>
    </div>
  );
}
