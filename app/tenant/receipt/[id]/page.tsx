// app/tenant/receipt/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getTenantContext, formatPKR } from "@/lib/demo";
import { strings } from "@/lib/i18n";

function FakeQR({ seed }: { seed: string }) {
  // Tiny fake QR: deterministic grid from string hash
  const size = 120, cells = 21;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const bits = Array.from({ length: cells * cells }, (_, i) => ((h >> (i % 31)) & 1) === 1);
  const cell = size / cells;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff" />
      {bits.map((b, i) => {
        if (!b) return null;
        const x = (i % cells) * cell;
        const y = Math.floor(i / cells) * cell;
        return <rect key={i} x={x} y={y} width={cell - 1} height={cell - 1} fill="#111" />;
      })}
    </svg>
  );
}

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [lang, setLang] = useState<"en" | "ur">("en");
  useEffect(() => { const l = localStorage.getItem("rb-lang"); if (l === "ur" || l === "en") setLang(l); }, []);
  const t = strings[lang];

  const ctx = useMemo(() => getTenantContext(), []);
  const p = ctx.payments.find(x => x.id === id);

  if (!p) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="p-6 rounded-xl border border-black/10 dark:border-white/10">
          <div className="font-semibold mb-2">Receipt not found</div>
          <button onClick={() => router.back()} className="h-10 px-4 rounded-lg border">Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 print:p-10 print:bg-white">
      <div className="max-w-3xl mx-auto border border-black/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">RentBack</div>
          <FakeQR seed={p.raastRef} />
        </div>

        <h1 className="mt-6 text-2xl font-bold">{t.tenant.receipt.title}</h1>
        <p className="text-sm opacity-70">{t.tenant.receipt.disclaimer}</p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border border-black/10 p-4">
            <div className="text-sm opacity-70">{t.tenant.receipt.date}</div>
            <div className="font-medium">{new Date(p.createdAt).toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-black/10 p-4">
            <div className="text-sm opacity-70">{t.tenant.receipt.ref}</div>
            <div className="font-medium">{p.raastRef}</div>
          </div>
          <div className="rounded-xl border border-black/10 p-4">
            <div className="text-sm opacity-70">{t.tenant.receipt.to}</div>
            <div className="font-medium">{p.propertyName}</div>
          </div>
          <div className="rounded-xl border border-black/10 p-4">
            <div className="text-sm opacity-70">{t.tenant.receipt.method}</div>
            <div className="font-medium">{p.method}</div>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
          <div className="text-sm opacity-70">{t.tenant.pay.amount}</div>
          <div className="text-3xl font-extrabold">{formatPKR(p.amount)}</div>
          <div className="mt-1 text-sm opacity-70">{t.tenant.receipt.status}: {p.status}</div>
        </div>

        <div className="mt-8 flex gap-2 no-print">
          <button onClick={() => window.print()} className="h-11 px-4 rounded-xl bg-emerald-600 text-white">{t.tenant.receipt.print}</button>
          <button onClick={() => window.history.back()} className="h-11 px-4 rounded-xl border">Close</button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
}
