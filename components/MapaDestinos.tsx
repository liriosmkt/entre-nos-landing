"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { destinos, type Destino } from "@/data/destinos";
import { experiencias } from "@/data/experiencias";
import { paises, type Opcion, type Pais } from "@/data/paises";
import { site } from "@/data/site";
import type { Fecha } from "@/lib/fechas";
import { img } from "@/lib/img";
import { useMenosMovimiento } from "@/lib/movimiento";
import { mensajes } from "@/lib/whatsapp";
import { banderas } from "./ui/Banderas";
import { IconoCerrar, IconoHoja, IconoTaza } from "./ui/Iconos";
import { MAPA, proyectar } from "./ui/mapa-datos";
import { Ramita, Sello } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { WaButton } from "./ui/WaButton";

const ORIGEN = proyectar(-31.4, -64.2);
const pct = ([x, y]: [number, number]) => ({ left: `${(x / MAPA.ancho) * 100}%`, top: `${(y / MAPA.alto) * 100}%` });
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const fechaTexto = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]}`;
};
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
  const reduce = useMenosMovimiento();
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

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-hueso md:aspect-auto md:min-h-full">
      {/* Todas las fotos apiladas: la actual se ve y las demás se funden */}
      {fotos.map((f, n) => {
        const v = img(`images/${f.src}`);
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={f.src}
            src={v.src}
            srcSet={v.srcSet}
            sizes="(min-width: 768px) 45vw, 90vw"
            width={v.width}
            height={v.height}
            alt={n === i ? f.alt : ""}
            aria-hidden={n !== i}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
              n === i ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          />
        );
      })}
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
        <p className="eyebrow-seccion text-oliva-oscuro">Teanner · la carta</p>
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

      <div key={op.nombre} className="entrar mt-6">
          {d ? <Carta d={d} /> : <CartaWorkshop />}

          <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-cacao px-6 py-6 text-center text-crema sm:flex-row sm:justify-between sm:text-left">
            {delLugar.length > 0 ? (
              <>
                <p>
                  <span className="eyebrow block text-ambar">Próximas fechas</span>
                  <span className="display mt-1 block text-2xl italic">{delLugar.map((f) => fechaTexto(f.fecha)).join(" · ")}</span>
                </p>
                <a href="#fechas" className="btn btn-ambar shrink-0" data-cta={`destinos:ver-calendario:${op.nombre}`}>
                  Ver en el calendario
                </a>
              </>
            ) : (
              <>
                <p>
                  <span className="eyebrow block text-ambar">Próximas fechas</span>
                  <span className="display mt-1 block text-2xl italic">Sin fecha por ahora</span>
                </p>
                <WaButton mensaje={mensajes.avisarDestino(op.nombre)} cta={`fechas:avisar:${op.nombre}`} variante="ambar" className="shrink-0">
                  Avisame cuando vuelva
                </WaButton>
              </>
            )}
          </div>
      </div>
    </div>
  );
}

// Silueta de avión mirando hacia +x (rota sola según la dirección del vuelo)
const AVION =
  "M13 0L5-1.8L-1-10.5H-4L-.8-1.8L-7.5-1.5L-10.5-5.5H-12.5L-10.5 0L-12.5 5.5H-10.5L-7.5 1.5L-.8 1.8L-4 10.5H-1L5 1.8Z";
const VUELO_MS = 1700;

/** Avión que trae los sabores del destino a Córdoba, dejando la estela. */
function Vuelo({ d, onLlegada }: { d: string; onLlegada: () => void }) {
  const ruta = useRef<SVGPathElement>(null);
  const reduce = useMenosMovimiento();
  const [estado, setEstado] = useState<{ t: number; x: number; y: number; a: number; largo: number } | null>(null);

  useEffect(() => {
    const path = ruta.current;
    if (!path) return;
    const largo = path.getTotalLength();
    const punto = (t: number) => {
      const p = path.getPointAtLength(largo * t);
      const q = path.getPointAtLength(Math.min(largo, largo * t + 0.5));
      const r = path.getPointAtLength(Math.max(0, largo * t - 0.5));
      return { t, x: p.x, y: p.y, a: (Math.atan2(q.y - r.y, q.x - r.x) * 180) / Math.PI, largo };
    };
    if (reduce) {
      setEstado(punto(1));
      onLlegada();
      return;
    }
    let raf = 0;
    const inicio = performance.now();
    const paso = (ahora: number) => {
      const lineal = Math.min(1, (ahora - inicio) / VUELO_MS);
      const t = lineal < 0.5 ? 2 * lineal * lineal : 1 - (-2 * lineal + 2) ** 2 / 2; // ease in-out
      setEstado(punto(t));
      if (lineal < 1) raf = requestAnimationFrame(paso);
      else onLlegada();
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d, reduce]);

  return (
    <g>
      <path ref={ruta} d={d} fill="none" stroke="none" />
      {/* Estela: se va dibujando detrás del avión */}
      <path
        d={d}
        fill="none"
        className="stroke-ambar"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeDasharray={estado ? `${estado.largo * estado.t} ${estado.largo}` : "0 1"}
        opacity={0.9}
      />
      {estado && (
        <g transform={`translate(${estado.x} ${estado.y}) rotate(${estado.a})`}>
          <path d={AVION} className="fill-crema" stroke="#3a2d26" strokeWidth={1} />
        </g>
      )}
    </g>
  );
}

export function MapaDestinos({ fechas, fondo }: { fechas: Fecha[]; fondo: ReactNode }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const deslizable = useRef<HTMLDivElement>(null);
  const reduce = useMenosMovimiento();
  const cantidad = (p: Pais) => fechas.filter((f) => p.opciones.some((o) => o.nombre === f.destino)).length;
  const pais = paises.find((p) => p.id === abierto);
  // El último país abierto sigue dibujado mientras la caja se cierra
  const [ultimo, setUltimo] = useState<string | null>(null);
  useEffect(() => {
    if (abierto) setUltimo(abierto);
  }, [abierto]);
  const mostrado = paises.find((p) => p.id === (abierto ?? ultimo));

  // En pantallas chicas el mapa se desliza: arrancar centrado en los destinos
  useEffect(() => {
    const el = deslizable.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const xs = [ORIGEN[0], ...paises.map((p) => proyectar(p.lat, p.lon)[0])];
    const centro = ((Math.min(...xs) + Math.max(...xs)) / 2 / MAPA.ancho) * el.scrollWidth;
    el.scrollLeft = centro - el.clientWidth / 2;
  }, []);

  // Escape cierra la caja
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  // Cuando el avión aterriza en Córdoba, llevar la vista a la caja del destino
  const alAterrizar = () => {
    const el = caja.current;
    if (!el) return;
    const desde = window.scrollY;
    const y = el.getBoundingClientRect().top + desde - 80;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    // Algunos navegadores cortan el scroll suave si la página todavía se está acomodando
    setTimeout(() => {
      if (Math.abs(window.scrollY - desde) < 2) window.scrollTo({ top: y });
    }, 600);
  };

  return (
    <div>
      {/* El mapa sale del contenedor y ocupa casi todo el ancho de la pantalla */}
      <div className="relative left-1/2 mt-10 w-screen max-w-[1800px] -translate-x-1/2 md:w-[96vw]">
        <div ref={deslizable} className="overflow-x-auto [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden">
          <div className="relative w-[240%] sm:w-[160%] md:w-full">
            {fondo}
            {/* Encima del dibujo fijo: arcos y vuelo (esto sí cambia al interactuar) */}
            <svg viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`} className="relative h-auto w-full" aria-hidden>
              {paises.map((p) => {
                if (p.id === abierto) return null;
                const activo = p.id === hover;
                return (
                  <path
                    key={p.id}
                    d={arco(ORIGEN, proyectar(p.lat, p.lon))}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={activo ? 1.4 : 1}
                    strokeDasharray="2 6"
                    strokeLinecap="round"
                    className={`transition-colors duration-300 ${activo ? "text-ambar" : "text-nude/50"}`}
                  />
                );
              })}
              {pais && <Vuelo key={pais.id} d={arco(proyectar(pais.lat, pais.lon), ORIGEN)} onLlegada={alAterrizar} />}
            </svg>

            {/* Origen: la hoja de la marca */}
            <span className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={pct(ORIGEN)}>
              <Ramita className="h-5 text-ambar sm:h-7" />
              <span className="display mt-0.5 text-sm italic text-crema sm:text-base">Córdoba</span>
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
                  <span className={`display mt-1 whitespace-nowrap text-sm italic sm:text-lg ${activo ? "text-ambar" : "text-crema"}`}>
                    {p.nombre}
                  </span>
                  <span className="eyebrow text-[0.5rem] text-ambar/80 sm:text-[0.58rem]">{fechasTexto(n)}</span>
                  <span className="sr-only">. Ver la carta</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="eyebrow mt-3 text-center text-[0.6rem] text-crema/50 md:hidden">‹ Deslizá para recorrer el mapa ›</p>
      </div>

      <div id="caja-destino" ref={caja} className="mx-auto max-w-5xl scroll-mt-24">
        {/* Se despliega con una transición de alto (grid 0fr → 1fr) */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${pais ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden" inert={!pais}>
            {mostrado && (
              <div className="pt-8">
                <Panel key={mostrado.id} pais={mostrado} fechas={fechas} onClose={() => setAbierto(null)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
