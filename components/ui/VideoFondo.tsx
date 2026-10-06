"use client";

import { useMenosMovimiento } from "@/lib/movimiento";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { img } from "@/lib/img";

type Props = {
  escritorio: string; // archivos dentro de /public/images
  movil: string;
  posterEscritorio: string;
  posterMovil: string;
  label: string;
  className?: string;
  prioridad?: boolean; // true en el hero: el póster es lo primero que se ve
};

const ruta = (f: string) => `${site.basePath}/images/${f}`;

/**
 * Video en loop, sin sonido, con la versión vertical en celulares y la horizontal en pantallas anchas.
 * Primero se ve el póster (imagen optimizada, la que corresponde a cada pantalla) y el video recién
 * se descarga cuando la página terminó de cargar y está cerca de la pantalla, así no compite con lo
 * importante. Se reproduce solo mientras está a la vista y, con movimiento reducido, queda el póster.
 */
export function VideoFondo({ escritorio, movil, posterEscritorio, posterMovil, label, className = "", prioridad = false }: Props) {
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useMenosMovimiento();
  const [src, setSrc] = useState<string | null>(null);
  const [listo, setListo] = useState(false);
  const pd = img(`images/${posterEscritorio}`);
  const pm = img(`images/${posterMovil}`);

  // Decidir cuándo bajar el video: después del load de la página y cuando está cerca de la pantalla
  useEffect(() => {
    if (reduce) return;
    const el = caja.current;
    if (!el) return;
    let visto = false;
    let cargada = false;
    let espera: ReturnType<typeof setTimeout> | undefined;
    const intentar = () => {
      if (!visto || !cargada) return;
      const ancho = window.matchMedia("(min-width: 768px)").matches;
      setSrc(ruta(ancho ? escritorio : movil));
    };
    const onLoad = () => {
      // un respiro para que termine lo pendiente antes de empezar a bajar el video
      // (en el hero, más largo: el póster ya cubre la pantalla)
      espera = setTimeout(() => {
        cargada = true;
        intentar();
      }, prioridad ? 2500 : 300);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          visto = true;
          intentar();
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(espera);
      window.removeEventListener("load", onLoad);
    };
  }, [reduce, escritorio, movil, prioridad]);

  // Reproducir solo mientras está a la vista
  useEffect(() => {
    const v = video.current;
    if (!v || !src) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  const posicionada = /\b(absolute|fixed)\b/.test(className);

  return (
    <div ref={caja} className={`${posicionada ? "" : "relative"} overflow-hidden ${className}`}>
      <picture>
        <source media="(min-width: 768px)" srcSet={pd.srcSet ?? pd.src} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pm.src}
          srcSet={pm.srcSet}
          sizes="100vw"
          width={pm.width}
          height={pm.height}
          alt={label}
          loading={prioridad ? "eager" : "lazy"}
          fetchPriority={prioridad ? "high" : undefined}
          decoding={prioridad ? "sync" : "async"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {src && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setListo(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${listo ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
