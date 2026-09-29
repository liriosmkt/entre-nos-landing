import type { Metadata, Viewport } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import { site } from "@/data/site";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

// Tipografías del manual de marca
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-roboto", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.nombreCompleto,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: `${site.url}${site.seo.ogImage}`, width: 1200, height: 630, alt: "La mesa de Entre Nos con las lámparas encendidas" }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: [`${site.url}${site.seo.ogImage}`] },
};

export const viewport: Viewport = { themeColor: "#3A2D26" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${playfair.variable} ${roboto.variable}`}>
      <body>
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
