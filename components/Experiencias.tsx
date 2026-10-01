import { experiencias } from "@/data/experiencias";
import { Desplegable } from "./ui/Desplegable";
import { Foto } from "./ui/Foto";
import { Reveal } from "./ui/Motion";
import { Estrellita } from "./ui/Ornamentos";
import { SectionHead, WaButton } from "./ui/WaButton";

// Los otros servicios (el teanner ya tiene su propia sección): cada uno se despliega al tocarlo
export function Experiencias() {
  return (
    <section id="experiencias" className="section-y bg-hueso">
      <div className="container-x">
        <Reveal>
          <SectionHead
            centrado
            eyebrow="Más allá del teanner"
            titulo="Otras formas de vivir Entre Nos"
            bajada="Un workshop para cocinar con nuestras manos, una mesa solo para tu grupo o una tarde especial de temporada. Tocá cada una para ver el detalle."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-4xl divide-y divide-espresso/10 md:mt-16">
          {experiencias.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08} className="py-2">
              <div id={`exp-${e.id}`} className="scroll-mt-24">
                <Desplegable
                  cta={`experiencias:abrir:${e.id}`}
                  cabecera={
                    <span className="flex items-center gap-4 sm:gap-6">
                      <Foto
                        src={e.imagen}
                        alt={e.imagenAlt}
                        tono="claro"
                        sizes="96px"
                        className="h-16 w-16 shrink-0 rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24"
                      />
                      <span className="min-w-0">
                        <span className="eyebrow block text-[0.6rem] text-oliva-oscuro">{e.eyebrow}</span>
                        <span className="display mt-1 block text-2xl text-espresso sm:text-3xl md:text-4xl">{e.titulo}</span>
                        <span className="display mt-1 hidden text-base italic leading-snug text-cacao sm:block md:text-lg">{e.bajada}</span>
                      </span>
                    </span>
                  }
                >
                  <div className="grid gap-8 border-t border-espresso/10 pt-6 md:grid-cols-[1fr_1fr] md:gap-10">
                    <div>
                      <p className="display mb-4 text-lg italic leading-snug text-cacao sm:hidden">{e.bajada}</p>
                      <div className="space-y-3 text-sm leading-relaxed text-tinta-suave md:text-base">
                        {e.parrafos.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {e.datos.map((d) => (
                          <li key={d} className="eyebrow rounded-full border border-oliva-oscuro/40 px-3 py-1.5 text-[0.58rem] text-oliva-oscuro">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow text-[0.65rem] text-espresso">{e.incluyeTitulo}</p>
                      <ul className="mt-3 space-y-2 text-sm text-tinta">
                        {e.incluye.map((item) => (
                          <li key={item} className="flex gap-2.5 leading-snug">
                            <Estrellita className="mt-1 h-2.5 w-2.5 shrink-0 text-caramelo" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {e.nota && <p className="mt-4 text-sm text-tinta-suave">{e.nota}</p>}
                      <WaButton mensaje={e.mensaje} cta={`experiencias:${e.id}`} className="mt-6">
                        {e.cta}
                      </WaButton>
                    </div>
                  </div>
                </Desplegable>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
