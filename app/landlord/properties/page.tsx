"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import { strings } from "@/lib/i18n";

type DemoProperty = {
  id: string;
  name: string;
  tenants: number;
  expected: number; // PKR
  nextDueISO: string;
  status: "ACTIVE" | "INACTIVE";
};

export default function LandlordPropertiesPage() {
  const { lang, locale } = useLang();
  const t = strings[lang];

  const [properties, setProperties] = useState<DemoProperty[] | null>(null);

  useEffect(() => {
    // Demo data only (kept local so we don’t pull in other libs/types)
    const demo: DemoProperty[] = [
      {
        id: "p1",
        name: "12-A, Sunset Apartments",
        tenants: 3,
        expected: 225000,
        nextDueISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
        status: "ACTIVE",
      },
      {
        id: "p2",
        name: "17-C, Hill View Residency",
        tenants: 2,
        expected: 160000,
        nextDueISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
        status: "ACTIVE",
      },
    ];

    // Simulate load
    const timer = setTimeout(() => setProperties(demo), 350);
    return () => clearTimeout(timer);
  }, []);

  const labels = {
    title: t.landlord?.properties?.title ?? (lang === "ur" ? "جائیدادیں" : "Properties"),
    subtitle:
      t.landlord?.properties?.subtitle ??
      (lang === "ur" ? "اپنی جائیدادوں اور کرایہ داروں کا نظم کریں" : "Manage your properties and tenants"),
    none: t.landlord?.properties?.none ?? (lang === "ur" ? "کوئی جائیداد نہیں ملی۔" : "No properties found."),
    tenants: t.landlord?.properties?.tenants ?? (lang === "ur" ? "کرایہ دار" : "Tenants"),
    expected: t.landlord?.properties?.expected ?? (lang === "ur" ? "متوقع" : "Expected"),
    due: t.landlord?.properties?.due ?? (lang === "ur" ? "اگلی تاریخ" : "Next Due"),
    status: t.landlord?.properties?.status ?? (lang === "ur" ? "حیثیت" : "Status"),
    active: t.landlord?.properties?.active ?? (lang === "ur" ? "فعال" : "Active"),
  };

  return (
    <AppShell role="landlord" title={labels.title}>
      <div className="p-4 space-y-4">
        <p className="text-sm opacity-80">{labels.subtitle}</p>

        <section className="space-y-3">
          {properties === null ? (
            <>
              <div className="h-16 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="h-16 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
            </>
          ) : properties.length === 0 ? (
            <div className="text-sm opacity-70">{labels.none}</div>
          ) : (
            properties.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-3 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs opacity-70 mt-0.5">
                    {labels.tenants}: {p.tenants} • {labels.status}:{" "}
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                      {labels.active}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-right">
                  <div>
                    <div className="text-xs opacity-70">{labels.expected}</div>
                    <div className="font-semibold">
                      {new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: "PKR",
                        maximumFractionDigits: 0,
                      }).format(p.expected)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs opacity-70">{labels.due}</div>
                    <div className="font-medium">
                      {new Date(p.nextDueISO).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </AppShell>
  );
}
