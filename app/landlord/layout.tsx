// app/landlord/layout.tsx
import "@/app/globals.css";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  // Pages under /landlord wrap themselves in <AppShell role="landlord" />
  // Keep this layout minimal to avoid double shells.
  return <>{children}</>;
}
