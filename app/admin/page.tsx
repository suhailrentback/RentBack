"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function AdminHome() {
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
          <div className="font-semibold">Admin overview</div>
          <div className="text-sm opacity-80">Operations: review transactions, users.</div>
        </Card>
        <Card className="p-4">
          <div className="font-semibold mb-2">Shortcuts</div>
          <div className="flex gap-3 text-sm">
            <Link href="/admin/transactions" className="underline">Transactions</Link>
            <Link href="/admin/users" className="underline">Users</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
