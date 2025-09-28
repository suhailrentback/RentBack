// app/tenant/rewards/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function TenantRewards() {
  return (
    <div className="space-y-4">
      <ScreenSection title="Your balance">
        <div className="text-3xl font-bold">12,500 pts</div>
        <div className="opacity-70 text-sm mt-1">Earned this month: 250 pts</div>
      </ScreenSection>

      <ScreenSection title="Redeem">
        <div className="grid grid-cols-2 gap-3">
          {["Food", "Travel", "Shopping", "Bill credit"].map((c) => (
            <button key={c} className="rounded-xl px-4 py-3 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
              {c}
            </button>
          ))}
        </div>
      </ScreenSection>
    </div>
  );
}
