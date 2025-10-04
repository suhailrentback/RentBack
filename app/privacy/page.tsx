"use client";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function PrivacyPage() {
  const { t } = useLang();

  return (
    <AppShell title="Privacy Policy" hideBottomNav>
      <div className="p-6 space-y-6 text-sm leading-relaxed">
        <p>
          This is a demo application for RentBack Technologies (Pvt) Ltd. 
          No real payments are processed. All data shown is mock data.
        </p>
        <p>
          RentBack Technologies (Pvt) Ltd is registered with SECP. 
          For any questions, please contact us at 
          <a href="mailto:help@rentback.app" className="text-emerald-600 hover:underline"> help@rentback.app</a>.
        </p>
        <p>
          Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </AppShell>
  );
}
