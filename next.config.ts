import type { NextConfig } from "next";

// Export estático: sirve tanto para Vercel como para Hostinger (subir /out).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
