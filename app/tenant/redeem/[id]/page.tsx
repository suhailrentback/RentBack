"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function RedeemVoucherPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();

  const L = t.tenant.rewards;

  return (
    <AppShell role="tenant" title={L.title}>
      <div className="p-4 space-y-4">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/60 dark:bg-white/5">
          <h2 className="text-lg font-semibold">{L.redeem}</h2>
          <p className="text-sm opacity-70 mt-1">{L.voucherCode}</p>

          <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-transparent">
            <div className="text-xs opacity-70">{L.voucherCode}</div>
            <div className="font-mono text-sm">{id}</div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              href="/tenant/rewards"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              {L.redeem}
            </Link>
            <Link
              href="/tenant"
              className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm"
            >
              {t.tenant.home.shortcuts.rewards}
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
