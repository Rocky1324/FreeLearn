import { createContext, useContext, useState, useCallback } from "react";
import { fr, ht, type Translations } from "@/i18n";

type Lang = "fr" | "ht";

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "freelearn-lang";

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ht" || stored === "fr") return stored;
  } catch {}
  return "fr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "fr" ? "ht" : "fr");
  }, [lang, setLang]);

  const t: Translations = lang === "ht" ? ht : fr;

  return (
    <LanguageContext.Provider value={{ lang, t, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
