// app/tenant/pay/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function TenantPay() {
  return (
    <div className="space-y-4">
      <ScreenSection title="Pay your rent">
        <form className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="block mb-1 opacity-70">Amount (PKR)</span>
              <input type="number" defaultValue={120000} className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" />
            </label>
            <label className="text-sm">
              <span className="block mb-1 opacity-70">Reference</span>
              <input type="text" placeholder="RB-Ref-2025-10" className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" />
            </label>
          </div>

          <label className="text-sm block">
            <span className="block mb-1 opacity-70">Method</span>
            <select className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2">
              <option>Raast (Bank Transfer)</option>
              <option>Debit/Credit Card</option>
              <option>Wallet</option>
            </select>
          </label>

          <button type="submit" className="w-full rounded-xl px-4 py-3 font-semibold bg-emerald-600 text-white hover:bg-emerald-700">
            Submit payment
          </button>
        </form>
      </ScreenSection>

      <ScreenSection title="Recent receipts">
        <ul className="text-sm space-y-2">
          <li>• Oct 01 · PKR 120,000 · Raast · RB-23091</li>
          <li>• Sep 01 · PKR 120,000 · Card · RB-22760</li>
        </ul>
      </ScreenSection>
    </div>
  );
}
