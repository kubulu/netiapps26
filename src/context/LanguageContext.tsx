"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translateText } from "@/services/translate.service";

type Language = "en" | "ta" | "hi" | "fr";

interface ContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
}

const LanguageContext = createContext<ContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("site_lang") as Language;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("site_lang", lang);
    setLanguageState(lang);
  };

  const translate = async (text: string) => {
    const cacheKey = `${language}_${text}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;

    const translated = await translateText(text, language);
    localStorage.setItem(cacheKey, translated);
    return translated;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
