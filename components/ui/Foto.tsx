import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/data/site";

type Props = {
  src: string; // nombre del archivo dentro de /public/images
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tono?: "oscuro" | "claro";
  etiqueta?: string; // posición de la etiqueta del placeholder
};

/**
 * Si la foto existe en /public/images la muestra; si no, dibuja un bloque con
 * degradado de la paleta y la etiqueta del archivo que va ahí.
 * (Se resuelve en el build: al agregar fotos, volver a buildear.)
 */
export function Foto({ src, alt, className = "", priority, sizes = "100vw", tono = "oscuro", etiqueta = "top-3" }: Props) {
  const existe = fs.existsSync(path.join(process.cwd(), "public", "images", src));

  if (existe) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={`${site.basePath}/images/${src}`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }

  const fondo =
    tono === "oscuro"
      ? "radial-gradient(120% 90% at 30% 20%, rgba(230,184,102,.28), transparent 55%), linear-gradient(160deg, #5a4032 0%, #3a2a22 45%, #1c1715 100%)"
      : "radial-gradient(120% 90% at 70% 20%, rgba(230,184,102,.35), transparent 60%), linear-gradient(160deg, #e8e0d3 0%, #d9c9b2 60%, #b7834f 140%)";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${className}`}
      style={{ background: fondo }}
    >
      <span
        className={`absolute left-3 ${etiqueta} max-w-[85%] rounded-sm px-2 py-1 font-mono text-[10px] leading-tight ${
          tono === "oscuro" ? "bg-carbon/60 text-crema/85" : "bg-crema/70 text-tinta"
        }`}
      >
        FOTO · /images/{src}
      </span>
    </div>
  );
}
