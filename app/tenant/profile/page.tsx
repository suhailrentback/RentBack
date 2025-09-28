"use client";
export const dynamic = "force-dynamic";

import AppShell from "@/components/AppShell";
import SectionNav from "@/components/SectionNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
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
          <div className="font-semibold mb-2">Profile</div>
          <div className="grid gap-2">
            <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none" placeholder="Name" />
            <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none" placeholder="CNIC" />
            <input className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 outline-none" placeholder="Property" />
            <Button>Save</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
