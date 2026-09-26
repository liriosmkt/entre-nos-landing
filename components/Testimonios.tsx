"use client";

import { useRef } from "react";
import { reels, testimonios } from "@/data/testimonios";
import { mensajes } from "@/lib/whatsapp";
import { IconoFlecha } from "./ui/Iconos";
import { Txt } from "./ui/Txt";
import { SectionHead, WaButton } from "./ui/WaButton";

export function Testimonios() {
  const pista = useRef<HTMLUListElement>(null);
  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

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

        <ul
          ref={pista}
          className="carrusel -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0"
          tabIndex={0}
          aria-label="Testimonios"
        >
          {testimonios.map((t, i) => (
            <li
              key={i}
              className="w-[85%] shrink-0 snap-start rounded-2xl border border-caramelo/40 bg-hueso p-8 sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${testimonios.length}`}
            >
              <span className="display block h-8 text-6xl leading-none text-caramelo" aria-hidden>
                “
              </span>
              <blockquote className="display mt-5 text-2xl italic leading-snug text-espresso">
                <Txt>{t.texto}</Txt>
              </blockquote>
              <p className="eyebrow mt-6 text-[0.65rem] text-tinta">
                <Txt>{t.autor}</Txt>
              </p>
              <p className="mt-1 text-sm text-tinta-suave">
                <Txt>{t.experiencia}</Txt>
              </p>
            </li>
          ))}
        </ul>

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
