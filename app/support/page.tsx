// app/support/page.tsx
"use client";

import AppShell from "@/components/AppShell";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";

export default function SupportPage() {
  const { t } = useLang();

  return (
    <AppShell role="tenant" title={t.needHelp} subtitle={t.support}>
      <div className="p-4 space-y-4">
        <section className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <p className="text-sm opacity-80">
            {t.support} • {t.demo}
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <div>
              Email:{" "}
              <a
                href="mailto:support@rentback.app"
                className="underline underline-offset-2"
              >
                support@rentback.app
              </a>
            </div>
            <div>
              FAQ:{" "}
              <Link href="/" className="underline underline-offset-2">
                rentback.app
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
