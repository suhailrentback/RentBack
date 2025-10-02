// app/admin/layout.tsx
import "@/app/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages wrap themselves in <AppShell role="admin" /> as needed.
  return <>{children}</>;
}
