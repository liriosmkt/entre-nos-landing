"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { destinos } from "@/data/destinos";
import { waLink } from "@/lib/whatsapp";
import { trackCta } from "@/lib/track";
import { Estrellita, Ramita } from "./ui/Ornamentos";
import { Txt } from "./ui/Txt";

type Canal = "whatsapp" | "email";
type Errores = Partial<Record<"nombre" | "contacto", string>>;

export function ListaEspera() {
  const { listaEspera: l, pasaporte: p } = site;
  const [canal, setCanal] = useState<Canal>("whatsapp");
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  function validar(form: FormData): Errores {
    const e: Errores = {};
    const nombre = String(form.get("nombre") || "").trim();
    const contacto = String(form.get("contacto") || "").trim();
    if (nombre.length < 2) e.nombre = "Contanos tu nombre.";
    if (canal === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contacto)) e.contacto = "Revisá el email.";
    if (canal === "whatsapp" && contacto.replace(/\D/g, "").length < 8) e.contacto = "Revisá el número (con característica).";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const e = validar(form);
    setErrores(e);
    if (Object.keys(e).length) return;
    trackCta("lista-espera:anotarme");

    const nombre = String(form.get("nombre"));
    const destino = String(form.get("destino") || "");

    // Sin backend configurado: abre WhatsApp con los datos
    if (!l.action) {
      const msg = `Hola! Quiero anotarme en la lista de espera. Soy ${nombre}${
        destino ? ` y me interesa el destino ${destino}` : ""
      }. Mi contacto: ${form.get("contacto")}`;
      window.open(waLink(msg), "_blank", "noopener");
      setEstado("ok");
      return;
    }

    try {
      setEstado("enviando");
      const res = await fetch(l.action, { method: "POST", body: form, headers: { Accept: "application/json" } });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="lista-de-espera" className="section-y bg-crema">
      <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-espresso p-8 text-crema md:p-14">
          <p className="eyebrow text-ambar">Lista de espera</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">{l.titulo}</h2>
          <p className="mt-4 max-w-lg text-crema/80">{l.texto}</p>

          {estado === "ok" ? (
            <p className="display mt-10 text-3xl italic text-ambar" role="status">
              ¡Listo! Ya estás en la lista. El viaje continúa 🤎
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2" action={l.action || undefined}>
              <div className="sm:col-span-2">
                <label htmlFor="le-nombre" className="eyebrow text-[0.65rem] text-crema/75">
                  Nombre
                </label>
                <input
                  id="le-nombre"
                  name="nombre"
                  autoComplete="given-name"
                  aria-invalid={!!errores.nombre}
                  aria-describedby={errores.nombre ? "le-nombre-err" : undefined}
                  className="mt-2 w-full border-b border-crema/40 bg-transparent py-3 text-lg text-crema placeholder:text-crema/40 focus:border-ambar focus:outline-none"
                  placeholder="¿Cómo te llamás?"
                />
                {errores.nombre && (
                  <p id="le-nombre-err" className="mt-2 text-sm text-ambar">
                    {errores.nombre}
                  </p>
                )}
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="eyebrow text-[0.65rem] text-crema/75">Te avisamos por</legend>
                <div className="mt-3 flex gap-2">
                  {(["whatsapp", "email"] as const).map((c) => (
                    <label
                      key={c}
                      className={`eyebrow cursor-pointer rounded-full border px-4 py-2 text-[0.65rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ambar ${
                        canal === c ? "border-ambar bg-ambar text-carbon" : "border-crema/40 text-crema/85"
                      }`}
                    >
                      <input
                        type="radio"
                        name="canal"
                        value={c}
                        checked={canal === c}
                        onChange={() => setCanal(c)}
                        className="sr-only"
                      />
                      {c === "whatsapp" ? "WhatsApp" : "Email"}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="le-contacto" className="eyebrow text-[0.65rem] text-crema/75">
                  {canal === "whatsapp" ? "Tu WhatsApp" : "Tu email"}
                </label>
                <input
                  id="le-contacto"
                  name="contacto"
                  type={canal === "email" ? "email" : "tel"}
                  inputMode={canal === "email" ? "email" : "tel"}
                  autoComplete={canal === "email" ? "email" : "tel"}
                  aria-invalid={!!errores.contacto}
                  aria-describedby={errores.contacto ? "le-contacto-err" : undefined}
                  className="mt-2 w-full border-b border-crema/40 bg-transparent py-3 text-lg text-crema placeholder:text-crema/40 focus:border-ambar focus:outline-none"
                  placeholder={canal === "email" ? "nombre@mail.com" : "351 555 5555"}
                />
                {errores.contacto && (
                  <p id="le-contacto-err" className="mt-2 text-sm text-ambar">
                    {errores.contacto}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="le-destino" className="eyebrow text-[0.65rem] text-crema/75">
                  Avisame cuando vuelva
                </label>
                <select
                  id="le-destino"
                  name="destino"
                  className="mt-2 w-full border-b border-crema/40 bg-transparent py-3 text-lg text-crema focus:border-ambar focus:outline-none [&>option]:text-tinta"
                  defaultValue=""
                >
                  <option value="">Cualquier destino</option>
                  {destinos.map((d) => (
                    <option key={d.id} value={d.nombre}>
                      {d.nombre}
                    </option>
                  ))}
                  <option value="Workshop Puglia">Workshop Puglia</option>
                  <option value="Eventos de temporada">Eventos de temporada</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button type="submit" disabled={estado === "enviando"} className="btn btn-ambar w-full sm:w-auto" data-cta="lista-espera:submit">
                  {estado === "enviando" ? "Enviando…" : "Anotarme"}
                </button>
                {estado === "error" && (
                  <p className="mt-3 text-sm text-ambar" role="alert">
                    No pudimos anotarte. Probá de nuevo o escribinos por WhatsApp.
                  </p>
                )}
              </div>
            </form>
          )}
          <Ramita className="absolute -right-4 bottom-6 h-10 w-40 text-cacao" />
        </div>

        {/* Pasaporte Entre Nos */}
        <aside className="relative flex flex-col justify-between rounded-3xl border border-caramelo/50 bg-hueso p-8 md:p-10">
          <div>
            <p className="eyebrow text-oliva-oscuro">Fidelidad</p>
            <h3 className="display mt-3 text-4xl text-espresso">{p.titulo}</h3>
            <p className="mt-3 text-tinta-suave">{p.texto}</p>
          </div>
          <ul className="my-8 grid grid-cols-3 gap-3" aria-label="Sellos del pasaporte">
            {[...destinos.map((d) => d.nombre), "?", "?", "?"].map((n, i) => (
              <li
                key={i}
                className={`flex aspect-square items-center justify-center rounded-full border text-center ${
                  n === "?" ? "border-dashed border-caramelo/60 text-caramelo" : "border-oliva text-oliva-oscuro"
                }`}
                style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (6 + i * 2)}deg)` }}
              >
                <span className={n === "?" ? "display text-3xl italic" : "hand text-lg leading-none"}>{n}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2 text-sm text-tinta-suave">
            <Estrellita className="mt-1 h-3 w-3 shrink-0 text-caramelo" />
            <span>
              <Txt>{p.beneficio}</Txt>
            </span>
          </p>
        </aside>
      </div>
    </section>
  );
}
