"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RightDrawer from "./RightDrawer";

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  // theme/lang persisted on <html>
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<"en" | "ur">("en");

  useEffect(() => {
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

  // right drawer state
  const [open, setOpen] = useState(false);

  // bottom nav items (no “More” here)
  const items = [
    { href: "/tenant", icon: "🏠", label: "Home" },
    { href: "/tenant/pay", icon: "💸", label: "Pay" },
    { href: "/tenant/rewards", icon: "🎁", label: "Rewards" },
    { href: "/tenant/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* top-right menu button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed top-3 right-3 z-50 h-10 w-10 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10"
      >
        <span className="text-lg leading-none">☰</span>
      </button>

      {/* page content */}
      <div className="pb-20 pt-2">{children}</div>

      {/* bottom nav (unchanged) */}
      <nav className="fixed bottom-0 inset-x-0 h-16 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30">
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
                <span className="mt-1">{it.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* right drawer (contains theme/lang toggles now) */}
      <RightDrawer
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
        lang={lang}
        onToggleTheme={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
        onToggleLang={() => setLang((p) => (p === "en" ? "ur" : "en"))}
      />
    </div>
  );
}
