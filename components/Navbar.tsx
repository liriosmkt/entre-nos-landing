"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { mensajes, waLink } from "@/lib/whatsapp";
import { Logo, Ramita } from "./ui/Ornamentos";
import { IconoCerrar, IconoInstagram, IconoMenu, IconoWhatsApp } from "./ui/Iconos";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-carbon/92 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-crema focus:px-3 focus:py-2 focus:text-tinta">
        Saltar al contenido
      </a>
      <nav className="container-x flex h-16 items-center justify-between text-crema md:h-20" aria-label="Principal">
        <a href="#inicio" aria-label="Entre Nos, volver al inicio">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="eyebrow text-crema/80 transition-colors hover:text-ambar">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waLink(mensajes.general())}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="nav:reservar"
            className="btn btn-ambar hidden min-h-0 px-5 py-2.5 sm:inline-flex"
          >
            Reservá
          </a>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(true)}
          >
            <IconoMenu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Menú mobile a pantalla completa */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={`fixed inset-0 z-50 flex h-dvh flex-col bg-espresso text-crema transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        hidden={!open}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <button type="button" className="-mr-2 p-2" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
            <IconoCerrar className="h-7 w-7" />
          </button>
        </div>
        <ul className="container-x mt-8 flex flex-1 flex-col">
          {site.nav.map((item) => (
            <li key={item.href} className="border-b border-cacao/60">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="display block py-3.5 text-xl leading-tight text-crema hover:text-ambar"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="container-x pb-10">
          <Ramita className="mb-6 h-6 w-24 text-salvia" />
          <a
            href={waLink(mensajes.general())}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="menu:reservar"
            className="btn btn-ambar w-full"
          >
            <IconoWhatsApp className="h-4 w-4" /> Reservá tu lugar
          </a>
          <a
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-6 flex items-center justify-center gap-2 text-crema/75"
          >
            <IconoInstagram className="h-4 w-4" /> @{site.instagram}
          </a>
        </div>
      </div>
    </header>
  );
}
