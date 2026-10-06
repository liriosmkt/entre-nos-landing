// Genera versiones WebP en varios anchos de cada foto de /public/images y /public/marca,
// para que cada pantalla descargue solo el tamaño que necesita.
// Salida: /public/opt/<carpeta>/<nombre>-<ancho>.webp  +  lib/imagenes.json (medidas y anchos).
// Corre solo antes de cada build (npm run build) y saltea lo que ya está generado.
// Al agregar o reemplazar una foto, alcanza con volver a buildear.

import fs from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const carpetas = ["images", "marca"];
const ANCHOS = [400, 600, 800, 1200, 1600];
const salidaManifiesto = path.join(raiz, "lib", "imagenes.json");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[imagenes] sharp no está disponible: se usan las versiones ya generadas.");
  process.exit(0);
}

const manifiesto = {};
let generadas = 0;

for (const carpeta of carpetas) {
  const dirEntrada = path.join(raiz, "public", carpeta);
  const dirSalida = path.join(raiz, "public", "opt", carpeta);
  fs.mkdirSync(dirSalida, { recursive: true });

  for (const archivo of fs.readdirSync(dirEntrada)) {
    if (!/\.(jpe?g|png)$/i.test(archivo)) continue;
    const entrada = path.join(dirEntrada, archivo);
    const base = archivo.replace(/\.[^.]+$/, "");
    const { width, height } = await sharp(entrada).metadata();
    const mtime = fs.statSync(entrada).mtimeMs;

    // Anchos menores al original, más el original (tope 1600)
    const anchos = [...new Set([...ANCHOS.filter((a) => a < width), Math.min(width, 1600)])];
    for (const ancho of anchos) {
      const destino = path.join(dirSalida, `${base}-${ancho}.webp`);
      if (fs.existsSync(destino) && fs.statSync(destino).mtimeMs >= mtime) continue;
      await sharp(entrada).resize({ width: ancho }).webp({ quality: 72, effort: 5 }).toFile(destino);
      generadas++;
    }
    manifiesto[`${carpeta}/${archivo}`] = { w: width, h: height, anchos };
  }
}

fs.writeFileSync(salidaManifiesto, JSON.stringify(manifiesto, null, 2) + "\n");
console.log(`[imagenes] ${Object.keys(manifiesto).length} imágenes, ${generadas} versiones nuevas.`);
