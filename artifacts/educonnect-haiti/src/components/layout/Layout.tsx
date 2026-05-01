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
  LogOut,
  User,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lowConnexion, setLowConnexion] = useLocalStorage("connexion-faible", false);
  const [location] = useLocation();
  const { theme, toggle: toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/cours", label: "Cours" },
    { href: "/fiches", label: "Fiches" },
    { href: "/calendrier", label: "Calendrier" },
    { href: "/ecoles", label: "Écoles" },
    { href: "/centres", label: "Centres" },
    { href: "/opportunites", label: "Opportunités" },
    { href: "/orientation", label: "Orientation" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${lowConnexion ? "connexion-faible" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="font-serif font-bold text-xl text-primary hidden sm:inline-block">EduConnect Haïti</span>
            <span className="font-serif font-bold text-xl text-primary sm:hidden">EduConnect</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-4">
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

            {/* Auth buttons — desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated && user ? (
                <>
                  {user.role === "admin" || user.role === "teacher" ? (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <User className="h-4 w-4" />
                        <span className="max-w-[100px] truncate">{user.fullName}</span>
                      </Button>
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 px-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-[100px] truncate">{user.fullName}</span>
                    </span>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/connexion">
                    <Button variant="ghost" size="sm">Se connecter</Button>
                  </Link>
                  <Link href="/inscription">
                    <Button size="sm">S'inscrire</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 text-foreground" onClick={toggleMenu}>
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
              <div className="pt-2 border-t mt-2 space-y-1">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.fullName}
                    </div>
                    {(user.role === "admin" || user.role === "teacher") && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-medium py-2 px-3 rounded-lg block text-muted-foreground hover:bg-muted"
                      >
                        Espace enseignant
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-sm font-medium py-2 px-3 rounded-lg text-destructive hover:bg-destructive/10 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/connexion"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium py-2 px-3 rounded-lg block text-muted-foreground hover:bg-muted flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Se connecter
                    </Link>
                    <Link href="/inscription" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full mt-1">S'inscrire gratuitement</Button>
                    </Link>
                  </>
                )}
              </div>
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
              <BookOpen className="h-6 w-6" />
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
              <li><Link href="/cours">Catalogue de cours</Link></li>
              <li className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /><Link href="/fiches">Fiches de révision</Link></li>
              <li className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><Link href="/calendrier">Calendrier d'étude</Link></li>
              <li><Link href="/ecoles">Carte des écoles</Link></li>
              <li><Link href="/opportunites">Bourses et concours</Link></li>
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
