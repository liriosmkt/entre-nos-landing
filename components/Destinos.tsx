import { destinos, type Destino } from "@/data/destinos";
import { estadoDe, estadoLabel, fechaLarga, proximasFechas } from "@/lib/fechas";
import { mensajes, waLink } from "@/lib/whatsapp";
import { Foto } from "./ui/Foto";
import { IconoHoja, IconoReloj, IconoEtiqueta, IconoTaza, IconoWhatsApp } from "./ui/Iconos";
import { Reveal } from "./ui/Motion";
import { Sello } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { SectionHead } from "./ui/WaButton";

function TarjetaDestino({ d }: { d: Destino }) {
  const proxima = proximasFechas().find((f) => f.tipo === "Teanner" && f.destino === d.nombre);
  const estado = proxima ? estadoDe(proxima) : null;
  const mensaje = proxima && estado !== "agotado" ? mensajes.destino(d.nombre) : mensajes.avisarDestino(d.nombre);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-crema shadow-[0_20px_50px_-30px_rgba(58,45,38,.45)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(205,171,152,.7)]">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
        <Foto
          src={d.imagen}
          alt={d.imagenAlt}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/20 to-transparent" aria-hidden />
        {d.sello && (
          <Sello className="absolute right-4 top-5 text-ambar" rotar={8}>
            {d.sello}
          </Sello>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 text-crema">
          <p className="eyebrow text-ambar">Teanner</p>
          <h3 className="display mt-1 text-6xl italic">{d.nombre}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="leading-relaxed text-tinta-suave">{d.descripcion}</p>

        <details className="group/d mt-5 border-t border-espresso/15 pt-4">
          <summary className="eyebrow flex cursor-pointer list-none items-center justify-between text-espresso [&::-webkit-details-marker]:hidden">
            Ver el recorrido
            <span className="text-lg transition-transform group-open/d:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <ol className="mt-4 space-y-2 text-sm text-tinta">
            {d.pasos.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="display w-4 text-lg italic text-caramelo">{i + 1}</span>
                <span className="pt-0.5">
                  <Txt>{p}</Txt>
                </span>
              </li>
            ))}
          </ol>
          <ul className="mt-5 space-y-2 text-sm text-tinta-suave">
            <li className="flex items-center gap-2">
              <IconoTaza className="h-5 w-5 text-cacao" /> <Txt>{d.bebidas}</Txt>
            </li>
            {d.veggie && (
              <li className="flex items-center gap-2">
                <IconoHoja className="h-5 w-5 text-oliva-oscuro" /> Versión veggie avisando al reservar
              </li>
            )}
            <li className="flex items-center gap-2">
              <IconoReloj className="h-5 w-5 text-cacao" /> <Txt>[COMPLETAR: duración]</Txt>
            </li>
            <li className="flex items-center gap-2">
              <IconoEtiqueta className="h-5 w-5 text-cacao" /> <Txt>[COMPLETAR: precio]</Txt>
            </li>
          </ul>
          {d.colaboracion && (
            <p className="mt-4 text-sm text-tinta-suave">
              Junto a{" "}
              <a
                href={`https://instagram.com/${d.colaboracion}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso underline decoration-caramelo underline-offset-4"
              >
                @{d.colaboracion}
              </a>
            </p>
          )}
        </details>

        <div className="mt-auto pt-6">
          <p className="eyebrow mb-3 text-[0.65rem] text-tinta-suave">
            {proxima && estado
              ? `Próxima: ${fechaLarga(proxima.fecha)} · ${estadoLabel[estado]}${proxima.ejemplo ? " (ejemplo)" : ""}`
              : "Sin fecha por ahora"}
          </p>
          <a
            href={waLink(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`destinos:${d.id}`}
            className="btn btn-espresso w-full"
          >
            <IconoWhatsApp className="h-4 w-4" />
            {proxima && estado !== "agotado" ? `Reservar Teanner ${d.nombre}` : `Avisame cuando vuelva`}
          </a>
        </div>
      </div>
    </article>
  );
}

export function Destinos() {
  return (
    <section id="fechas" className="section-y bg-crema">
      <div className="container-x">
        <Reveal>
          <SectionHead
            eyebrow="Agenda de viajes"
            titulo={
              <>
                Próximas <em>fechas</em>
              </>
            }
            bajada="Viajar también puede suceder alrededor de una mesa. Cada teanner es un país distinto, contado en cinco pasos."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {destinos.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08} className="h-full">
              <TarjetaDestino d={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
