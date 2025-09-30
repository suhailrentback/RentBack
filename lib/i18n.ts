// components/Skeletons.tsx

import React from "react";

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-5 w-32 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
      <div className="mt-3 h-10 w-full rounded bg-black/10 dark:bg-white/10 animate-pulse" />
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="h-10 w-full rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
  );
}

/** A vertical list of skeleton rows (default 6) */
export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <RowSkeleton key={i} />
      ))}
    </div>
  );
}
