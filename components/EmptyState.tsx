// components/EmptyState.tsx
'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  /**
   * Preferred prop (new).
   */
  description?: React.ReactNode;
  /**
   * Backwards-compat alias for older pages that pass "body".
   * If provided, it will be used instead of "description".
   */
  body?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Optional icon (emoji or small SVG/JSX).
   */
  icon?: React.ReactNode;
  /**
   * When true, renders a subtle border and background.
   */
  framed?: boolean;
};

export default function EmptyState({
  title,
  description,
  body,
  ctaLabel,
  ctaHref,
  icon,
  framed = true,
}: Props) {
  const text = body ?? description;

  return (
    <div
      className={[
        'w-full rounded-2xl',
        framed
          ? 'border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5'
          : '',
        'p-6 text-center',
      ].join(' ')}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        {icon ? (
          <div className="text-3xl leading-none">{icon}</div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-black/5 dark:bg-white/10" />
        )}

        <h3 className="text-base font-semibold">{title}</h3>

        {text ? (
          <p className="max-w-sm text-sm opacity-70">{text}</p>
        ) : null}

        {ctaLabel && ctaHref ? (
          <div className="pt-1">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
