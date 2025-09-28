"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function LandlordHome() {
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
      <div className="grid gap-3 mt-3">
        <Card className="p-4">
          <div className="font-semibold">Overview</div>
          <div className="text-sm opacity-80">Your rentals, at a glance.</div>
        </Card>
        <Card className="p-4">
          <div className="font-semibold mb-2">Shortcuts</div>
          <div className="flex gap-3 text-sm">
            <Link href="/landlord/ledger" className="underline">Ledger</Link>
            <Link href="/landlord/settings" className="underline">Settings</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
