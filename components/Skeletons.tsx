// components/Skeletons.tsx
import React from "react";

/** Small card with a title line and a big content bar */
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-5 w-32 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
      <div className="mt-3 h-10 w-full rounded bg-black/10 dark:bg-white/10 animate-pulse" />
    </div>
  );
}

/** Single row skeleton (list item) */
export function RowSkeleton() {
  return (
    <div className="h-10 w-full rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
  );
}

/** Vertical list of row skeletons */
export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <RowSkeleton key={i} />
      ))}
    </div>
  );
}

/** Wide “table-like” skeleton used by admin/transactions */
export function TableSkel({ rows = 8 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
      {/* header */}
      <div className="grid grid-cols-5 gap-3 pb-3 border-b border-black/10 dark:border-white/10">
        <div className="h-4 w-20 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-4 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-4 w-16 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-4 w-16 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
        <div className="h-4 w-12 rounded bg-black/10 dark:bg-white/10 animate-pulse justify-self-end" />
      </div>
      {/* rows */}
      <div className="mt-3 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-3 items-center"
          >
            <div className="h-4 w-28 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-4 w-36 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-4 w-20 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-4 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse justify-self-end" />
          </div>
        ))}
      </div>
    </div>
  );
}
