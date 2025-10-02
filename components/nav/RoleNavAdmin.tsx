"use client";

import Link from "next/link";
import { useLang } from "@/components/providers/LanguageProvider";
import { strings, type Lang } from "@/lib/i18n";
import { cn } from "./_utils";

type Props = { currentPath: string };

export default function RoleNavAdmin({ currentPath }: Props) {
  const { lang } = useLang();
  const t = strings[lang as Lang];

  const items = [
    { href: "/admin", label: t.nav.home, icon: HomeIcon },
    { href: "/admin/transactions", label: "Transactions", icon: TxIcon }, // add i18n key if desired
    { href: "/admin/payouts", label: "Payouts", icon: PayoutsIcon },      // add i18n key if desired
    { href: "/admin/discrepancies", label: "Discrepancies", icon: DiscrepanciesIcon }, // add i18n
  ];

  return (
    <nav className="h-14 flex items-stretch justify-between">
      {items.map(({ href, label, icon: Icon }) => {
        const active = currentPath === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 select-none",
              active ? "text-emerald-600" : "text-neutral-500 dark:text-neutral-400"
            )}
          >
            <Icon active={active} />
            <span className={cn("text-[11px] leading-none", active ? "font-semibold" : "font-medium opacity-80")}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M12 3l9 7h-3v9h-5v-6H11v6H6v-9H3z" />
  </svg>;
}
function TxIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M3 6h18v2H3zm0 4h12v2H3zm0 4h18v2H3z" />
  </svg>;
}
function PayoutsIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M21 7H3V5h18v2zm0 3H3v9h18v-9zm-10 5h8v2h-8z" />
  </svg>;
}
function DiscrepanciesIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2zM12 2a10 10 0 100 20 10 10 0 000-20z" />
  </svg>;
}
