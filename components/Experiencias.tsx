import { experiencias } from "@/data/experiencias";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Estrellita } from "./ui/Ornamentos";
import { SectionHead, WaButton } from "./ui/WaButton";

// Los otros servicios (el teanner ya tiene su propia sección), en bloques alternados de imagen y texto
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

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {experiencias.map((e, i) => {
            const invertido = i % 2 === 1;
            return (
              <article key={e.id} id={`exp-${e.id}`} className="grid items-center gap-10 scroll-mt-24 lg:grid-cols-2 lg:gap-16">
                <Reveal className={invertido ? "lg:order-2" : ""}>
                  <div className="relative">
                    <Foto
                      src={e.imagen}
                      alt={e.imagenAlt}
                      tono="claro"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="aspect-[4/5] w-full rounded-t-full shadow-[0_30px_50px_-30px_rgba(58,45,38,.55)] sm:aspect-[4/3] lg:aspect-[4/5]"
                    />
                    <span className="display absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-crema px-6 py-2 text-xl italic text-cacao shadow-md">
                      {e.eyebrow}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={invertido ? "lg:order-1" : ""}>
                  <h3 className="display text-4xl text-espresso md:text-5xl">{e.titulo}</h3>
                  <p className="display mt-3 text-xl italic leading-snug text-cacao md:text-2xl">{e.bajada}</p>

                  <div className="mt-6 space-y-4 leading-relaxed text-tinta-suave">
                    {e.parrafos.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {e.datos.map((d) => (
                      <li key={d} className="eyebrow rounded-full border border-oliva-oscuro/40 px-3 py-1.5 text-[0.6rem] text-oliva-oscuro">
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-espresso/15 pt-6">
                    <p className="eyebrow text-espresso">{e.incluyeTitulo}</p>
                    <ul className={`mt-4 grid gap-x-8 gap-y-2.5 text-sm text-tinta ${e.incluye.length > 5 ? "sm:grid-cols-2" : ""}`}>
                      {e.incluye.map((item) => (
                        <li key={item} className="flex gap-2.5 leading-snug">
                          <Estrellita className="mt-1 h-2.5 w-2.5 shrink-0 text-caramelo" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {e.nota && <p className="mt-4 text-sm text-tinta-suave">{e.nota}</p>}
                  </div>

                  <WaButton mensaje={e.mensaje} cta={`experiencias:${e.id}`} className="mt-8">
                    {e.cta}
                  </WaButton>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
