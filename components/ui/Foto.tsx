import fs from "node:fs";
import path from "node:path";
import { img } from "@/lib/img";
import { site } from "@/data/site";

type Props = {
  src: string; // nombre del archivo dentro de /public/images
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tono?: "oscuro" | "claro";
  etiqueta?: string; // (sin uso: se conserva por compatibilidad)
  posicion?: string; // object-position de la foto, ej: "50% 60%"
};

/**
 * Si la foto existe en /public/images la muestra; si no, dibuja un bloque con
 * los colores de la marca y la hoja del isologo (el archivo esperado queda en data-foto).
 * (Se resuelve en el build: al agregar fotos, volver a buildear.)
 */
export function Foto({ src, alt, className = "", priority, sizes = "100vw", tono = "oscuro", posicion }: Props) {
  const existe = fs.existsSync(path.join(process.cwd(), "public", "images", src));

  if (existe) {
    // WebP en varios anchos: el navegador baja solo el que necesita según `sizes`
    const i = img(`images/${src}`);
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={i.src}
          srcSet={i.srcSet}
          sizes={sizes}
          width={i.width}
          height={i.height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={posicion ? { objectPosition: posicion } : undefined}
        />
      </div>
    );
  }

  const fondo =
    tono === "oscuro"
      ? "radial-gradient(120% 90% at 30% 20%, rgba(205,171,152,.35), transparent 55%), linear-gradient(160deg, #5c4a40 0%, #3a2d26 60%)"
      : "radial-gradient(120% 90% at 70% 20%, rgba(240,236,229,.8), transparent 60%), linear-gradient(160deg, #ebe2da 0%, #e2e2e2 50%, #cdab98 130%)";

  return (
    <div
      role="img"
      aria-label={alt}
      data-foto={`/images/${src}`}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: fondo }}
    >
      <span
        aria-hidden
        className={`block h-14 w-14 ${tono === "oscuro" ? "bg-nude/40" : "bg-cafe/15"}`}
        style={{
          WebkitMaskImage: `url(${site.basePath}/opt/marca/hoja-240.webp)`,
          maskImage: `url(${site.basePath}/opt/marca/hoja-240.webp)`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}
