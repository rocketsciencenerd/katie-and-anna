import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/katie-and-anna",
  assetPrefix: "/katie-and-anna",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
