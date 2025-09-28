// app/tenant/layout.tsx
"use client";
export const dynamic = "force-dynamic";

import { AppFrame } from "@/components/mobile/AppChrome";
import { HomeIcon, CardIcon, GiftIcon, UserIcon } from "@/components/mobile/icons";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    { href: "/tenant", label: "Home", icon: HomeIcon },
    { href: "/tenant/pay", label: "Pay", icon: CardIcon },
    { href: "/tenant/rewards", label: "Rewards", icon: GiftIcon },
    { href: "/tenant/profile", label: "Profile", icon: UserIcon },
  ];
  return <AppFrame title="Tenant" tabs={tabs}>{children}</AppFrame>;
}
