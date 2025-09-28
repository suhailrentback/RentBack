"use client";
export const dynamic = "force-dynamic";

import React from "react";
import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <SectionNav
        base="/admin"
        items={[
          { href: "", label: "Home" },
          { href: "/transactions", label: "Transactions" },
          { href: "/users", label: "Users" },
        ]}
      />
      <div className="mt-3">{children}</div>
    </AppShell>
  );
}
