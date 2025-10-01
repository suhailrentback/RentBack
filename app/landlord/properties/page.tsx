// app/landlord/properties/page.tsx
"use client";
import { useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { ListSkel } from "@/components/Skeletons";
import { strings, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo";
import { toCSV, downloadCSV } from "@/lib/csv";

type Row = {
  id: string;
  name: string;
  tenant: string;
  expected: number;
  due: string;
  status: "Active" | "Inactive";
};

export default function LandlordPropertiesPage() {
  const lang: Lang = typeof window !== "undefined" && localStorage.getItem("demo-lang") === "ur" ? "ur" : "en";
  const t = strings[lang];

  // Demo stub list (read-only)
  const [loading] = useState(false);
  const rows: Row[] = useMemo(
    () => [
      { id: "p1", name: "Apt 12 — Park View", tenant: "Ali Khan", expected: 52000, due: "5th", status: "Active" },
      { id: "p2", name: "House 5 — Zamzama", tenant: "Sana Tariq", expected: 78000, due: "5th", status: "Active" },
    ],
    []
  );

  const exportCSV = () => {
    const csv = toCSV(
      rows.map((r) => ({
        id: r.id,
        property: r.name,
        tenant: r.tenant,
        expected: r.expected,
        due: r.due,
        status: r.status,
      }))
    );
    downloadCSV("landlord-properties.csv", csv);
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.landlord.properties.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70">{t.landlord.properties.subtitle}</span>
            <button
              onClick={exportCSV}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              title="Export properties (demo)"
            >
              Export CSV
            </button>
          </div>
        </div>

        {loading ? (
          <ListSkel />
        ) : rows.length === 0 ? (
          <EmptyState
            title={t.landlord.properties.title}
            body={t.landlord.properties.none}
          />
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs opacity-70">
                    {t.landlord.properties.tenants}: {r.tenant}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="opacity-70">{t.landlord.properties.expected}</div>
                  <div className="font-medium">{formatPKR(r.expected)}</div>
                  <div className="opacity-70 mt-1">
                    {t.landlord.properties.due}: {r.due}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
