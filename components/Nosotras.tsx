import { site } from "@/data/site";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Ramita } from "./ui/Ornamentos";

export function Nosotras() {
  const n = site.nosotras;
  const [a, b] = n.titulo.split(" y ");
  return (
    <section id="nosotras" className="section-y bg-crema">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-oliva-oscuro">{n.eyebrow}</p>
          <h2 className="display mt-4 text-5xl text-espresso md:text-7xl">
            {a} <em className="text-caramelo">y</em> {b}
          </h2>
          <p className="eyebrow mt-4 text-tinta-suave">{n.subtitulo}</p>
          <p className="display mt-6 text-xl italic leading-snug text-cacao md:text-2xl">{n.intro}</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-12 sm:grid-cols-2 md:gap-16">
          {n.bios.map((bio, i) => (
            <Reveal key={bio.nombre} delay={i * 0.1}>
              <article>
                <Foto
                  src={bio.foto}
                  alt={bio.fotoAlt}
                  tono="claro"
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className="mx-auto aspect-square w-60 rounded-full sm:w-full sm:max-w-xs"
                  posicion="50% 30%"
                />
                <h3 className="display mt-6 text-center text-4xl text-espresso">{bio.nombre}</h3>
                <p className="display mt-3 text-lg italic leading-snug text-cacao">“{bio.destacado}”</p>
                <p className="mt-3 leading-relaxed text-tinta-suave">{bio.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <Ramita className="h-6 text-caramelo" />
          <p className="display mt-4 text-2xl italic text-espresso md:text-3xl">{n.firma}</p>
          <p className="eyebrow mt-3 text-tinta-suave">Con amor, Vero y Pili</p>
        </div>
      </div>
    </section>
  );
}
