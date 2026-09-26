import { experiencias } from "@/data/experiencias";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Ramita } from "./ui/Ornamentos";
import { SectionHead, WaButton } from "./ui/WaButton";

export function Experiencias() {
  return (
    <section id="experiencias" className="section-y bg-hueso">
      <div className="container-x">
        <Reveal>
          <SectionHead
            centrado
            eyebrow="Experiencias"
            titulo="Más de una forma de sentarse a la mesa"
            bajada="Detrás de cada encuentro hay mucho más que recetas."
          />
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {experiencias.map((e, i) => (
            <article
              key={e.id}
              id={`exp-${e.id}`}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative">
                  <Foto
                    src={e.imagen}
                    alt={e.imagenAlt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/5] w-full rounded-t-[10rem] md:aspect-[5/6]"
                  />
                  <span className="display absolute -bottom-6 right-4 text-8xl italic text-caramelo/40 md:-right-6" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow text-oliva-oscuro">{e.eyebrow}</p>
                <h3 className="display mt-3 text-5xl text-espresso md:text-6xl">{e.titulo}</h3>
                <p className="display mt-4 text-2xl italic leading-snug text-cacao">{e.bajada}</p>
                <p className="mt-5 leading-relaxed text-tinta-suave">{e.texto}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {e.datos.map((d) => (
                    <li key={d} className="eyebrow rounded-full border border-oliva/50 px-3 py-1.5 text-[0.65rem] text-oliva-oscuro">
                      {d}
                    </li>
                  ))}
                </ul>
                <Ramita className="mt-8 h-5 w-20 text-caramelo" />
                <WaButton mensaje={e.mensaje} cta={`experiencias:${e.id}`} className="mt-6">
                  {e.cta}
                </WaButton>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
