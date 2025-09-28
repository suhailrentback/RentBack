"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";

export default function Ledger() {
  const rows = [
    { ref: "RB-100201", unit: "DHA Phase 6 — A2", amount: "PKR 120,000", status: "Sent" },
    { ref: "RB-100202", unit: "DHA Phase 6 — A2", amount: "PKR 120,000", status: "Succeeded" },
  ];

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
          <div className="font-semibold mb-2">Payments ledger (demo)</div>
          <div className="text-sm">
            {rows.map((r) => (
              <div key={r.ref} className="py-2 border-b border-white/10 flex items-center justify-between">
                <div className="opacity-80">{r.unit}</div>
                <div className="font-medium">{r.amount}</div>
                <div className="text-xs opacity-70">{r.status}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
