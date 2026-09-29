import { site } from "@/data/site";
import { CartaDestinos } from "./CartaDestinos";
import { Reveal } from "./ui/Motion";
import { Txt } from "./ui/Txt";

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

        {/* La carta: una tarjeta por destino */}
        <Reveal delay={0.15}>
          <CartaDestinos nota={t.notaMesa} />
        </Reveal>
      </div>
    </section>
  );
}
