import { site } from "@/data/site";
import { img } from "@/lib/img";

// Recursos gráficos de la marca: logotipo, hoja del isologo, sello ovalado, estrellita, flechas a mano.

/**
 * Hoja del isologo (Brandbook). Se pinta con el color del texto (currentColor)
 * usando la hoja como máscara; el ancho sale de la altura para no deformarla.
 */
export function Ramita({ className = "", title }: { className?: string; title?: string }) {
  const url = `url(${site.basePath}/opt/marca/hoja-240.webp)`;
  return (
    <span
      className={`block ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{
        width: "auto",
        aspectRatio: "240 / 214",
        backgroundColor: "currentColor",
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** Separador: línea fina + ramita + línea fina */
export function Separador({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-12 bg-current opacity-40" />
      <Ramita className="h-5 w-16" />
      <span className="h-px w-12 bg-current opacity-40" />
    </div>
  );
}

/** Sello ovalado dibujado a mano alrededor de un texto manuscrito */
export function Sello({
  children,
  className = "",
  rotar = -6,
}: {
  children: React.ReactNode;
  className?: string;
  rotar?: number;
}) {
  return (
    <span
      className={`hand inline-flex items-center justify-center px-5 py-2 text-xl ${
        /\b(absolute|fixed)\b/.test(className) ? "" : "relative"
      } ${className}`}
      style={{ transform: `rotate(${rotar}deg)` }}
    >
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M24 16 C 70 2, 160 4, 188 26 C 204 44, 170 72, 104 75 C 44 78, 4 64, 8 40 C 10 26, 30 14, 60 10" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

export function Estrellita({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 1.5 C 12.6 8, 16 11.4, 22.5 12 C 16 12.6, 12.6 16, 12 22.5 C 11.4 16, 8 12.6, 1.5 12 C 8 11.4, 11.4 8, 12 1.5 Z" />
    </svg>
  );
}

/** Flecha curva a mano (como las de las historias) */
export function FlechaMano({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 30 C 20 6, 50 4, 72 18" />
      <path d="M62 12 L 73 18 L 64 27" />
    </svg>
  );
}

/** Logotipo oficial (versión horizontal). `claro` para fondos oscuros. */
export function Logo({
  className = "h-9",
  tono = "claro",
  prioridad = false,
}: {
  className?: string;
  tono?: "claro" | "oscuro";
  prioridad?: boolean;
}) {
  const i = img(`marca/${tono === "claro" ? "logo-horizontal-claro.png" : "logo-horizontal.png"}`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={i.src}
      srcSet={i.srcSet}
      sizes="200px"
      width={i.width}
      height={i.height}
      alt="Entre Nos · Sabores del mundo"
      fetchPriority={prioridad ? "high" : undefined}
      loading={prioridad ? "eager" : "lazy"}
      decoding="async"
      className={`w-auto ${className}`}
    />
  );
}
