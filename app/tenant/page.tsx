// app/tenant/page.tsx
import Link from "next/link";
import ScreenSection from "@/components/mobile/ScreenSection";
import StatCard from "@/components/mobile/StatCard";

export const dynamic = "force-dynamic";

export default function TenantHome() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Points" value="12,500" hint="+250 this month" />
        <StatCard label="Next rent due" value="Oct 05" hint="PKR 120,000" />
      </div>

      <ScreenSection title="Quick actions">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tenant/pay" className="rounded-xl px-4 py-3 text-center font-semibold bg-emerald-600 text-white hover:bg-emerald-700">
            Pay rent
          </Link>
          <Link href="/tenant/rewards" className="rounded-xl px-4 py-3 text-center font-semibold border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
            Rewards
          </Link>
        </div>
      </ScreenSection>

      <ScreenSection title="Recent activity">
        <ul className="text-sm space-y-2">
          <li>• Payment received · PKR 120,000 · Ref RB-23091</li>
          <li>• 250 points earned · On-time streak ×3</li>
        </ul>
      </ScreenSection>
    </div>
  );
}
