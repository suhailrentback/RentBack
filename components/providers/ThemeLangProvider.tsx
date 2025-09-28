"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ur";
export type Theme = "light" | "dark";

type TLContext = {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  t: {
    english: string;
    urdu: string;
    light: string;
    dark: string;
    signIn: string;
  };
};

const defaultStrings = {
  english: "English",
  urdu: "اردو",
  light: "Light",
  dark: "Dark",
  signIn: "Sign in",
};

const TL = createContext<TLContext | null>(null);

/**
 * Safe hook: returns defaults if used outside provider
 * (prevents “TL missing” during accidental SSR usage).
 */
export function useTL(): TLContext {
  const ctx = useContext(TL);
  if (!ctx) {
    return {
      lang: "en",
      theme: "dark",
      setLang: () => {},
      setTheme: () => {},
      t: defaultStrings,
    };
  }
  return ctx;
}

export function ThemeLangProvider({
  children,
  initialLang = "en",
  initialTheme = "dark",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
  initialTheme?: Theme;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Persist + apply theme to <html>
  useEffect(() => {
    try {
      const savedLang = (localStorage.getItem("rb-lang") as Lang) || initialLang;
      const savedTheme = (localStorage.getItem("rb-theme") as Theme) || initialTheme;
      setLang(savedLang);
      setTheme(savedTheme);
    } catch {}
  }, [initialLang, initialTheme]);

  useEffect(() => {
    try {
      localStorage.setItem("rb-lang", lang);
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("rb-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {}
  }, [theme]);

  const t = useMemo(() => defaultStrings, []);

  const value = useMemo(
    () => ({ lang, theme, setLang, setTheme, t }),
    [lang, theme, t]
  );

  return <TL.Provider value={value}>{children}</TL.Provider>;
}
