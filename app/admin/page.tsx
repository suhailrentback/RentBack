// app/admin/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";
import StatCard from "@/components/mobile/StatCard";

export const dynamic = "force-dynamic";

export default function AdminDash() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="MTD Volume" value="PKR 1.2M" />
        <StatCard label="Users" value="342" />
      </div>
      <ScreenSection title="System notices">
        <ul className="text-sm space-y-2">
          <li>• Sandbox settlement 23:59 processed.</li>
          <li>• Rewards batch queued (02:00).</li>
        </ul>
      </ScreenSection>
    </div>
  );
}
