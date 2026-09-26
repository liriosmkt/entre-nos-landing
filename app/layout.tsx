import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Jost } from "next/font/google";
import { site } from "@/data/site";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.nombreCompleto,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: "La mesa de Entre Nos con las lámparas encendidas" }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: [site.seo.ogImage] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#1C1715" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${cormorant.variable} ${jost.variable} ${caveat.variable}`}>
      <body>
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
