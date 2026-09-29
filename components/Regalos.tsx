import { site } from "@/data/site";
import { mensajes } from "@/lib/whatsapp";
import { Reveal } from "./ui/Motion";
import { Estrellita, Sello } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";
import { WaButton } from "./ui/WaButton";

/** Invitación ilustrada: sobre abierto con tarjeta y sello de lacre. */
function Invitacion() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-md">
      {/* Tarjeta que asoma */}
      <div className="absolute inset-x-[8%] top-0 h-[70%] rotate-[-3deg] rounded-sm bg-crema p-6 text-center shadow-xl">
        <div className="flex h-full flex-col items-center justify-center border border-caramelo/50 px-3">
          <p className="eyebrow text-[0.6rem] text-oliva-oscuro">Invitación</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${site.basePath}/marca/logo-vertical-simple.png`} alt="entre nos" className="mt-2 h-12 w-auto" />
          <p className="hand mt-1 text-base leading-snug text-cacao">un viaje alrededor de la mesa</p>
        </div>
      </div>
      {/* Sobre */}
      <svg viewBox="0 0 400 260" className="absolute inset-x-0 bottom-0 w-full drop-shadow-2xl" aria-hidden>
        <path d="M0 60 L200 170 L400 60 L400 260 L0 260 Z" fill="#EBE2DA" />
        <path d="M0 260 L170 150 M400 260 L230 150" stroke="#CDAB98" strokeOpacity=".7" strokeWidth="1.2" fill="none" />
        <path d="M0 60 L200 170 L400 60" stroke="#CDAB98" strokeOpacity=".85" strokeWidth="1.2" fill="none" />
        {/* Sello de lacre */}
        <circle cx="200" cy="168" r="30" fill="#3A2D26" />
        <circle cx="200" cy="168" r="23" fill="none" stroke="#F0ECE5" strokeOpacity=".6" />
        <image href={`${site.basePath}/marca/hoja.png`} x="186" y="155" width="28" height="25" />
      </svg>
    </div>
  );
}

export function Regalos() {
  const r = site.regalos;
  return (
    <section id="regalos" className="grano section-y relative overflow-hidden bg-espresso text-crema">
      <span
        aria-hidden
        className="display pointer-events-none absolute -bottom-10 -left-4 select-none whitespace-nowrap text-[22vw] leading-none text-crema/[0.04]"
      >
        entre nos
      </span>
      <div className="container-x relative grid items-center gap-14 md:grid-cols-2">
        <Reveal>
          <Invitacion />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow text-ambar">Invitaciones Entre Nos</p>
          {r.destacado && (
            <Sello className="mt-5 text-ambar" rotar={-3}>
              {r.destacado.texto}
            </Sello>
          )}
          <h2 className="display mt-5 text-4xl md:text-6xl">{r.titulo}</h2>
          <p className="display mt-2 text-3xl italic text-ambar md:text-4xl">{r.subtitulo}</p>
          <p className="mt-6 leading-relaxed text-crema/80">{r.texto}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {r.ocasiones.map((o) => (
              <li key={o} className="eyebrow rounded-full border border-cacao px-3 py-1.5 text-[0.65rem] text-crema/85">
                {o}
              </li>
            ))}
          </ul>

          <dl className="mt-8 space-y-3 border-t border-cacao pt-6 text-sm">
            {r.detalles.map((d) => (
              <div key={d.label} className="flex gap-3">
                <Estrellita className="mt-1 h-3 w-3 shrink-0 text-ambar" />
                <dt className="eyebrow w-24 shrink-0 text-crema/70">{d.label}</dt>
                <dd className="text-crema/90">
                  <Txt>{d.valor}</Txt>
                </dd>
              </div>
            ))}
          </dl>

          <WaButton mensaje={mensajes.regalo()} cta="regalos:regalar" variante="ambar" className="mt-10">
            Regalar un viaje
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}
