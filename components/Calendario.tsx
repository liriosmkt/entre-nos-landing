"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { paises } from "@/data/paises";
import { cuposTexto, estadoDe, estadoLabel, fechaCorta, precioTexto, type Fecha } from "@/lib/fechas";
import { mensajes, waLink } from "@/lib/whatsapp";
import { banderas } from "./ui/Banderas";
import { IconoWhatsApp } from "./ui/Iconos";
import { Txt } from "./ui/Txt";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DIAS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const DIAS_LARGO = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

// destino de fechas.json → bandera del país
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

/** Detalle de la fecha elegida. */
function Detalle({ f }: { f: Fecha }) {
  const [y, m, d] = partes(f.fecha);
  const dia = DIAS_LARGO[new Date(y, m - 1, d).getDay()];
  const estado = estadoDe(f);
  const agotado = estado === "agotado";
  const corta = fechaCorta(f.fecha);
  const mensaje = agotado ? mensajes.avisarLugar(f.tipo, f.destino, corta) : mensajes.fecha(f.tipo, f.destino, corta);

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <Bandera destino={f.destino} className="mt-1.5 h-6 w-9 shrink-0 shadow-sm ring-1 ring-espresso/10" />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="display text-3xl italic text-espresso">{etiquetaDe(f)}</p>
            {f.ejemplo && (
              <span className="eyebrow rounded-sm border border-dashed border-cacao px-1.5 py-0.5 text-[0.6rem] text-cacao">Ejemplo</span>
            )}
          </div>
          <p className="eyebrow mt-1 text-oliva-oscuro">
            {dia} {d} de {MESES[m - 1].toLowerCase()}
          </p>
          {f.nota && <p className="mt-2 text-sm text-tinta-suave">{f.nota}</p>}
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-[0.6rem] text-tinta-suave">Horario</dt>
              <dd className="mt-1 text-espresso">
                <Txt>{f.horario}</Txt>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.6rem] text-tinta-suave">Mesa</dt>
              <dd className="mt-1 text-espresso">{f.cupos} invitados</dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.6rem] text-tinta-suave">Precio</dt>
              <dd className="mt-1 text-espresso">
                <Txt>{precioTexto(f.precio)}</Txt>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.6rem] text-tinta-suave">Estado</dt>
              <dd className={`mt-1 ${agotado ? "text-tinta-suave" : "text-espresso"}`}>
                {estadoLabel[estado]}
                <span className="block text-xs text-tinta-suave">{cuposTexto(f)}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <a
        href={waLink(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={agotado ? `calendario:avisarme:${f.id}` : `calendario:reservar:${f.id}`}
        className={`btn shrink-0 ${agotado ? "btn-linea-oscura" : "btn-espresso"}`}
      >
        <IconoWhatsApp className="h-4 w-4 shrink-0" />
        {agotado ? "Avisarme si se libera" : "Reservar"}
      </a>
    </div>
  );
}

export function Calendario({ fechas }: { fechas: Fecha[] }) {
  // Meses que tienen fechas (de la primera a la última)
  const hoy = new Date();
  const inicio = fechas.length ? clave(partes(fechas[0].fecha)[0], partes(fechas[0].fecha)[1] - 1) : clave(hoy.getFullYear(), hoy.getMonth());
  const fin = fechas.length
    ? clave(partes(fechas[fechas.length - 1].fecha)[0], partes(fechas[fechas.length - 1].fecha)[1] - 1)
    : inicio;
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
  const cambiarMes = (n: number) => {
    setMes(mes + n);
    setElegida(null);
  };

  // Banderas que aparecen en el calendario, como referencia
  const enCalendario = Array.from(new Set(fechas.map((x) => x.destino)));

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-crema text-tinta shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
      <div className="flex items-center justify-between border-b border-espresso/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => cambiarMes(-1)}
          disabled={mes <= inicio}
          aria-label="Mes anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-espresso hover:bg-hueso disabled:opacity-25"
        >
          ‹
        </button>
        <p className="display text-3xl text-espresso" aria-live="polite">
          {MESES[m]} <span className="text-caramelo">{y}</span>
        </p>
        <button
          type="button"
          onClick={() => cambiarMes(1)}
          disabled={mes >= fin}
          aria-label="Mes siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-espresso hover:bg-hueso disabled:opacity-25"
        >
          ›
        </button>
      </div>

      <div className="px-3 pb-4 pt-4 sm:px-8 sm:pb-6">
        <div className="grid grid-cols-7 text-center">
          {DIAS.map((d) => (
            <span key={d} className="eyebrow pb-2 text-[0.6rem] text-tinta-suave">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: vacios }, (_, i) => (
            <span key={`v${i}`} />
          ))}
          {Array.from({ length: diasEnMes }, (_, i) => {
            const dia = i + 1;
            const delDia = delMes.get(dia) ?? [];
            return (
              <div
                key={dia}
                className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-sm sm:aspect-[1.15] ${
                  delDia.length ? "bg-hueso" : "text-tinta-suave/70"
                }`}
              >
                <span className={delDia.length ? "font-medium text-espresso" : ""}>{dia}</span>
                {delDia.length > 0 && (
                  <span className="flex gap-1">
                    {delDia.map((x) => {
                      const activo = x.id === elegida;
                      const agotado = estadoDe(x) === "agotado";
                      return (
                        <button
                          key={x.id}
                          type="button"
                          onClick={() => setElegida(activo ? null : x.id)}
                          aria-pressed={activo}
                          aria-label={`${etiquetaDe(x)}, ${dia} de ${MESES[m].toLowerCase()}: ${estadoLabel[estadoDe(x)]}`}
                          data-cta={`calendario:fecha:${x.id}`}
                          className={`rounded-sm p-0.5 transition-transform hover:-translate-y-0.5 ${
                            activo ? "ring-2 ring-espresso" : "ring-1 ring-transparent"
                          } ${agotado ? "opacity-45 grayscale" : ""}`}
                        >
                          <Bandera destino={x.destino} className="block h-4 w-6 sm:h-5 sm:w-7" />
                        </button>
                      );
                    })}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Referencias */}
        {enCalendario.length > 0 && (
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {enCalendario.map((d) => (
              <li key={d} className="flex items-center gap-2 text-xs text-tinta-suave">
                <Bandera destino={d} className="h-3 w-[18px]" />
                {paisDe(d)?.opciones.find((o) => o.nombre === d)?.etiqueta ?? d}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-espresso/10 bg-hueso/60 px-5 py-6 sm:px-8" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={f?.id ?? "nada"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {f ? (
              <Detalle f={f} />
            ) : fechas.length ? (
              <p className="text-center text-sm text-tinta-suave">Elegí una bandera para ver horario, precio y lugares disponibles.</p>
            ) : (
              <div className="text-center">
                <p className="display text-2xl text-espresso">Estamos armando las próximas fechas.</p>
                <a href="#lista-de-espera" className="btn btn-espresso mt-4" data-cta="calendario:sin-fechas-lista">
                  Anotarme en la lista de espera
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
