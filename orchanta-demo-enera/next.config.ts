import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this demo (the engine repo above has its own lockfile).
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
