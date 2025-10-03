"use client";

import AppShell from "@/components/AppShell";
import { useEffect, useMemo, useState } from "react";
import { loadPayments, type DemoPayment } from "@/lib/demo";
import { useLang } from "@/hooks/useLang";

type PropRow = {
  name: string;
  tenants: number;
  expected: number;
  nextDue: string;
  status: "Active";
};

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function LandlordPropertiesPage() {
  const { lang, t, locale } = useLang();
  const [rows, setRows] = useState<DemoPayment[] | null>(null);

  useEffect(() => {
    setRows(loadPayments());
  }, []);

  const properties: PropRow[] = useMemo(() => {
    if (!rows) return [];
    const byName = new Map<string, PropRow>();
    rows.forEach((p) => {
      const cur = byName.get(p.property);
      const dueDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5);
      const nextDue = dueDate.toLocaleDateString(locale, { year: "numeric", month: "short", day: "2-digit" });
      if (!cur) {
        byName.set(p.property, {
          name: p.property,
          tenants: 1,
          expected: p.amount,
          nextDue,
          status: "Active",
        });
      } else {
        cur.expected += p.amount;
      }
    });
    return Array.from(byName.values());
  }, [rows, locale]);

  const L = lang === "ur"
    ? {
        title: t.landlord.properties.title,
        subtitle: t.landlord.properties.subtitle,
        none: t.landlord.properties.none,
        tenants: t.landlord.properties.tenants,
        expected: t.landlord.properties.expected,
        due: t.landlord.properties.due,
        status: t.landlord.properties.status,
        active: t.landlord.properties.active,
      }
    : {
        title: t.landlord.properties.title,
        subtitle: t.landlord.properties.subtitle,
        none: t.landlord.properties.none,
        tenants: t.landlord.properties.tenants,
        expected: t.landlord.properties.expected,
        due: t.landlord.properties.due,
        status: t.landlord.properties.status,
        active: t.landlord.properties.active,
      };

  return (
    <AppShell role="landlord" title={L.title}>
      <div className="p-4 space-y-3">
        <p className="text-sm opacity-70">{L.subtitle}</p>

        {rows === null ? (
          <div className="h-16 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : properties.length === 0 ? (
          <div className="text-sm opacity-70">{L.none}</div>
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black/5 dark:bg-white/5 text-xs uppercase tracking-wide">
                <tr className="text-left">
                  <th className="px-3 py-2">Property</th>
                  <th className="px-3 py-2">{L.tenants}</th>
                  <th className="px-3 py-2">{L.expected}</th>
                  <th className="px-3 py-2">{L.due}</th>
                  <th className="px-3 py-2">{L.status}</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.name} className="border-t border-black/10 dark:border-white/10">
                    <td className="px-3 py-2 font-medium">{p.name}</td>
                    <td className="px-3 py-2">{p.tenants}</td>
                    <td className="px-3 py-2">{formatPKR(p.expected)}</td>
                    <td className="px-3 py-2">{p.nextDue}</td>
                    <td className="px-3 py-2">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-600 text-white">{L.active}</span>
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
