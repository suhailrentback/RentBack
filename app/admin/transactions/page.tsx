"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminTransactions() {
  const tx = [
    { ref: "RB-100201", user: "Ayesha Khan", amount: "PKR 120,000", method: "Bank Transfer", status: "Sent" },
    { ref: "RB-100202", user: "Ayesha Khan", amount: "PKR 120,000", method: "Card", status: "Succeeded" },
  ];

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
      <div className="grid gap-3 mt-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Transactions (demo)</div>
            <Button variant="outline">Export CSV</Button>
          </div>
          <div className="text-sm mt-2">
            {tx.map((r) => (
              <div key={r.ref} className="py-2 border-b border-white/10 grid grid-cols-5 gap-2 items-center">
                <div className="opacity-80">{r.ref}</div>
                <div>{r.user}</div>
                <div className="font-medium">{r.amount}</div>
                <div className="text-xs opacity-75">{r.method}</div>
                <div className="text-xs opacity-70">{r.status}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
