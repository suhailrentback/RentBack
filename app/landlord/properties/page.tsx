// app/landlord/properties/page.tsx
"use client";

import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { downloadCSV, toCSV } from "@/lib/csv";
import { CardSkel } from "@/components/Skeletons";

type Row = {
  id: string;
  name: string;
  tenant: string;
  expected: number;
  due: string;
  status: "ACTIVE" | "INACTIVE";
};

const DEMO: Row[] = [
  { id: "r1", name: "Sunset Apt 12-A", tenant: "Ali Khan", expected: 75000, due: "5th", status: "ACTIVE" },
  { id: "r2", name: "Gulshan Block 7", tenant: "Sara Ahmed", expected: 62000, due: "10th", status: "ACTIVE" },
];

export default function LandlordPropertiesPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    // simulate loading
    setTimeout(() => setRows(DEMO), 150);
  }, []);

  function exportCSV() {
    if (!rows?.length) return;
    const csv = toCSV(
      rows.map(r => ({
        id: r.id,
        name: r.name,
        tenant: r.tenant,
        expected: r.expected,
        due: r.due,
        status: r.status,
      }))
    );
    downloadCSV("properties.csv", csv);
  }

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.landlord.properties.title}</h1>
          <button
            onClick={exportCSV}
            className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
          >
            Export CSV
          </button>
        </div>
        <p className="text-xs opacity-70">{t.landlord.properties.subtitle}</p>

        {rows === null ? (
          <CardSkel />
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <div className="text-sm font-medium">{t.landlord.properties.title}</div>
            <div className="text-xs opacity-70 mt-1">{t.landlord.properties.none}</div>
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            <div className="grid grid-cols-5 gap-3 px-3 py-2 text-xs opacity-70 border-b border-black/10 dark:border-white/10">
              <div>{t.landlord.properties.title}</div>
              <div>{t.landlord.properties.tenants}</div>
              <div>{t.landlord.properties.expected}</div>
              <div>{t.landlord.properties.due}</div>
              <div>{t.landlord.properties.status}</div>
            </div>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {rows.map(r => (
                <li key={r.id} className="grid grid-cols-5 gap-3 px-3 py-3 text-sm">
                  <div className="font-medium">{r.name}</div>
                  <div>{r.tenant}</div>
                  <div>PKR {r.expected.toLocaleString()}</div>
                  <div>{r.due}</div>
                  <div>{r.status === "ACTIVE" ? t.landlord.properties.active : "—"}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
