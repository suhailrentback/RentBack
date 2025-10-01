"use client";

import { useEffect, useMemo, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { strings, type Lang } from "@/lib/i18n";
import { loadPayments, formatPKR } from "@/lib/demo";

type Method = "RAAST" | "BANK" | "JAZZCASH";
type Status = "PENDING" | "SENT";
type DemoPayment = {
  id: string;
  createdAt: string;
  property: string;
  amount: number;
  method: Method;
  status: Status;
};

function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replaceAll(`"`, `""`)}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function LandlordPayoutsPage() {
  // Keep language simple; wire to cookie/context later
  const lang: Lang = "en";
  const tAll = strings[lang];
  const tLL = tAll.landlord;
  const tHome = tLL.home; // where payouts/discrepancies objects live in your i18n

  const [payments, setPayments] = useState<DemoPayment[]>([]);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  // Only settled (SENT) show up in payouts
  const sent = useMemo(
    () => payments.filter((p) => p.status === "SENT"),
    [payments]
  );

  const total30d = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return sent
      .filter((p) => new Date(p.createdAt).getTime() >= cutoff)
      .reduce((sum, p) => sum + p.amount, 0);
  }, [sent]);

  const exportCSV = () => {
    const header = ["ID", "Date", "Property", "Amount (PKR)", "Method"];
    const rows = sent.map((p) => [
      p.id,
      new Date(p.createdAt).toLocaleString(),
      p.property,
      String(p.amount),
      p.method,
    ]);
    downloadCSV("payouts.csv", [header, ...rows]);
  };

  return (
    <MobileAppShell>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {/* was t.payoutsCard (no longer exists). Now use landlord.home.payouts.title */}
            {tHome?.payouts?.title ?? "Payouts"}
          </h1>
          <button
            onClick={exportCSV}
            className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
          >
            CSV
          </button>
        </div>

        {/* Meta / Next settlement hint (optional copy present in your i18n) */}
        {tHome?.payouts?.next && tHome?.payouts?.day ? (
          <div className="text-xs opacity-70">
            {tHome.payouts.next}: {tHome.payouts.day}
          </div>
        ) : null}

        {/* Total last 30 days */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-white/5">
          <div className="text-xs opacity-70">
            {tAll.landlord?.home?.rentCollected ??
              "Rent collected (30 days)"}
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {formatPKR(total30d)}
          </div>
        </div>

        {/* List of settled payments */}
        {sent.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-sm opacity-80">
            {tHome?.payouts?.none ?? "No settled payouts yet."}
          </div>
        ) : (
          <ul className="space-y-2">
            {sent.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.property}</div>
                    <div className="text-xs opacity-70">
                      {new Date(p.createdAt).toLocaleString()} · {p.method}
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    {formatPKR(p.amount)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MobileAppShell>
  );
}
