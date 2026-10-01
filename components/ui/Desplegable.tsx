"use client";

import { useId, useState, type ReactNode } from "react";
import { IconoMas } from "./Iconos";

/** Fila que se toca para desplegar su contenido (cabecera + detalle). */
export function Desplegable({ cabecera, children, cta }: { cabecera: ReactNode; children: ReactNode; cta?: string }) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();

  return (
    <div className={`rounded-3xl transition-colors duration-300 ${abierto ? "bg-crema shadow-[0_25px_50px_-35px_rgba(58,45,38,.5)]" : "hover:bg-crema/60"}`}>
      <button
        type="button"
        id={`${id}-b`}
        aria-expanded={abierto}
        aria-controls={`${id}-p`}
        onClick={() => setAbierto(!abierto)}
        data-cta={cta}
        className="flex w-full items-center gap-4 rounded-3xl p-4 text-left sm:gap-6 sm:p-5"
      >
        <span className="min-w-0 flex-1">{cabecera}</span>
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            abierto ? "rotate-45 border-espresso bg-espresso text-crema" : "border-espresso/30 text-espresso"
          }`}
          aria-hidden
        >
          <IconoMas className="h-5 w-5" />
        </span>
      </button>
      <div
        id={`${id}-p`}
        role="region"
        aria-labelledby={`${id}-b`}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!abierto}>
          <div className="px-5 pb-7 sm:px-8 md:pl-[8.75rem]">{children}</div>
        </div>
      </div>
    </div>
  );
}
