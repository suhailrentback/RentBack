"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";
import { TableSkel } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, type DemoPayment } from "@/lib/demo";

function formatPKR(v: number) {
  return `Rs ${Math.round(v).toLocaleString("en-PK")}`;
}

type Row = {
  name: string;
  lastAmount: number | null;
  lastAt: string | null;
  status: "Active";
};

export default function LandlordPropertiesPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const all = loadPayments();
    const byProp = new Map<string, DemoPayment[]>();
    all.forEach((p) => {
      const arr = byProp.get(p.property) ?? [];
      arr.push(p);
      byProp.set(p.property, arr);
    });

    const table: Row[] = Array.from(byProp.entries()).map(([name, list]) => {
      const sent = list.filter((x) => x.status === "SENT");
      const latest = sent.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      return {
        name,
        lastAmount: latest ? latest.amount : null,
        lastAt: latest ? latest.createdAt : null,
        status: "Active",
      };
    });

    setRows(table.sort((a, b) => a.name.localeCompare(b.name)));
    setLoading(false);
  }, []);

  return (
    <AppShell role="landlord" title={t.landlord.properties.title}>
      <div className="p-4 space-y-4">
        <p className="text-sm opacity-70">{t.landlord.properties.subtitle}</p>

        {loading ? (
          <TableSkel />
        ) : rows.length === 0 ? (
          <EmptyState
            title={t.landlord.properties.title}
            body={t.landlord.properties.none}
            ctaLabel="Open Ledger"
            ctaHref="/landlord/ledger"
          />
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs opacity-70">
                <tr>
                  <th className="px-3 py-2">{t.landlord.properties.title}</th>
                  <th className="px-3 py-2">{t.landlord.properties.status}</th>
                  <th className="px-3 py-2 text-right">{t.landlord.properties.expected}</th>
                  <th className="px-3 py-2">{t.landlord.properties.due}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-3 py-2">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs opacity-70">
                        {t.landlord.properties.tenants}: 1
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600 text-white">
                        {t.landlord.properties.active}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {r.lastAmount == null ? "—" : formatPKR(r.lastAmount)}
                    </td>
                    <td className="px-3 py-2">
                      {r.lastAt
                        ? new Date(r.lastAt).toLocaleDateString("en-PK", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
