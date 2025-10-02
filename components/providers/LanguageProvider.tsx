"use client";

import { useEffect, useState } from "react";
import { LangContext, type Lang, dirFor } from "@/lib/i18n";

/**
 * App-wide language provider.
 * Persists to localStorage and updates <html> dir/lang.
 */
export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("rb_lang") as Lang | null;
    return saved === "ur" ? "ur" : "en";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("rb_lang", lang);
    document.documentElement.setAttribute("dir", dirFor(lang));
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
