"use client";

import { usePathname } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { strings, type Lang, dirFor } from "@/lib/i18n";
import RoleNavTenant from "@/components/nav/RoleNavTenant";
import RoleNavLandlord from "@/components/nav/RoleNavLandlord";
import RoleNavAdmin from "@/components/nav/RoleNavAdmin";

type Props = {
  role: "tenant" | "landlord" | "admin";
  title?: string;
  hideNav?: boolean;
  children: React.ReactNode;
};

export default function AppShell({ role, title, hideNav, children }: Props) {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const t = strings[lang as Lang];

  const Nav = role === "tenant" ? RoleNavTenant : role === "landlord" ? RoleNavLandlord : RoleNavAdmin;

  return (
    <div className="min-h-dvh flex flex-col" dir={dirFor(lang as Lang)}>
      {/* top bar */}
      <header className="h-14 border-b border-black/10 dark:border-white/10 flex items-center justify-between px-4">
        <div className="font-semibold tracking-wide">RentBack</div>
        <div className="flex items-center gap-2 text-xs">
          <button
            className={`px-2 py-1 rounded ${lang === "en" ? "bg-black/5 dark:bg-white/10" : ""}`}
            onClick={() => setLang("en")}
          >
            {t.toggles.english}
          </button>
          <span className="opacity-40">|</span>
          <button
            className={`px-2 py-1 rounded ${lang === "ur" ? "bg-black/5 dark:bg-white/10" : ""}`}
            onClick={() => setLang("ur")}
          >
            {t.toggles.urdu}
          </button>
        </div>
      </header>

      {/* page header */}
      {title ? (
        <div className="px-4 py-3 border-b border-black/10 dark:border-white/10">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      ) : null}

      {/* content */}
      <main className="flex-1">{children}</main>

      {/* bottom nav */}
      {hideNav ? null : (
        <footer className="border-t border-black/10 dark:border-white/10">
          <Nav currentPath={pathname} />
        </footer>
      )}
    </div>
  );
}
