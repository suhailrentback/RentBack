"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { getAdminTransactions, formatPKR } from "@/lib/demo";

type PaymentMethod = "RAAST" | "CARD" | "WALLET";

export default function AdminTransactionsPage() {
  // Lang comes from <html lang=> via your app shell; just pick strings.en for labels
  const t = strings.en;

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);

  // Simple filters (status + last N days)
  const [statusFilter, setStatusFilter] = useState<"ALL" | "POSTED" | "PENDING" | "FAILED">(
    "ALL"
  );
  const [daysBack, setDaysBack] = useState<number>(30);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminTransactions(); // demo helper returns an array
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("admin/transactions: load error", e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);

    return rows.filter((r: any) => {
      const createdAt = new Date(r.createdAt || r.date || Date.now());
      const withinRange = createdAt >= cutoff;

      const status = (r.status || "").toUpperCase();
      const statusMatch = statusFilter === "ALL" ? true : status === statusFilter;

      return withinRange && statusMatch;
    });
  }, [rows, statusFilter, daysBack]);

  // Inline CSV builder (no csvForAdmin import)
  function downloadCSV() {
    const header = [
      "id",
      "createdAt",
      "party",
      "property",
      "amount_pkr",
      "method",
      "status",
    ];
    const lines = filtered.map((r: any) => {
      const when = new Date(r.createdAt || r.date || new Date().toISOString()).toISOString();
      const party = String(r.party ?? r.tenant ?? "").replaceAll('"', '""');
      const property = String(r.property ?? r.propertyName ?? "").replaceAll('"', '""');
      const amt = Number(r.amount ?? 0);

      return [
        r.id ?? "",
        when,
        `"${party}"`,
        `"${property}"`,
        String(amt), // machine-readable (no commas)
        r.method ?? "",
        String(r.status ?? "").toUpperCase(),
      ].join(",");
    });

    const csv = [header.join(","), ...lines].join("\n");
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
      <div className="max-w-md mx-auto p-4 pb-24">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold">Admin — Transactions</h1>
          <p className="text-sm opacity-70">
            Filter and export recent payments across the platform.
          </p>
        </div>

        {/* Filters + Actions */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-3 mb-4 bg-white dark:bg-white/5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="text-xs opacity-70 mb-1">Status</label>
              <select
                className="h-10 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="ALL">All</option>
                <option value="POSTED">Posted</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs opacity-70 mb-1">Range</label>
              <select
                className="h-10 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3"
                value={String(daysBack)}
                onChange={(e) => setDaysBack(Number(e.target.value))}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={downloadCSV}
              className="px-3 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Loading / Empty / List */}
        {loading ? (
          <div className="space-y-2">
            <RowSkel />
            <RowSkel />
            <RowSkel />
            <RowSkel />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center opacity-80">
            No transactions found for the selected filters.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r: any) => {
              const created = new Date(r.createdAt || r.date || Date.now());
              const party = r.party ?? r.tenant ?? "—";
              const property = r.property ?? r.propertyName ?? "—";
              const amount = Number(r.amount ?? 0);
              const method: PaymentMethod = (r.method as PaymentMethod) ?? "RAAST";
              const status = String(r.status ?? "").toUpperCase();

              return (
                <div
                  key={r.id ?? created.toISOString()}
                  className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{property}</div>
                      <div className="text-xs opacity-70">{created.toLocaleString()}</div>
                      <div className="text-xs opacity-70">Party: {party}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPKR(amount)}</div>
                      <div className="text-xs opacity-70">{method}</div>
                      <StatusPill status={status} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}

function RowSkel() {
  return <div className="h-16 rounded-xl bg-black/5 dark:bg-white/10 animate-pulse" />;
}

function StatusPill({ status }: { status: string }) {
  const base =
    "inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full border";
  if (status === "POSTED")
    return (
      <span className={`${base} border-emerald-500/40 text-emerald-600 dark:text-emerald-400`}>
        {status}
      </span>
    );
  if (status === "PENDING")
    return (
      <span className={`${base} border-amber-500/40 text-amber-600 dark:text-amber-400`}>
        {status}
      </span>
    );
  if (status === "FAILED")
    return (
      <span className={`${base} border-rose-500/40 text-rose-600 dark:text-rose-400`}>
        {status}
      </span>
    );
  return <span className={`${base} border-white/20 opacity-70`}>{status || "—"}</span>;
}
