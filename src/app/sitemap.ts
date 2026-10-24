import type { MetadataRoute } from "next";

const base = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/therapists",
    "/trial/hydrafacial-trial",
    "/trial/laser-trial",
    "/prices",
    "/packages",
    "/book",
    "/booking/confirmed",
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
