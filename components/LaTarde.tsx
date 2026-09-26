import { site } from "@/data/site";
import { mensajes } from "@/lib/whatsapp";
import { Reveal } from "./ui/Motion";
import { Estrellita, Sello } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { WaButton } from "./ui/WaButton";

export function LaTarde() {
  const t = site.laTarde;
  return (
    <section id="la-tarde" className="section-y bg-hueso">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-oliva-oscuro">La experiencia</p>
          <h2 className="display mt-4 text-4xl text-espresso md:text-6xl">{t.titulo}</h2>
          <p className="mt-5 text-lg leading-relaxed text-tinta-suave">{t.bajada}</p>

          {/* Línea de tiempo */}
          <ol className="mt-10 border-l border-caramelo/60 pl-7">
            {t.linea.map((l) => (
              <li key={l.momento} className="relative pb-7 last:pb-0">
                <span className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border border-caramelo bg-hueso" />
                <p className="eyebrow text-espresso">{l.momento}</p>
                <p className="mt-1 text-tinta-suave">
                  <Txt>{l.detalle}</Txt>
                </p>
              </li>
            ))}
          </ol>

          <dl className="mt-10 grid gap-4 border-t border-espresso/15 pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {t.datos.map((d) => (
              <div key={d.label}>
                <dt className="eyebrow text-oliva-oscuro">{d.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-tinta">
                  <Txt>{d.valor}</Txt>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Menú de ejemplo como carta */}
        <Reveal delay={0.15}>
          <div className="relative bg-crema px-7 py-12 shadow-[0_30px_60px_-30px_rgba(58,42,34,.35)] md:px-14">
            <div className="absolute inset-3 border border-caramelo/40" aria-hidden />
            <div className="relative text-center">
              <p className="eyebrow text-oliva-oscuro">Teanner</p>
              <p className="display mt-2 text-6xl italic text-espresso">Italia</p>
              <Sello className="mt-3 text-oliva-oscuro" rotar={-4}>
                menú renovado!
              </Sello>
            </div>
            <ol className="relative mt-10 space-y-6">
              {t.pasosEjemplo.map((p, i) => (
                <li key={p} className="flex gap-5">
                  <span className="display w-8 shrink-0 text-3xl italic text-caramelo">{i + 1}</span>
                  <span className="border-b border-dotted border-espresso/25 pb-4 text-lg leading-snug text-tinta">{p}</span>
                </li>
              ))}
            </ol>
            <p className="relative mt-10 flex items-start gap-3 text-sm leading-relaxed text-tinta-suave">
              <Estrellita className="mt-1 h-3 w-3 shrink-0 text-caramelo" />
              {t.notaMesa}
            </p>
            <div className="relative mt-8 text-center">
              <WaButton mensaje={mensajes.teanner()} cta="la-tarde:quiero-vivirlo">
                Quiero vivirlo
              </WaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
