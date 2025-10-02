"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings } from "@/lib/i18n";
import { loadPayments } from "@/lib/demo";

export default function LandlordPropertiesPage() {
  const { t, lang, locale } = useLang();
  const [properties, setProperties] = useState<{ name: string; tenants: number; nextDue: string }[] | null>(null);

  useEffect(() => {
    // Demo: infer a couple of properties from payments
    const pays = loadPayments();
    const set = new Set(pays.map((p) => p.property));
    const list = [...set].slice(0, 3).map((name) => ({
      name,
      tenants: Math.max(1, Math.floor(Math.random() * 3)),
      nextDue: new Date().toLocaleDateString(locale),
    }));
    setProperties(list);
  }, [locale]);

  return (
    <AppShell role="landlord" title={t.landlord.properties.title} subtitle={t.landlord.properties.subtitle}>
      <div className="p-4 space-y-3">
        {properties === null ? (
          <div className="h-16 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
        ) : properties.length === 0 ? (
          <div className="text-sm opacity-70">{t.landlord.properties.none}</div>
        ) : (
          properties.map((p) => (
            <div key={p.name} className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
              <div className="text-sm font-medium">{p.name}</div>
              <div className="mt-1 text-xs opacity-70">
                {strings[lang].landlord.properties.tenants}: {p.tenants} • {strings[lang].landlord.properties.due}: {p.nextDue}
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
