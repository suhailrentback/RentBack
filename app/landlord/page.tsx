// app/landlord/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";
import StatCard from "@/components/mobile/StatCard";

export const dynamic = "force-dynamic";

export default function LandlordHome() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="This month collected" value="PKR 360,000" hint="3 tenants" />
        <StatCard label="Outstanding" value="PKR 120,000" hint="1 due soon" />
      </div>

      <ScreenSection title="Latest payments">
        <ul className="text-sm space-y-2">
          <li>• Ali · PKR 120,000 · Oct 01 · Raast</li>
          <li>• Sana · PKR 120,000 · Oct 01 · Card</li>
          <li>• Hamza · PKR 120,000 · Sep 01 · Raast</li>
        </ul>
      </ScreenSection>
    </div>
  );
}
