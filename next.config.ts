import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera .next/standalone con un server.js mínimo y solo las dependencias que se usan (imagen Docker liviana).
  output: "standalone",
};

export default nextConfig;
