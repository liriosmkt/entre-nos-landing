"use client";

import { useEffect, useRef, useState } from "react";
import { reels, testimonios } from "@/data/testimonios";
import { mensajes } from "@/lib/whatsapp";
import { IconoFlecha } from "./ui/Iconos";
import { Txt } from "./ui/Txt";
import { SectionHead, WaButton } from "./ui/WaButton";

const INTERVALO = 7000;

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
        <div className="flex items-end justify-between gap-6">
          <SectionHead
            eyebrow="Ustedes"
            titulo="Lo que dicen nuestros invitados"
            bajada="Cuando algo está hecho con cariño, se nota en los detalles."
          />
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label="Testimonio anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/30 text-espresso hover:bg-espresso hover:text-crema"
            >
              <IconoFlecha className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label="Testimonio siguiente"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/30 text-espresso hover:bg-espresso hover:text-crema"
            >
              <IconoFlecha className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* De a un testimonio por vez; avanza solo y se pausa al pasar el mouse o enfocar */}
        <div
          className="mx-auto mt-12 max-w-3xl"
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
          <figure
            key={actual}
            className="fundido rounded-2xl border border-caramelo/40 bg-hueso px-8 py-10 text-center md:px-14 md:py-14"
            aria-roledescription="diapositiva"
            aria-label={`${actual + 1} de ${testimonios.length}`}
            aria-live="polite"
          >
            <span className="display block h-8 text-6xl leading-none text-caramelo" aria-hidden>
              “
            </span>
            <blockquote className="display mt-5 text-2xl italic leading-snug text-espresso md:text-3xl">
              <Txt>{t.texto}</Txt>
            </blockquote>
            <figcaption className="mt-8">
              <p className="eyebrow text-[0.65rem] text-tinta">
                <Txt>{t.autor}</Txt>
              </p>
              <p className="mt-1 text-sm text-tinta-suave">
                <Txt>{t.experiencia}</Txt>
              </p>
            </figcaption>
          </figure>

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
          <p className="eyebrow text-oliva-oscuro">En reels</p>
          {reels.length > 0 ? (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reels.map((url) => (
                <li key={url} className="overflow-hidden rounded-xl bg-hueso">
                  <iframe
                    src={`${url.replace(/\/$/, "")}/embed`}
                    title="Reel de Instagram"
                    loading="lazy"
                    className="aspect-[9/16] w-full"
                    allowFullScreen
                  />
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
