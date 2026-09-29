"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { destinos, type Destino } from "@/data/destinos";
import { paises } from "@/data/paises";
import { site } from "@/data/site";
import { mensajes } from "@/lib/whatsapp";
import { banderas } from "./ui/Banderas";
import { Estrellita, Sello } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { WaButton } from "./ui/WaButton";

// Solo los países que tienen un teanner con carta
const conCarta = paises
  .map((p) => ({ ...p, opciones: p.opciones.filter((o) => o.destinoId) }))
  .filter((p) => p.opciones.length > 0);

/** Fotos del destino en secuencia, ocupando todo el ancho de la carta. */
function Secuencia({ d }: { d: Destino }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const fotos = d.fotos;

  useEffect(() => {
    if (reduce || fotos.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % fotos.length), 2200);
    return () => clearInterval(id);
  }, [fotos, reduce]);

  if (fotos.length === 0) {
    // Sin fotos todavía: bloque con la hoja de la marca
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-hueso to-nude/60">
        <span
          aria-hidden
          className="block h-16 w-16 bg-cafe/20"
          style={{
            WebkitMaskImage: `url(${site.basePath}/marca/hoja.png)`,
            maskImage: `url(${site.basePath}/marca/hoja.png)`,
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

  const f = fotos[i];
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-hueso">
      <AnimatePresence initial={false}>
        <motion.img
          key={f.src}
          src={`${site.basePath}/images/${f.src}`}
          alt={f.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </AnimatePresence>
      {fotos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {fotos.map((x, n) => (
            <button
              key={x.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Ver foto ${n + 1}: ${x.alt}`}
              className={`h-1.5 rounded-full shadow transition-all ${n === i ? "w-5 bg-crema" : "w-1.5 bg-crema/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Carta({ d, nota }: { d: Destino; nota: string }) {
  return (
    <div className="overflow-hidden bg-crema shadow-[0_30px_60px_-30px_rgba(58,45,38,.35)]">
      <Secuencia key={d.id} d={d} />
      <div className="relative px-6 pb-10 pt-8 text-center md:px-12">
        <div className="pointer-events-none absolute inset-x-3 bottom-3 top-3 border border-caramelo/40" aria-hidden />
        <div className="relative">
          <p className="eyebrow text-oliva-oscuro">Teanner</p>
          <p className="display mt-2 text-5xl italic text-espresso md:text-6xl">{d.nombre}</p>
          {d.sello && (
            <Sello className="mt-3 text-oliva-oscuro" rotar={-4}>
              {d.sello}
            </Sello>
          )}
          <ol className="mt-8 space-y-5 text-left">
            {d.pasos.map((p, i) => (
              <li key={p} className="flex gap-5">
                <span className="display w-6 shrink-0 text-3xl italic text-caramelo">{i + 1}</span>
                <span className="border-b border-dotted border-espresso/25 pb-4 leading-snug text-tinta">
                  <Txt>{p}</Txt>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-left text-sm leading-relaxed text-tinta-suave">
            <span className="eyebrow text-oliva-oscuro">Bebidas · </span>
            <Txt>{d.bebidas}</Txt>
          </p>
          <p className="mt-5 flex items-start gap-3 text-left text-sm leading-relaxed text-tinta-suave">
            <Estrellita className="mt-1 h-3 w-3 shrink-0 text-caramelo" />
            {nota}
          </p>
          <div className="mt-8">
            <WaButton mensaje={mensajes.destino(d.nombre)} cta={`carta:${d.id}`}>
              Quiero vivirlo
            </WaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartaDestinos({ nota }: { nota: string }) {
  const [paisId, setPaisId] = useState(conCarta[0].id);
  const pais = conCarta.find((p) => p.id === paisId)!;
  const [destinoId, setDestinoId] = useState(pais.opciones[0].destinoId!);
  const d = destinos.find((x) => x.id === destinoId)!;

  const elegirPais = (id: string) => {
    const p = conCarta.find((x) => x.id === id)!;
    setPaisId(id);
    setDestinoId(p.opciones[0].destinoId!);
  };

  return (
    <div>
      {/* Países: fuera de la carta */}
      <div role="tablist" aria-label="Destinos" className="flex flex-wrap justify-center gap-2">
        {conCarta.map((p) => {
          const Bandera = banderas[p.id];
          const activo = p.id === paisId;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={activo}
              onClick={() => elegirPais(p.id)}
              data-cta={`carta:pais:${p.id}`}
              className={`flex items-center gap-2.5 rounded-full border py-2 pl-2.5 pr-4 transition-colors ${
                activo ? "border-espresso bg-espresso text-crema" : "border-espresso/20 text-espresso hover:border-caramelo"
              }`}
            >
              {Bandera && <Bandera className="h-4 w-6" />}
              <span className="eyebrow text-[0.62rem]">{p.nombre}</span>
            </button>
          );
        })}
      </div>

      {/* Ciudades, si el país tiene más de una */}
      <AnimatePresence initial={false}>
        {pais.opciones.length > 1 && (
          <motion.div
            key={pais.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex justify-center gap-6 pt-4" role="group" aria-label={`Ciudades de ${pais.nombre}`}>
              {pais.opciones.map((o) => (
                <button
                  key={o.nombre}
                  type="button"
                  aria-pressed={o.destinoId === destinoId}
                  onClick={() => setDestinoId(o.destinoId!)}
                  className={`display border-b pb-1 text-xl italic transition-colors ${
                    o.destinoId === destinoId ? "border-caramelo text-espresso" : "border-transparent text-tinta-suave hover:text-espresso"
                  }`}
                >
                  {o.etiqueta}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Carta d={d} nota={nota} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
