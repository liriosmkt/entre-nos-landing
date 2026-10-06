import { creaciones, encargos, encargosIntro } from "@/data/encargos";
import { mensajes, waLink } from "@/lib/whatsapp";
import { CarruselInfinito } from "./ui/CarruselInfinito";
import { Foto } from "./ui/Foto";
import { IconoWhatsApp } from "./ui/Iconos";
import { Reveal } from "./ui/Motion";
import { SectionHead } from "./ui/WaButton";

export function Encargos() {
  return (
    <section id="encargos" className="diferido section-y bg-crema">
      <div className="container-x">
        <Reveal>
          <SectionHead eyebrow="Encargos de pastelería" titulo={encargosIntro.titulo} bajada={encargosIntro.bajada} />
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {encargos.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 0.08} className="flex">
              {/* Columna flexible: el botón queda abajo aunque las descripciones tengan distinto largo */}
              <article className="group flex w-full flex-col">
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
                <p className="mb-5 mt-2 leading-relaxed text-tinta-suave">{e.descripcion}</p>
                <a
                  href={waLink(mensajes.encargo(e.nombre.toLowerCase()))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={`encargos:${e.id}`}
                  aria-label={`Encargar ${e.nombre} por WhatsApp`}
                  className="btn btn-linea-oscura mt-auto w-full"
                >
                  <IconoWhatsApp className="h-4 w-4" /> Encargar
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="eyebrow-seccion mt-14 text-center text-oliva-oscuro">De nuestra cocina</p>
      </div>

      {/* Galería de la pastelería de la casa: carrusel infinito (la lista va 3 veces para que el loop no se corte) */}
      <CarruselInfinito className="mt-8" ariaLabel="Fotos de nuestra pastelería">
        <div className="galeria-pista">
          {[0, 1, 2].map((copia) => (
            <ul key={copia} className="galeria-grupo" aria-hidden={copia !== 1 || undefined}>
              {creaciones.map((c) => (
                <li key={c.src} className="w-64 shrink-0 overflow-hidden rounded-xl sm:w-80 lg:w-96">
                  <Foto
                    src={c.src}
                    alt={copia !== 1 ? "" : c.alt}
                    tono="claro"
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem"
                    className="aspect-square w-full"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </CarruselInfinito>
    </section>
  );
}
