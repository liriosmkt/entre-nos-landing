import { site } from "@/data/site";
import { cuposTexto, fechaLarga, proximaConLugar } from "@/lib/fechas";
import { mensajes } from "@/lib/whatsapp";
import { Foto } from "./ui/Foto";
import { Parallax } from "./ui/Motion";
import { Estrellita, FlechaMano } from "./ui/Ornamentos";
import { WaButton } from "./ui/WaButton";

export function Hero() {
  const { hero } = site;
  const proxima = proximaConLugar();

  return (
    <section id="inicio" className="grano relative flex min-h-svh items-end overflow-hidden bg-carbon text-crema">
      <Parallax>
        <Foto src={hero.imagen} alt={hero.imagenAlt} priority className="h-full w-full" etiqueta="top-24" />
      </Parallax>
      {/* Overlay: carbón al 60% hacia transparente para que el texto se lea */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/10" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/70 to-transparent" aria-hidden />

      {/* Marca de agua */}
      <p
        aria-hidden
        className="display pointer-events-none absolute -right-6 top-24 select-none whitespace-nowrap text-[28vw] italic leading-none text-crema/[0.04] md:top-16 md:text-[18vw]"
      >
        entre nos
      </p>

      <div className="container-x relative pb-16 pt-32 md:pb-24">
        <div className="subir">
          <p className="eyebrow max-w-xs text-ambar sm:max-w-none">{hero.eyebrow}</p>
        </div>
        <div className="subir subir-1">
          <h1 className="display mt-6 max-w-4xl text-[3.2rem] sm:text-7xl md:text-8xl">
            Viajá por el mundo <em className="text-ambar">sin salir</em> de Córdoba
          </h1>
        </div>
        <div className="subir subir-2">
          <p className="display mt-6 text-2xl italic text-crema/85 md:text-3xl">{hero.bajada}</p>
        </div>

        <div className="subir subir-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WaButton mensaje={mensajes.general()} cta="hero:reservar" variante="ambar">
            Reservá tu lugar
          </WaButton>
          <a href="#fechas" className="btn btn-linea-clara" data-cta="hero:ver-fechas">
            Ver próximas fechas
          </a>
          <span className="hand relative ml-2 mt-2 hidden items-center gap-2 text-2xl text-ambar sm:mt-0 sm:inline-flex">
            <FlechaMano className="h-6 w-10 -scale-x-100 rotate-12" />
            {hero.manuscrito}
          </span>
        </div>
        <p className="hand mt-4 text-xl text-ambar sm:hidden">{hero.manuscrito}</p>

        {proxima && (
          <div className="subir subir-4">
            <a
              href="#fechas"
              data-cta="hero:proxima-fecha"
              className="mt-12 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-crema/20 pt-5 text-crema/85 transition-colors hover:text-ambar"
            >
              <Estrellita className="h-3 w-3 text-ambar" />
              <span className="eyebrow">
                Próximo destino: {proxima.destino} · {fechaLarga(proxima.fecha)} · {cuposTexto(proxima)} ›
              </span>
              {proxima.ejemplo && <span className="eyebrow rounded-sm bg-crema/10 px-1.5 py-0.5 text-[0.6rem]">ejemplo</span>}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
