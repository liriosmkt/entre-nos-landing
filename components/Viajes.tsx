import { site } from "@/data/site";
import { proximasFechas } from "@/lib/fechas";
import { MapaDestinos } from "./MapaDestinos";
import { Reveal } from "./ui/Motion";
import { Estrellita } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { SectionHead } from "./ui/WaButton";

// Destinos, carta, fotos y fechas en un solo lugar: el mapa abre cada destino,
// y debajo queda cómo es la tarde (igual en todos los destinos).
export function Viajes() {
  const fechas = proximasFechas();
  const t = site.laTarde;

  return (
    <section id="destinos" className="grano section-y relative bg-carbon text-crema">
      {/* Anclas de las secciones anteriores, para que los links viejos sigan andando */}
      <span id="fechas" className="absolute top-0" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <SectionHead
            claro
            centrado
            eyebrow="Destinos · Cartas · Fechas"
            titulo={
              <>
                Elegí tu próximo <em className="text-ambar">viaje</em>
              </>
            }
            bajada="Seleccioná un país en el mapa y viví tu próxima experiencia gastronómica: su carta en cinco pasos, sus fotos y los pasajes disponibles."
          />
        </Reveal>

        <MapaDestinos fechas={fechas} />

        <p className="mt-8 flex items-center justify-center gap-3 text-center text-sm text-crema/70">
          <Estrellita className="h-3 w-3 shrink-0 text-ambar" />
          La dirección te la enviamos al confirmar tu reserva. Los lugares son limitados: reservá con tiempo.
        </p>

        {/* Cómo es la tarde: el mismo recorrido en todos los destinos */}
        <div id="la-tarde" className="mx-auto mt-20 max-w-5xl scroll-mt-24 border-t border-cacao pt-14">
          <Reveal className="text-center">
            <p className="eyebrow text-ambar">{t.titulo}</p>
            <p className="display mx-auto mt-4 max-w-2xl text-3xl leading-snug md:text-4xl">
              Mismo recorrido, <em className="text-ambar">distinto destino</em>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
              <span className="absolute left-[12.5%] right-[12.5%] top-[5px] hidden border-t border-dashed border-caramelo/60 md:block" aria-hidden />
              {t.linea.map((l) => (
                <li key={l.momento} className="relative text-center">
                  <span className="relative mx-auto block h-2.5 w-2.5 rounded-full border border-ambar bg-carbon" aria-hidden />
                  <p className="eyebrow mt-4 text-crema">{l.momento}</p>
                  <p className="mt-2 text-sm text-crema/75">
                    <Txt>{l.detalle}</Txt>
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 grid gap-6 rounded-2xl border border-cacao p-6 sm:grid-cols-3 md:p-8">
              {t.datos.map((d) => (
                <div key={d.label}>
                  <dt className="eyebrow text-ambar">{d.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-crema/85">
                    <Txt>{d.valor}</Txt>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="display mx-auto mt-10 max-w-2xl text-center text-xl italic leading-snug text-crema/85 md:text-2xl">
              {t.notaMesa}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
