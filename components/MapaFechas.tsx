"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { paises, type Pais } from "@/data/paises";
import type { Fecha } from "@/lib/fechas";
import { mensajes } from "@/lib/whatsapp";
import { BoardingPass } from "./BoardingPass";
import { banderas } from "./ui/Banderas";
import { IconoCerrar } from "./ui/Iconos";
import { COSTAS, MAPA, proyectar } from "./ui/mapa-datos";
import { Ramita } from "./ui/Ornamentos";
import { WaButton } from "./ui/WaButton";

const ORIGEN = proyectar(-31.4, -64.2);
const pct = ([x, y]: [number, number]) => ({ left: `${(x / MAPA.ancho) * 100}%`, top: `${(y / MAPA.alto) * 100}%` });

function arco([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  // curva suave, levantada hacia el norte
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.22;
  return `M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`;
}

/** Ventana con los pasajes del país elegido (y sus ciudades, si tiene más de una). */
function Pasajes({ pais, fechas, onClose }: { pais: Pais; fechas: Fecha[]; onClose: () => void }) {
  const [op, setOp] = useState(pais.opciones.find((o) => fechas.some((f) => f.destino === o.nombre)) ?? pais.opciones[0]);
  const delLugar = fechas.filter((f) => f.destino === op.nombre);
  const cerrar = useRef<HTMLButtonElement>(null);
  const Bandera = banderas[pais.id];

  useEffect(() => {
    cerrar.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-carbon/70 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Próximas fechas: ${pais.nombre}`}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-carbon p-6 text-crema shadow-2xl ring-1 ring-cacao sm:rounded-3xl md:p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {Bandera && <Bandera className="h-6 w-9" />}
            <p className="display text-3xl">{pais.nombre}</p>
          </div>
          <button ref={cerrar} type="button" onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 hover:bg-crema/10">
            <IconoCerrar className="h-6 w-6" />
          </button>
        </div>

        {pais.opciones.length > 1 && (
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Ciudades">
            {pais.opciones.map((o) => {
              const n = fechas.filter((f) => f.destino === o.nombre).length;
              const activo = o.nombre === op.nombre;
              return (
                <button
                  key={o.nombre}
                  type="button"
                  role="tab"
                  aria-selected={activo}
                  onClick={() => setOp(o)}
                  className={`eyebrow rounded-full border px-4 py-2 text-[0.62rem] transition-colors ${
                    activo ? "border-ambar bg-ambar text-carbon" : "border-crema/30 text-crema/80 hover:border-ambar"
                  }`}
                >
                  {o.etiqueta} · {n ? `${n} ${n === 1 ? "fecha" : "fechas"}` : "sin fecha"}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          {delLugar.length > 0 ? (
            <ul className="grid gap-5">
              {delLugar.map((f) => (
                <li key={f.id}>
                  <BoardingPass f={f} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-cacao p-8 text-center">
              <p className="display text-3xl">{op.etiqueta}: sin fecha por ahora</p>
              <p className="mt-3 text-crema/75">Te avisamos apenas abramos la próxima salida.</p>
              <WaButton mensaje={mensajes.avisarDestino(op.nombre)} cta={`fechas:avisar:${op.nombre}`} variante="ambar" className="mt-6">
                Avisame cuando vuelva
              </WaButton>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MapaFechas({ fechas }: { fechas: Fecha[] }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const cantidad = (p: Pais) => fechas.filter((f) => p.opciones.some((o) => o.nombre === f.destino)).length;
  const pais = paises.find((p) => p.id === abierto);
  const cerrar = useCallback(() => setAbierto(null), []);

  return (
    <div className="relative mx-auto mt-12 max-w-5xl p-3 sm:p-6">
      <div className="pointer-events-none absolute inset-2 border border-caramelo/30 sm:inset-3" aria-hidden />
      <div className="relative">
        <svg viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`} className="h-auto w-full" aria-hidden>
          <defs>
            {/* Trazo fino, apenas irregular, como dibujado con pluma */}
            <filter id="pluma" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" />
              <feDisplacementMap in="SourceGraphic" scale="3" />
            </filter>
          </defs>
          <path d={COSTAS} filter="url(#pluma)" className="fill-crema/[0.05] stroke-crema/45" strokeWidth={0.9} strokeLinejoin="round" />
          <path d={COSTAS} transform="translate(1.8 1.4)" className="fill-none stroke-nude/30" strokeWidth={0.6} strokeLinejoin="round" />
          {paises.map((p) => {
            const activo = p.id === hover || p.id === abierto;
            return (
              <path
                key={p.id}
                d={arco(ORIGEN, proyectar(p.lat, p.lon))}
                fill="none"
                stroke="currentColor"
                strokeWidth={activo ? 1.4 : 1}
                strokeDasharray="2 6"
                strokeLinecap="round"
                className={`transition-colors duration-300 ${activo ? "text-ambar" : "text-nude/60"}`}
              />
            );
          })}
        </svg>

        {/* Origen: la hoja de la marca */}
        <span className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={pct(ORIGEN)}>
          <Ramita className="h-5 text-ambar sm:h-7" />
          <span className="display mt-0.5 text-xs italic text-crema sm:text-base">Córdoba</span>
        </span>

        {/* Banderas de cada país (HTML encima del mapa, así el texto siempre se lee) */}
        {paises.map((p) => {
          const Bandera = banderas[p.id];
          const n = cantidad(p);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setAbierto(p.id)}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.id)}
              onBlur={() => setHover(null)}
              data-cta={`fechas:mapa:${p.id}`}
              aria-label={`${p.nombre}: ${n ? `${n} ${n === 1 ? "fecha" : "fechas"}` : "sin fecha por ahora"}. Ver pasajes`}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={pct(proyectar(p.lat, p.lon))}
            >
              <span className="relative">
                {n > 0 && (
                  <span className="absolute -inset-2 animate-ping rounded-full border border-ambar [animation-duration:2.6s]" aria-hidden />
                )}
                {Bandera && (
                  <Bandera className="relative h-4 w-6 shadow-sm ring-1 ring-crema/70 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-5 sm:w-7" />
                )}
              </span>
              <span className="display mt-1 whitespace-nowrap text-xs italic text-crema sm:text-lg">{p.nombre}</span>
              <span className="eyebrow text-[0.5rem] text-ambar/80 sm:text-[0.58rem]">
                {n ? `${n} ${n === 1 ? "fecha" : "fechas"}` : "sin fecha"}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>{pais && <Pasajes key={pais.id} pais={pais} fechas={fechas} onClose={cerrar} />}</AnimatePresence>
    </div>
  );
}
