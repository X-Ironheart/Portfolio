"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { soundManager } from "@/utils/soundManager";

export type ThemeMode = "MONOCHROME" | "QUIET_MIST";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isQuietMist: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "MONOCHROME",
  toggleTheme: () => {},
  isQuietMist: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>("MONOCHROME");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme_mode") as ThemeMode | null;
    if (saved === "QUIET_MIST" || saved === "MONOCHROME") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio_theme_mode", theme);
    const root = document.documentElement;
    if (theme === "QUIET_MIST") {
      root.classList.add("theme-quiet-mist");
    } else {
      root.classList.remove("theme-quiet-mist");
    }
  }, [theme]);

  const toggleTheme = () => {
    soundManager.playConfirm();
    setTheme((prev) => (prev === "MONOCHROME" ? "QUIET_MIST" : "MONOCHROME"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isQuietMist: theme === "QUIET_MIST" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
