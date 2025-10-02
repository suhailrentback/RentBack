"use client";

import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { strings, type Lang } from "@/lib/i18n";
import { cn } from "./_utils";

type Props = { currentPath: string };

export default function RoleNavTenant({ currentPath }: Props) {
  const { lang } = useLang();
  const t = strings[lang as Lang];

  const items = [
    { href: "/tenant", label: t.bottom.home, icon: HomeIcon },
    { href: "/tenant/pay", label: t.bottom.pay, icon: PayIcon },
    { href: "/tenant/rewards", label: t.bottom.rewards, icon: RewardsIcon },
    { href: "/tenant/profile", label: t.bottom.profile, icon: ProfileIcon },
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
function PayIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M21 7H3V5h18v2zm0 3H3v9h18v-9zm-8 5h6v2h-6v-2z" />
  </svg>;
}
function RewardsIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.76L5.82 21z" />
  </svg>;
}
function ProfileIcon({ active }: { active?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>;
}
