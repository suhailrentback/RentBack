"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import RoleNavTenant from "@/components/nav/RoleNavTenant";
import RoleNavLandlord from "@/components/nav/RoleNavLandlord";
import RoleNavAdmin from "@/components/nav/RoleNavAdmin";

type Role = "tenant" | "landlord" | "admin";

type Props = {
  role: Role;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  hideNav?: boolean;
  children: React.ReactNode;
};

export default function AppShell({ role, title, subtitle, hideNav, children }: Props) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  return (
    <div className="min-h-dvh bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold tracking-wide">
              {t.app}
            </Link>
            <span className="text-[10px] rounded px-1.5 py-0.5 bg-emerald-600 text-white">{t.demo}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "font-semibold" : "opacity-70 hover:opacity-100"}
            >
              {t.toggles.english}
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => setLang("ur")}
              className={lang === "ur" ? "font-semibold" : "opacity-70 hover:opacity-100"}
            >
              {t.toggles.urdu}
            </button>
          </div>
        </div>

        {/* Page title area (no duplicates; pages should not render their own title again) */}
        {(title || subtitle) && (
          <div className="mx-auto max-w-4xl px-4 py-3">
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
            {subtitle && <p className="text-sm opacity-70 mt-1">{subtitle}</p>}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl pb-16">{children}</main>

      {/* Bottom role nav */}
      {!hideNav && (
        <footer className="fixed bottom-0 inset-x-0 z-10 bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-4xl">
            {role === "tenant" && <RoleNavTenant currentPath={pathname} />}
            {role === "landlord" && <RoleNavLandlord currentPath={pathname} />}
            {role === "admin" && <RoleNavAdmin currentPath={pathname} />}
          </div>
        </footer>
      )}
    </div>
  );
}
