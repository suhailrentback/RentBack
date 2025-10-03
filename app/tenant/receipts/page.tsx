"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { loadPayments, type DemoPayment } from "@/lib/demo";

export default function TenantReceiptsPage() {
  const { t, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    // Load demo payments from local storage (or your demo lib)
    setRows(loadPayments());
  }, []);

  const title = useMemo(() => t.tenant.home.shortcuts.receipts, [t]);

  return (
    <AppShell role="tenant" title={title}>
      <div className="p-4 space-y-3">
        {rows === null ? (
          <div className="space-y-2">
            <div className="h-10 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-10 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-10 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
          </div>
        ) : rows.length === 0 ? (
          <div className="text-sm opacity-70">{t.tenant.rewards.empty}</div>
        ) : (
          <ul className="space-y-2">
            {rows.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {
                      new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: "PKR",
                        maximumFractionDigits: 0,
                      }).format(p.amount)
                    }
                    {" • "}
                    {p.method}
                    {" • "}
                    {new Date(p.createdAt).toLocaleString(locale)}
                  </div>
                  <div className="text-xs opacity-70 truncate">
                    {p.property}
                  </div>
                </div>
                <Link
                  href={`/tenant/receipt/${p.id}`}
                  className="shrink-0 text-sm px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition"
                >
                  {t.tenant.home.viewReceipt}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
