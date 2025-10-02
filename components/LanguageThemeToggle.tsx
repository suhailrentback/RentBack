// components/ThemeLangToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { strings, type Lang } from "@/lib/i18n";

export default function ThemeLangToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Lang>("en");

  const t = strings[lang];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
  }, [theme, lang]);

  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        className={`px-2 py-1 rounded ${theme === "light" ? "bg-black/10 dark:bg-white/10" : ""}`}
        onClick={() => setTheme("light")}
      >
        {t.toggles.light}
      </button>
      <button
        className={`px-2 py-1 rounded ${theme === "dark" ? "bg-black/10 dark:bg-white/10" : ""}`}
        onClick={() => setTheme("dark")}
      >
        {t.toggles.dark}
      </button>
      <span className="mx-1 opacity-40">|</span>
      <button
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-black/10 dark:bg_WHITE/10" : ""}`}
        onClick={() => setLang("en")}
      >
        {t.toggles.english}
      </button>
      <button
        className={`px-2 py-1 rounded ${lang === "ur" ? "bg-black/10 dark:bg_WHITE/10" : ""}`}
        onClick={() => setLang("ur")}
      >
        {t.toggles.urdu}
      </button>
    </div>
  );
}
