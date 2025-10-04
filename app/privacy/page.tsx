"use client";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function PrivacyPage() {
  const { t } = useLang();

  return (
    <AppShell title="Privacy Policy" hideBottomNav>
      <div className="p-6 space-y-6 text-sm leading-relaxed">
        <p>
          This is a demo application for <strong>RentBack Technologies (Pvt) Ltd</strong>.
          No real payments are processed. All data shown is mock data for demonstration only.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">What we collect</h2>
          <p>
            This demo may store non-sensitive preferences (e.g., language, theme) in your browser’s
            localStorage and cookies to improve your experience. We do not collect personal
            information or payment data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Contact</h2>
          <p>
            Company: <strong>RentBack Technologies (Pvt) Ltd</strong><br />
            Email: <a className="text-emerald-600 hover:underline" href="mailto:help@rentback.app">help@rentback.app</a>
          </p>
        </section>

        <p className="opacity-70">
          Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </AppShell>
  );
}
