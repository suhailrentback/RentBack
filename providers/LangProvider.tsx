"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { dirFor, strings, type Lang, localeFor } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof strings["en"];
  locale: Intl.LocalesArgument;
};

export const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: strings.en,
  locale: "en-PK",
});

const STORAGE_KEY = "rb.lang";

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const fromStore = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (fromStore === "en" || fromStore === "ur") return fromStore;
    // light auto-detect on first load
    const nav = typeof navigator !== "undefined" ? navigator.language : "en";
    return nav?.toLowerCase().startsWith("ur") ? "ur" : "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  // Keep <html> in sync so layout flips and a11y/lang attributes are correct
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.setAttribute("dir", dirFor(lang));
    html.setAttribute("lang", lang);
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    return {
      lang,
      setLang,
      t: strings[lang],
      locale: localeFor(lang),
    };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
