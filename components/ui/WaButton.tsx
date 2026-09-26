import { waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./Iconos";

type Variante = "ambar" | "espresso" | "linea-clara" | "linea-oscura";

const clases: Record<Variante, string> = {
  ambar: "btn btn-ambar",
  espresso: "btn btn-espresso",
  "linea-clara": "btn btn-linea-clara",
  "linea-oscura": "btn btn-linea-oscura",
};

/** Botón que abre WhatsApp con un mensaje precargado. `cta` identifica el botón para medir clics. */
export function WaButton({
  mensaje,
  cta,
  children,
  variante = "espresso",
  icono = true,
  className = "",
}: {
  mensaje: string;
  cta: string;
  children: React.ReactNode;
  variante?: Variante;
  icono?: boolean;
  className?: string;
}) {
  return (
    <a
      href={waLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={cta}
      className={`${clases[variante]} ${className}`}
    >
      {icono && <IconoWhatsApp className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </a>
  );
}

export function SectionHead({
  eyebrow,
  titulo,
  bajada,
  claro = false,
  centrado = false,
  className = "",
}: {
  eyebrow: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  claro?: boolean;
  centrado?: boolean;
  className?: string;
}) {
  return (
    <header className={`${centrado ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className={`eyebrow ${claro ? "text-ambar" : "text-oliva-oscuro"}`}>{eyebrow}</p>
      <h2 className={`display mt-4 text-4xl md:text-6xl ${claro ? "text-crema" : "text-espresso"}`}>{titulo}</h2>
      {bajada && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${claro ? "text-crema/80" : "text-tinta-suave"}`}>
          {bajada}
        </p>
      )}
    </header>
  );
}
