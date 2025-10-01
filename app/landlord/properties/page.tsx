// app/landlord/properties/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { ListSkeleton } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";

// Demo rows
type Row = {
  id: string;
  name: string;
  tenant: string;
  expected: number;
  nextDueISO: string;
  status: "ACTIVE" | "INACTIVE";
};

const DEMO: Row[] = [
  {
    id: "r1",
    name: "Gulshan 12A — Apt 4B",
    tenant: "Ali Khan",
    expected: 65000,
    nextDueISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "r2",
    name: "Clifton Block 5 — House 27",
    tenant: "Sara Ahmed",
    expected: 120000,
    nextDueISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10).toISOString(),
    status: "ACTIVE",
  },
];

function downloadCSV(filename: string, rows: Array<Record<string, any>>) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (val: any) => `"${String(val ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LandlordPropertiesPage() {
  const [lang] = useState<Lang>("en");
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRows(DEMO);
      setLoading(false);
    }, 200);
  }, []);

  const exportCSV = () => {
    const out = rows.map((r) => ({
      id: r.id,
      name: r.name,
      tenant: r.tenant,
      expected: r.expected,
      nextDue: new Date(r.nextDueISO).toISOString(),
      status: r.status,
    }));
    downloadCSV("landlord-properties.csv", out);
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.landlord.properties.title}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              Export CSV
            </button>
            <div className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
              {t.demo}
            </div>
          </div>
        </div>

        <div className="text-xs opacity-70">{t.landlord.properties.subtitle}</div>

        {loading ? (
          <ListSkeleton />
        ) : rows.length === 0 ? (
          <EmptyState
            title={t.landlord.properties.title}
            body={t.landlord.properties.none}
            ctaLabel={t.landlord.home.quickLinks.ledger}
            ctaHref="/landlord/ledger"
          />
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs opacity-70">
                    {t.landlord.properties.tenants}: {r.tenant}
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div>
                    {t.landlord.properties.expected}: {r.expected.toLocaleString()} PKR
                  </div>
                  <div className="opacity-70">
                    {t.landlord.properties.due}:{" "}
                    {new Date(r.nextDueISO).toLocaleDateString(
                      lang === "ur" ? "ur-PK" : "en-PK",
                      { year: "numeric", month: "short", day: "2-digit" }
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
