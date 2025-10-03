"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { dirFor, localeFor, strings, type Lang } from "@/lib/i18n";

type TStrings = (typeof strings)["en"]; // both languages conform to same shape

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TStrings;
  locale: Intl.LocalesArgument;
};

export const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: strings.en,
  locale: "en-PK",
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // read persisted lang on client
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
      if (saved === "en" || saved === "ur") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      if (typeof window !== "undefined") window.localStorage.setItem("lang", l);
      if (typeof document !== "undefined") {
        document.documentElement.dir = dirFor(l);
        document.documentElement.lang = l;
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = dirFor(lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => strings[lang], [lang]);

  const value: Ctx = useMemo(
    () => ({
      lang,
      setLang,
      t,
      locale: localeFor(lang),
    }),
    [lang, setLang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
