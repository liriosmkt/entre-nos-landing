import { proximasFechas } from "@/lib/fechas";
import { MapaFechas } from "./MapaFechas";
import { Reveal } from "./ui/Motion";
import { Estrellita } from "./ui/Ornamentos";
import { SectionHead } from "./ui/WaButton";

export function ProximasFechas() {
  const fechas = proximasFechas();

  return (
    <section id="fechas" className="grano section-y relative bg-carbon text-crema">
      <div className="container-x relative">
        <Reveal>
          <SectionHead
            claro
            centrado
            eyebrow="Próximas salidas"
            titulo={
              <>
                Próximas <em className="text-ambar">fechas</em>
              </>
            }
            bajada="Tocá una bandera para ver los pasajes disponibles y reservar tu embarque."
          />
        </Reveal>

        {fechas.length > 0 ? (
          <MapaFechas fechas={fechas} />
        ) : (
          <div className="mt-14 rounded-2xl border border-cacao p-10 text-center">
            <p className="display text-3xl">Estamos armando las próximas fechas.</p>
            <p className="mt-3 text-crema/75">Anotate en la lista de espera y te avisamos antes que a nadie.</p>
            <a href="#lista-de-espera" className="btn btn-ambar mt-6" data-cta="fechas:sin-fechas-lista">
              Anotarme
            </a>
          </div>
        )}

        <p className="mt-10 flex items-center justify-center gap-3 text-center text-sm text-crema/70">
          <Estrellita className="h-3 w-3 shrink-0 text-ambar" />
          La dirección te la enviamos al confirmar tu reserva. ¿Sos veggie? Avisanos al reservar.
        </p>
      </div>
    </section>
  );
}
