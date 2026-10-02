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

      {/* En celular el texto va más abajo y los botones más chicos, para que se vea más el video */}
      <div className="container-x relative pb-7 pt-32 sm:pb-16 md:pb-20">
        <div className="subir">
          <h1 className="display max-w-3xl text-[2.6rem] leading-[1.05] drop-shadow-[0_2px_12px_rgba(58,45,38,.45)] sm:text-6xl sm:leading-tight md:text-7xl">
            Viajá por el mundo <em className="text-ambar">sin salir</em> de Córdoba
          </h1>
        </div>
        <div className="subir subir-2 mt-5 flex flex-col items-start gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
          <WaButton
            mensaje={mensajes.general()}
            cta="hero:reservar"
            variante="ambar"
            className="whitespace-nowrap max-sm:min-h-0 max-sm:px-5 max-sm:py-2.5 max-sm:text-[0.68rem]"
          >
            Reservá tu lugar
          </WaButton>
          <a
            href="#fechas"
            className="btn btn-linea-clara whitespace-nowrap max-sm:min-h-0 max-sm:px-5 max-sm:py-2.5 max-sm:text-[0.68rem]"
            data-cta="hero:ver-fechas"
          >
            Ver próximas fechas
          </a>
        </div>
      </div>
    </section>
  );
}
