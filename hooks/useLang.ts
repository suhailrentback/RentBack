"use client";

import { useContext } from "react";
import { LangContext } from "@/lib/i18n";

/**
 * Custom hook to access current language (en/ur).
 */
export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  return { lang, setLang };
}
