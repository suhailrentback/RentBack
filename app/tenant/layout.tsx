// app/tenant/layout.tsx
import "@/app/globals.css";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  // Pages under /tenant already wrap themselves in <AppShell role="tenant" />
  // Keep this layout minimal to avoid double shells.
  return <>{children}</>;
}
