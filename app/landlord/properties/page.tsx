"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

type DemoProperty = {
  id: string;
  name: string;
  tenants: number;
  expected: string; // e.g., "Rs 75,000"
  nextDue: string;  // localized date string
  status: "ACTIVE";
};

export default function LandlordPropertiesPage() {
  const { t, lang } = useLang();

  const [properties, setProperties] = useState<DemoProperty[] | null>(null);
  useEffect(() => {
    // tiny demo dataset (localized labels pulled from t)
    const demo: DemoProperty[] = [
      {
        id: "p1",
        name: "12-A, Sunset Apartments",
        tenants: 1,
        expected: "Rs 75,000",
        nextDue: lang === "ur" ? "5 جولائی" : "Jul 05",
        status: "ACTIVE",
      },
      {
        id: "p2",
        name: "33-C, Park View",
        tenants: 2,
        expected: "Rs 120,000",
        nextDue: lang === "ur" ? "5 جولائی" : "Jul 05",
        status: "ACTIVE",
      },
    ];
    setTimeout(() => setProperties(demo), 250);
  }, [lang]);

  return (
    <AppShell role="landlord" title={t.landlord.properties.title}>
      <div className="p-4 space-y-3">
        <p className="text-sm opacity-70">{t.landlord.properties.subtitle}</p>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
          {properties === null ? (
            <div className="space-y-2">
              <div className="h-10 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-10 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-10 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            </div>
          ) : properties.length === 0 ? (
            <div className="text-sm opacity-70">{t.landlord.properties.none}</div>
          ) : (
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {properties.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-2 py-2">
                  <div className="flex flex-col">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs opacity-70">
                      {t.landlord.properties.tenants}: {p.tenants} • {t.landlord.properties.expected}: {p.expected}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">{t.landlord.properties.due}</div>
                    <div className="text-sm font-semibold">{p.nextDue}</div>
                    <div className="mt-0.5 text-[11px] opacity-70">{t.landlord.properties.status}: {lang === "ur" ? "فعال" : "Active"}</div>
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
