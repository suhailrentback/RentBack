"use client";

import { useContext } from "react";
import { LangContext } from "@/providers/LangProvider";

export function useLang() {
  return useContext(LangContext);
}
