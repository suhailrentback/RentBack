// components/Skeletons.tsx
export function CardSkeleton() {
  return (
    <div className="h-24 w-full animate-pulse rounded-2xl bg-black/5 dark:bg-white/10" />
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-9 animate-pulse rounded-lg bg-black/5 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-xl bg-black/5 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

// Back-compat aliases (so older imports keep working)
export { TableSkeleton as TableSkel };
export { CardSkeleton as CardSkel };
export { ListSkeleton as ListSkel };
