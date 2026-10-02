"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { soundManager } from "@/utils/soundManager";

export type LanguageMode = "EN" | "AR";

interface LanguageContextType {
  language: LanguageMode;
  toggleLanguage: () => void;
  setLanguage: (lang: LanguageMode) => void;
  isArabic: boolean;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  toggleLanguage: () => {},
  setLanguage: () => {},
  isArabic: false,
  dir: "ltr",
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageMode>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_language") as LanguageMode | null;
    if (saved === "AR" || saved === "EN") {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio_language", language);
    const root = document.documentElement;
    root.lang = language.toLowerCase();
    root.dir = language === "AR" ? "rtl" : "ltr";
    if (language === "AR") {
      root.classList.add("lang-ar");
    } else {
      root.classList.remove("lang-ar");
    }
  }, [language]);

  const toggleLanguage = () => {
    soundManager.playTick(950);
    setLanguageState((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const setLanguage = (lang: LanguageMode) => {
    soundManager.playTick(950);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        isArabic: language === "AR",
        dir: language === "AR" ? "rtl" : "ltr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
