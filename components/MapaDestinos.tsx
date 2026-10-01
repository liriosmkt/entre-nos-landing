"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { destinos, type Destino } from "@/data/destinos";
import { experiencias } from "@/data/experiencias";
import { paises, type Opcion, type Pais } from "@/data/paises";
import { site } from "@/data/site";
import type { Fecha } from "@/lib/fechas";
import { mensajes } from "@/lib/whatsapp";
import { BoardingPass } from "./BoardingPass";
import { banderas } from "./ui/Banderas";
import { IconoCerrar, IconoHoja, IconoTaza } from "./ui/Iconos";
import { COSTAS, MAPA, proyectar } from "./ui/mapa-datos";
import { Ramita, Sello } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { WaButton } from "./ui/WaButton";

const ORIGEN = proyectar(-31.4, -64.2);
const pct = ([x, y]: [number, number]) => ({ left: `${(x / MAPA.ancho) * 100}%`, top: `${(y / MAPA.alto) * 100}%` });
const fechasTexto = (n: number) => (n ? `${n} ${n === 1 ? "fecha" : "fechas"}` : "sin fecha");

function arco([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  // curva suave, levantada hacia el norte
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.22;
  return `M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`;
}

/** Fotos del destino en secuencia. */
function Secuencia({ d }: { d: Destino }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const fotos = d.fotos;

  useEffect(() => {
    if (reduce || fotos.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % fotos.length), 2600);
    return () => clearInterval(id);
  }, [fotos, reduce]);

  if (fotos.length === 0) {
    // Sin fotos todavía: bloque con la hoja de la marca
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-hueso to-nude/60 md:aspect-auto md:min-h-full">
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
    <div className="relative aspect-[4/3] overflow-hidden bg-hueso md:aspect-auto md:min-h-full">
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

/** La carta del teanner: fotos + los 5 pasos. */
function Carta({ d }: { d: Destino }) {
  return (
    <div className="grid overflow-hidden rounded-2xl bg-crema text-tinta md:grid-cols-[1fr_1.15fr]">
      <Secuencia key={d.id} d={d} />
      <div className="relative px-6 pb-8 pt-7 md:px-10 md:py-10">
        <p className="eyebrow text-oliva-oscuro">Teanner · la carta</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="display text-5xl italic text-espresso md:text-6xl">{d.nombre}</p>
          {d.sello && (
            <Sello className="text-oliva-oscuro" rotar={-4}>
              {d.sello}
            </Sello>
          )}
        </div>
        <p className="mt-3 leading-relaxed text-tinta-suave">{d.descripcion}</p>

        <ol className="mt-6 space-y-4">
          {d.pasos.map((p, i) => (
            <li key={p} className="flex gap-4">
              <span className="display w-6 shrink-0 text-3xl italic leading-none text-caramelo">{i + 1}</span>
              <span className="border-b border-dotted border-espresso/25 pb-3 leading-snug text-tinta">
                <Txt>{p}</Txt>
              </span>
            </li>
          ))}
        </ol>

        <ul className="mt-6 space-y-2 text-sm text-tinta-suave">
          <li className="flex items-start gap-2">
            <IconoTaza className="h-5 w-5 shrink-0 text-cacao" /> <Txt>{d.bebidas}</Txt>
          </li>
          {d.veggie && (
            <li className="flex items-start gap-2">
              <IconoHoja className="h-5 w-5 shrink-0 text-oliva-oscuro" /> Versión veggie avisando al reservar
            </li>
          )}
          {d.colaboracion && (
            <li className="pl-7">
              Junto a{" "}
              <a
                href={`https://instagram.com/${d.colaboracion}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso underline decoration-caramelo underline-offset-4"
              >
                @{d.colaboracion}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/** Opciones sin carta de teanner (por ahora, el Workshop Puglia). */
function CartaWorkshop() {
  const w = experiencias.find((e) => e.id === "workshop");
  if (!w) return null;
  return (
    <div className="rounded-2xl bg-crema px-6 py-8 text-tinta md:px-10">
      <p className="eyebrow text-oliva-oscuro">{w.eyebrow}</p>
      <p className="display mt-2 text-5xl italic text-espresso">{w.titulo}</p>
      <p className="mt-3 leading-relaxed text-tinta-suave">{w.bajada}</p>
      {w.incluye && (
        <ol className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {w.incluye.map((x, i) => (
            <li key={x} className="flex gap-4">
              <span className="display w-6 shrink-0 text-2xl italic leading-none text-caramelo">{i + 1}</span>
              <span className="leading-snug text-tinta">{x}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Caja que se despliega debajo del mapa con todo el destino: carta, fotos y pasajes. */
function Panel({ pais, fechas, onClose }: { pais: Pais; fechas: Fecha[]; onClose: () => void }) {
  const [op, setOp] = useState<Opcion>(pais.opciones.find((o) => fechas.some((f) => f.destino === o.nombre)) ?? pais.opciones[0]);
  const delLugar = fechas.filter((f) => f.destino === op.nombre);
  const d = op.destinoId ? destinos.find((x) => x.id === op.destinoId) : undefined;
  const Bandera = banderas[pais.id];

  return (
    <div className="rounded-3xl bg-carbon p-4 ring-1 ring-cacao sm:p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {Bandera && <Bandera className="h-6 w-9" />}
          <p className="display text-3xl text-crema">{pais.nombre}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 text-crema hover:bg-crema/10">
          <IconoCerrar className="h-6 w-6" />
        </button>
      </div>

      {pais.opciones.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={`Destinos de ${pais.nombre}`}>
          {pais.opciones.map((o) => {
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
                {o.etiqueta} · {fechasTexto(fechas.filter((f) => f.destino === o.nombre).length)}
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={op.nombre}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          {d ? <Carta d={d} /> : <CartaWorkshop />}

          <p className="eyebrow mt-10 text-center text-ambar">Próximas fechas · {op.etiqueta}</p>
          <div className="mt-5">
            {delLugar.length > 0 ? (
              <ul className="grid gap-5">
                {delLugar.map((f) => (
                  <li key={f.id}>
                    <BoardingPass f={f} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-cacao p-8 text-center text-crema">
                <p className="display text-3xl">{op.etiqueta}: sin fecha por ahora</p>
                <p className="mt-3 text-crema/75">Te avisamos apenas abramos la próxima salida.</p>
                <WaButton mensaje={mensajes.avisarDestino(op.nombre)} cta={`fechas:avisar:${op.nombre}`} variante="ambar" className="mt-6">
                  Avisame cuando vuelva
                </WaButton>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function MapaDestinos({ fechas }: { fechas: Fecha[] }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const cantidad = (p: Pais) => fechas.filter((f) => p.opciones.some((o) => o.nombre === f.destino)).length;
  const pais = paises.find((p) => p.id === abierto);

  // Al elegir un país, llevar la vista a la caja (después de que termina de abrirse)
  useEffect(() => {
    if (!abierto) return;
    let respaldo: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      const el = caja.current;
      if (!el) return;
      const desde = window.scrollY;
      const y = el.getBoundingClientRect().top + desde - 80;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      // Algunos navegadores cortan el scroll suave si la página todavía se está acomodando
      respaldo = setTimeout(() => {
        if (Math.abs(window.scrollY - desde) < 2) window.scrollTo({ top: y });
      }, 600);
    }, 450);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      clearTimeout(respaldo);
      window.removeEventListener("keydown", onKey);
    };
  }, [abierto, reduce]);

  return (
    <div>
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
            const activo = p.id === abierto;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setAbierto(activo ? null : p.id)}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.id)}
                onBlur={() => setHover(null)}
                data-cta={`destinos:mapa:${p.id}`}
                aria-expanded={activo}
                aria-controls="caja-destino"
                aria-label={`${p.nombre}: ${n ? fechasTexto(n) : "sin fecha por ahora"}. Ver carta y pasajes`}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={pct(proyectar(p.lat, p.lon))}
              >
                <span className="relative">
                  {(n > 0 || activo) && (
                    <span
                      className={`absolute -inset-2 rounded-full border border-ambar ${activo ? "bg-ambar/20" : "animate-ping [animation-duration:2.6s]"}`}
                      aria-hidden
                    />
                  )}
                  {Bandera && (
                    <Bandera className="relative h-4 w-6 shadow-sm ring-1 ring-crema/70 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-5 sm:w-7" />
                  )}
                </span>
                <span className={`display mt-1 whitespace-nowrap text-xs italic sm:text-lg ${activo ? "text-ambar" : "text-crema"}`}>{p.nombre}</span>
                <span className="eyebrow text-[0.5rem] text-ambar/80 sm:text-[0.58rem]">{fechasTexto(n)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="caja-destino" ref={caja} className="mx-auto max-w-5xl scroll-mt-24">
        <AnimatePresence initial={false}>
          {pais && (
            <motion.div
              key={pais.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                <Panel pais={pais} fechas={fechas} onClose={() => setAbierto(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
