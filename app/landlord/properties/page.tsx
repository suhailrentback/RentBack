// app/landlord/properties/page.tsx
"use client";

import { useMemo } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import EmptyState from "@/components/EmptyState";
import { loadPayments, formatPKR } from "@/lib/demo";

export default function LandlordPropertiesPage() {
  const lang: Lang = "en";
  const t = strings[lang];

  // Derive simple property rollup from payments
  const byProperty = useMemo(() => {
    const map = new Map<
      string,
      { name: string; tenants: number; expected: number; due: string; status: "Active" }
    >();
    const all = loadPayments();

    // naive grouping: property name => counts/sums
    all.forEach((p) => {
      if (!map.has(p.property)) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + 1);
        dueDate.setDate(5);
        map.set(p.property, {
          name: p.property,
          tenants: 1,
          expected: p.amount,
          due: dueDate.toISOString(),
          status: "Active",
        });
      } else {
        const cur = map.get(p.property)!;
        map.set(p.property, {
          ...cur,
          tenants: cur.tenants + 1,
          expected: cur.expected + p.amount,
        });
      }
    });

    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{t.landlord.properties.title}</h1>
          <div className="text-xs opacity-70">{t.landlord.properties.subtitle}</div>
        </div>

        {!byProperty.length ? (
          <EmptyState
            title={t.landlord.properties.title}
            body={t.landlord.properties.none}
            ctaLabel={t.landlord.home.quickLinks.ledger}
            ctaHref="/landlord/ledger"
          />
        ) : (
          <ul className="space-y-2">
            {byProperty.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-4 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs opacity-70">
                    {t.landlord.properties.tenants}: {r.tenants} • {t.landlord.properties.status}:{" "}
                    {t.landlord.properties.active}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(r.expected)}</div>
                  <div className="text-xs opacity-70">
                    {t.landlord.properties.due}:{" "}
                    {new Date(r.due).toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
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
