// providers/LangProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { strings, type Lang, dirFor, localeFor } from "@/lib/i18n";

// Use a single compatible type for both locales to avoid literal-type conflicts
type TStrings = typeof strings.en & typeof strings.ur;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TStrings;
  locale: Intl.LocalesArgument;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<Ctx | null>(null);

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const fromLS = window.localStorage.getItem("rb_lang");
    return fromLS === "ur" || fromLS === "en" ? (fromLS as Lang) : "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rb_lang", lang);
      document.documentElement.setAttribute("dir", dirFor(lang));
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const t = strings[lang] as unknown as TStrings; // safe: both locales share the same shape
    return {
      lang,
      setLang,
      t,
      locale: localeFor(lang),
      dir: dirFor(lang),
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
