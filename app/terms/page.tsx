"use client";
import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function TermsPage() {
  const { t } = useLang();

  return (
    <AppShell title="Terms of Use" hideBottomNav>
      <div className="p-6 space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to the demo application by <strong>RentBack Technologies (Pvt) Ltd</strong>.
          By using this site, you agree that all features are for demonstration only and do not
          represent production systems or real financial services.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Demo Only</h2>
          <p>
            This app does not process real payments. Any numbers, transactions, or balances you see
            are mock values to illustrate the product experience.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">No Warranties</h2>
          <p>
            The demo is provided “as is” without warranties of any kind. Use is at your own risk.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Contact</h2>
          <p>
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
