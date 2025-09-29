// components/MobileAppShell.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { strings } from "@/lib/i18n";
import { isDemo } from "@/lib/demo";

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  // theme/lang persisted on <html>
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"en" | "ur">("en");

  useEffect(() => {
    try {
      const t = localStorage.getItem("rb-theme");
      const l = localStorage.getItem("rb-lang");
      if (t === "light" || t === "dark") setTheme(t);
      if (l === "en" || l === "ur") setLang(l);
      // defaults from env
      if (!t && process.env.NEXT_PUBLIC_DEFAULT_THEME) {
        const envT = process.env.NEXT_PUBLIC_DEFAULT_THEME.toLowerCase() === "dark" ? "dark" : "light";
        setTheme(envT as any);
      }
      if (!l && process.env.NEXT_PUBLIC_DEFAULT_LANG) {
        const envL = process.env.NEXT_PUBLIC_DEFAULT_LANG.toLowerCase() === "ur" ? "ur" : "en";
        setLang(envL as any);
      }
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
    } catch {}
  }, [theme, lang]);

  const t = strings[lang];

  // bottom nav items
  const items = [
    { href: "/tenant", icon: "🏠", label: t.bottom.home },
    { href: "/tenant/pay", icon: "💸", label: t.bottom.pay },
    { href: "/tenant/rewards", icon: "🎁", label: t.bottom.rewards },
    { href: "/tenant/profile", icon: "👤", label: t.bottom.profile },
  ];

  // debounce rapid taps
  const [navLock, setNavLock] = useState(false);
  function goto(href: string) {
    if (navLock) return;
    setNavLock(true);
    router.push(href);
    setTimeout(() => setNavLock(false), 450);
  }

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* top-right quick toggles */}
      <div className="fixed top-3 right-3 z-50 flex gap-2">
        <button
          onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
          className="px-3 py-2 text-xs rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="toggle language"
        >
          {lang === "en" ? t.urdu : t.english}
        </button>
        <button
          onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
          className="px-3 py-2 text-xs rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="toggle theme"
        >
          {theme === "dark" ? t.light : t.dark}
        </button>
      </div>

      {/* page content */}
      <div className="pb-20 pt-2">{children}</div>

      {/* bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 h-16 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30">
        <div className="relative max-w-md mx-auto px-2 h-full grid grid-cols-4 items-center">
          {/* DEMO pill */}
          {isDemo() && (
            <div className="absolute -top-6 left-3 text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
              {t.demo}
            </div>
          )}
          {items.map((it) => {
            const active = path.startsWith(it.href);
            return (
              <button
                key={it.href}
                onClick={() => goto(it.href)}
                disabled={navLock}
                className={`flex flex-col items-center justify-center h-full text-xs w-full ${
                  active ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "opacity-75 hover:opacity-100"
                } ${navLock ? "pointer-events-none" : ""}`}
              >
                <span className="text-lg leading-none">{it.icon}</span>
                <span className="mt-1">{it.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
