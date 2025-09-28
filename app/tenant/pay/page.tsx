"use client";
import { useEffect, useState } from "react";

type Row = {
  id: string; createdAt: string; landlord: string; amountPKR: number;
  method: "RAAST" | "CARD" | "WALLET"; status: string; ref: string; memo?: string;
};

export default function PayPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [landlord, setLandlord] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [method, setMethod] = useState<Row["method"]>("RAAST");
  const [memo, setMemo] = useState("");

  function load() {
    setLoading(true);
    fetch("/api/tenant/payments", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setRows(d.items ?? []))
      .finally(()=> setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function createPayment() {
    if (!landlord || !amount) return alert("Enter landlord and amount");
    setSubmitting(true);
    try {
      const r = await fetch("/api/tenant/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantEmail: "tenant@rentback.app",
          landlord,
          amountPKR: Number(amount),
          method,
          memo,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      setLandlord(""); setAmount(""); setMemo("");
      load();
    } catch (e:any) {
      alert(e.message ?? "Error");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirm(id: string) {
    await fetch(`/api/tenant/payments/${id}/confirm`, { method: "POST" });
    load();
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-3">Pay Rent</h1>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 mb-6">
        <div className="grid gap-3">
          <input
            className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            placeholder="Landlord / Property"
            value={landlord}
            onChange={e=> setLandlord(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            placeholder="Amount (PKR)"
            inputMode="numeric"
            value={amount}
            onChange={e=> setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <select
            className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            value={method}
            onChange={e=> setMethod(e.target.value as Row["method"])}
          >
            <option value="RAAST">Raast</option>
            <option value="CARD">Card</option>
            <option value="WALLET">Wallet</option>
          </select>
          <input
            className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
            placeholder="Memo (optional)"
            value={memo}
            onChange={e=> setMemo(e.target.value)}
          />
          <button
            onClick={createPayment}
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
          >
            {submitting ? "Creating…" : "Create Payment (Demo)"}
          </button>
        </div>
      </div>

      <h2 className="text-sm font-medium opacity-80 mb-2">Recent</h2>
      {loading ? (
        <p className="text-sm opacity-70">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm opacity-70">No payments yet.</p>
      ) : (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
          {rows.map(r => (
            <div
              key={r.id}
              className="px-4 py-3 border-b last:border-0 border-black/10 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{r.landlord}</div>
                  <div className="text-xs opacity-70">{new Date(r.createdAt).toLocaleString()} • {r.method} • {r.status}</div>
                </div>
                <div className="text-sm font-semibold">₨ {r.amountPKR.toLocaleString("en-PK")}</div>
              </div>
              {r.status === "PENDING" && (
                <div className="mt-2">
                  <button
                    onClick={()=> confirm(r.id)}
                    className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-xs"
                  >
                    Mark as Sent / Confirm
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
