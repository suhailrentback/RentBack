// app/landlord/properties/page.tsx
"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings } from "@/lib/i18n";

type DemoProperty = {
  id: string;
  name: string;
  tenants: number;
  expected: number;
  nextDueISO: string;
  status: "ACTIVE" | "INACTIVE";
};

const demoLoadProperties = async (): Promise<DemoProperty[]> => {
  // demo data — replace with real source later
  return [
    {
      id: "prop_1",
      name: "12-A, Sunset Apartments",
      tenants: 1,
      expected: 65000,
      nextDueISO: new Date().toISOString(),
      status: "ACTIVE",
    },
  ];
};

export default function LandlordPropertiesPage() {
  const { lang, locale } = useLang();
  const t = strings[lang];

  const [properties, setProperties] = useState<DemoProperty[] | null>(null);

  useEffect(() => {
    demoLoadProperties().then(setProperties);
  }, []);

  return (
    <AppShell role="landlord" title={t.landlord.properties.title}>
      {/* Local subtitle (since AppShell has no subtitle prop) */}
      <div className="px-4 pt-2 pb-0 text-xs opacity-70">
        {t.landlord.properties.subtitle}
      </div>

      <div className="p-4 space-y-3">
        {properties === null ? (
          <div className="h-16 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : properties.length === 0 ? (
          <div className="text-sm opacity-70">{t.landlord.properties.none}</div>
        ) : (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black/5 dark:bg-white/5 text-left">
                <tr>
                  <th className="px-3 py-2">{t.landlord.properties.title}</th>
                  <th className="px-3 py-2">{t.landlord.properties.tenants}</th>
                  <th className="px-3 py-2">{t.landlord.properties.expected}</th>
                  <th className="px-3 py-2">{t.landlord.properties.due}</th>
                  <th className="px-3 py-2">{t.landlord.properties.status}</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.tenants}</td>
                    <td className="px-3 py-2">
                      Rs {Math.round(p.expected).toLocaleString(locale)}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(p.nextDueISO).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-600 text-white">
                        {t.landlord.properties.active}
                      </span>
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
