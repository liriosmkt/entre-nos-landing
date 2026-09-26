import { Fragment } from "react";

const PATRON = /(\[(?:COMPLETAR|TESTIMONIO|Nombre|Experiencia)[^\]]*\])/g;

/** Renderiza texto y resalta los placeholders [COMPLETAR…] para que se vean al revisar. */
export function Txt({ children }: { children: string }) {
  const partes = children.split(PATRON);
  return (
    <>
      {partes.map((p, i) =>
        /^\[(COMPLETAR|TESTIMONIO|Nombre|Experiencia)/.test(p) ? (
          <span key={i} className="pendiente" title="Dato pendiente del cliente">
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export const esPendiente = (s: string) => /\[(COMPLETAR|TESTIMONIO|Nombre)/.test(s);
