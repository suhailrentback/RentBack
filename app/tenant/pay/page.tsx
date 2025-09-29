"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileAppShell from "@/components/MobileAppShell";
import { createDemoPayment, formatPKR, getTenantPayments, markPaymentSent, type DemoPayment, ensureSeed } from "@/lib/demo";

export default function TenantPayPage() {
  const [list, setList] = useState<DemoPayment[]>([]);
  const [amount, setAmount] = useState<number>(65000);
  const [prop, setProp] = useState("Shahbaz Residency A-2");
  const [method, setMethod] = useState<"RAAST"|"CARD"|"WALLET">("RAAST");

  useEffect(() => { ensureSeed(); setList(getTenantPayments()); }, []);
  function refresh() { setList(getTenantPayments()); }

  function create() {
    try {
      if (!amount || !prop) { alert("Enter amount and property"); return; }
      const id = createDemoPayment({ amount, property: prop, method });
      refresh();
      alert(`Demo payment created: ${id}`);
    } catch (e:any) {
      alert(e?.message || "Failed to create (demo)");
    }
  }
  function mark(id:string){ try { markPaymentSent(id); refresh(); } catch {} }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Pay Rent</h1>
        <p className="text-sm opacity-70">Demo Mode — no real charges</p>

        <div className="mt-5 grid gap-3">
          <input className="h-11 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
                 type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||"0"))} placeholder="Amount (PKR)"/>
          <input className="h-11 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
                 value={prop} onChange={e=>setProp(e.target.value)} placeholder="Landlord / Property"/>
          <select className="h-11 px-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
                  value={method} onChange={e=>setMethod(e.target.value as any)}>
            <option value="RAAST">Raast</option>
            <option value="CARD">Card</option>
            <option value="WALLET">Wallet</option>
          </select>
          <button type="button" onClick={create} className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white">Create Payment (Demo)</button>
        </div>

        <h2 className="mt-8 mb-3 font-semibold">Recent</h2>
        <div className="grid gap-2">
          {list.map(p => (
            <div key={p.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.property}</div>
                  <div className="text-xs opacity-70">{new Date(p.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPKR(p.amount)}</div>
                  <div className="text-xs opacity-70">{p.method} • {p.status}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={()=>mark(p.id)} className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">Mark as Sent</button>
                <Link href={`/tenant/receipt/${p.id}`} className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">View Receipt</Link>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="text-sm opacity-70">No payments yet — create one above.</div>}
        </div>
      </div>
    </MobileAppShell>
  );
}
