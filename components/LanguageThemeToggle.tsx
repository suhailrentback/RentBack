// components/LanguageThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { strings, type Lang, dirFor } from "@/lib/i18n";

export default function LanguageThemeToggle() {
  const [lang, setLang] = useState<Lang>(() =>
    typeof window !== "undefined" && localStorage.getItem("demo-lang") === "ur" ? "ur" : "en"
  );
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined" && localStorage.getItem("demo-theme") === "dark"
  );
  const t = strings[lang];

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = dirFor(lang);
    }
    localStorage.setItem("demo-lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("demo-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang((v) => (v === "en" ? "ur" : "en"))}
        className="px-2 py-1 text-xs rounded-lg border border-black/10 dark:border-white/10"
        title="Toggle language"
      >
        {lang === "en" ? t.toggles.urdu : t.toggles.english}
      </button>
      <button
        onClick={() => setDark((d) => !d)}
        className="px-2 py-1 text-xs rounded-lg border border-black/10 dark:border-white/10"
        title="Toggle theme"
      >
        {dark ? t.toggles.light : t.toggles.dark}
      </button>
    </div>
  );
}
