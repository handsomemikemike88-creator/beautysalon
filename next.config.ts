import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sql.js"],
  async redirects() {
    return [
      { source: "/trial/hydrafacial-trial", destination: "/services/hydrafacial", permanent: false },
      { source: "/trial/laser-trial", destination: "/services/laser-hair-removal", permanent: false },
      { source: "/trial/aqua-peel", destination: "/services/hydrafacial", permanent: false },
      { source: "/trial/cleanse", destination: "/services/hydrafacial", permanent: false },
      { source: "/trial/lift", destination: "/services/laser-hair-removal", permanent: false },
    ];
  },
};

export default nextConfig;
