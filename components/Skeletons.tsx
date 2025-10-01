// components/Skeletons.tsx
"use client";

import React from "react";

function shimmer(className = "") {
  return `animate-pulse bg-black/10 dark:bg-white/10 ${className}`;
}

export function CardSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className={shimmer("h-5 w-32 rounded")} />
      <div className={shimmer("mt-3 h-10 w-full rounded")} />
    </div>
  );
}

export function ListSkel({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={shimmer("h-10 rounded-lg")} />
      ))}
    </div>
  );
}

// Some pages referenced "ListSkeleton" specifically.
// Export an alias to avoid changing those pages.
export const ListSkeleton = ListSkel;

export function TableSkel({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
      <div className={shimmer("h-10")} />
      <div className="divide-y divide-black/10 dark:divide-white/10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={shimmer("h-12")} />
        ))}
      </div>
    </div>
  );
}
