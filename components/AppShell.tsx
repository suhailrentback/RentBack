"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { strings, dirFor, type Lang } from "@/lib/i18n";
import RoleNavTenant from "@/components/nav/RoleNavTenant";
import RoleNavLandlord from "@/components/nav/RoleNavLandlord";
import RoleNavAdmin from "@/components/nav/RoleNavAdmin";

type Props = {
  role: "tenant" | "landlord" | "admin";
  title?: string;
  actions?: React.ReactNode;
  hideNav?: boolean; // hide bottom nav (e.g., print/receipt)
  children: React.ReactNode;
};

export default function AppShell({ role, title, actions, hideNav, children }: Props) {
  // Simple local theme/lang state (centralized UI). You can wire this to a store later.
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Lang>("en");
  const t = strings[lang];
  const pathname = usePathname();

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // Direction based on lang (applies to top-level wrapper)
  const dir = useMemo(() => dirFor(lang), [lang]);

  return (
    <div dir={dir} className="min-h-dvh flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/65 dark:supports-[backdrop-filter]:bg-neutral-900/65 border-b border-black/5 dark:border-white/10">
        <div className="mx-auto w-full max-w-screen-md px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Brand mark (swap with your SVG when ready) */}
            <div className="h-6 w-6 rounded-md bg-emerald-600" />
            <div className="text-sm font-semibold tracking-wide">RentBack</div>
            {title ? <div className="text-xs opacity-60 pl-2">/ {title}</div> : null}
          </div>

          {/* Right side actions + toggles */}
          <div className="flex items-center gap-2">
            {actions ?? null}

            {/* Lang toggle */}
            <select
              aria-label="Language"
              className="h-8 rounded-lg border border-black/10 dark:border-white/10 bg-transparent text-xs px-2 outline-none"
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
            >
              <option value="en">{t.toggles.english}</option>
              <option value="ur">{t.toggles.urdu}</option>
            </select>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              className="h-8 rounded-lg border border-black/10 dark:border-white/10 text-xs px-2"
              onClick={() => setTheme((s) => (s === "light" ? "dark" : "light"))}
            >
              {theme === "light" ? t.toggles.dark : t.toggles.light}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-screen-md px-4 py-4">{children}</div>
      </main>

      {/* Bottom Nav */}
      {!hideNav ? (
        <footer className="sticky bottom-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80 border-t border-black/5 dark:border-white/10">
          <div className="mx-auto w-full max-w-screen-md px-2">
            {role === "tenant" && <RoleNavTenant currentPath={pathname} />}
            {role === "landlord" && <RoleNavLandlord currentPath={pathname} />}
            {role === "admin" && <RoleNavAdmin currentPath={pathname} />}
          </div>
        </footer>
      ) : null}

      {/* Print hygiene */}
      <style jsx global>{`
        @media print {
          header,
          footer {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
