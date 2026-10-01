import { site } from "@/data/site";
import { estadoDe, proximasFechas } from "@/lib/fechas";

/** JSON-LD: el negocio (sin dirección exacta, solo la ciudad) y un Event por cada fecha real. */
export function JsonLd() {
  const negocio = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: site.nombreCompleto,
    description: site.seo.description,
    url: site.url,
    image: `${site.url}${site.seo.ogImage}`,
    servesCuisine: ["Italiana", "Mexicana", "Estadounidense", "Pastelería"],
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Córdoba",
      addressRegion: "Córdoba",
      addressCountry: "AR",
    },
    areaServed: "Córdoba Capital",
    sameAs: [`https://instagram.com/${site.instagram}`],
  };

  // Las fechas marcadas como ejemplo no se publican como eventos
  const eventos = proximasFechas()
    .filter((f) => !f.ejemplo)
    .map((f) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `${f.tipo} ${f.destino} · Entre Nos`,
      startDate: f.fecha,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      maximumAttendeeCapacity: f.cupos,
      remainingAttendeeCapacity: Math.max(0, f.disponibles),
      location: {
        "@type": "Place",
        name: "Entre Nos (dirección al confirmar la reserva)",
        address: { "@type": "PostalAddress", addressLocality: "Córdoba", addressCountry: "AR" },
      },
      organizer: { "@type": "Organization", name: site.nombreCompleto, url: site.url },
      ...(f.precio != null && {
        offers: {
          "@type": "Offer",
          price: f.precio,
          priceCurrency: "ARS",
          availability:
            estadoDe(f) === "agotado" ? "https://schema.org/SoldOut" : "https://schema.org/LimitedAvailability",
          url: site.url + "/#destinos",
        },
      }),
    }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([negocio, ...eventos]) }}
    />
  );
}
