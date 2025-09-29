"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { getAdminTransactions, csvForAdmin, formatPKR } from "@/lib/demo";

type Tx = ReturnType<typeof getAdminTransactions>[number];

function RowSkel() {
  return <div className="h-12 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />;
}

export default function AdminTransactionsPage() {
  const [lang, setLang] = useState<"en" | "ur">("en");
  const t = strings[lang];

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Tx[]>([]);
  const [q, setQ] = useState("");
  const [range, setRange] = useState<"30" | "90" | "all">("30");

  useEffect(() => {
    try {
      const l = localStorage.getItem("rb-lang");
      if (l === "en" || l === "ur") setLang(l);
    } catch {}
  }, []);

  useEffect(() => {
    // simulate fetch; data is localStorage-backed in demo
    setLoading(true);
    const data = getAdminTransactions();
    setRows(data);
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    const now = Date.now();
    const min =
      range === "all"
        ? 0
        : range === "90"
        ? now - 90 * 86400000
        : now - 30 * 86400000;

    return rows.filter((r) => {
      const okDate = new Date(r.createdAt).getTime() >= min;
      const needle = q.trim().toLowerCase();
      const okQ =
        !needle ||
        r.id.toLowerCase().includes(needle) ||
        r.party.toLowerCase().includes(needle) ||
        String(r.amount).includes(needle) ||
        r.method.toLowerCase().includes(needle) ||
        r.status.toLowerCase().includes(needle);
      return okDate && okQ;
    });
  }, [rows, q, range]);

  function downloadCSV() {
    const csv = csvForAdmin();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().slice(0, 10);
    a.download = `rentback-admin-transactions-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 pb-24">
        <header className="pt-3 pb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin · Transactions</h1>
          <button
            onClick={downloadCSV}
            className="px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Export CSV
          </button>
        </header>

        {/* Filters */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (id, counterparty, method)"
            className="col-span-2 h-10 rounded-lg px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
          />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="h-10 rounded-lg px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
          >
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* List */}
        <div className="space-y-2">
          {loading ? (
            <>
              <RowSkel />
              <RowSkel />
              <RowSkel />
            </>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm opacity-80">
              No transactions match your filters.
            </div>
          ) : (
            filtered.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    {/* FIX: use r.party (counterparty) instead of r.propertyName */}
                    <div className="font-medium">{r.party}</div>
                    <div className="text-xs opacity-70">
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatPKR(r.amount)}</div>
                    <div className="text-xs opacity-70">
                      {r.method} · {r.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Spacer for bottom nav */}
        <div className="h-6" />
      </div>
    </MobileAppShell>
  );
}
