"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

type Props = {
  escritorio: string; // archivos dentro de /public/images
  movil: string;
  posterEscritorio: string;
  posterMovil: string;
  label: string;
  className?: string;
  preload?: "auto" | "metadata";
};

const ruta = (f: string) => `${site.basePath}/images/${f}`;

/**
 * Video en loop, sin sonido. Usa la versión vertical en celulares y la horizontal en pantallas anchas,
 * se reproduce solo mientras está en pantalla y, con movimiento reducido, queda en el póster.
 */
export function VideoFondo({ escritorio, movil, posterEscritorio, posterMovil, label, className = "", preload = "auto" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ancho, setAncho] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setAncho(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || ancho === null) return;
    if (reduce) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, ancho]);

  const src = ancho === null ? undefined : ruta(ancho ? escritorio : movil);
  const poster = ruta(ancho === false ? posterMovil : posterEscritorio);

  return (
    <video
      key={src}
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={preload}
      aria-label={label}
      className={`object-cover ${className}`}
    />
  );
}
