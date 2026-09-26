import { site } from "@/data/site";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";

// Mosaico: la primera y la cuarta foto ocupan más lugar
const spans = ["md:col-span-2 md:row-span-2", "", "", "md:row-span-2", "", "md:col-span-2"];

export function LaCasa() {
  const c = site.laCasa;
  return (
    <section id="la-casa" className="grano section-y relative bg-carbon text-crema">
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ambar">La casa</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">{c.titulo}</h2>
          <p className="mt-5 text-lg text-crema/80">{c.texto}</p>
        </Reveal>

        <div className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-4 md:gap-4">
          {c.fotos.map((f, i) => (
            <Reveal key={f.src + i} delay={i * 0.05} className={`${spans[i] ?? ""} overflow-hidden rounded-lg`}>
              <Foto src={f.src} alt={f.alt} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
