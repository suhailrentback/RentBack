import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rentback.app";
  const now = new Date();

  const routes = [
    "/",
    "/sign-in",
    "/founder",
    "/privacy",
    "/terms",
    // Tenant
    "/tenant",
    "/tenant/pay",
    "/tenant/rewards",
    "/tenant/receipts",
    "/tenant/support",
    // Landlord
    "/landlord",
    "/landlord/payouts",
    "/landlord/discrepancies",
    "/landlord/properties",
  ];

  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
