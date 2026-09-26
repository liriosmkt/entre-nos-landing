// Medición de clics en CTAs. Desactivado hasta cargar los IDs en .env.
// Cada botón lleva data-cta="seccion:detalle"; components/Analytics.tsx escucha los clics.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const analytics = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};

export const analyticsEnabled = Boolean(analytics.ga4 || analytics.metaPixel);

export function trackCta(cta: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "cta_click", { cta });
  window.fbq?.("trackCustom", "CtaClick", { cta });
  if (cta.startsWith("reservar") || cta.includes("fecha")) window.fbq?.("track", "Contact");
}
