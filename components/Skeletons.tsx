"use client";

import React from "react";

/** Simple table skeleton: header bar + a few pulsing rows */
export function TableSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
      <div className="h-9 bg-black/5 dark:bg-white/10" />
      <div className="divide-y divide-black/5 dark:divide-white/5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-black/5/50 dark:bg-white/5/50 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

/** Card-sized skeleton block (for dashboards/cards) */
export function CardSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-4 w-24 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
      <div className="mt-3 h-7 w-36 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
      <div className="mt-3 h-4 w-48 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
    </div>
  );
}

/* ---- Back-compat aliases (some pages used these older names) ---- */
export { TableSkel as TableSkeleton, CardSkel as CardSkeleton };
