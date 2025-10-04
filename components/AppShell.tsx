"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLang } from "@/hooks/useLang";
import RoleNavTenant from "@/components/nav/RoleNavTenant";
import RoleNavLandlord from "@/components/nav/RoleNavLandlord";
import RoleNavAdmin from "@/components/nav/RoleNavAdmin";

type Role = "tenant" | "landlord" | "admin";

type Props = {
  title?: string;
  role?: Role;
  hideBottomNav?: boolean;
  children?: ReactNode;
};

export default function AppShell({ title, role, hideBottomNav, children }: Props) {
  const pathname = usePathname(); // <-- provide to RoleNavs
  const { lang, setLang, t } = useLang();

  const dir = lang === "ur" ? "rtl" : "ltr";
  const L = {
    app: t.app,
    navHome: t.nav.home,
    toggles: t.toggles,
  };

  return (
    <div
      className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white"
      style={{ direction: dir }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
            <Logo />
            <span>RentBack</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {L.navHome}
            </Link>
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="px-3 py-1.5 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {lang === "en" ? L.toggles.urdu : L.toggles.english}
            </button>
          </div>
        </div>
      </header>

      {/* Page header */}
      {title ? (
        <div className="mx-auto max-w-6xl px-4 py-3">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      ) : null}

      {/* Page body */}
      <main className="pb-20">{children}</main>

      {/* Bottom nav (role-scoped). We now pass currentPath to satisfy types. */}
      {!hideBottomNav && role ? (
        <div className="fixed inset-x-0 bottom-0 z-20 bg-white/80 dark:bg-black/40 backdrop-blur border-t border-black/10 dark:border-white/10">
          {role === "tenant" && <RoleNavTenant currentPath={pathname} />}
          {role === "landlord" && <RoleNavLandlord currentPath={pathname} />}
          {role === "admin" && <RoleNavAdmin currentPath={pathname} />}
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
