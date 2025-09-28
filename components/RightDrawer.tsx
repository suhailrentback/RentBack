// components/RightDrawer.tsx
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  lang: "en" | "ur";
  onToggleTheme: () => void;
  onToggleLang: () => void;
};

export default function RightDrawer({
  open,
  onClose,
  theme,
  lang,
  onToggleTheme,
  onToggleLang,
}: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // basic focus handling
  useEffect(() => {
    if (open && panelRef.current) {
      const previous = document.activeElement as HTMLElement | null;
      panelRef.current.focus();
      return () => previous?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } bg-black/30 backdrop-blur-sm`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Drawer panel */}
      <aside
        ref={panelRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm transform transition-transform
          bg-white dark:bg-[#0f0f0f] border-l border-black/10 dark:border-white/10 shadow-xl
          ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400">☰</span>
            <span>Menu</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="h-9 w-9 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Quick toggles */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-3">
            <h3 className="text-sm font-medium mb-2 opacity-80">Preferences</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onToggleTheme}
                className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <button
                onClick={onToggleLang}
                className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
              >
                {lang === "en" ? "اردو" : "English"}
              </button>
            </div>
          </div>

          {/* App sections (optional deep links) */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10">
            <div className="p-3 border-b border-black/10 dark:border-white/10">
              <h3 className="text-sm font-medium opacity-80">App</h3>
            </div>
            <nav className="p-1">
              <DrawerLink href="/tenant" label="Tenant Home" onClose={onClose} />
              <DrawerLink href="/tenant/pay" label="Pay Rent" onClose={onClose} />
              <DrawerLink href="/tenant/rewards" label="Rewards" onClose={onClose} />
              <DrawerLink href="/tenant/profile" label="Profile" onClose={onClose} />
            </nav>
          </div>

          {/* Other roles (if you want them visible) */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10">
            <div className="p-3 border-b border-black/10 dark:border-white/10">
              <h3 className="text-sm font-medium opacity-80">Other areas</h3>
            </div>
            <nav className="p-1">
              <DrawerLink href="/landlord" label="Landlord" onClose={onClose} />
              <DrawerLink href="/admin" label="Admin" onClose={onClose} />
            </nav>
          </div>

          {/* Footer links */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10">
            <div className="p-3 border-b border-black/10 dark:border-white/10">
              <h3 className="text-sm font-medium opacity-80">Legal & Info</h3>
            </div>
            <nav className="p-1">
              <DrawerLink href="/privacy" label="Privacy" onClose={onClose} />
              <DrawerLink href="/terms" label="Terms" onClose={onClose} />
              <DrawerLink href="/founder" label="Founder" onClose={onClose} />
              <a
                className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                href="mailto:founders@rentback.pk"
                onClick={onClose}
              >
                <span>Contact</span>
                <span className="opacity-60">↗</span>
              </a>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}

function DrawerLink({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
    >
      <span>{label}</span>
      <span className="opacity-60">›</span>
    </Link>
  );
}
