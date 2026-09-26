import { mensajes, waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./ui/Iconos";

/** Botón flotante de WhatsApp, siempre visible en mobile. */
export function WhatsAppFlotante() {
  return (
    <a
      href={waLink(mensajes.general())}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="flotante:whatsapp"
      aria-label="Reservá por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-crema shadow-[0_10px_30px_-5px_rgba(28,23,21,.6)] ring-1 ring-caramelo/40 transition-transform hover:scale-105 md:hidden"
    >
      <IconoWhatsApp className="h-7 w-7" />
    </a>
  );
}
