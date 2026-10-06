"use client";

import { useEffect } from "react";

/** Un solo observador para toda la página: muestra cada [data-reveal] cuando entra en pantalla. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-visible", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    const observar = (raiz: ParentNode) =>
      raiz.querySelectorAll("[data-reveal]:not([data-visible])").forEach((el) => io.observe(el));
    observar(document);
    // Por si aparecen elementos nuevos después (contenido que se despliega)
    const mo = new MutationObserver(() => observar(document));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
