// app/admin/users/page.tsx
import ScreenSection from "@/components/mobile/ScreenSection";

export const dynamic = "force-dynamic";

export default function AdminUsers() {
  const rows = [
    { name: "Ali", role: "Tenant", status: "Active" },
    { name: "Sana", role: "Tenant", status: "Active" },
    { name: "Hamza", role: "Landlord", status: "Active" },
  ];
  return (
    <div className="space-y-4">
      <ScreenSection title="Users (demo)">
        <table className="w-full text-sm">
          <thead className="opacity-70">
            <tr>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Role</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="py-2">{r.name}</td>
                <td className="py-2">{r.role}</td>
                <td className="py-2 text-right">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScreenSection>
    </div>
  );
}
