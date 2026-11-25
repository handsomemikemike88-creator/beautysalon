import type { MetadataRoute } from "next";

const base = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/services/hydrafacial",
    "/services/laser-hair-removal",
    "/therapists",
    "/prices",
    "/packages",
    "/book",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
}
