"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import EmptyState from "@/components/EmptyState";
import { ListSkeleton } from "@/components/Skeletons";
import { strings, dirFor, type Lang } from "@/lib/i18n";
import { formatPKR } from "@/lib/demo";

type DemoProperty = {
  name: string;
  tenant: string;
  rentPKR: number;
  nextDueISO: string;
  active: boolean;
};

function getLang(): Lang {
  try {
    const l = localStorage.getItem("rb-lang");
    if (l === "ur" || l === "en") return l;
  } catch {}
  return (process.env.NEXT_PUBLIC_DEFAULT_LANG as Lang) || "en";
}

function fallbackProperties(): DemoProperty[] {
  const today = new Date();
  const nextDue = new Date(today.getFullYear(), today.getMonth(), 28).toISOString();
  return [
    { name: "Apartment 12, DHA Phase 6", tenant: "Demo Tenant", rentPKR: 65000, nextDueISO: nextDue, active: true },
    { name: "Shop 4, MM Alam Road", tenant: "Demo Tenant 2", rentPKR: 85000, nextDueISO: nextDue, active: true },
  ];
}

function loadProperties(): DemoProperty[] {
  try {
    const raw = localStorage.getItem("rb-properties");
    if (!raw) return fallbackProperties();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || !arr.length) return fallbackProperties();
    return arr;
  } catch {
    return fallbackProperties();
  }
}

export default function LandlordPropertiesPage() {
  const lang = getLang();
  const t = strings[lang];
  const dir = dirFor(lang);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<DemoProperty[]>([]);

  useEffect(() => {
    setLoading(true);
    const props = loadProperties();
    setRows(props);
    setTimeout(() => setLoading(false), 300);
  }, []);

  const content = useMemo(() => {
    if (loading) return <ListSkeleton rows={4} />;
    if (!rows.length) {
      return (
        <EmptyState
          title={t.landlord.properties.title}
          body={t.landlord.properties.none}
          ctaLabel={t.landlord.home.quickLinks.ledger}
          ctaHref="/landlord/ledger"
        />
      );
    }
    return (
      <div className="space-y-3">
        {rows.map((r, idx) => (
          <div key={idx} className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs opacity-70">
                  {t.landlord.properties.tenant}: {r.tenant}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70">{t.landlord.properties.expected}</div>
                <div className="font-semibold">{formatPKR(r.rentPKR)}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs opacity-80">
              <div>
                {t.landlord.properties.due}: {new Date(r.nextDueISO).toLocaleDateString()}
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white">{t.landlord.properties.status}: {t.landlord.properties.active}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, rows, lang]);

  return (
    <MobileAppShell>
      <main className="p-4 space-y-4" style={{ direction: dir }}>
        <div>
          <h1 className="text-xl font-semibold">{t.landlord.properties.title}</h1>
          <p className="text-xs opacity-70">{t.landlord.properties.subtitle}</p>
        </div>
        {content}
      </main>
    </MobileAppShell>
  );
}
