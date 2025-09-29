"use client";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";

export default function TenantHome() {
  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">Tenant</h1>
        <div className="mt-4 grid gap-2">
          <Link href="/tenant/pay" className="h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between px-4">
            <span>Pay Rent</span><span>→</span>
          </Link>
          <Link href="/tenant/rewards" className="h-12 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg.white/5 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between px-4">
            <span>Rewards</span><span>→</span>
          </Link>
        </div>
      </div>
    </MobileAppShell>
  );
}
