"use client";

import AppShell from "@/components/AppShell";
import { strings } from "@/lib/i18n";
import { useLang } from "@/hooks/useLang";
import EmptyState from "@/components/EmptyState";

export default function LandlordPropertiesPage() {
  const { lang } = useLang();
  const t = strings[lang];

  // Demo properties could be loaded later from lib/demo if you add them
  const properties: Array<{ id: string; name: string; tenants: number; status: "ACTIVE" | "INACTIVE" }> = [];

  return (
    <AppShell role="landlord" title={t.landlord.properties.title}>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">{t.landlord.properties.title}</h1>

        {properties.length === 0 ? (
          <EmptyState
            title={t.landlord.properties.title}
            body={t.landlord.properties.none}
            ctaLabel={t.landlord.home.quickLinks.ledger}
            ctaHref="/landlord/ledger"
          />
        ) : (
          <section className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {properties.map((p) => (
                <li key={p.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs opacity-70">
                      {t.landlord.properties.tenants}: {p.tenants}
                    </div>
                  </div>
                  <div className="text-xs">{p.status === "ACTIVE" ? t.landlord.properties.active : t.landlord.properties.status}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </AppShell>
  );
}
