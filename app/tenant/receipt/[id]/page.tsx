"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function TenantReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();

  const L = t.tenant.receipt;

  return (
    <AppShell role="tenant" title={L.title}>
      <div className="p-4 space-y-4">
        {/* Moved 'subtitle' text out of AppShell prop and into page body */}
        <p className="text-sm opacity-70">{L.demo}</p>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm opacity-70">{L.qrLabel}</div>
          <div className="mt-2">
            <div className="text-xs opacity-60">{L.details.raastRef}</div>
            <div className="font-mono text-sm">{id}</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              onClick={() => window.print()}
            >
              {L.print}
            </button>
            <Link
              href="/tenant"
              className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm"
            >
              {L.backHome}
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm opacity-70">{L.details.status}</div>
          <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-medium">
            {L.sent}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
