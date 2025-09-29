"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import { strings } from "@/lib/i18n";

const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";

export default function BottomNav() {
  const path = usePathname();

  // figure out current language (defaults to 'en')
  const t = useMemo(() => {
    let lang: "en" | "ur" = "en";
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("lang");
      if (attr === "ur") lang = "ur";
    }
    return strings[lang];
  }, [typeof document !== "undefined" && document.documentElement.getAttribute("lang")]);

  // prevent rapid double-tap navigation
  const lastTap = useRef(0);
  function guardTap(fn: () => void) {
    const now = Date.now();
    if (now - lastTap.current < 400) return;
    lastTap.current = now;
    fn();
  }

  const items: Array<{
    href: string;
    label: string;
    Icon: (p: { active?: boolean }) => JSX.Element;
  }> = [
    { href: "/tenant",        label: t.bottom.home,    Icon: HomeSolid },
    { href: "/tenant/pay",    label: t.bottom.pay,     Icon: CardSolid },
    { href: "/tenant/rewards",label: t.bottom.rewards, Icon: GiftSolid },
    { href: "/tenant/profile",label: t.bottom.profile, Icon: UserSolid },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30">
      <div className="relative max-w-md mx-auto px-2 h-full grid grid-cols-4 items-center">
        {/* DEMO pill */}
        {isDemo && (
          <div className="absolute -top-6 left-3 text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white shadow">
            {t.demo ?? "Demo"}
          </div>
        )}

        {items.map(({ href, label, Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                guardTap(() => {
                  // normal navigation after debounce
                  window.location.href = href;
                });
              }}
              aria-label={label}
              className={`group flex flex-col items-center justify-center h-full`}
              data-active={active}
            >
              <div
                className={[
                  "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                  active
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-black/[0.04] dark:bg-white/[0.08] text-slate-700 dark:text-slate-200"
                ].join(" ")}
              >
                <Icon active={active} />
              </div>
              <span
                className={[
                  "mt-1 text-[11px] leading-none",
                  active
                    ? "text-emerald-700 dark:text-emerald-300 font-medium"
                    : "text-slate-600 dark:text-slate-300 opacity-80"
                ].join(" ")}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ---- Solid, minimal inline icons (no extra packages) ---- */

function HomeSolid({ active }: { active?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3 3.5 9.5a1 1 0 0 0-.5.86V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-9.64a1 1 0 0 0-.42-.82L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CardSolid({ active }: { active?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"
        fill="currentColor"
      />
      <rect x="3" y="8" width="18" height="3" fill="white" opacity="0.25" />
      <rect x="7" y="14" width="6" height="2" rx="1" fill="white" opacity="0.6" />
    </svg>
  );
}

function GiftSolid({ active }: { active?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M2 9h20v4H2V9Z" fill="currentColor" />
      <path d="M4 13h7v8H6a2 2 0 0 1-2-2v-6Z" fill="currentColor" />
      <path d="M13 13h7v6a2 2 0 0 1-2 2h-5v-8Z" fill="currentColor" />
      <rect x="11" y="5" width="2" height="16" fill="white" opacity="0.6" />
      <path
        d="M8.5 5C7.12 5 6 6.12 6 7.5 6 8.33 6.67 9 7.5 9H11V7.5C11 6.12 9.88 5 8.5 5Z"
        fill="currentColor"
      />
      <path
        d="M15.5 5C16.88 5 18 6.12 18 7.5 18 8.33 17.33 9 16.5 9H13V7.5C13 6.12 14.12 5 15.5 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UserSolid({ active }: { active?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
        fill="currentColor"
      />
      <path
        d="M4 20a8 8 0 0 1 16 0v1H4Z"
        fill="currentColor"
      />
    </svg>
  );
}
