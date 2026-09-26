import type { NextConfig } from "next";

// Export estático: sirve para GitHub Pages, Vercel o Hostinger (carpeta /out).
// En GitHub Pages el sitio vive en /entre-nos-landing → NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
