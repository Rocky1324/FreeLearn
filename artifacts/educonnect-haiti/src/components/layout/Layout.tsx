import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Menu,
  X,
  WifiOff,
  Wifi,
  MapPin,
  Moon,
  Sun,
  Layers,
  Calendar,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  GraduationCap,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useOnlineStatus } from "@/hooks/use-online-status";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [lowConnexion, setLowConnexion] = useLocalStorage("connexion-faible", false);
  const [location] = useLocation();
  const { theme, toggle: toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t, toggle: toggleLang } = useLanguage();
  const isOnline = useOnlineStatus();
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setShowReconnected(false);
    } else if (wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const primaryLinks = [
    { href: "/", label: t.nav.home },
    { href: "/cours", label: t.nav.courses },
    { href: "/fiches", label: t.nav.flashcards },
    { href: "/annales", label: t.nav.annales },
    { href: "/forum", label: t.nav.forum },
  ];

  const secondaryLinks = [
    { href: "/calendrier", label: t.nav.calendar },
    { href: "/orientation", label: t.nav.orientation },
    { href: "/opportunites", label: t.nav.opportunities },
    { href: "/ecoles", label: t.nav.schools },
    { href: "/centres", label: t.nav.centers },
    { href: "/espace-hors-ligne", label: t.nav.offlineSpace },
    ...(user?.role === "teacher" ? [{ href: "/admin", label: t.nav.teacher }] : []),
  ];

  const allMobileLinks = [...primaryLinks, ...secondaryLinks];

  const isSecondaryActive = secondaryLinks.some((l) => l.href === location);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <div className={`min-h-screen flex flex-col ${lowConnexion ? "connexion-faible" : ""}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="overflow-hidden rounded-lg">
              <img src="/Logo.jpeg" alt="FreeLearn Logo" className="h-9 w-9 object-cover" />
            </div>
            <span className="font-serif font-bold text-xl text-primary hidden sm:inline-block">FreeLearn</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-muted ${
                  location === link.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* "Plus" dropdown */}
            <div ref={moreMenuRef} className="relative">
              <button
                onClick={() => setMoreMenuOpen((v) => !v)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-muted ${
                  isSecondaryActive ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                Plus
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-52 bg-card border rounded-xl shadow-lg z-40 py-1 overflow-hidden">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                        location === link.href ? "text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      {link.label}
                      {location === link.href && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-1">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors text-xs font-semibold text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
              title="Changer de langue / Chanje lang"
            >
              {t.langToggle}
            </button>

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
                  <span className="max-w-[90px] truncate">{user.displayName.split(" ")[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border rounded-xl shadow-lg z-40 py-1 overflow-hidden">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm truncate">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        {user.role === "teacher" && (
                          <span className="inline-flex mt-1 items-center text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                            <GraduationCap className="w-3 h-3 mr-1" />
                            {t.nav.teacher}
                          </span>
                        )}
                      </div>
                      <Link
                        href="/tableau-de-bord"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                        {t.nav.dashboard}
                      </Link>
                      <Link
                        href="/forum"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        {t.nav.forum}
                      </Link>
                      {user.role === "teacher" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          {t.nav.teacherSpace}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        {t.nav.logout}
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
            <div className="container py-4 flex flex-col space-y-1 px-4 mx-auto max-h-[75vh] overflow-y-auto">
              {allMobileLinks.map((link) => (
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
              <button
                onClick={() => { toggleLang(); setIsMenuOpen(false); }}
                className="text-left text-sm font-medium py-2 px-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                🌐 {t.langToggle}
              </button>
              {user && (
                <div className="pt-2 mt-1 border-t space-y-1">
                  <Link
                    href="/tableau-de-bord"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {t.nav.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-destructive hover:bg-muted transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {t.nav.logout} ({user.displayName.split(" ")[0]})
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Offline / Reconnected banner */}
      <AnimatePresence>
        {(!isOnline || showReconnected) && (
          <motion.div
            key={isOnline ? "reconnected" : "offline"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden z-40 relative"
          >
            <div
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium ${
                !isOnline
                  ? "bg-amber-50 border-b border-amber-200 text-amber-800"
                  : "bg-green-50 border-b border-green-200 text-green-800"
              }`}
            >
              {!isOnline ? (
                <>
                  <WifiOff className="w-4 h-4 shrink-0" />
                  <span>
                    Pas de connexion — Seul votre{" "}
                    <Link href="/espace-hors-ligne" className="underline font-semibold hover:opacity-80">
                      espace hors-ligne
                    </Link>{" "}
                    est disponible.
                  </span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 shrink-0" />
                  <span>Connexion rétablie !</span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <footer className="bg-primary text-primary-foreground py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Logo.jpeg" alt="FreeLearn Logo" className="h-8 w-8 object-cover rounded" />
              <span className="font-serif font-bold text-xl">FreeLearn</span>
            </div>
            <p className="text-primary-foreground/80 max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/60 pt-4">
              <button
                onClick={() => setLowConnexion(!lowConnexion)}
                className="flex items-center hover:text-white transition-colors"
              >
                <WifiOff className="h-4 w-4 mr-2" />
                {t.footer.lowConnexion} {lowConnexion ? t.footer.lowConnexionOn : t.footer.lowConnexionOff}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">{t.footer.zones}</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Cité Soleil</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Bel-Air</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Martissant</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Plateau Central</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">{t.footer.resources}</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="/cours">{t.footer.courseCatalog}</Link></li>
              <li className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /><Link href="/fiches">{t.footer.flashcards}</Link></li>
              <li className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><Link href="/calendrier">{t.footer.studyCalendar}</Link></li>
              <li><Link href="/annales">{t.nav.annales}</Link></li>
              <li><Link href="/opportunites">{t.footer.opportunities}</Link></li>
              <li className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /><Link href="/forum">{t.nav.forum}</Link></li>
              <li className="flex items-center gap-1.5"><LayoutDashboard className="h-3.5 w-3.5" /><Link href="/tableau-de-bord">{t.nav.dashboard}</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-primary-foreground/60">
          <span>© {new Date().getFullYear()} FreeLearn. {t.footer.copyright}</span>
          <div className="flex items-center gap-4">
            <Link href="/politique-de-confidentialite" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
              Politique de confidentialité
            </Link>
            <Link href="/conditions-utilisation" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
