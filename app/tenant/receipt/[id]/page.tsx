"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import MobileAppShell from "@/components/MobileAppShell";
import { getPaymentById, formatPKR } from "@/lib/demo";

export default function ReceiptPage() {
  const { id } = useParams<{id:string}>();
  const p = getPaymentById(id);
  if (!p) {
    return (
      <MobileAppShell>
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
            <div className="font-semibold">Receipt not found</div>
            <Link href="/tenant" className="inline-block mt-3 text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">← Home</Link>
          </div>
        </div>
      </MobileAppShell>
    );
  }
  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto px-4 py-6 print:px-0">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-white/5 print:bg-white print:text-black">
          <div className="text-xl font-bold">Payment Receipt</div>
          <div className="text-xs opacity-70 mt-0.5">Demo — Not a real payment</div>
          <div className="mt-5 grid gap-2 text-sm">
            <Row k="Reference" v={p.id}/>
            <Row k="Date" v={new Date(p.createdAt).toLocaleString()}/>
            <Row k="Property" v={p.property}/>
            <Row k="Method" v={p.method}/>
            <Row k="Amount" v={formatPKR(p.amount)}/>
            <Row k="Status" v={p.status}/>
          </div>
          <div className="mt-6 flex gap-2">
            <Link href="/tenant" className="text-sm px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">← Home</Link>
            <button type="button" onClick={()=>window.print()} className="text-sm px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">Print / Save PDF</button>
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}
function Row({k,v}:{k:string; v:string}) {
  return <div className="flex items-center justify-between"><span className="opacity-70">{k}</span><span className="font-medium">{v}</span></div>;
}
