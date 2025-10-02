// components/Skeletons.tsx
"use client";
import React from "react";

type TableSkelProps = {
  rows?: number;
  cols?: number;
};

export function TableSkel({ rows = 6, cols = 5 }: TableSkelProps) {
  return (
    <div className="w-full">
      {/* header */}
      <div className="grid"
           style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={`h-${i}`} className="p-2">
            <div className="h-3 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>
      {/* rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={`r-${r}`} className="grid border-t border-black/5 dark:border-white/10"
             style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: cols }).map((__, c) => (
            <div key={`r-${r}-c-${c}`} className="p-2">
              <div className="h-3 w-20 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Optional small card skeleton (in case a page imports it) */
export function CardSkel() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-4 w-40 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
      <div className="mt-3 h-3 w-64 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
      <div className="mt-2 h-3 w-52 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
    </div>
  );
}
