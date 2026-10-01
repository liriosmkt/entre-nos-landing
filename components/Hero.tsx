import { site } from "@/data/site";
import { mensajes } from "@/lib/whatsapp";
import { VideoFondo } from "./ui/VideoFondo";
import { WaButton } from "./ui/WaButton";

export function Hero() {
  const { hero } = site;

  return (
    <section id="inicio" className="relative flex min-h-svh items-end overflow-hidden bg-carbon text-crema">
      <VideoFondo
        escritorio={hero.video}
        movil={hero.videoMovil}
        posterEscritorio={hero.poster}
        posterMovil={hero.posterMovil}
        label={hero.videoAlt}
        className="absolute inset-0 h-full w-full"
      />
      {/* Sombra suave: solo arriba (para el menú) y abajo (para el texto) */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-carbon/55 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-carbon/80 via-carbon/35 to-transparent" aria-hidden />

      <div className="container-x relative pb-16 pt-32 md:pb-20">
        <div className="subir">
          <h1 className="display max-w-3xl text-[2.9rem] drop-shadow-[0_2px_12px_rgba(58,45,38,.45)] sm:text-6xl md:text-7xl">
            Viajá por el mundo <em className="text-ambar">sin salir</em> de Córdoba
          </h1>
        </div>
        <div className="subir subir-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WaButton mensaje={mensajes.general()} cta="hero:reservar" variante="ambar" className="whitespace-nowrap">
            Reservá tu lugar
          </WaButton>
          <a href="#destinos" className="btn btn-linea-clara whitespace-nowrap" data-cta="hero:ver-fechas">
            Ver próximas fechas
          </a>
        </div>
      </div>
    </section>
  );
}
