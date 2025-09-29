"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MobileAppShell from "@/components/MobileAppShell";
import { strings } from "@/lib/i18n";
import { formatPKR, getTenantPayments } from "@/lib/demo"; // getTenantPayments returns demo payments array

type DemoPayment = {
  id: string;
  createdAt?: string; // some demo items might be missing fields
  amount?: number;
  method?: string;   // "RAAST" | "CARD" | "WALLET"
  status?: string;   // "PENDING" | "POSTED" | "FAILED"
  property?: string; // property name
  landlord?: string; // landlord/party label
  reference?: string;
  memo?: string;
};

export default function TenantReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const t = strings.en;

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<DemoPayment | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // Pull from demo store
        const all = await getTenantPayments();
        const found = Array.isArray(all) ? all.find((p: any) => p?.id === id) : null;
        setPayment(found ?? null);
      } catch (e) {
        console.warn("receipt: load error", e);
        setPayment(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const createdAt: string = useMemo(() => {
    if (!payment) return new Date().toISOString();
    // IMPORTANT: never use payment.date (it does not exist in our demo type)
    return (payment as any)?.createdAt || new Date().toISOString();
  }, [payment]);

  const propertyName = payment?.property || (payment as any)?.propertyName || payment?.landlord || "Property";
  const method = (payment?.method || "RAAST").toUpperCase();
  const status = (payment?.status || "POSTED").toUpperCase();
  const amount = Number(payment?.amount || 0);
  const reference = (payment as any)?.reference || "RB-DEMO-REF";
  const memo = (payment as any)?.memo || "Rent payment";

  if (loading) {
    return (
      <MobileAppShell>
        <div className="max-w-md mx-auto p-4 pb-24 space-y-3">
          <div className="h-8 w-40 rounded bg-black/5 dark:bg-white/10 animate-pulse" />
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 space-y-2">
            <div className="h-6 rounded bg-black/5 dark:bg-white/10 animate-pulse" />
            <div className="h-6 rounded bg-black/5 dark:bg-white/10 animate-pulse" />
            <div className="h-6 rounded bg-black/5 dark:bg-white/10 animate-pulse" />
          </div>
        </div>
      </MobileAppShell>
    );
  }

  if (!payment) {
    return (
      <MobileAppShell>
        <div className="max-w-md mx-auto p-4 pb-24">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-center">
            <div className="text-lg font-semibold mb-1">Receipt not found</div>
            <div className="text-sm opacity-70 mb-4">This ID doesn’t exist in demo payments.</div>
            <button
              onClick={() => router.push("/tenant/pay")}
              className="px-4 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
            >
              Go to Pay
            </button>
          </div>
        </div>
      </MobileAppShell>
    );
  }

  return (
    <MobileAppShell>
      <div className="max-w-md mx-auto p-4 pb-24">
        <h1 className="text-xl font-bold mb-3">Payment Receipt</h1>

        {/* Printable card */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-5 print:border-0 print:p-0">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">RentBack</div>
            <div className="text-xs opacity-70">Demo — Not a real payment</div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <L label="Date/Time" value={new Date(createdAt).toLocaleString()} />
            <L label="Status" value={status} />
            <L label="Property" value={propertyName} />
            <L label="Method" value={method} />
            <L label="Amount" value={formatPKR(amount)} />
            <L label="Reference" value={reference} />
            <L label="Memo" value={memo} />
            <L label="Receipt ID" value={payment.id} />
          </div>

          {/* Fake Raast QR block (visual only) */}
          <div className="mt-5 rounded-xl border border-black/10 dark:border-white/10 p-4 text-center">
            <div className="text-xs opacity-70 mb-2">Raast QR (demo)</div>
            <div className="mx-auto h-28 w-28 bg-black/5 dark:bg-white/10 rounded"></div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 h-10 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
          >
            Print / Save PDF
          </button>
          <button
            onClick={() => router.push("/tenant")}
            className="px-4 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </MobileAppShell>
  );
}

function L({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] opacity-70">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
