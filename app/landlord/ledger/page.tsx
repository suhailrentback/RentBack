"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings } from "@/lib/i18n";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { TableSkel } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function LandlordLedgerPage() {
  const { lang } = useLang();
  const t = strings[lang];

  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => setRows(loadPayments()), []);

  return (
    <AppShell role="landlord" title={t.landlord.home.quickLinks.ledger}>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">
          {t.landlord.home.quickLinks.ledger}
        </h1>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {rows === null ? (
            <TableSkel rows={5} />
          ) : rows.length === 0 ? (
            <EmptyState
              title={t.landlord.properties.title}
              body={t.landlord.properties.none}
              ctaLabel={t.landlord.home.quickLinks.ledger}
              ctaHref="/landlord/ledger"
            />
          ) : (
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {rows.map((p) => (
                <li key={p.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString(lang === "ur" ? "ur-PK" : "en-PK")} • {p.method}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-semibold">{formatPKR(p.amount)}</div>
                    <Link
                      href={`/tenant/receipt/${p.id}`}
                      className="text-xs px-2 py-1 rounded border hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      {strings[lang].tenant.home.viewReceipt}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}
