"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ensureSeed, isDemo } from "@/lib/demo";

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  // theme/lang persisted on <html>
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"en" | "ur">("en");

  useEffect(() => {
    // seed demo data once on any app page
    ensureSeed();

    try {
      const t = localStorage.getItem("rb-theme");
      const l = localStorage.getItem("rb-lang");
      if (t === "light" || t === "dark") setTheme(t);
      if (l === "en" || l === "ur") setLang(l);
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

  const items = [
    { href: "/tenant", icon: "🏠", label: "Home" },
    { href: "/tenant/pay", icon: "💸", label: "Pay" },
    { href: "/tenant/rewards", icon: "🎁", label: "Rewards" },
    { href: "/tenant/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* top-right toggles (kept simple, no drawer) */}
      <div className="fixed top-3 right-3 z-50 flex gap-2">
        <button
          type="button"
          onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
          className="h-10 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur text-sm"
        >
          {lang === "en" ? "اردو" : "English"}
        </button>
        <button
          type="button"
          onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
          className="h-10 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg.black/40 backdrop-blur text-sm"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      {/* page */}
      <div className="pb-20 pt-2">{children}</div>

      {/* bottom nav + DEMO pill */}
      <nav className="fixed bottom-0 inset-x-0 h-16 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30">
        <div className="relative max-w-md mx-auto px-2 h-full grid grid-cols-4 items-center">
          {isDemo() && (
            <div className="absolute -top-6 left-3 text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
              Demo
            </div>
          )}
          {items.map((it) => {
            const active = path.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex flex-col items-center justify-center h-full text-xs ${
                  active ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "opacity-75 hover:opacity-100"
                }`}
              >
                <span className="text-lg leading-none">{it.icon}</span>
                <span className="mt-1">{it.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
