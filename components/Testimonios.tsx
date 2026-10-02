"use client";

import { useEffect, useRef, useState } from "react";
import { reels, testimonios } from "@/data/testimonios";
import { mensajes } from "@/lib/whatsapp";
import { Txt } from "./ui/Txt";
import { SectionHead, WaButton } from "./ui/WaButton";

const INTERVALO = 8000;

// Flecha tipo chevron (‹ ›): dos trazos finos en ángulo, sin círculo ni línea
function Chevron({ hacia }: { hacia: "izquierda" | "derecha" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-10 sm:w-10" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <path d={hacia === "izquierda" ? "M15 4 7 12l8 8" : "m9 4 8 8-8 8"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const claseFlecha =
  "flex h-11 w-9 shrink-0 items-center justify-center text-crema/80 transition-[color,transform] hover:text-crema sm:h-14 sm:w-12";
// Cada tarjeta queda apoyada con un giro distinto, como si alguien la hubiera dejado sobre la mesa
const GIROS = ["-2deg", "1.5deg", "-1deg"];

export function Testimonios() {
  const [actual, setActual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const toque = useRef(0);
  const total = testimonios.length;
  const mover = (dir: 1 | -1) => setActual((i) => (i + dir + total) % total);
  const t = testimonios[actual];

  useEffect(() => {
    if (pausa || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActual((i) => (i + 1) % total), INTERVALO);
    return () => window.clearTimeout(id);
  }, [actual, pausa, total]);

  return (
    <section id="invitados" className="section-y bg-crema" aria-roledescription="carrusel">
      <div className="container-x">
        <SectionHead
          eyebrow="Ustedes"
          titulo="Lo que dicen nuestros invitados"
          bajada="Cuando algo está hecho con cariño, se nota en los detalles."
        />

        {/* De a un testimonio por vez, como una tarjeta apoyada sobre la mesa; avanza solo y se pausa al pasar el mouse o enfocar */}
        <div
          className="mt-12"
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
          onFocus={() => setPausa(true)}
          onBlur={() => setPausa(false)}
          onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - toque.current;
            if (Math.abs(dx) > 40) mover(dx < 0 ? 1 : -1);
          }}
        >
          {/* Flechas a los costados de la tarjeta, sobre la mesa */}
          <div className="mesa flex min-h-[22rem] items-center justify-center gap-2 overflow-hidden rounded-3xl px-2 py-12 sm:gap-8 sm:px-5 md:min-h-[24rem] md:gap-14 md:py-14">
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label="Testimonio anterior"
              className={`${claseFlecha} hover:-translate-x-0.5`}
            >
              <Chevron hacia="izquierda" />
            </button>
            <figure
              key={actual}
              className="tarjeta-mesa apoyar w-full min-w-0 max-w-sm rounded-md bg-crema px-5 pb-6 pt-5 text-center sm:px-7 sm:pb-7 sm:pt-6"
              style={{ "--giro": GIROS[actual % GIROS.length] } as React.CSSProperties}
              aria-roledescription="diapositiva"
              aria-label={`${actual + 1} de ${testimonios.length}`}
              aria-live="polite"
            >
              <span className="display block h-6 text-5xl leading-none text-caramelo" aria-hidden>
                “
              </span>
              <blockquote className="display mt-3 text-lg italic leading-snug text-espresso sm:text-xl">
                <Txt>{t.texto}</Txt>
              </blockquote>
              <figcaption className="mt-5 border-t border-dashed border-caramelo/50 pt-4">
                <p className="eyebrow text-xs text-tinta">
                  <Txt>{t.autor}</Txt>
                </p>
                <p className="mt-1 text-sm text-tinta-suave">
                  <Txt>{t.experiencia}</Txt>
                </p>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label="Testimonio siguiente"
              className={`${claseFlecha} hover:translate-x-0.5`}
            >
              <Chevron hacia="derecha" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonios.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ver testimonio ${i + 1}`}
                aria-current={i === actual || undefined}
                className={`h-2 rounded-full transition-all ${i === actual ? "w-8 bg-espresso" : "w-2 bg-espresso/25 hover:bg-espresso/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Reels de Instagram */}
        <div className="mt-14">
          <p className="eyebrow-seccion text-oliva-oscuro">En reels</p>
          {reels.length > 0 ? (
            <ul className="mt-6 flex flex-wrap justify-center gap-6">
              {reels.map((r) => (
                <li key={r.url} className="w-full max-w-xs">
                  <article className="rounded-2xl border border-caramelo/40 bg-hueso p-3 shadow-[0_20px_40px_-28px_rgba(58,45,38,.6)]">
                    {/* El embed de Instagram se recorta para mostrar solo el video (sin encabezado, barras ni pie) */}
                    <div className="reel-recorte rounded-xl bg-carbon">
                      <iframe
                        src={`${r.url.replace(/\/$/, "")}/embed`}
                        title={`Reel de ${r.autor}`}
                        loading="lazy"
                        scrolling="no"
                        allowFullScreen
                      />
                    </div>
                    <div className="px-2 pb-2 pt-4">
                      <p className="eyebrow text-xs text-oliva-oscuro">{r.autor}</p>
                      <p className="display mt-1 text-xl italic leading-snug text-espresso">{r.titulo}</p>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta={`reels:${r.autor}`}
                        className="eyebrow mt-3 inline-block text-[0.7rem] text-cacao hover:text-espresso"
                      >
                        Ver en Instagram ›
                      </a>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-caramelo p-6 text-sm text-tinta-suave">
              <Txt>[COMPLETAR: links de reels de Instagram en data/testimonios.ts, con permiso de cada creador]</Txt>
            </p>
          )}
        </div>

        <div className="mt-12 text-center">
          <WaButton mensaje={mensajes.general()} cta="testimonios:reservar">
            Reservá tu lugar
          </WaButton>
        </div>
      </div>
    </section>
  );
}
