import { site } from "@/data/site";
import { IconoDestino, IconoMesa, IconoSobre } from "./ui/Iconos";
import { Reveal } from "./ui/Motion";
import { FlechaMano, Separador } from "./ui/Ornamentos";

const iconos = { destino: IconoDestino, sobre: IconoSobre, mesa: IconoMesa } as const;

export function ComoFunciona() {
  const c = site.comoFunciona;
  return (
    <section id="teanner" className="section-y bg-crema">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-oliva-oscuro">Cómo funciona</p>
          <h2 className="display mt-4 text-4xl text-espresso md:text-6xl">{c.titulo}</h2>

          {/* Tea + Dinner = merienda y cena, con flechas a mano */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-espresso">
            <span className="display text-5xl italic md:text-6xl">Tea</span>
            <span className="display text-4xl text-caramelo">+</span>
            <span className="display text-5xl italic md:text-6xl">Dinner</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-2 text-caramelo">
            <FlechaMano className="h-8 w-14 rotate-[25deg]" />
            <p className="hand text-3xl text-tinta-suave">{c.definicion}</p>
          </div>

          <p className="display mx-auto mt-8 max-w-xl text-2xl italic leading-snug text-tinta-suave">
            “{c.diferencial}”
          </p>
        </Reveal>

        <Separador className="my-14 text-caramelo" />

        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
          {c.pasos.map((p, i) => {
            const Icono = iconos[p.icono as keyof typeof iconos];
            return (
              <Reveal as="li" key={p.titulo} delay={i * 0.1} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-caramelo/50 text-espresso">
                  <Icono className="h-9 w-9" />
                </div>
                <p className="eyebrow mt-6 text-oliva-oscuro">Paso 0{i + 1}</p>
                <h3 className="display mt-2 text-3xl text-espresso">{p.titulo}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-tinta-suave">{p.texto}</p>
                {i < c.pasos.length - 1 && (
                  <FlechaMano className="absolute -right-8 top-6 hidden h-8 w-14 text-caramelo md:block" />
                )}
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-14 text-center">
          <a href="#destinos" className="btn btn-linea-oscura" data-cta="como-funciona:elegir-destino">
            Elegí tu destino
          </a>
        </div>
      </div>
    </section>
  );
}
