import "./globals.css";
import type { Metadata } from "next";
import { ThemeLangProvider } from "@/components/providers/ThemeLangProvider";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Pay rent, earn rewards — PK",
};

// prevent static export errors by forcing dynamic rendering
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeLangProvider initialLang="en" initialTheme="dark">
          {children}
        </ThemeLangProvider>
      </body>
    </html>
  );
}
