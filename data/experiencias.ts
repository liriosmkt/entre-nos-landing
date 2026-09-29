import { mensajes } from "@/lib/whatsapp";

export type Experiencia = {
  id: string;
  eyebrow: string;
  titulo: string;
  bajada: string;
  texto: string;
  datos: string[];
  incluye?: string[]; // lista de lo que incluye, opcional
  cta: string;
  mensaje: string;
  imagen: string;
  imagenAlt: string;
};

export const experiencias: Experiencia[] = [
  {
    id: "workshop",
    eyebrow: "Workshop",
    titulo: "Workshop Puglia",
    bajada: "Más que una clase de cocina, es una experiencia para regalar, vivir y recordar.",
    texto:
      "Inspirado en la cocina artesanal de Puglia, al sur de Italia, y reinterpretado con el espíritu de Entre Nos: cocinar, compartir y disfrutar alrededor de una mesa. Elaboramos pastas tradicionales y preparaciones típicas para luego compartir la comida con vinos seleccionados y un postre de cierre.",
    datos: ["Pasta artesanal", "Vinos seleccionados", "Recetas para llevarte"],
    incluye: [
      "Workshop guiado de pasta artesanal de la cocina tradicional de Puglia",
      "Elaboración de 2 o 3 tipos de pasta típica y preparación de taralli",
      "Degustación de las pastas con salsas y acompañamientos",
      "Mesa compartida con vinos seleccionados",
      "Postre de cierre: tiramisù",
      "Delantal, tabla de amasado e ingredientes incluidos",
    ],
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
