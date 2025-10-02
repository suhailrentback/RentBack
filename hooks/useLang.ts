"use client";

import { useContext } from "react";
import { LangContext } from "@/lib/i18n";

export function useLang() {
  return useContext(LangContext); // { lang, setLang }
}
