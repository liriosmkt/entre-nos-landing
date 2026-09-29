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

        <div className="grid gap-10 border-t border-cacao pt-12 md:grid-cols-3 md:items-start">
          <div>
            <Logo className="h-11" />
            <p className="eyebrow mt-4 text-crema/75">Sabores del mundo · {site.ciudad}</p>
          </div>

          <nav aria-label="Secciones" className="md:justify-self-center">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="eyebrow text-crema/75 hover:text-ambar">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#preguntas" className="eyebrow text-crema/75 hover:text-ambar">
                  Preguntas
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3 md:items-end md:justify-self-end md:text-right">
            {site.contactos.map((c) => (
              <a
                key={c.numero}
                href={`https://wa.me/${c.numero}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`footer:whatsapp-${c.nombre.toLowerCase()}`}
                className="inline-flex items-center gap-2 text-crema hover:text-ambar"
              >
                <IconoWhatsApp className="h-5 w-5" /> {c.nombre} · {c.visible}
              </a>
            ))}
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="footer:instagram"
              className="inline-flex items-center gap-2 text-crema hover:text-ambar"
            >
              <IconoInstagram className="h-5 w-5" /> @{site.instagram}
            </a>
          </div>
        </div>

        <p className="display mt-14 text-center text-2xl italic text-crema/85">{f.frase}</p>

        <div className="mt-10 flex flex-col gap-3 border-t border-cacao pt-6 text-xs leading-relaxed text-crema/60 md:flex-row md:justify-center">
          <p>
            <a href={f.politicasHref} className="underline underline-offset-4 hover:text-ambar">
              Políticas de reserva
            </a>{" "}
            · © {new Date().getFullYear()} {site.nombre}
          </p>
        </div>
      </div>
    </footer>
  );
}
