// components/EmptyState.tsx
"use client";
import Link from "next/link";

type Props = {
  title: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
export default function EmptyState({ title, body, ctaLabel, ctaHref }: Props) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 text-center">
      <div className="text-base font-semibold">{title}</div>
      {body ? <div className="mt-2 text-sm opacity-80">{body}</div> : null}
      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="inline-block mt-3 text-sm px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
