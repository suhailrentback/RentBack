"use client";
export const dynamic = "force-dynamic";

import React from "react";
import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <SectionNav
        base="/landlord"
        items={[
          { href: "", label: "Home" },
          { href: "/ledger", label: "Ledger" },
          { href: "/settings", label: "Settings" },
        ]}
      />
      <div className="mt-3">{children}</div>
    </AppShell>
  );
}
