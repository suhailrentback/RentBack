// components/EmptyState.tsx
type Props = {
  title: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function EmptyState({ title, body, ctaLabel, ctaHref }: Props) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 text-center">
      <div className="text-sm font-medium">{title}</div>
      {body ? <div className="mt-1 text-xs opacity-70">{body}</div> : null}
      {ctaLabel && ctaHref ? (
        <a
          href={ctaHref}
          className="mt-3 inline-block rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-700"
        >
          {ctaLabel}
        </a>
      ) : null}
    </div>
  );
}
