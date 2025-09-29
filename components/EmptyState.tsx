"use client";

import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function EmptyState({ title, subtitle, ctaHref, ctaLabel }: Props) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-white/5 text-center">
      <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-400/10 flex items-center justify-center">
        <span className="text-emerald-700 dark:text-emerald-300">◎</span>
      </div>
      <h3 className="font-semibold">{title}</h3>
      {subtitle ? <p className="text-sm opacity-80 mt-1">{subtitle}</p> : null}

      {ctaHref && ctaLabel ? (
        <div className="mt-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
