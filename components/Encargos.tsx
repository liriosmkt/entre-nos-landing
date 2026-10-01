import { creaciones, encargos, encargosIntro } from "@/data/encargos";
import { mensajes, waLink } from "@/lib/whatsapp";
import { Foto } from "./ui/Foto";
import { IconoWhatsApp } from "./ui/Iconos";
import { Reveal } from "./ui/Motion";
import { Txt } from "./ui/Txt";
import { SectionHead } from "./ui/WaButton";

export function Encargos() {
  return (
    <section id="encargos" className="section-y bg-crema">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHead eyebrow="Encargos de pastelería" titulo={encargosIntro.titulo} bajada={encargosIntro.bajada} />
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="space-y-2 text-sm md:text-right">
              {encargosIntro.datos.map((d) => (
                <div key={d.label}>
                  <dt className="eyebrow inline text-oliva-oscuro">{d.label}: </dt>
                  <dd className="inline text-tinta-suave">
                    <Txt>{d.valor}</Txt>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {encargos.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 0.08}>
              <article className="group">
                <div className="overflow-hidden rounded-xl">
                  <Foto
                    src={e.imagen}
                    alt={e.imagenAlt}
                    tono="claro"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-square w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="display mt-5 text-3xl text-espresso">{e.nombre}</h3>
                <p className="mt-2 leading-relaxed text-tinta-suave">{e.descripcion}</p>
                <a
                  href={waLink(mensajes.encargo(e.nombre.toLowerCase()))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={`encargos:${e.id}`}
                  className="btn btn-linea-oscura mt-5 w-full"
                >
                  <IconoWhatsApp className="h-4 w-4" /> Encargar
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Galería de la pastelería de la casa */}
        <div className="mt-20">
          <p className="eyebrow text-center text-oliva-oscuro">De nuestra cocina</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {creaciones.map((c, i) => (
              <Reveal as="li" key={c.src} delay={i * 0.05} className="overflow-hidden rounded-lg">
                <Foto
                  src={c.src}
                  alt={c.alt}
                  tono="claro"
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="aspect-square w-full transition-transform duration-700 hover:scale-105"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
