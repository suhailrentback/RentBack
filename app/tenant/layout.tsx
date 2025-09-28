"use client";
export const dynamic = "force-dynamic";

import React from "react";
import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <SectionNav
        base="/tenant"
        items={[
          { href: "", label: "Home" },
          { href: "/pay", label: "Pay" },
          { href: "/rewards", label: "Rewards" },
          { href: "/profile", label: "Profile" },
        ]}
      />
      <div className="mt-3">{children}</div>
    </AppShell>
  );
}
