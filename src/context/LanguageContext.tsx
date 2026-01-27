"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translateText } from "@/services/translate.service";
import { Language } from "@/types/language";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("EN");

  // persist language
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language;
    if (storedLang) setLanguage(storedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const translate = async (text: string) => {
    const target = language.toLowerCase(); // EN → en
    return translateText(text, target);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
const translationCache = new Map<string, string>();

export async function cachedTranslate(text: string, lang: string, translateFn: any) {
  const key = `${lang}:${text}`;

  if (translationCache.has(key)) {
    return translationCache.get(key)!;
  }

  const result = await translateFn(text);
  translationCache.set(key, result);
  return result;
}
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
