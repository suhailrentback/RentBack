"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type TL = {
  lang: "en" | "ur";
  theme: "light" | "dark";
  setLang: (l: "en" | "ur") => void;
  setTheme: (t: "light" | "dark") => void;
};
const TLContext = createContext<TL | null>(null);
export const useTL = () => {
  const ctx = useContext(TLContext);
  if (!ctx) throw new Error("useTL must be used inside MobileAppShell");
  return ctx;
};

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  // theme/lang persisted on <html> + cookie (so server comps can read)
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [lang, setLangState] = useState<"en" | "ur">("en");

  useEffect(() => {
    try {
      const t = localStorage.getItem("rb-theme");
      const l = localStorage.getItem("rb-lang");
      if (t === "light" || t === "dark") setThemeState(t);
      if (l === "en" || l === "ur") setLangState(l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("rb-theme", theme);
      localStorage.setItem("rb-lang", lang);
      // set simple cookies so Server Components can read via cookies()
      document.cookie = `rb-lang=${lang}; Path=/; Max-Age=31536000`;
      document.cookie = `rb-theme=${theme}; Path=/; Max-Age=31536000`;
    } catch {}
  }, [theme, lang]);

  const setLang = (l: "en" | "ur") => {
    setLangState(l);
    // refresh server comps if current page is a server route
    router.refresh();
  };
  const setTheme = (t: "light" | "dark") => setThemeState(t);

  const items = [
    { href: "/tenant", icon: "🏠", label: { en: "Home", ur: "ہوم" } },
    { href: "/tenant/pay", icon: "💸", label: { en: "Pay", ur: "ادائیگی" } },
    { href: "/tenant/rewards", icon: "🎁", label: { en: "Rewards", ur: "ریوارڈز" } },
    { href: "/tenant/profile", icon: "👤", label: { en: "Profile", ur: "پروفائل" } },
  ];

  const ctx = useMemo<TL>(() => ({ lang, theme, setLang, setTheme }), [lang, theme]);

  return (
    <TLContext.Provider value={ctx}>
      <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
        {/* top-right mini toggles (unchanged UI) */}
        <div className="fixed top-3 right-3 z-50 flex gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className="h-10 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur hover:bg-black/5 dark:hover:bg-white/10 text-sm"
            aria-label="toggle language"
          >
            {lang === "en" ? "اردو" : "English"}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-10 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur hover:bg-black/5 dark:hover:bg-white/10 text-sm"
            aria-label="toggle theme"
          >
            {theme === "dark" ? (lang === "ur" ? "لائٹ" : "Light") : (lang === "ur" ? "ڈارک" : "Dark")}
          </button>
        </div>

        {/* page content */}
        <div className="pb-20 pt-2">{children}</div>

        {/* bottom nav */}
        <nav className="fixed bottom-0 inset-x-0 h-16 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30">
          {/* Demo pill */}
<div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-3">
  <span className="rounded-full bg-emerald-600 text-white text-[10px] px-2 py-0.5 shadow">
    Demo
  </span>
</div>
          <div className="max-w-md mx-auto px-2 h-full grid grid-cols-4 items-center">
            {items.map((it) => {
              const active = path.startsWith(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`flex flex-col items-center justify-center h-full text-xs ${active ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "opacity-75 hover:opacity-100"}`}
                >
                  <span className="text-lg leading-none">{it.icon}</span>
                  <span className="mt-1">{it.label[lang]}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </TLContext.Provider>
  );
}
