"use client";

import { useId, useState } from "react";
import { faqs } from "@/data/faqs";
import { mensajes } from "@/lib/whatsapp";
import { IconoMas } from "./ui/Iconos";
import { Txt } from "./ui/Txt";
import { SectionHead, WaButton } from "./ui/WaButton";

function Item({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();
  return (
    <li className="border-b border-espresso/15">
      <h4>
        <button
          type="button"
          id={`${id}-b`}
          aria-expanded={abierto}
          aria-controls={`${id}-p`}
          onClick={() => setAbierto((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg text-espresso hover:text-cacao"
        >
          {pregunta}
          <IconoMas className={`h-5 w-5 shrink-0 text-caramelo transition-transform duration-300 ${abierto ? "rotate-45" : ""}`} />
        </button>
      </h4>
      <div
        id={`${id}-p`}
        role="region"
        aria-labelledby={`${id}-b`}
        className={`grid transition-[grid-template-rows] duration-300 ${abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 leading-relaxed text-tinta-suave">
            <Txt>{respuesta}</Txt>
          </p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  return (
    <section id="preguntas" className="diferido section-y bg-hueso">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow="Antes de sentarte a la mesa" titulo="Preguntas frecuentes" />
          <p className="mt-6 text-tinta-suave">¿Otra duda? Escribinos y te respondemos.</p>
          <WaButton mensaje={mensajes.duda()} cta="faq:otra-duda" variante="linea-oscura" className="mt-6">
            Escribinos
          </WaButton>
        </div>
        <div className="space-y-12">
          {faqs.map((g) => (
            <div key={g.tema}>
              <h3 className="eyebrow text-oliva-oscuro">{g.tema}</h3>
              <ul className="mt-2 border-t border-espresso/15">
                {g.items.map((f) => (
                  <Item key={f.pregunta} {...f} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
