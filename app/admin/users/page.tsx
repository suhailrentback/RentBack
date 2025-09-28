"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";

export default function AdminUsers() {
  const users = [
    { id: "u_1001", name: "Ayesha Khan", role: "tenant" },
    { id: "u_1002", name: "Ahmed Raza", role: "landlord" },
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
          <div className="font-semibold mb-2">Users (demo)</div>
          <div className="text-sm">
            {users.map((u) => (
              <div key={u.id} className="py-2 border-b border-white/10 flex items-center justify-between">
                <div className="opacity-80">{u.name}</div>
                <div className="text-xs uppercase opacity-70">{u.role}</div>
                <div className="text-xs opacity-60">{u.id}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
