// components/nav/RoleNavLandlord.tsx
"use client";

import Link from "next/link";
import { cn } from "./_utils";

type Props = { currentPath: string };

const items = [
  { href: "/landlord", label: "Home", icon: HomeIcon },
  { href: "/landlord/ledger", label: "Ledger", icon: LedgerIcon },
  { href: "/landlord/payouts", label: "Payouts", icon: PayoutsIcon },
  { href: "/landlord/properties", label: "Properties", icon: PropertiesIcon },
];

export default function RoleNavLandlord({ currentPath }: Props) {
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
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
      <path d="M12 3l7 6v12h-5v-7H10v7H5V9l7-6z" />
    </svg>
  );
}
function LedgerIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
      <path d="M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z" />
    </svg>
  );
}
function PayoutsIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
      <path d="M21 7H3V5h18v2zm0 3H3v9h18v-9zm-10 5h8v2h-8z" />
    </svg>
  );
}
function PropertiesIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={active ? "scale-110" : ""} fill="currentColor">
      <path d="M12 3l7 6v12h-5v-7H10v7H5V9l7-6z" />
    </svg>
  );
}
