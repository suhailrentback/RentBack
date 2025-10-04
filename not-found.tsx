import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      <div className="w-full max-w-md p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Logo />
          <h1 className="text-xl font-bold">RentBack</h1>
        </div>

        <h2 className="text-2xl font-extrabold mt-4">Page not found</h2>
        <p className="opacity-80 mt-2">
          The page you’re looking for doesn’t exist or moved. Choose where to go next:
        </p>

        <div className="mt-6 grid gap-2">
          <Link
            href="/"
            className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white grid place-items-center"
          >
            Home
          </Link>
          <Link
            href="/sign-in"
            className="h-11 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 grid place-items-center"
          >
            Sign in
          </Link>
        </div>

        <p className="text-xs opacity-60 mt-4">
          Need help? <a className="underline" href="mailto:help@rentback.app">help@rentback.app</a>
        </p>
      </div>
    </main>
  );
}

function Logo({ size = 22, stroke = "#059669" }: { size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
  );
}
