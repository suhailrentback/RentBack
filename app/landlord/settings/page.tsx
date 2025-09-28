"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function LandlordSettings() {
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
          <div className="font-semibold mb-2">Payout details (demo)</div>
          <div className="grid gap-2">
            <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none" placeholder="Bank IBAN" />
            <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none" placeholder="Account Title" />
            <Button>Save</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
