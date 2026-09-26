import { site } from "@/data/site";

/** Arma el link de WhatsApp con el mensaje precargado. */
export function waLink(mensaje: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Mensajes precargados por botón: el asistente arranca en el punto correcto. */
export const mensajes = {
  general: () => "Hola Entre Nos! 🤎 Quiero reservar mi lugar. ¿Qué fechas tienen disponibles?",
  fecha: (tipo: string, destino: string, fechaCorta: string) =>
    `Hola Entre Nos! 🤎 Quiero reservar para el ${tipo} ${destino} del ${fechaCorta}. Somos __ personas.`,
  avisarLugar: (tipo: string, destino: string, fechaCorta: string) =>
    `Hola! La fecha del ${tipo} ${destino} del ${fechaCorta} está agotada. ¿Me avisan si se libera un lugar?`,
  destino: (destino: string) => `Hola Entre Nos! 🤎 Quiero reservar el Teanner ${destino}. ¿Cuál es la próxima fecha?`,
  avisarDestino: (destino: string) => `Hola! Avisame cuando vuelva el Teanner ${destino}.`,
  sugerirDestino: () => "Hola! Me encantaría viajar a ____ con ustedes.",
  teanner: () => "Hola Entre Nos! 🤎 Quiero reservar un teanner. ¿Qué destinos y fechas tienen?",
  workshop: () => "Hola! Quiero reservar un lugar en el Workshop Puglia.",
  privada: () => "Hola! Quiero consultar por una reserva privada para mi grupo.",
  evento: () => "Hola! Quiero enterarme del próximo evento de temporada.",
  regalo: () => "Hola! Quiero regalar una experiencia Entre Nos.",
  encargo: (producto: string) => `Hola! Quiero encargar una ${producto}.`,
  listaEspera: () => "Hola! Quiero anotarme en la lista de espera.",
  duda: () => "Hola! Tengo una duda sobre Entre Nos.",
};
