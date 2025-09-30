"use client";
import { useEffect, useState } from "react";

type Theme = "light"|"dark";
type Lang = "en"|"ur";

export default function TopRightToggles() {
  const [theme, setTheme] = useState<Theme>((process.env.NEXT_PUBLIC_DEFAULT_THEME === "light" ? "light" : "dark"));
  const [lang, setLang] = useState<Lang>((process.env.NEXT_PUBLIC_DEFAULT_LANG === "ur" ? "ur" : "en"));

  // hydrate from localStorage
  useEffect(() => {
    try {
      const t = (localStorage.getItem("rb-theme") as Theme) || theme;
      const l = (localStorage.getItem("rb-lang") as Lang) || lang;
      setTheme(t);
      setLang(l);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // apply to <html> + persist
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("rb-theme", theme);
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [theme, lang]);

  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
      <button
        onClick={() => setLang(l => (l === "en" ? "ur" : "en"))}
        className="px-3 py-2 text-xs rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur hover:bg-black/5 dark:hover:bg-white/10"
        aria-label="Toggle language"
      >
        {lang === "en" ? "اردو" : "EN"}
      </button>
      <button
        onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        className="px-3 py-2 text-xs rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur hover:bg-black/5 dark:hover:bg-white/10"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
