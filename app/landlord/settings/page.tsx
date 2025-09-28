// app/landlord/settings/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function LandlordSettings() {
  return (
    <div className="space-y-4">
      <ScreenSection title="Payout account">
        <div className="text-sm space-y-2">
          <div>Bank: HBL</div>
          <div>IBAN: PK00 HABB 0000 0000 0000 0000</div>
          <button className="mt-2 rounded-lg px-3 py-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
            Update
          </button>
        </div>
      </ScreenSection>
    </div>
  );
}
