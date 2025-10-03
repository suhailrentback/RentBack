"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { useLang } from "@/hooks/useLang";

// If your project already has these role nav components, keep these imports.
// If a role doesn't exist in your app, feel free to delete the unused import.
import RoleNavTenant from "@/components/nav/RoleNavTenant";
import RoleNavLandlord from "@/components/nav/RoleNavLandlord";
import RoleNavAdmin from "@/components/nav/RoleNavAdmin";

type Role = "tenant" | "landlord" | "admin";

type Props = PropsWithChildren<{
  /** Page title shown under the header */
  title?: string;
  /** Which app role shell to use (controls bottom nav). Omit to hide bottom nav by default. */
  role?: Role;
  /** Force-hides the bottom nav even if role is provided (useful for Founder/Sign-in/etc). */
  hideBottomNav?: boolean;
}>;

export default function AppShell({ children, title, role, hideBottomNav }: Props) {
  const { lang, setLang } = useLang();
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <div
      className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white"
      style={{ direction: dir }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
            <Logo />
            <span>RentBack</span>
          </Link>

          {/* Right controls */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {lang === "en" ? "Home" : "ہوم"}
            </Link>

            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="px-3 py-1.5 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="toggle language"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
          </nav>
        </div>
      </header>

      {/* Title (optional) */}
      {title ? (
        <div className="mx-auto max-w-4xl px-4 py-4">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
      ) : null}

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 pb-20">{children}</main>

      {/* Bottom nav (role-based) */}
      {!hideBottomNav && role ? (
        <div className="fixed inset-x-0 bottom-0 z-20">
          {role === "tenant" && <RoleNavTenant />}
          {role === "landlord" && <RoleNavLandlord />}
          {role === "admin" && <RoleNavAdmin />}
        </div>
      ) : null}
    </div>
  );
}

function Logo({ size = 20, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
