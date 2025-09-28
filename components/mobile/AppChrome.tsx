// components/mobile/AppChrome.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Tab = { href: string; label: string; icon: (p:any)=>JSX.Element };

export function AppFrame({
  title,
  children,
  tabs
}: {
  title: string;
  children: ReactNode;
  tabs: Tab[];
}) {
  // lightweight theme/lang toggles (no providers to avoid SSR traps)
  const [theme, setTheme] = useState<"light"|"dark">("dark");
  const [lang, setLang] = useState<"en"|"ur">("en");

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
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("rb-theme", theme);
      localStorage.setItem("rb-lang", lang);
    } catch {}
  }, [theme, lang]);

  return (
    <div className="min-h-[100svh] bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white flex flex-col">
      <TopBar
        title={title}
        theme={theme}
        onToggleTheme={() => setTheme(t => t==="dark"?"light":"dark")}
        lang={lang}
        onToggleLang={() => setLang(l => l==="en"?"ur":"en")}
      />
      <div className="flex-1 overflow-y-auto px-4 pb-[calc(64px+env(safe-area-inset-bottom))] pt-3">
        {children}
      </div>
      <BottomNav tabs={tabs}/>
    </div>
  );
}

function TopBar({
  title,
  theme,
  lang,
  onToggleTheme,
  onToggleLang
}: {
  title: string;
  theme: "light"|"dark";
  lang: "en"|"ur";
  onToggleTheme: ()=>void;
  onToggleLang: ()=>void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="h-[56px] flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
          <Logo size={18}/> <span>RentBack</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="toggle language"
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
          <button
            onClick={onToggleTheme}
            className="px-3 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 text-lg font-bold">{title}</div>
    </header>
  );
}

function BottomNav({ tabs }: { tabs: Tab[] }) {
  const path = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/50 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="grid grid-cols-4 gap-1 h-[64px] max-w-4xl mx-auto">
        {tabs.map(t => {
          const active = path === t.href;
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center justify-center text-xs font-medium transition
                ${active ? "text-emerald-600 dark:text-emerald-400" : "opacity-80 hover:opacity-100"}`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Logo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
