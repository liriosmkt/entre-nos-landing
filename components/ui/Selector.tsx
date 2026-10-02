"use client";

import { useEffect, useId, useRef, useState } from "react";

type Opcion = { valor: string; etiqueta: string };

/**
 * Lista desplegable con la estética de la marca (el <select> nativo no se puede estilizar).
 * Accesible: botón + listbox, se maneja con flechas, Enter, Escape, Inicio y Fin.
 * Manda el valor elegido en un input oculto con `name`, así funciona dentro de un <form> común.
 */
export function Selector({
  id,
  name,
  opciones,
  valorInicial = "",
  labelledBy,
}: {
  id: string;
  name: string;
  opciones: Opcion[];
  valorInicial?: string;
  labelledBy?: string;
}) {
  const [valor, setValor] = useState(valorInicial);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(0);
  const caja = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const base = useId();
  const elegida = opciones.find((o) => o.valor === valor) ?? opciones[0];

  // Cerrar al tocar afuera
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("pointerdown", fuera);
    return () => document.removeEventListener("pointerdown", fuera);
  }, [abierto]);

  // Al abrir, enfocar la lista y mostrar la opción activa
  useEffect(() => {
    if (!abierto) return;
    lista.current?.focus();
    lista.current?.querySelector<HTMLElement>(`[data-i="${activo}"]`)?.scrollIntoView({ block: "nearest" });
  }, [abierto, activo]);

  const abrir = () => {
    setActivo(Math.max(0, opciones.findIndex((o) => o.valor === valor)));
    setAbierto(true);
  };
  const elegir = (i: number) => {
    setValor(opciones[i].valor);
    setAbierto(false);
    boton.current?.focus();
  };

  const teclasLista = (e: React.KeyboardEvent) => {
    const ultimo = opciones.length - 1;
    const mover: Record<string, number> = {
      ArrowDown: Math.min(activo + 1, ultimo),
      ArrowUp: Math.max(activo - 1, 0),
      Home: 0,
      End: ultimo,
    };
    if (e.key in mover) {
      e.preventDefault();
      setActivo(mover[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      elegir(activo);
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      setAbierto(false);
      if (e.key === "Escape") boton.current?.focus();
    }
  };

  return (
    <div ref={caja} className="relative mt-2">
      <input type="hidden" name={name} value={valor} />
      <button
        ref={boton}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-labelledby={labelledBy ? `${labelledBy} ${id}` : undefined}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            abrir();
          }
        }}
        className={`flex w-full items-center justify-between gap-3 border-b bg-transparent py-3 text-left text-lg text-crema transition-colors focus:outline-none focus-visible:border-ambar ${
          abierto ? "border-ambar" : "border-crema/40"
        }`}
      >
        <span className={valor ? "text-crema" : "text-crema/70"}>{elegida.etiqueta}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 text-ambar transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {abierto && (
        <ul
          ref={lista}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelledBy}
          aria-activedescendant={`${base}-${activo}`}
          onKeyDown={teclasLista}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-[22rem] overflow-y-auto rounded-2xl [scrollbar-color:var(--color-cacao)_transparent] [scrollbar-width:thin] border border-cacao bg-carbon py-2 shadow-[0_24px_40px_-16px_rgba(0,0,0,.6)] focus:outline-none"
        >
          {opciones.map((o, i) => {
            const sel = o.valor === valor;
            return (
              <li
                key={o.valor || "todos"}
                id={`${base}-${i}`}
                data-i={i}
                role="option"
                aria-selected={sel}
                onPointerEnter={() => setActivo(i)}
                onClick={() => elegir(i)}
                className={`mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-base transition-colors ${
                  i === activo ? "bg-cacao/70 text-crema" : "text-crema/85"
                } ${sel ? "font-medium text-ambar" : ""}`}
              >
                {o.etiqueta}
                {sel && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-ambar" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
