import { Fragment } from "react";
import { site } from "@/data/site";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";

// "¿Qué es un teanner?" contado como una ecuación visual: Tea + Dinner = Teanner
export function ComoFunciona() {
  const c = site.comoFunciona;
  const signos = ["+", "="];

  return (
    <section id="teanner" className="section-y bg-crema">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="display text-4xl text-espresso md:text-6xl">{c.titulo}</h2>
          <p className="eyebrow mt-4 text-oliva-oscuro">{c.definicion}</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-[1fr_auto_1fr_auto_1.15fr] items-end gap-x-2 sm:gap-x-5 md:mt-16 md:gap-x-8">
          {c.ecuacion.map((e, i) => (
            <Fragment key={e.palabra}>
              <Reveal delay={i * 0.15} className="text-center">
                <Foto
                  src={e.src}
                  alt={e.alt}
                  tono="claro"
                  sizes="(min-width: 768px) 28vw, 30vw"
                  className={`w-full rounded-t-full ${i === 2 ? "aspect-[3/4] ring-1 ring-caramelo ring-offset-4 ring-offset-crema" : "aspect-[3/4]"}`}
                />
                <p className={`display mt-3 italic text-espresso md:mt-5 ${i === 2 ? "text-2xl sm:text-4xl md:text-5xl" : "text-xl sm:text-3xl md:text-4xl"}`}>
                  {e.palabra}
                </p>
                <p className="eyebrow mt-1 hidden text-[0.6rem] text-tinta-suave sm:block">{e.detalle}</p>
              </Reveal>
              {i < 2 && (
                <Reveal delay={i * 0.15 + 0.1} className="self-center pb-10 md:pb-16">
                  <span className="display block text-3xl text-caramelo sm:text-5xl md:text-6xl" aria-hidden>
                    {signos[i]}
                  </span>
                </Reveal>
              )}
            </Fragment>
          ))}
        </div>

        <Reveal className="mx-auto mt-14 max-w-2xl text-center">
          <p className="display text-2xl italic leading-snug text-cacao md:text-3xl">“{c.diferencial}”</p>
        </Reveal>

        {/* Los 3 pasos, en una línea */}
        <ol className="relative mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          <span className="absolute left-[16.6%] right-[16.6%] top-5 hidden border-t border-dashed border-caramelo/70 md:block" aria-hidden />
          {c.pasos.map((p, i) => (
            <Reveal as="li" key={p.titulo} delay={i * 0.1} className="relative text-center">
              <span className="display relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-caramelo bg-crema text-xl italic text-espresso">
                {i + 1}
              </span>
              <h3 className="display mt-4 text-2xl text-espresso">{p.titulo}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-tinta-suave">{p.texto}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a href="#la-tarde" className="btn btn-linea-oscura" data-cta="como-funciona:ver-carta">
            Ver las cartas
          </a>
        </div>
      </div>
    </section>
  );
}
