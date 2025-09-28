"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type P = {
  id: string; createdAt: string; tenantEmail: string; landlord: string;
  amountPKR: number; method: string; status: string; ref: string; memo?: string;
};

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [p, setP] = useState<P | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/tenant/payments/${id}`, { cache: "no-store" })
      .then(r => r.json())
      .then(d => setP(d.item ?? null))
      .finally(()=> setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-md mx-auto p-4 text-sm opacity-70">Loading…</div>;
  if (!p) return <div className="max-w-md mx-auto p-4 text-sm opacity-70">Not found.</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Payment Receipt</h1>
        <button
          onClick={()=> window.print()}
          className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
        >
          Print / Save PDF
        </button>
      </div>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
        <Row k="Receipt #" v={p.ref} mono />
        <Row k="Date" v={new Date(p.createdAt).toLocaleString()} />
        <Row k="Tenant" v={p.tenantEmail} />
        <Row k="Landlord / Property" v={p.landlord} />
        <Row k="Amount" v={`₨ ${p.amountPKR.toLocaleString("en-PK")}`} />
        <Row k="Method" v={p.method} />
        <Row k="Status" v={p.status} />
        {p.memo ? <Row k="Memo" v={p.memo} /> : null}
      </div>

      <div className="mt-4">
        <button
          onClick={()=> router.back()}
          className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg_white/10 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0 border-black/10 dark:border-white/10">
      <div className="text-sm opacity-70">{k}</div>
      <div className={`text-sm ${mono ? "font-mono" : ""}`}>{v}</div>
    </div>
  );
}
