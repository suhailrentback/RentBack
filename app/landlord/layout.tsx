// app/landlord/layout.tsx
"use client";
export const dynamic = "force-dynamic";

import { AppFrame } from "@/components/mobile/AppChrome";
import { HomeIcon, BankIcon, SettingsIcon, ListIcon } from "@/components/mobile/icons";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    { href: "/landlord", label: "Home", icon: HomeIcon },
    { href: "/landlord/ledger", label: "Ledger", icon: ListIcon },
    { href: "/landlord/settings", label: "Settings", icon: SettingsIcon },
    { href: "/tenant/pay", label: "Pay", icon: BankIcon }, // handy shortcut
  ];
  return <AppFrame title="Landlord" tabs={tabs}>{children}</AppFrame>;
}
