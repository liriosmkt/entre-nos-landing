import { site } from "@/data/site";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Estrellita, FlechaMano, Ramita } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";

function Polaroid({
  src,
  alt,
  pie,
  rotar,
  className = "",
}: {
  src: string;
  alt: string;
  pie: string;
  rotar: number;
  className?: string;
}) {
  return (
    <figure
      className={`relative bg-[#fbf8f3] p-3 pb-14 shadow-[0_25px_45px_-20px_rgba(28,23,21,.45)] ${className}`}
      style={{ transform: `rotate(${rotar}deg)` }}
    >
      {/* Cinta washi */}
      <span
        aria-hidden
        className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-[-4deg] opacity-80"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(163,168,138,.75) 0 6px, rgba(163,168,138,.55) 6px 12px)",
          clipPath: "polygon(3% 0, 97% 4%, 100% 50%, 96% 100%, 2% 96%, 0 45%)",
        }}
      />
      <Foto src={src} alt={alt} sizes="(min-width: 768px) 25vw, 70vw" className="aspect-[4/5] w-full" />
      <figcaption className="hand absolute inset-x-0 bottom-3 text-center text-2xl text-cacao">{pie}</figcaption>
    </figure>
  );
}

export function Nosotras() {
  const n = site.nosotras;
  return (
    <section id="nosotras" className="section-y overflow-hidden bg-crema">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="grid grid-cols-5">
            <Polaroid {...n.fotos[0]} rotar={-4} className="col-span-3 col-start-1 row-start-1 z-10" />
            <Polaroid {...n.fotos[1]} rotar={5} className="col-span-3 col-start-3 row-start-1 mt-28" />
          </div>
          {/* Nota manuscrita de Pili */}
          <div className="relative mt-8 max-w-xs rotate-[-2deg] rounded-sm bg-hueso px-6 py-5 shadow-md md:absolute md:-bottom-20 md:-left-8 md:z-20 md:mt-0">
            <p className="hand text-2xl leading-snug text-espresso">{n.notaPili}</p>
            <FlechaMano className="absolute -right-10 -top-6 h-8 w-14 rotate-[-30deg] text-caramelo" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow text-oliva-oscuro">{n.eyebrow}</p>
          <h2 className="display mt-4 text-5xl text-espresso md:text-7xl">
            {n.titulo.split(" y ")[0]} <em className="text-caramelo">y</em> {n.titulo.split(" y ")[1]}
          </h2>
          <p className="eyebrow mt-3 text-tinta-suave">Madre e hija · Córdoba</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-tinta">
            {n.parrafos.map((p, i) => (
              <p key={i} className={i === 1 ? "display text-2xl italic leading-snug text-cacao" : ""}>
                <Txt>{p}</Txt>
              </p>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 text-caramelo">
            <Ramita className="h-6 w-20" />
            <Estrellita className="h-3 w-3 text-ambar" />
          </div>
          <p className="hand mt-3 text-2xl text-cacao">{n.firma}</p>
        </Reveal>
      </div>
    </section>
  );
}
