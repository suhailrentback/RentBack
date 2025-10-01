// components/MobileAppShell.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { strings, type Lang } from "@/lib/i18n";
import LanguageThemeToggle from "./LanguageThemeToggle";

export default function MobileAppShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = strings[lang];

  useEffect(() => {
    const l = (typeof window !== "undefined" && (localStorage.getItem("demo-lang") as Lang)) || "en";
    setLang(l === "ur" ? "ur" : "en");
  }, []);

  return (
    <div className="min-h-dvh max-w-[680px] mx-auto bg-white dark:bg-black text-black dark:text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-black/60 border-b border-black/10 dark:border-white/10">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="font-semibold">{t.app}</div>
          <LanguageThemeToggle />
        </div>
      </div>

      {/* Content */}
      <main>{children}</main>

      {/* Bottom nav */}
      <nav className="sticky bottom-0 z-10 p-2 border-t border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <Link href="/tenant" className="rounded-xl px-2 py-2 text-center hover:bg-black/5 dark:hover:bg-white/5">
            <div>🏠</div>
            <div className="mt-1">{t.bottom.home}</div>
          </Link>
          <Link href="/tenant/pay" className="rounded-xl px-2 py-2 text-center hover:bg-black/5 dark:hover:bg-white/5">
            <div>💸</div>
            <div className="mt-1">{t.bottom.pay}</div>
          </Link>
          <Link href="/tenant/rewards" className="rounded-xl px-2 py-2 text-center hover:bg-black/5 dark:hover:bg-white/5">
            <div>🎁</div>
            <div className="mt-1">{t.bottom.rewards}</div>
          </Link>
          <Link href="/tenant/profile" className="rounded-xl px-2 py-2 text-center hover:bg-black/5 dark:hover:bg-white/5">
            <div>👤</div>
            <div className="mt-1">{t.bottom.profile}</div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
