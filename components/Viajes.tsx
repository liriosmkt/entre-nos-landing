import { site } from "@/data/site";
import { proximasFechas } from "@/lib/fechas";
import { Calendario } from "./Calendario";
import { MapaDestinos } from "./MapaDestinos";
import { MapaFondo } from "./MapaFondo";
import { Reveal } from "./ui/Motion";
import { Foto } from "./ui/Foto";
import { Estrellita, Ramita } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { SectionHead } from "./ui/WaButton";

// Destinos, carta, fotos y fechas en un solo lugar: el mapa abre cada destino,
// y debajo queda cómo es la tarde (igual en todos los destinos).
export function Viajes() {
  const fechas = proximasFechas();
  const t = site.laTarde;

  return (
    <section id="destinos" className="diferido grano section-y relative overflow-x-clip bg-carbon text-crema">
      <div className="container-x relative">
        <Reveal>
          <SectionHead
            claro
            centrado
            eyebrow="Destinos · Cartas · Fechas"
            titulo={
              <>
                Elegí tu <em className="text-ambar">experiencia</em>
              </>
            }
            bajada="Seleccioná un país y mirá qué sabores trae a la mesa."
          />
        </Reveal>

        <MapaDestinos fechas={fechas} fondo={<MapaFondo />} />

        {/* Próximas fechas: calendario con las banderas de cada destino */}
        <div id="fechas" className="mt-14 scroll-mt-24">
          <Reveal className="text-center">
            <p className="eyebrow-seccion text-ambar">Itinerario</p>
            <h3 className="display mt-4 text-4xl md:text-6xl">
              Próximas <em className="text-ambar">fechas</em>
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-crema/75">Tocá una bandera del calendario para ver el detalle de esa fecha y reservar tu lugar.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Calendario fechas={fechas} />
          </Reveal>
        </div>

        <p className="mt-8 flex items-center justify-center gap-3 text-center text-sm text-crema/70">
          <Estrellita className="h-3 w-3 shrink-0 text-ambar" />
          La dirección te la enviamos al confirmar tu reserva. Los lugares son limitados: reservá con tiempo.
        </p>

        {/* Cómo es la tarde: el mismo recorrido en todos los destinos, en un bloque claro que corta el fondo oscuro */}
        <div id="la-tarde" className="relative mt-16 scroll-mt-24 overflow-hidden rounded-[2rem] bg-crema px-5 py-12 text-tinta sm:px-10 md:px-14 md:py-14">
          <Ramita className="pointer-events-none absolute -right-6 -top-4 h-24 rotate-[20deg] text-caramelo/25 md:h-36" />
          <Reveal className="text-center">
            <p className="eyebrow-seccion text-oliva-oscuro">{t.titulo}</p>
            <h3 className="display mx-auto mt-4 max-w-3xl text-4xl leading-tight text-espresso md:text-6xl">
              Mismo recorrido, <em className="text-caramelo">distinto destino</em>
            </h3>
          </Reveal>

          <ol className="relative mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
            {/* Línea de viaje que une los cuatro momentos */}
            <span className="absolute left-[12%] right-[12%] top-[38%] hidden border-t border-dashed border-caramelo md:block" aria-hidden />
            {t.linea.map((l, i) => (
              <Reveal as="li" key={l.momento} delay={i * 0.1} className="relative">
                <Foto
                  src={l.foto}
                  alt={l.alt}
                  tono="claro"
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className={`aspect-[3/4] w-full rounded-t-full shadow-[0_25px_40px_-25px_rgba(58,45,38,.6)] ${i % 2 ? "md:mt-10" : ""}`}
                />
                {/* Número fino, con una línea, como en un itinerario */}
                <div className="mt-5 flex items-center gap-3" aria-hidden>
                  <span className="display text-2xl italic leading-none text-oliva-oscuro md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-caramelo" />
                </div>
                <p className="display mt-2 text-2xl text-espresso md:text-3xl">{l.momento}</p>
                <p className="mt-2 text-sm leading-relaxed text-tinta-suave">
                  <Txt>{l.detalle}</Txt>
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mx-auto mt-16 flex max-w-2xl flex-col items-center text-center">
            <Ramita className="h-6 text-caramelo" />
            <p className="display mt-4 text-2xl italic leading-snug text-cacao md:text-3xl">{t.notaMesa}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
