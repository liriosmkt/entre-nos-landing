import { experiencias } from "@/data/experiencias";
import { ServiciosSelector } from "./ServiciosSelector";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { SectionHead } from "./ui/WaButton";

// Los otros servicios (el teanner ya tiene su propia sección): tarjetas grandes que muestran su detalle al tocarlas
export function Experiencias() {
  // Las fotos se resuelven en el servidor (Foto revisa si el archivo existe) y se pasan al selector
  const fotos = experiencias.map((e) => (
    <Foto key={e.id} src={e.imagen} alt={e.imagenAlt} tono="claro" sizes="(min-width: 768px) 33vw, 80vw" className="h-full w-full" />
  ));

  return (
    <section id="experiencias" className="diferido section-y bg-hueso">
      <div className="container-x">
        <Reveal>
          <SectionHead
            centrado
            eyebrow="Más allá del teanner"
            titulo="Otras formas de vivir Entre Nos"
            bajada="Tres maneras más de sentarte a nuestra mesa."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <ServiciosSelector servicios={experiencias} fotos={fotos} />
        </Reveal>
      </div>
    </section>
  );
}
