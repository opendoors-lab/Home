import type { NextConfig } from "next";
import path from "path";
import { loadEnvConfig } from "@next/env";
import { buildUploadRemotePatterns } from "./src/lib/upload-image";

loadEnvConfig(path.join(__dirname));

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  async redirects() {
    return [
      { source: "/about", destination: "/aboutus", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/term-condition", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: buildUploadRemotePatterns(),
  },
};

export default nextConfig;
