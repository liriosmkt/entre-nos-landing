import { mensajes } from "@/lib/whatsapp";

export type Experiencia = {
  id: string;
  eyebrow: string;
  titulo: string;
  bajada: string;
  texto: string;
  datos: string[];
  cta: string;
  mensaje: string;
  imagen: string;
  imagenAlt: string;
};

export const experiencias: Experiencia[] = [
  {
    id: "teanner",
    eyebrow: "Tea + Dinner",
    titulo: "Teanner",
    bajada: "Una merienda-cena de cinco pasos que viaja a un destino.",
    texto:
      "Sabores dulces y salados de un lugar del mundo, servidos en una mesa compartida. Cada fecha tiene su destino y su menú, cocinado en casa.",
    datos: ["5 pasos", "8 invitados", "Opción veggie"],
    cta: "Reservar un teanner",
    mensaje: mensajes.teanner(),
    imagen: "teanner-mesa.jpg",
    imagenAlt: "Teanner servido en la mesa larga",
  },
  {
    id: "workshop",
    eyebrow: "Workshop",
    titulo: "Workshop Puglia",
    bajada: "Pasta hecha con nuestras propias manos, vino y recetas para llevarse.",
    texto:
      "Un taller de pastas artesanales del sur de Italia: orecchiette y otras variedades, además de taralli. Después compartimos todo lo cocinado con vinos seleccionados y postre.",
    datos: ["8 lugares", "Vinos y postre", "Recetas para llevarte"],
    cta: "Reservar el workshop",
    mensaje: mensajes.workshop(),
    imagen: "workshop-puglia.jpg",
    imagenAlt: "Manos formando orecchiette sobre la mesa de madera",
  },
  {
    id: "privada",
    eyebrow: "Reserva privada",
    titulo: "Tu mesa, tu destino",
    bajada: "Hasta 10 personas: elegí el destino para tu ocasión especial.",
    texto:
      "Cumpleaños, aniversarios o un encuentro que merece algo distinto. Tu grupo elige uno de nuestros destinos y la mesa es toda de ustedes.",
    datos: ["Hasta 10 personas", "Elegís el destino", "Cumpleaños y aniversarios"],
    cta: "Consultar reserva privada",
    mensaje: mensajes.privada(),
    imagen: "privada-grupo.jpg",
    imagenAlt: "Un grupo brindando alrededor de la mesa",
  },
  {
    id: "eventos",
    eyebrow: "De temporada",
    titulo: "Eventos especiales",
    bajada: "Varios destinos en una sola tarde.",
    texto:
      "Como “Recibí la Primavera”, que pasó por Nueva York, España, Reino Unido e Italia. Cada evento tiene su propio cupo y se anuncia primero a la lista de espera.",
    datos: ["Varios destinos", "Cupo propio", "Fechas especiales"],
    cta: "Quiero enterarme",
    mensaje: mensajes.evento(),
    imagen: "evento-temporada.jpg",
    imagenAlt: "Mesa ambientada para un evento de temporada",
  },
];
