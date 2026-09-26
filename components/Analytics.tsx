"use client";

import Script from "next/script";
import { useEffect } from "react";
import { analytics, analyticsEnabled, trackCta } from "@/lib/track";

/**
 * GA4 + Meta Pixel. Desactivados por defecto: se activan al cargar
 * NEXT_PUBLIC_GA4_ID y/o NEXT_PUBLIC_META_PIXEL_ID en el .env.
 * Escucha clics en cualquier elemento con data-cta.
 */
export function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cta]");
      if (el?.dataset.cta) trackCta(el.dataset.cta);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!analyticsEnabled) return null;

  return (
    <>
      {analytics.ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analytics.ga4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${analytics.ga4}');`}
          </Script>
        </>
      )}
      {analytics.metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${analytics.metaPixel}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
