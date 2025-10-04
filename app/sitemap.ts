// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rentback.app";
  const now = new Date().toISOString();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/founder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sign-in`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tenant`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/landlord`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
