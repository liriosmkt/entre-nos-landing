import { COSTAS, MAPA, proyectar } from "./ui/mapa-datos";

// Paralelos y meridianos cada 30°, como en un atlas
const GRILLA = [
  ...[-30, 0, 30, 60].map((lat) => `M0 ${proyectar(lat, 0)[1]}H${MAPA.ancho}`),
  ...[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => `M${proyectar(0, lon)[0]} 0V${MAPA.alto}`),
].join("");

// Bordes del mapa que se funden con el fondo (sin marco ni recorte)
const fundido = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)",
  maskImage:
    "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
} as const;

/**
 * Dibujo fijo del mapa del mundo (costas, grilla y luz). Es un componente de servidor:
 * el contorno va solo en el HTML y no suma peso al JavaScript de la página.
 */
export function MapaFondo() {
  return (
    <svg viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`} className="absolute inset-0 h-full w-full" aria-hidden style={fundido}>
      <defs>
        <path id="costas" d={COSTAS} />
        {/* Trazo fino, apenas irregular, como dibujado con pluma */}
        <filter id="pluma" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
        <radialGradient id="luz" cx="40%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#cdab98" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#cdab98" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={MAPA.ancho} height={MAPA.alto} fill="url(#luz)" />
      <path d={GRILLA} fill="none" className="stroke-crema/10" strokeWidth={0.6} strokeDasharray="1 5" />
      {/* El contorno se define una sola vez y se usa dos veces (trazo y sombra) */}
      <use href="#costas" filter="url(#pluma)" className="fill-crema/[0.06] stroke-crema/40" strokeWidth={0.8} strokeLinejoin="round" />
      <use href="#costas" transform="translate(1.6 1.2)" className="fill-none stroke-nude/25" strokeWidth={0.5} strokeLinejoin="round" />
    </svg>
  );
}
