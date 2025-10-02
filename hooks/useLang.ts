"use client";

import { useContext } from "react";
import { LangContext } from "@/providers/LangProvider";

export function useLang() {
  // Provides: lang, setLang, t (strings[lang]), locale
  return useContext(LangContext);
}
