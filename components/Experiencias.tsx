import { experiencias } from "@/data/experiencias";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Estrellita } from "./ui/Ornamentos";
import { SectionHead, WaButton } from "./ui/WaButton";

// Los otros servicios (el teanner ya tiene su propia sección)
export function Experiencias() {
  return (
    <section id="experiencias" className="section-y bg-hueso">
      <div className="container-x">
        <Reveal>
          <SectionHead
            centrado
            eyebrow="Más allá del teanner"
            titulo="Otras formas de vivir Entre Nos"
            bajada="Un workshop para cocinar con nuestras manos, una mesa solo para tu grupo o una tarde especial de temporada."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {experiencias.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08} className="h-full">
              <article id={`exp-${e.id}`} className="flex h-full flex-col overflow-hidden rounded-2xl bg-crema">
                <Foto
                  src={e.imagen}
                  alt={e.imagenAlt}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] w-full"
                />
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <p className="eyebrow text-oliva-oscuro">{e.eyebrow}</p>
                  <h3 className="display mt-2 text-3xl text-espresso">{e.titulo}</h3>
                  <p className="display mt-2 text-lg italic leading-snug text-cacao">{e.bajada}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {e.datos.map((d) => (
                      <li key={d} className="eyebrow rounded-full border border-oliva/60 px-3 py-1.5 text-[0.6rem] text-oliva-oscuro">
                        {d}
                      </li>
                    ))}
                  </ul>
                  {e.incluye && (
                    <details className="group mt-5 border-t border-espresso/15 pt-4">
                      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between text-[0.65rem] text-espresso [&::-webkit-details-marker]:hidden">
                        Qué incluye
                        <span className="text-lg transition-transform group-open:rotate-45" aria-hidden>
                          +
                        </span>
                      </summary>
                      <ul className="mt-3 space-y-2 text-sm text-tinta-suave">
                        {e.incluye.map((item) => (
                          <li key={item} className="flex gap-2.5 leading-snug">
                            <Estrellita className="mt-1 h-2.5 w-2.5 shrink-0 text-caramelo" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <div className="mt-auto pt-6">
                    <WaButton mensaje={e.mensaje} cta={`experiencias:${e.id}`} className="w-full">
                      {e.cta}
                    </WaButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
