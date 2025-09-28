import Link from "next/link";

export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0b0b] text-slate-900 dark:text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="RentBack" className="h-8 w-8" />
          <span className="text-xl font-bold">RentBack</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/sign-in" className="hover:underline">Sign In</Link>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 px-6">
        <section className="max-w-3xl mx-auto py-10">
          <div className="flex items-center gap-4 mb-6">
            {/* Simple avatar fallback (uses tailwind classes only) */}
            <div className="h-16 w-16 rounded-full bg-brand/10 border border-brand/30 grid place-items-center">
              <span className="text-brand font-bold text-lg">SA</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Founder</h1>
              <p className="opacity-70">Suhail Ahmed · Karachi, PK</p>
            </div>
          </div>

          <p className="leading-7 opacity-90 mb-4">
            RentBack helps tenants in Pakistan pay rent seamlessly via Raast,
            cards, and wallets — and earn meaningful rewards on every rent cycle.
            Landlords get clearer visibility and faster settlement. Our goal is a
            trusted, modern, SBP-aligned experience that turns rent from a cost
            center into a financial on-ramp.
          </p>

          <p className="leading-7 opacity-90 mb-4">
            We’re preparing for the State Bank of Pakistan regulatory sandbox and
            building a compliant, privacy-first product with transparent fees,
            local language support (English/Urdu), and first-class dark/light
            themes for accessibility.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="mailto:help@rentback.app"
              className="px-4 py-2 rounded-lg bg-brand text-white font-medium shadow hover:opacity-90 transition"
            >
              Contact
            </a>
            <Link
              href="/privacy"
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-slate-200 dark:border-slate-800 text-sm flex justify-center gap-6 opacity-75">
        <Link href="/privacy" className="hover:underline">Privacy</Link>
        <Link href="/founder" className="hover:underline">Founder</Link>
      </footer>
    </div>
  );
}
