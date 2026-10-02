"use client";

import { useEffect, useRef } from "react";

/**
 * Carrusel que avanza solo y en loop, pero que se puede deslizar con el dedo (scroll nativo, con su
 * inercia) o arrastrar con el mouse (con inercia propia). `children` tiene que ser la lista repetida
 * 3 veces: arranca en la copia del medio y salta una copia entera cuando se acerca a un borde.
 */
export function CarruselInfinito({
  children,
  velocidad = 35, // px por segundo
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  velocidad?: number;
  className?: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const copia = () => el.scrollWidth / 3;

    let pos = copia();
    el.scrollLeft = pos;
    let ultimo = performance.now();
    let pausaHasta = 0;
    let encima = false;
    let arrastre: { x: number; inicio: number; t: number; xPrev: number } | null = null;
    let inercia = 0; // px por ms, después de arrastrar con el mouse

    const envolver = () => {
      const c = copia();
      if (pos < c * 0.5) pos += c;
      else if (pos > c * 1.5) pos -= c;
    };

    let raf = 0;
    const tick = (t: number) => {
      const dt = Math.min(t - ultimo, 64);
      ultimo = t;
      // Si el scroll cambió sin nosotros, lo movió la persona (swipe o rueda): la seguimos y pausamos un rato
      if (!arrastre && Math.abs(el.scrollLeft - pos) > 2) {
        pos = el.scrollLeft;
        pausaHasta = t + 1500;
      } else if (!arrastre) {
        if (Math.abs(inercia) > 0.01) {
          pos += inercia * dt;
          inercia *= Math.pow(0.95, dt / 16);
          pausaHasta = t + 1200;
        } else if (!reduce && !encima && t > pausaHasta) {
          pos += (velocidad * dt) / 1000;
        }
        envolver();
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Arrastre con mouse (el táctil usa el scroll nativo)
    const abajo = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      arrastre = { x: e.clientX, inicio: pos, t: e.timeStamp, xPrev: e.clientX };
      inercia = 0;
      el.setPointerCapture(e.pointerId);
      el.classList.add("arrastrando");
    };
    const mover = (e: PointerEvent) => {
      if (!arrastre) return;
      const dtm = Math.max(e.timeStamp - arrastre.t, 1);
      inercia = -(e.clientX - arrastre.xPrev) / dtm;
      arrastre.t = e.timeStamp;
      arrastre.xPrev = e.clientX;
      pos = arrastre.inicio - (e.clientX - arrastre.x);
      el.scrollLeft = pos;
    };
    const arriba = () => {
      if (!arrastre) return;
      arrastre = null;
      el.classList.remove("arrastrando");
      envolver();
      el.scrollLeft = pos;
    };
    const entra = () => (encima = true);
    const sale = () => (encima = false);

    el.addEventListener("pointerdown", abajo);
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerup", arriba);
    el.addEventListener("pointercancel", arriba);
    el.addEventListener("mouseenter", entra);
    el.addEventListener("mouseleave", sale);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", abajo);
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerup", arriba);
      el.removeEventListener("pointercancel", arriba);
      el.removeEventListener("mouseenter", entra);
      el.removeEventListener("mouseleave", sale);
    };
  }, [velocidad]);

  return (
    <div ref={ref} className={`galeria ${className}`} role="region" aria-label={ariaLabel}>
      {children}
    </div>
  );
}
