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
  pausa?: boolean; // muestra el botón de pausa
};

const ruta = (f: string) => `${site.basePath}/images/${f}`;

/**
 * Video en loop, sin sonido. Usa la versión vertical en celulares y la horizontal en pantallas anchas,
 * se reproduce solo mientras está en pantalla y, con movimiento reducido, queda en el póster.
 */
export function VideoFondo({ escritorio, movil, posterEscritorio, posterMovil, label, className = "", pausa = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ancho, setAncho] = useState<boolean | null>(null);
  const [pausado, setPausado] = useState(false);

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
      setPausado(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !v.dataset.pausadoManual) v.play().catch(() => setPausado(true));
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, ancho]);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      delete v.dataset.pausadoManual;
      v.play();
      setPausado(false);
    } else {
      v.dataset.pausadoManual = "1";
      v.pause();
      setPausado(true);
    }
  };

  const src = ancho === null ? undefined : ruta(ancho ? escritorio : movil);
  const poster = ruta(ancho === false ? posterMovil : posterEscritorio);

  return (
    <>
      <video
        key={src}
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={pausa ? "metadata" : "auto"}
        aria-label={label}
        className={`object-cover ${className}`}
      />
      {pausa && (
        <button
          type="button"
          onClick={alternar}
          aria-label={pausado ? "Reproducir el video" : "Pausar el video"}
          className="eyebrow absolute bottom-5 right-5 z-10 rounded-full bg-carbon/50 px-4 py-2 text-[0.6rem] text-crema backdrop-blur-sm hover:bg-carbon/75"
        >
          {pausado ? "▶ Reproducir" : "❚❚ Pausa"}
        </button>
      )}
    </>
  );
}
