// components/Skeletons.tsx
"use client";

type Props = { rows?: number };

export function CardSkel() {
  return (
    <div className="animate-pulse rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="h-4 w-24 bg-black/10 dark:bg-white/10 rounded mb-2" />
      <div className="h-3 w-40 bg-black/10 dark:bg-white/10 rounded" />
      <div className="mt-4 h-10 w-full bg-black/10 dark:bg-white/10 rounded" />
    </div>
  );
}

export function TableSkel({ rows = 6 }: Props) {
  return (
    <div className="animate-pulse rounded-2xl border border-black/10 dark:border-white/10">
      <div className="border-b border-black/10 dark:border-white/10 p-3">
        <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded" />
      </div>
      <div className="divide-y divide-black/10 dark:divide-white/10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-3 grid grid-cols-3 gap-3">
            <div className="h-3 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-3 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-3 bg-black/10 dark:bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Optional small list skeleton (some pages used this earlier)
export function ListSkeleton({ rows = 5 }: Props) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-black/10 dark:bg-white/10 rounded" />
      ))}
    </div>
  );
}

// Backwards-compat safe aliases (so ANY import name works)
export const CardSkeleton = CardSkel;
export const TableSkeleton = TableSkel;
