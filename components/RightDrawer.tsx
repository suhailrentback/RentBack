"use client";
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
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-[86%] max-w-[380px] bg-white dark:bg-[#111] border-l border-black/10 dark:border-white/10 shadow-xl
        transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="font-semibold">Menu</div>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <nav className="p-2">
          <Section label="App sections">
            <DrawerLink href="/tenant" label="Tenant demo" />
            <DrawerLink href="/landlord" label="Landlord demo" />
            <DrawerLink href="/admin" label="Admin demo" />
          </Section>

          <Section label="Account">
            <button className="drawer-btn" onClick={onToggleLang}>
              {lang === "en" ? "Switch to Urdu" : "اردو سے انگریزی"} <span className="opacity-60 ml-auto">{lang.toUpperCase()}</span>
            </button>
            <button className="drawer-btn" onClick={onToggleTheme}>
              {theme === "dark" ? "Light mode" : "Dark mode"} <span className="opacity-60 ml-auto">{theme}</span>
            </button>
            <button className="drawer-btn" onClick={() => alert("Stub: sign out")}>
              Sign out
            </button>
          </Section>

          <Section label="Company">
            <DrawerLink href="/privacy" label="Privacy" />
            <DrawerLink href="/terms" label="Terms" />
            <DrawerLink href="/founder" label="Founder" />
            <a className="drawer-a" href="mailto:founders@rentback.pk">Contact</a>
          </Section>
        </nav>

        <style jsx>{`
          .drawer-btn {
            width: 100%;
            text-align: left;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid hsl(0 0% 0% / .08);
            background: transparent;
            margin-bottom: 8px;
          }
          :global(html.dark) .drawer-btn {
            border-color: hsl(0 0% 100% / .12);
          }
          .drawer-a, .drawer-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid hsl(0 0% 0% / .08);
            margin-bottom: 8px;
          }
          :global(html.dark) .drawer-a, :global(html.dark) .drawer-link {
            border-color: hsl(0 0% 100% / .12);
          }
        `}</style>
      </aside>
    </>
  );
}

function Section({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-wide opacity-60 px-1 mb-2">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function DrawerLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="drawer-link">
      <span>{label}</span>
    </Link>
  );
}
