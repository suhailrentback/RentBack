"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";

type Lang = "en" | "ur";

type Method = "RAAST" | "BANK" | "JAZZCASH";
type DemoPayment = {
  id: string;
  createdAt: string; // ISO
  property: string;
  landlord?: string;
  amount: number;
  method: Method;
  status: "PENDING" | "SENT";
};
type Property = {
  id: string;
  name: string;
  landlordName?: string;
  expectedRent?: number;
};

const fmtPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

function csvDownload(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function getJSON<T>(key: string, fallback: T): T {
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
    }
  } catch {}
  return fallback;
}

const FALLBACK_PROPERTIES: Property[] = [
  { id: "p1", name: "Kh-e-Ittehad Apt 4B", landlordName: "Ali Raza", expectedRent: 65000 },
  { id: "p2", name: "DHA Phase 6 House", landlordName: "Ali Raza", expectedRent: 120000 },
];

const FALLBACK_PAYMENTS: DemoPayment[] = [
  {
    id: "tx1",
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    property: "Kh-e-Ittehad Apt 4B",
    landlord: "Ali Raza",
    amount: 60000, // under expected (65k)
    method: "RAAST",
    status: "SENT",
  },
  {
    id: "tx2",
    createdAt: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
    property: "DHA Phase 6 House",
    landlord: "Ali Raza",
    amount: 120000, // exact
    method: "BANK",
    status: "SENT",
  },
];

export default function AdminDiscrepanciesPage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const l = document.documentElement.getAttribute("lang");
      if (l === "ur" || l === "en") setLang(l);
    } catch {}
  }, []);
  const t = strings[lang] as any;
  const dir = lang === "ur" ? "rtl" : "ltr";

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [properties, setProps] = useState<Property[]>([]);
  useEffect(() => {
    setPayments(getJSON<DemoPayment[]>("rb-payments", FALLBACK_PAYMENTS));
    setProps(getJSON<Property[]>("rb-properties", FALLBACK_PROPERTIES));
  }, []);

  const rows = useMemo(() => {
    // join payments with properties to compare against expectedRent
    return payments
      .filter((p) => p.status === "SENT")
      .map((p) => {
        const prop = properties.find((x) => x.name === p.property);
        const expected = prop?.expectedRent ?? 0;
        const short = expected > 0 ? Math.max(0, expected - p.amount) : 0;
        return {
          id: p.id,
          createdAt: p.createdAt,
          property: p.property,
          tenant: "Tenant", // demo label
          expected,
          paid: p.amount,
          shortfall: short,
        };
      })
      .filter((r) => r.expected > 0 && r.paid < r.expected)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [payments, properties]);

  function exportCSV() {
    const header = ["id", "date_iso", "property", "expected_pkr", "paid_pkr", "shortfall_pkr"];
    const data = rows.map((r) => [r.id, r.createdAt, r.property, String(r.expected), String(r.paid), String(r.shortfall)]);
    csvDownload("admin_discrepancies.csv", [header, ...data]);
  }

  return (
    <MobileAppShell>
      <div className="p-4" style={{ direction: dir }}>
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {t?.admin?.discrepancies?.title ?? "Discrepancy Report"}
            </h1>
            <button
              onClick={exportCSV}
              className="text-sm px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t?.admin?.discrepancies?.exportCSV ?? "Export CSV"}
            </button>
          </div>
          <p className="text-sm opacity-70">
            {t?.admin?.discrepancies?.subtitle ?? "Payments below expected rent (demo)"}
          </p>

          {rows.length === 0 ? (
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-center">
              <div className="text-sm">
                {t?.admin?.discrepancies?.empty ?? "No discrepancies found."}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{r.property}</div>
                      <div className="text-xs opacity-70">
                        {new Date(r.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-70">
                        {(t?.admin?.discrepancies?.expected ?? "Expected") + ":"} {fmtPKR(r.expected)}
                      </div>
                      <div className="text-xs opacity-70">
                        {(t?.admin?.discrepancies?.paid ?? "Paid") + ":"} {fmtPKR(r.paid)}
                      </div>
                      <div className="mt-1 font-semibold text-red-600 dark:text-red-400">
                        {(t?.admin?.discrepancies?.shortfall ?? "Shortfall") + ":"} {fmtPKR(r.shortfall)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              href="/admin"
              className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              ← Admin
            </Link>
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}
