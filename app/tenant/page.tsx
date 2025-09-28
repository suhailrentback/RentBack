"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function TenantHome() {
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
          <div className="font-semibold">Overview</div>
          <div className="text-sm opacity-80">Your rent, organized.</div>
        </Card>
        <Card className="p-4">
          <div className="font-semibold mb-2">Shortcuts</div>
          <div className="flex gap-3 text-sm">
            <Link href="/tenant/pay" className="underline">Pay rent</Link>
            <Link href="/tenant/rewards" className="underline">View rewards</Link>
            <Link href="/tenant/profile" className="underline">Profile</Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
