"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import en from "../../messages/en.json";
import tr from "../../messages/tr.json";

/* ── Types ─────────────────────────────────────────────────────── */
export type Language = "en" | "tr";
export type Messages = typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  messages: Messages;
  isReady: boolean;
}

/* ── Dictionaries ───────────────────────────────────────────────── */
const dictionaries: Record<Language, Messages> = { en, tr };

/* ── Context ────────────────────────────────────────────────────── */
const LanguageContext = createContext<LanguageContextType | null>(null);

/* ── Provider ───────────────────────────────────────────────────── */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [isReady, setIsReady] = useState(false);

  /* Read from localStorage on mount (client only) */
  useEffect(() => {
    const stored = localStorage.getItem("portfolio_lang") as Language | null;
    if (stored === "en" || stored === "tr") {
      setLangState(stored);
    }
    setIsReady(true);
  }, []);

  /* Persist to localStorage on change */
  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio_lang", newLang);
    /* Update <html lang> for a11y */
    document.documentElement.lang = newLang;
  }, []);

  /**
   * t("hero.title") — resolves dot-path in current language dictionary.
   * Handles nested objects AND array indices (e.g. "about.stats.0.value").
   * Returns the key itself if the path is not found.
   */
  const t = useCallback(
    (key: string): string => {
      const segments = key.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let node: any = dictionaries[lang];
      for (const seg of segments) {
        if (node == null || typeof node !== "object") return key;
        node = node[seg];
      }
      return typeof node === "string" ? node : key;
    },
    [lang]
  );

  const messages = dictionaries[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, messages, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ── Hook ───────────────────────────────────────────────────────── */
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
