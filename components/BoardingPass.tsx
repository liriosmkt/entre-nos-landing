import {
  cuposTexto,
  diaSemana,
  estadoDe,
  estadoLabel,
  fechaCorta,
  fechaLarga,
  precioTexto,
  type Fecha,
} from "@/lib/fechas";
import { mensajes, waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./ui/Iconos";
import { Txt } from "./ui/Txt";

const codigo: Record<string, string> = {
  Italia: "ITA",
  "Nueva York": "NYC",
  México: "MEX",
  Puglia: "PUG",
  Chicago: "CHI",
};

export function BoardingPass({ f }: { f: Fecha }) {
  const estado = estadoDe(f);
  const agotado = estado === "agotado";
  const corta = fechaCorta(f.fecha);
  const mensaje = agotado ? mensajes.avisarLugar(f.tipo, f.destino, corta) : mensajes.fecha(f.tipo, f.destino, corta);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-crema text-tinta transition-transform duration-500 md:flex-row ${
        agotado ? "" : "hover:-translate-y-1"
      }`}
      aria-label={`${f.tipo} ${f.destino}, ${fechaLarga(f.fecha)}: ${estadoLabel[estado]}`}
    >
      {/* Cuerpo del pasaje */}
      <div className={`relative flex-1 p-6 md:p-8 ${agotado ? "opacity-60" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow text-oliva-oscuro">Pase de embarque · {f.tipo}</p>
          {f.ejemplo && (
            <span className="eyebrow rounded-sm border border-dashed border-cacao px-1.5 py-0.5 text-[0.6rem] text-cacao">
              Ejemplo
            </span>
          )}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-tinta-suave">Córdoba</p>
            <p className="display text-3xl text-espresso">CBA</p>
          </div>
          <div className="mb-3 flex flex-1 items-center gap-2 text-caramelo" aria-hidden>
            <span className="h-px flex-1 border-t border-dashed border-caramelo" />
            <span className="text-base">✈</span>
            <span className="h-px flex-1 border-t border-dashed border-caramelo" />
          </div>
          <div className="text-right">
            <p className="eyebrow text-tinta-suave">Destino</p>
            <p className="display text-3xl text-espresso">{codigo[f.destino] ?? f.destino.slice(0, 3).toUpperCase()}</p>
          </div>
        </div>

        <h3 className="display mt-4 text-5xl italic text-espresso md:text-6xl">{f.destino}</h3>
        {f.nota && <p className="mt-2 text-sm text-tinta-suave">{f.nota}</p>}

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-espresso/15 pt-5 sm:grid-cols-4">
          <div>
            <dt className="eyebrow text-[0.62rem] text-tinta-suave">Fecha</dt>
            <dd className="mt-1 text-sm text-espresso">
              {diaSemana(f.fecha)} {fechaLarga(f.fecha)} ›
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-[0.62rem] text-tinta-suave">Horario</dt>
            <dd className="mt-1 text-sm text-espresso">
              <Txt>{f.horario}</Txt>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-[0.62rem] text-tinta-suave">Mesa</dt>
            <dd className="mt-1 text-sm text-espresso">{f.cupos} invitados</dd>
          </div>
          <div>
            <dt className="eyebrow text-[0.62rem] text-tinta-suave">Precio</dt>
            <dd className="mt-1 text-sm text-espresso">
              <Txt>{precioTexto(f.precio)}</Txt>
            </dd>
          </div>
        </dl>
      </div>

      {/* Troquel */}
      <div className="relative h-5 md:h-auto md:w-5" aria-hidden>
        <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-espresso/25 md:inset-x-auto md:inset-y-4 md:left-1/2 md:top-auto md:border-l md:border-t-0" />
        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-carbon md:-top-3 md:left-1/2 md:-translate-x-1/2 md:translate-y-0" />
        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-carbon md:-bottom-3 md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-y-0" />
      </div>

      {/* Talón */}
      <div className="flex flex-col justify-between gap-5 bg-hueso p-6 md:w-64 md:p-8">
        <div>
          <p className="eyebrow text-[0.62rem] text-tinta-suave">Estado</p>
          <p
            className={`eyebrow mt-2 inline-flex items-center gap-2 ${
              estado === "disponible" ? "text-oliva-oscuro" : estado === "ultimos" ? "text-cacao" : "text-tinta-suave"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                estado === "disponible" ? "bg-oliva" : estado === "ultimos" ? "bg-caramelo" : "bg-tinta-suave"
              }`}
            />
            {estadoLabel[estado]}
          </p>
          <p className="mt-2 text-sm text-tinta-suave">{cuposTexto(f)}</p>
          {estado === "ultimos" && <p className="hand mt-2 text-xl text-cacao">quedan pocos lugares!</p>}
        </div>
        <a
          href={waLink(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={agotado ? `fechas:avisarme:${f.id}` : `fechas:reservar:${f.id}`}
          className={`btn w-full px-4 text-[0.7rem] ${agotado ? "btn-linea-oscura" : "btn-espresso"}`}
        >
          <IconoWhatsApp className="h-4 w-4 shrink-0" />
          {agotado ? "Avisarme si se libera un lugar" : "Reservar"}
        </a>
      </div>

      {agotado && (
        <span
          aria-hidden
          className="eyebrow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-md border-[3px] border-double border-cacao/80 px-5 py-2 text-2xl tracking-[0.3em] text-cacao/80 md:left-[40%]"
        >
          Agotado
        </span>
      )}
    </article>
  );
}
