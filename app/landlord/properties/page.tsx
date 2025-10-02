"use client";

import AppShell from "@/components/AppShell";

// Self-contained demo data to avoid missing imports/types
type DemoProperty = {
  id: string;
  name: string;
  tenant: string;
  expected: number;
  nextDueISO: string;
  status: "ACTIVE" | "INACTIVE";
};

const PROPS: DemoProperty[] = [
  {
    id: "r1",
    name: "12-A, Sunset Apartments",
    tenant: "Ali Khan",
    expected: 75000,
    nextDueISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
    status: "ACTIVE",
  },
  {
    id: "r2",
    name: "34-C, Lakeview Residences",
    tenant: "Sara Ahmed",
    expected: 95000,
    nextDueISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 7).toISOString(),
    status: "ACTIVE",
  },
];

const formatPKR = (v: number) => `Rs ${Math.round(v).toLocaleString("en-PK")}`;

export default function LandlordPropertiesPage() {
  return (
    <AppShell role="landlord" title="Properties">
      <div className="p-4 space-y-4">
        {PROPS.length === 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <div className="text-sm font-medium">No properties found</div>
            <div className="text-xs opacity-70 mt-1">Add a property to see it listed here.</div>
          </div>
        ) : (
          <ul className="space-y-3">
            {PROPS.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-xs opacity-70 mt-0.5">
                      Tenant: {r.tenant}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">Expected</div>
                    <div className="text-sm font-semibold">{formatPKR(r.expected)}</div>
                    <div className="text-xs opacity-70 mt-1">
                      Next Due:{" "}
                      {new Date(r.nextDueISO).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      r.status === "ACTIVE"
                        ? "bg-emerald-600 text-white"
                        : "bg-black/10 dark:bg-white/10"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
