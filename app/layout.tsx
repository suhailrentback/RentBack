import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/providers/LangProvider"; // <-- named import

export const metadata: Metadata = {
  title: "RentBack – Pay Rent, Earn Rewards",
  description:
    "Demo app by RentBack Technologies (Pvt) Ltd – transforming rent payments into financial growth and rewards.",
  openGraph: {
    title: "RentBack – Pay Rent, Earn Rewards",
    description: "Demo app by RentBack Technologies (Pvt) Ltd",
    url: "https://www.rentback.app",
    siteName: "RentBack",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RentBack" }],
    locale: "en_PK",
    type: "website",
  },
  metadataBase: new URL("https://www.rentback.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
        <LangProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>

            {/* Global footer */}
            <footer className="py-10 text-xs opacity-70 border-t border-black/10 dark:border-white/10">
              <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-between gap-3">
                <span>
                  © {new Date().getFullYear()} RentBack Technologies (Pvt) Ltd
                </span>
                <div className="flex gap-4">
                  <a href="/privacy" className="hover:opacity-100 opacity-80">Privacy</a>
                  <a href="/terms" className="hover:opacity-100 opacity-80">Terms</a>
                  <a href="/founder" className="hover:opacity-100 opacity-80">Founder</a>
                  <a href="mailto:help@rentback.app" className="hover:opacity-100 opacity-80">Contact</a>
                </div>
              </div>
            </footer>
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
