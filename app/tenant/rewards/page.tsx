"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RewardsPage() {
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
      <div className="grid gap-3 mt-3">
        <Card className="p-4">
          <div className="font-semibold mb-2">Rewards catalog (demo)</div>
          <div className="grid grid-cols-2 gap-2">
            {["Jazz Load", "Daraz Voucher", "Careem Credit", "Foodpanda"].map((r) => (
              <div key={r} className="p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="font-medium">{r}</div>
                <div className="text-xs opacity-70">Save up to 5%</div>
                <Button size="sm" className="mt-2">Redeem</Button>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="font-semibold mb-2">Recent redemptions</div>
          <div className="text-sm opacity-70">No redemptions yet.</div>
        </Card>
      </div>
    </AppShell>
  );
}
