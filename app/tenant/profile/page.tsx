"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";

export default function TenantProfilePage() {
  const { t } = useLang();

  return (
    <AppShell role="tenant" title={t.tenant.profile.title}>
      <div className="p-4 space-y-5">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5">
          <div className="text-sm font-medium">Demo Tenant</div>
          <div className="text-xs opacity-70">tenant@example.com</div>
        </section>

        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <div className="flex flex-col gap-2">
            <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm">
              {t.tenant.profile.signOut}
            </button>
            <button className="px-3 py-2 rounded-lg border text-sm">{t.tenant.profile.privacy}</button>
            <button className="px-3 py-2 rounded-lg border text-sm">{t.tenant.profile.terms}</button>
            <button className="px-3 py-2 rounded-lg border text-sm">{t.tenant.profile.needHelp}</button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
