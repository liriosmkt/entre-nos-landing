"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { paises } from "@/data/paises";
import { estadoDe, estadoLabel, type Fecha } from "@/lib/fechas";
import { BoardingPass } from "./BoardingPass";
import { banderas } from "./ui/Banderas";
import { IconoCerrar } from "./ui/Iconos";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DIAS = ["L", "M", "M", "J", "V", "S", "D"];

// destino de fechas.json → país (bandera) y cómo se muestra
const paisDe = (destino: string) => paises.find((p) => p.opciones.some((o) => o.nombre === destino));
const etiquetaDe = (f: Fecha) =>
  paisDe(f.destino)?.opciones.find((o) => o.nombre === f.destino)?.etiqueta ?? `${f.tipo} ${f.destino}`;
const partes = (iso: string) => iso.split("-").map(Number) as [number, number, number];
const clave = (y: number, m: number) => y * 12 + m; // m: 0-11

function Bandera({ destino, className }: { destino: string; className: string }) {
  const p = paisDe(destino);
  const B = p ? banderas[p.id] : undefined;
  return B ? <B className={className} /> : <span className={`${className} bg-nude`} />;
}

/** Ventana emergente con el pasaje de la fecha elegida. */
function Popup({ f, onClose }: { f: Fecha; onClose: () => void }) {
  const cerrar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    cerrar.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      anterior?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-y-auto bg-carbon/75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center px-4 py-16 sm:p-8">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Pasaje: ${etiquetaDe(f)}`}
          className="relative w-full max-w-3xl"
          initial={{ y: 40, opacity: 0, rotate: -1.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={cerrar}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute -top-12 right-0 rounded-full p-2 text-crema hover:bg-crema/10"
          >
            <IconoCerrar className="h-6 w-6" />
          </button>
          <BoardingPass f={f} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Calendario({ fechas }: { fechas: Fecha[] }) {
  // Meses que tienen fechas (de la primera a la última)
  const hoy = new Date();
  const primera = fechas[0] ? partes(fechas[0].fecha) : null;
  const ultima = fechas.length ? partes(fechas[fechas.length - 1].fecha) : null;
  const inicio = primera ? clave(primera[0], primera[1] - 1) : clave(hoy.getFullYear(), hoy.getMonth());
  const fin = ultima ? clave(ultima[0], ultima[1] - 1) : inicio;
  const [mes, setMes] = useState(inicio);
  const [elegida, setElegida] = useState<string | null>(null);

  const y = Math.floor(mes / 12);
  const m = mes % 12;
  const delMes = useMemo(() => {
    const porDia = new Map<number, Fecha[]>();
    for (const f of fechas) {
      const [fy, fm, fd] = partes(f.fecha);
      if (fy === y && fm - 1 === m) porDia.set(fd, [...(porDia.get(fd) ?? []), f]);
    }
    return porDia;
  }, [fechas, y, m]);

  const diasEnMes = new Date(y, m + 1, 0).getDate();
  const vacios = (new Date(y, m, 1).getDay() + 6) % 7; // la semana arranca el lunes
  const f = fechas.find((x) => x.id === elegida);
  const enCalendario = Array.from(new Set(fechas.map((x) => x.destino)));
  const cerrar = useCallback(() => setElegida(null), []);
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  if (!fechas.length) {
    return (
      <div className="mx-auto max-w-xl border-y border-crema/15 py-12 text-center">
        <p className="display text-3xl italic">Estamos armando las próximas fechas.</p>
        <a href="#lista-de-espera" className="btn btn-ambar mt-6" data-cta="calendario:sin-fechas-lista">
          Anotarme en la lista de espera
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Mes */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMes(mes - 1)}
          disabled={mes <= inicio}
          aria-label="Mes anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-crema/80 transition-colors hover:text-ambar disabled:opacity-20"
        >
          ‹
        </button>
        <p className="display text-3xl italic md:text-4xl" aria-live="polite">
          {MESES[m]} <span className="not-italic text-crema/40">{y}</span>
        </p>
        <button
          type="button"
          onClick={() => setMes(mes + 1)}
          disabled={mes >= fin}
          aria-label="Mes siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-crema/80 transition-colors hover:text-ambar disabled:opacity-20"
        >
          ›
        </button>
      </div>

      <div className="mt-8 border-t border-crema/15 pt-6">
        <div className="grid grid-cols-7 text-center">
          {DIAS.map((d, i) => (
            <span key={i} className="eyebrow pb-4 text-[0.6rem] text-crema/40">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {Array.from({ length: vacios }, (_, i) => (
            <span key={`v${i}`} />
          ))}
          {Array.from({ length: diasEnMes }, (_, i) => {
            const dia = i + 1;
            const delDia = delMes.get(dia) ?? [];
            if (!delDia.length) {
              return (
                <span key={dia} className="flex h-12 items-start justify-center pt-1 text-sm text-crema/30 sm:h-14">
                  {dia}
                </span>
              );
            }
            return (
              <div key={dia} className="flex h-12 flex-col items-center gap-1 pt-1 sm:h-14">
                <span className="text-sm font-medium text-crema">{dia}</span>
                <span className="flex gap-1">
                  {delDia.map((x) => {
                    const agotado = estadoDe(x) === "agotado";
                    return (
                      <button
                        key={x.id}
                        type="button"
                        onClick={() => setElegida(x.id)}
                        aria-haspopup="dialog"
                        aria-label={`${etiquetaDe(x)}, ${dia} de ${MESES[m].toLowerCase()}: ${estadoLabel[estadoDe(x)]}. Ver detalle`}
                        data-cta={`calendario:fecha:${x.id}`}
                        className={`rounded-[3px] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar ${
                          agotado ? "opacity-40 grayscale" : ""
                        }`}
                      >
                        <Bandera destino={x.destino} className="block h-4 w-6 ring-1 ring-crema/40 sm:h-[18px] sm:w-[27px]" />
                      </button>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referencias */}
      <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-crema/15 pt-6">
        {enCalendario.map((d) => (
          <li key={d} className="eyebrow flex items-center gap-2 text-[0.58rem] text-crema/55">
            <Bandera destino={d} className="h-2.5 w-[15px]" />
            {paisDe(d)?.opciones.find((o) => o.nombre === d)?.etiqueta ?? d}
          </li>
        ))}
      </ul>

      {/* La ventana va al body: así ningún contenedor animado la recorta */}
      {montado && createPortal(<AnimatePresence>{f && <Popup key={f.id} f={f} onClose={cerrar} />}</AnimatePresence>, document.body)}
    </div>
  );
}
