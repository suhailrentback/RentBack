"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { getAdminTransactions, csvForAdmin, formatPKR } from "@/lib/demo";

type Lang = "en" | "ur";

type PaymentMethod = "RAAST" | "CARD" | "WALLET" | string;

type AdminTx = {
  id: string;
  createdAt?: string; // ISO
  date?: string; // sometimes demo uses 'date'
  amount: number;
  method: PaymentMethod;
  status: string; // "POSTED" | "PENDING" | "FAILED"
  party?: string; // counterparty (tenant / landlord)
  property?: string;
  propertyName?: string; // tolerate alt key
};

function RowSkel() {
  return <div className="h-16 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />;
}

function Empty({ lang }: { lang: Lang }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-80">
      {lang === "en"
        ? "No transactions for this range. Try adjusting filters or export CSV for a wider window."
        : "اس مدت کے لیے کوئی ٹرانزیکشن نہیں۔ فلٹرز تبدیل کریں یا CSV ایکسپورٹ آزمائیں۔"}
    </div>
  );
}

export default function AdminTransactionsPage() {
  // language sync with the rest of the app
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    try {
      const l = localStorage.getItem("rb-lang");
      if (l === "en" || l === "ur") setLang(l);
    } catch {}
  }, []);
  const t = strings[lang];

  // simple filters (client-side over demo data)
  const [range, setRange] = useState<"30" | "90" | "all">("30");
  const [method, setMethod] = useState<"ALL" | "RAAST" | "CARD" | "WALLET">("ALL");
  const [search, setSearch] = useState("");

  // load transactions from demo memory
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<AdminTx[]>([]);

  useEffect(() => {
    setLoading(true);
    // simulate async to show skeletons nicely
    setTimeout(() => {
      const data = getAdminTransactions() as AdminTx[];
      setRows(Array.isArray(data) ? data : []);
      setLoading(false);
    }, 250);
  }, []);

  // derived + filtered
  const filtered = useMemo(() => {
    const now = new Date();
    const daysLimit = range === "all" ? Infinity : range === "90" ? 90 : 30;

    return rows.filter((r) => {
      // normalize fields
      const when = new Date(r.createdAt || (r.date as string) || now.toISOString());
      const within = (now.getTime() - when.getTime()) / (1000 * 60 * 60 * 24) <= daysLimit;

      const methodOk = method === "ALL" ? true : (r.method || "").toUpperCase() === method;
      const q = search.trim().toLowerCase();
      const name = (r.party || "").toLowerCase();
      const prop = (r.property || r.propertyName || "").toLowerCase();

      const searchOk = q === "" || name.includes(q) || prop.includes(q) || (r.id || "").toLowerCase().includes(q);

      return within && methodOk && searchOk;
    });
  }, [rows, range, method, search]);

  // CSV export (respects the same filtered set)
  function downloadCSV() {
    const csv = csvForAdmin(filtered as any); // demo helper returns a CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `rentback-admin-transactions-${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 pb-24">
        {/* Title + actions */}
        <div className="pt-4 pb-3 flex items-center justify-between">
          <div className="text-lg font-semibold">
            {lang === "en" ? "Transactions" : "ٹرانزیکشنز"}
          </div>
          <button
            onClick={downloadCSV}
            className="px-3 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {lang === "en" ? "Export CSV" : "CSV ایکسپورٹ"}
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-white/5 mb-4 grid grid-cols-3 gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="col-span-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent text-sm"
            aria-label="Date range"
          >
            <option value="30">{lang === "en" ? "Last 30d" : "آخری 30 دن"}</option>
            <option value="90">{lang === "en" ? "Last 90d" : "آخری 90 دن"}</option>
            <option value="all">{lang === "en" ? "All time" : "ہمیشہ"}</option>
          </select>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            className="col-span-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent text-sm"
            aria-label="Method"
          >
            <option value="ALL">{lang === "en" ? "All methods" : "تمام طریقے"}</option>
            <option value="RAAST">Raast</option>
            <option value="CARD">{lang === "en" ? "Card" : "کارڈ"}</option>
            <option value="WALLET">{lang === "en" ? "Wallet" : "والیٹ"}</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "en" ? "Search…" : "تلاش…"}
            className="col-span-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent text-sm"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {loading && (
            <>
              <RowSkel />
              <RowSkel />
              <RowSkel />
            </>
          )}

          {!loading && filtered.length === 0 && <Empty lang={lang} />}

          {!loading &&
            filtered.map((r) => {
              const when = new Date(r.createdAt || (r.date as string) || new Date().toISOString());
              const title = r.property || r.propertyName || r.party || "—";
              const amt = Number(r.amount || 0);

              const badgeColor =
                r.status === "POSTED"
                  ? "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                  : r.status === "FAILED"
                  ? "bg-rose-600/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300"
                  : "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300";

              return (
                <div
                  key={r.id}
                  className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{title}</div>
                      <div className="text-xs opacity-70">{when.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPKR(amt)}</div>
                      <div className="text-xs opacity-70">{r.method}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className={`text-[11px] px-2 py-1 rounded-md ${badgeColor}`}>
                      {r.status}
                    </div>
                    <div className="text-[11px] opacity-70 font-mono truncate max-w-[50%]">
                      {r.id}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </MobileAppShell>
  );
}
