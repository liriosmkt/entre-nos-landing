import { site } from "@/data/site";
import { mensajes } from "@/lib/whatsapp";
import { IconoInstagram, IconoWhatsApp } from "./ui/Iconos";
import { Logo, Ramita } from "./ui/Ornamentos";
import { WaButton } from "./ui/WaButton";

export function Footer() {
  const f = site.footer;
  return (
    <footer className="grano relative bg-carbon pb-28 pt-20 text-crema md:pb-12">
      <div className="container-x relative">
        <div className="text-center">
          <p className="display mx-auto max-w-3xl text-4xl italic leading-tight md:text-6xl">
            ¿Nos acompañás en el próximo viaje?
          </p>
          <WaButton mensaje={mensajes.general()} cta="footer:reservar" variante="ambar" className="mt-10">
            Reservá tu lugar
          </WaButton>
        </div>

        <Ramita className="mx-auto my-16 h-6 w-28 text-salvia" />

        {/* Tres columnas alineadas arriba, cada una con su título: marca, secciones y contacto.
            Secciones y contacto toman el ancho de su contenido; la marca ocupa el resto. */}
        <div className="grid gap-12 border-t border-cacao pt-12 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
          <div>
            <Logo className="h-11" />
            <p className="eyebrow mt-4 text-crema/75">Sabores del mundo · {site.ciudad}</p>
          </div>

          <nav aria-label="Secciones">
            <p className="eyebrow text-caramelo">Secciones</p>
            {/* Dos columnas de tres (se completan de arriba hacia abajo) */}
            <ul className="mt-5 grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-6 gap-y-3 sm:gap-x-12">
              {[...site.nav, { href: "#preguntas", label: "Preguntas frecuentes" }].map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="eyebrow block leading-snug tracking-[0.12em] text-crema/80 hover:text-ambar sm:whitespace-nowrap sm:tracking-[0.2em]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-caramelo">Contacto</p>
            <ul className="mt-5 space-y-3">
              {site.contactos.map((c) => (
                <li key={c.numero}>
                  <a
                    href={`https://wa.me/${c.numero}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`footer:whatsapp-${c.nombre.toLowerCase()}`}
                    className="inline-flex items-center gap-3 text-sm text-crema hover:text-ambar"
                  >
                    <IconoWhatsApp className="h-4 w-4 shrink-0" /> {c.nombre} · {c.visible}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="footer:instagram"
                  className="inline-flex items-center gap-3 text-sm text-crema hover:text-ambar"
                >
                  <IconoInstagram className="h-4 w-4 shrink-0" /> @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cacao pt-10 text-center">
          <p className="display text-xl italic text-crema/85 md:text-2xl">{f.frase}</p>
          <p className="mt-6 text-xs text-crema/55">
            © {new Date().getFullYear()} {site.nombre}
          </p>
        </div>
      </div>
    </footer>
  );
}
