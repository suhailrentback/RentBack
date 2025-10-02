"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { strings, type Lang } from "@/lib/i18n";

type PropertyRow = {
  id: string;
  name: string;
  tenant: string;
  expected: number;
  due: string;
  status: "Active" | "Inactive";
};

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function LandlordPropertiesPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  const [rows, setRows] = useState<PropertyRow[] | null>(null);

  useEffect(() => {
    // Demo rows
    setRows([
      { id: "pr_001", name: "12-A, Sunset Apartments", tenant: "Ahmed Khan", expected: 65000, due: "05-Nov-2025", status: "Active" },
      { id: "pr_002", name: "22-G, Greenview Residency", tenant: "Sara Noor", expected: 72000, due: "05-Nov-2025", status: "Active" },
    ]);
  }, []);

  return (
    <AppShell role="landlord" title={t.landlord.properties.title}>
      <div className="p-4 space-y-4">
        <p className="text-sm opacity-70">{t.landlord.properties.subtitle}</p>

        {rows === null ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 animate-pulse h-24" />
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-70">
            {t.landlord.properties.none}
          </div>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="text-sm">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs opacity-70">
                    {t.landlord.properties.tenants}: {r.tenant} • {t.landlord.properties.due}: {r.due}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatPKR(r.expected)}</div>
                  <div className="text-[10px] opacity-70">{t.landlord.properties.expected}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
