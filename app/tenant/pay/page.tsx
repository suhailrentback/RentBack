"use client";
export const dynamic = "force-dynamic";

import React from "react";
import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PayPage() {
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
          <div className="font-semibold mb-2">Pay rent (demo)</div>
          <div className="grid gap-2">
            <input
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none"
              placeholder="Amount (PKR)"
              inputMode="numeric"
            />
            <input
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none"
              placeholder="Landlord / Property"
            />
            <select className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none">
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Wallet</option>
            </select>
            <div className="flex gap-2">
              <Button>Create Payment (Demo)</Button>
              <Button variant="outline">Download CSV</Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="font-semibold mb-2">Recent (demo)</div>
          <div className="text-sm opacity-70">No demo payments yet.</div>
        </Card>
      </div>
    </AppShell>
  );
}
