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
  property: string;  // property name
  landlord?: string; // optional label
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

// -------- helpers
const fmtPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

function startOfWeek(d = new Date()) {
  const x = new Date(d);
  const day = x.getDay(); // 0 = Sun
  const diff = (day + 6) % 7; // make Monday=0
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

function toISO(d: Date) {
  const x = new Date(d);
  return x.toISOString();
}

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

// safe localStorage getters with demo fallbacks
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
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    property: "Kh-e-Ittehad Apt 4B",
    landlord: "Ali Raza",
    amount: 65000,
    method: "RAAST",
    status: "SENT",
  },
  {
    id: "tx2",
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    property: "DHA Phase 6 House",
    landlord: "Ali Raza",
    amount: 120000,
    method: "BANK",
    status: "SENT",
  },
  {
    id: "tx3",
    createdAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    property: "Kh-e-Ittehad Apt 4B",
    landlord: "Ali Raza",
    amount: 65000,
    method: "RAAST",
    status: "SENT",
  },
];

export default function AdminPayoutsPage() {
  const [lang, setLang] = useState<Lang>("en");

  // Load user prefs from <html> (your app sets this elsewhere)
  useEffect(() => {
    try {
      const l = document.documentElement.getAttribute("lang");
      if (l === "ur" || l === "en") setLang(l);
    } catch {}
  }, []);

  const t = strings[lang] as any;
  const dir = lang === "ur" ? "rtl" : "ltr";

  // Load demo data
  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [properties, setProps] = useState<Property[]>([]);

  useEffect(() => {
    setPayments(getJSON<DemoPayment[]>("rb-payments", FALLBACK_PAYMENTS));
    setProps(getJSON<Property[]>("rb-properties", FALLBACK_PROPERTIES));
  }, []);

  const weekStart = startOfWeek();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const { rows, total } = useMemo(() => {
    // Filter SENT payments within this week
    const withinWeek = payments.filter((p) => {
      const d = new Date(p.createdAt);
      return p.status === "SENT" && d >= weekStart && d < weekEnd;
    });

    // group by landlord
    const map = new Map<string, { amount: number; count: number }>();
    withinWeek.forEach((p) => {
      // landlord label from payment or property
      const prop = properties.find((x) => x.name === p.property);
      const landlord = p.landlord || prop?.landlordName || "Landlord";
      const cur = map.get(landlord) || { amount: 0, count: 0 };
      cur.amount += p.amount;
      cur.count += 1;
      map.set(landlord, cur);
    });

    const rows = Array.from(map.entries()).map(([landlord, v]) => ({
      landlord,
      amount: v.amount,
      count: v.count,
    }));
    const total = rows.reduce((s, r) => s + r.amount, 0);
    return { rows, total };
  }, [payments, properties]);

  function exportCSV() {
    const header = ["landlord", "week_start_iso", "amount_pkr", "count"];
    const wk = toISO(weekStart);
    const data = rows.map((r) => [r.landlord, wk, String(r.amount), String(r.count)]);
    csvDownload("admin_payouts.csv", [header, ...data]);
  }

  return (
    <MobileAppShell>
      <div className="p-4" style={{ direction: dir }}>
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {t?.admin?.payouts?.title ?? "Payouts Overview"}
            </h1>
            <button
              onClick={exportCSV}
              className="text-sm px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {t?.admin?.payouts?.exportCSV ?? "Export CSV"}
            </button>
          </div>
          <p className="text-sm opacity-70">
            {t?.admin?.payouts?.subtitle ?? "Weekly settlements by landlord (demo)"} —{" "}
            {(t?.admin?.payouts?.weekOf ?? "Week of") + " "}
            {weekStart.toLocaleDateString()}
          </p>

          {/* Total card */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
            <div className="text-xs opacity-70">
              {t?.admin?.payouts?.totalSettled ?? "Total Settled (This Week)"}
            </div>
            <div className="text-2xl font-bold mt-1">{fmtPKR(total)}</div>
          </div>

          {/* Rows */}
          {rows.length === 0 ? (
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-center">
              <div className="text-sm">
                {t?.admin?.payouts?.empty ?? "No settlements this week yet."}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {rows.map((r) => (
                <div
                  key={r.landlord}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm opacity-70">
                      {t?.admin?.payouts?.landlord ?? "Landlord"}
                    </div>
                    <div className="font-medium">{r.landlord}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">
                      {(t?.admin?.payouts?.count ?? "Count") + ":"} {r.count}
                    </div>
                    <div className="font-semibold">{fmtPKR(r.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to Admin home quick link */}
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
