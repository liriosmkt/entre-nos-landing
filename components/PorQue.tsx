import { site } from "@/data/site";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Ramita } from "./ui/Ornamentos";

// Foto grande (con aire alrededor, separada del hero) + texto breve
export function PorQue() {
  const p = site.porQue;
  return (
    <section id="por-que" className="section-y bg-hueso">
      <div className="container-x grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-14 lg:gap-20">
        <Reveal>
          <Foto
            src={p.imagen}
            alt={p.imagenAlt}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="aspect-[4/5] w-full rounded-2xl shadow-[0_30px_60px_-30px_rgba(58,45,38,.45)] md:aspect-[5/6]"
            posicion="50% 60%"
          />
        </Reveal>

        <Reveal delay={0.1} className="max-w-lg">
          <Ramita className="h-7 text-caramelo" />
          <p className="eyebrow mt-6 text-oliva-oscuro">{p.eyebrow}</p>
          <h2 className="display mt-4 text-4xl text-espresso md:text-5xl">{p.titulo}</h2>
          <p className="display mt-5 text-xl italic leading-snug text-cacao md:text-2xl">{p.bajada}</p>
          <p className="mt-6 leading-relaxed text-tinta-suave md:text-lg">{p.texto}</p>
          <p className="mt-8 border-l border-caramelo pl-5 font-serif text-xl italic text-espresso">{p.cita}</p>
        </Reveal>
      </div>
    </section>
  );
}
