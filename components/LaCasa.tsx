import { site } from "@/data/site";
import { Reveal } from "./ui/Motion";
import { VideoFondo } from "./ui/VideoFondo";

// Video a sangre, protagonista, con el texto dentro
export function LaCasa() {
  const c = site.laCasa;
  return (
    <section id="la-casa" className="relative overflow-hidden bg-carbon text-crema">
      <VideoFondo
        escritorio={c.video}
        movil={c.videoMovil}
        posterEscritorio={c.poster}
        posterMovil={c.posterMovil}
        label={c.videoAlt}
        className="block aspect-[4/5] w-full md:aspect-auto md:h-[100svh] md:max-h-[62rem]"
        preload="metadata"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/10 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <Reveal className="container-x pb-10 md:pb-16">
          <p className="eyebrow-seccion text-ambar">La casa</p>
          <h2 className="display mt-3 max-w-2xl text-3xl drop-shadow-[0_2px_12px_rgba(58,45,38,.5)] md:text-6xl">{c.titulo}</h2>
          <p className="mt-3 text-crema/85 md:text-lg">{c.texto}</p>
        </Reveal>
      </div>
    </section>
  );
}
