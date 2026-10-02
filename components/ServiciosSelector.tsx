"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { Experiencia, Icono } from "@/data/experiencias";
import { IconoDestino, IconoHoja, IconoMesa, IconoReloj, IconoSobre, IconoTaza } from "./ui/Iconos";
import { Estrellita } from "./ui/Ornamentos";
import { WaButton } from "./ui/WaButton";

const iconos: Record<Icono, (p: { className?: string }) => ReactNode> = {
  mesa: IconoMesa,
  destino: IconoDestino,
  taza: IconoTaza,
  sobre: IconoSobre,
  hoja: IconoHoja,
  reloj: IconoReloj,
};

/** Tres tarjetas grandes con foto; la elegida muestra su detalle corto debajo. */
export function ServiciosSelector({ servicios, fotos }: { servicios: Experiencia[]; fotos: ReactNode[] }) {
  const [activo, setActivo] = useState(0);
  const e = servicios[activo];

  return (
    <div>
      {/* Tarjetas: en celular se deslizan de costado */}
      <div
        role="tablist"
        aria-label="Servicios"
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {servicios.map((s, i) => {
          const sel = i === activo;
          return (
            <button
              key={s.id}
              id={`exp-${s.id}`}
              type="button"
              role="tab"
              aria-selected={sel}
              aria-controls="servicio-detalle"
              onClick={() => setActivo(i)}
              data-cta={`experiencias:ver:${s.id}`}
              className={`group relative w-[78%] shrink-0 cursor-pointer snap-center overflow-hidden rounded-3xl text-left transition-all duration-500 md:w-auto ${
                sel ? "shadow-[0_30px_50px_-25px_rgba(58,45,38,.6)] ring-2 ring-espresso ring-offset-4 ring-offset-hueso" : "opacity-80 hover:opacity-100"
              }`}
            >
              <div className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]">{fotos[i]}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/95 via-carbon/55 via-45% to-transparent to-75%" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-5 text-crema [text-shadow:0_1px_8px_rgba(28,23,21,.6)] md:p-6">
                <p className="eyebrow text-xs text-ambar">{s.eyebrow}</p>
                <p className="display mt-1 text-3xl leading-tight md:text-4xl">{s.titulo}</p>
                <p className="mt-2 text-base leading-snug text-crema">{s.bajada}</p>
              </div>
              <span
                className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors ${
                  sel ? "bg-crema text-espresso" : "bg-carbon/40 text-crema"
                }`}
                aria-hidden
              >
                {sel ? "✓" : "+"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detalle del servicio elegido */}
      <div id="servicio-detalle" role="tabpanel" aria-live="polite" className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 rounded-3xl bg-crema p-6 md:grid-cols-[1.1fr_1fr] md:gap-12 md:p-10"
          >
            <div>
              <p className="display text-lg leading-snug text-espresso md:text-xl">{e.resumen}</p>
              <ul className="mt-6 grid grid-cols-3 gap-3">
                {e.claves.map((c) => {
                  const I = iconos[c.icono];
                  return (
                    <li key={c.texto} className="flex flex-col items-center gap-2 rounded-2xl bg-hueso px-2 py-4 text-center">
                      <I className="h-6 w-6 text-cacao" />
                      <span className="eyebrow text-[0.58rem] leading-tight text-espresso">{c.texto}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col">
              <p className="eyebrow text-oliva-oscuro">{e.incluyeTitulo}</p>
              <ul className={`mt-4 grid gap-x-6 gap-y-2.5 text-sm text-tinta ${e.incluye.length > 4 ? "sm:grid-cols-2" : ""}`}>
                {e.incluye.map((item) => (
                  <li key={item} className="flex gap-2.5 leading-snug">
                    <Estrellita className="mt-1 h-2.5 w-2.5 shrink-0 text-caramelo" />
                    {item}
                  </li>
                ))}
              </ul>
              <WaButton mensaje={e.mensaje} cta={`experiencias:${e.id}`} className="mt-8 self-start">
                {e.cta}
              </WaButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
