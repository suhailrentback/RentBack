// app/admin/layout.tsx
"use client";
export const dynamic = "force-dynamic";

import { AppFrame } from "@/components/mobile/AppChrome";
import { HomeIcon, ListIcon, UserIcon, CardIcon } from "@/components/mobile/icons";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    { href: "/admin", label: "Dash", icon: HomeIcon },
    { href: "/admin/users", label: "Users", icon: UserIcon },
    { href: "/admin/transactions", label: "Txns", icon: CardIcon },
    { href: "/tenant", label: "Tenant", icon: ListIcon }, // quick jump
  ];
  return <AppFrame title="Admin" tabs={tabs}>{children}</AppFrame>;
}
