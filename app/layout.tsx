// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/providers/LangProvider";
import Analytics from "@/components/Analytics";
import ClientErrorReporter from "@/components/ClientErrorReporter";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rentback.app"),
  title: {
    default: "RentBack – Pay Rent, Earn Rewards",
    template: "%s – RentBack",
  },
  description: "A modern rent-payments experience for Pakistan — Raast, cards & wallets, and a local rewards marketplace.",
  applicationName: "RentBack",
  generator: "Next.js",
  icons: [{ rel: "icon", url: "/icon.svg" }],
  openGraph: {
    title: "RentBack – Pay Rent, Earn Rewards",
    description: "Raast-native rent payments with rewards. Built for PK.",
    url: "https://www.rentback.app",
    siteName: "RentBack",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "RentBack" }],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentBack – Pay Rent, Earn Rewards",
    description: "Raast-native rent payments with rewards. Built for PK.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
        <Analytics />
        <ClientErrorReporter />
      </body>
    </html>
  );
}
