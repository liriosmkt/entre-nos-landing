import { site } from "@/data/site";
import manifiesto from "./imagenes.json";

type Entrada = { w: number; h: number; anchos: number[] };
const datos = manifiesto as Record<string, Entrada>;

/**
 * Versión optimizada de una imagen de /public: WebP en varios anchos (los genera
 * scripts/optimizar-imagenes.mjs). Si la imagen no tiene versiones, devuelve el original.
 * `ruta` es relativa a /public, ej: "images/hero.jpg" o "marca/hoja.png".
 */
export function img(ruta: string) {
  const d = datos[ruta];
  const original = `${site.basePath}/${ruta}`;
  if (!d) return { src: original, srcSet: undefined, width: undefined, height: undefined };
  const base = `${site.basePath}/opt/${ruta.replace(/\.[^.]+$/, "")}`;
  const srcSet = d.anchos.map((a) => `${base}-${a}.webp ${a}w`).join(", ");
  // src de respaldo: la versión de 800 (o la más grande si es menor)
  const medio = d.anchos.find((a) => a >= 800) ?? d.anchos[d.anchos.length - 1];
  return { src: `${base}-${medio}.webp`, srcSet, width: d.w, height: d.h };
}
