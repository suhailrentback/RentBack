// app/tenant/profile/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function TenantProfile() {
  return (
    <div className="space-y-4">
      <ScreenSection title="Account">
        <div className="text-sm space-y-1">
          <div>Name: Mr Renter</div>
          <div>Email: renter@example.com</div>
        </div>
      </ScreenSection>

      <ScreenSection title="Preferences">
        <div className="text-sm opacity-80">
          Theme & language toggles are in the top bar.
        </div>
      </ScreenSection>
    </div>
  );
}
