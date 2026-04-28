import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X, Globe, WifiOff, MapPin, GraduationCap, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lowConnexion, setLowConnexion] = useLocalStorage("connexion-faible", false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/cours", label: "Catalogue de Cours" },
    { href: "/orientation", label: "Orientation" },
    { href: "/opportunites", label: "Opportunités" },
    { href: "/centres", label: "Centres Relais" },
    { href: "/ecoles", label: "Écoles" },
    { href: "/admin", label: "Espace Enseignant" },
    { href: "/a-propos", label: "À Propos" },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${lowConnexion ? 'connexion-faible' : ''}`}>
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
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              <Globe className="h-3 w-3 mr-1" />
              <span>Hors-ligne dispo</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-foreground" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-b bg-background">
            <div className="container py-4 flex flex-col space-y-4 px-4 mx-auto">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

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
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2"/> Cité Soleil</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2"/> Bel-Air</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2"/> Martissant</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2"/> Plateau Central</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">Ressources</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="/cours">Catalogue de cours</Link></li>
              <li><Link href="/opportunites">Bourses et concours</Link></li>
              <li><Link href="/centres">Centres relais</Link></li>
              <li><Link href="/admin">Espace enseignant</Link></li>
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