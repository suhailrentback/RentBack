// components/AppShell.tsx
"use client";

import Link from "next/link";
import React from "react";
import { useTL } from "@/components/providers/ThemeLangProvider";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { strings } from "@/lib/i18n";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { lang, setLang, theme, setTheme } = useTL();
  const t = strings[lang];

  return (
    <div className={theme === "dark" ? "bg-[#0b0b0b] text-white min-h-screen" : "bg-white text-slate-900 min-h-screen"}>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#0b0b0b]/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 11.5L12 4l9 7.5" />
              <path d="M5 10v9h14v-9" />
            </svg>
            <span>RentBack</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setLang(lang === "en" ? "ur" : "en")}>
              {lang === "en" ? t.urdu : t.english}
            </Button>
            <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? t.light : t.dark}
            </Button>
            <Link href="/sign-in">
              {/* CHANGED: solid → default */}
              <Button variant="default">{t.signIn}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="max-w-6xl mx-auto p-4">
        <Card>{children}</Card>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center opacity-70">
        © {new Date().getFullYear()} RentBack
      </footer>
    </div>
  );
}
