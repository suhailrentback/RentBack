// app/tenant/receipts/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";

export default function TenantReceiptsPage() {
  const { t, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const sorted = useMemo(
    () =>
      (rows ?? [])
        .slice()
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [rows]
  );

  return (
    <AppShell
      role="tenant"
      title={t.tenant.home.shortcuts.receipts}
      subtitle={t.tenant.home.subtitle}
    >
      <div className="p-4 space-y-3">
        {rows === null ? (
          <div className="h-16 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : sorted.length === 0 ? (
          <div className="text-sm opacity-70">
            {t.tenant.rewards.empty /* reuse a friendly empty string */}
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((p) => (
              <Link
                key={p.id}
                href={`/tenant/receipt/${p.id}`}
                className="block rounded-xl border border-black/10 dark:border-white/10 p-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: "PKR",
                        maximumFractionDigits: 0,
                      }).format(p.amount)}
                    </div>
                    <div className="text-xs opacity-70">
                      {p.property} • {p.method} •{" "}
                      {new Date(p.createdAt).toLocaleString(locale)}
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10">
                    {p.status}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
