// Recursos gráficos de la marca: ramita de olivo, sello ovalado, estrellita, flechas a mano.

export function Ramita({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M4 26 C 30 22, 62 18, 116 12" />
      {[
        [22, 23.5, -1],
        [38, 21.5, 1],
        [54, 19.5, -1],
        [70, 17.5, 1],
        [86, 15.5, -1],
        [100, 14, 1],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x} ${y} q ${6} ${s * -9} ${14} ${s * -9} q ${-4} ${s * 7} ${-14} ${s * 9} z`}
          fill="currentColor"
          fillOpacity="0.12"
        />
      ))}
      <path d="M116 12 q 3 -1 2 -4" />
    </svg>
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

/** Logo tipográfico "entre nos" con ramita */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span className="display text-[1.7rem] font-medium italic tracking-tight">entre nos</span>
      <Ramita className="-mt-1 ml-6 h-3 w-14 text-oliva" />
    </span>
  );
}
