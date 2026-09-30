import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo para la imagen Docker (el Dockerfile define NEXT_OUTPUT_STANDALONE=1): genera .next/standalone con un
  // server.js mínimo. Vercel empaqueta por su cuenta y su adaptador falla con esta opción, así que ahí no se activa.
  output: process.env.NEXT_OUTPUT_STANDALONE === "1" ? "standalone" : undefined,
};

export default nextConfig;
