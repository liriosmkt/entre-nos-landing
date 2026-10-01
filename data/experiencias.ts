import { mensajes } from "@/lib/whatsapp";

// Servicios de "Más allá del teanner". Textos tomados de "TEXTOS PARA WEB" y del brief.

export type Experiencia = {
  id: string;
  eyebrow: string;
  titulo: string;
  bajada: string;
  parrafos: string[];
  datos: string[]; // datos clave, en etiquetas
  incluyeTitulo: string;
  incluye: string[];
  nota?: string; // aclaración final, en chico
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
    parrafos: [
      "Una experiencia gastronómica inspirada en la cocina artesanal de Puglia, al sur de Italia, reinterpretada en Argentina con el espíritu de Entre Nos: cocinar, compartir y disfrutar alrededor de una mesa.",
      "Elaboramos pastas tradicionales y preparaciones típicas para luego compartir la comida con vinos seleccionados y un postre de cierre.",
    ],
    datos: ["8 lugares", "Pasta artesanal", "Vinos seleccionados", "Recetas para llevar"],
    incluyeTitulo: "¿Qué incluye la experiencia?",
    incluye: [
      "Workshop guiado de pasta artesanal inspirada en la cocina tradicional de Puglia",
      "Elaboración de 2 o 3 tipos de pasta típica",
      "Preparación de taralli",
      "Degustación de las pastas elaboradas, con salsas y acompañamientos preparados para la experiencia",
      "Mesa compartida para disfrutar lo cocinado",
      "Vinos seleccionados para acompañar la comida",
      "Postre de cierre: tiramisù",
      "Recetas finales para llevar",
      "Uso de delantal, tabla de amasado y todos los ingredientes incluidos",
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
    parrafos: [
      "Cumpleaños, aniversarios, una reunión de amigos o un encuentro con tu equipo de trabajo: tu grupo elige uno de nuestros destinos y la mesa es toda de ustedes.",
      "Preparamos la experiencia completa, con la misma dedicación de cada fecha: platos típicos servidos en pasos, aromas, ambientación pensada al detalle y nosotras como anfitrionas.",
    ],
    datos: ["Hasta 10 personas", "Elegís el destino", "Celebraciones y empresas"],
    incluyeTitulo: "Cómo es",
    incluye: [
      "La mesa exclusiva para tu grupo, de hasta 10 personas",
      "El destino que elijan: Italia, México, Nueva York o Chicago",
      "El recorrido completo de ese destino, en cinco pasos dulces y salados",
      "Limonadas, aguas, té o café de especialidad y tragos típicos del destino",
      "Opción veggie en los destinos que la tienen, avisando al reservar",
      "Para cumpleaños, aniversarios, celebraciones y encuentros empresariales",
    ],
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
    parrafos: [
      "Algunas fechas del año piden algo más. Para ellas armamos eventos especiales con un recorrido que pasa por más de un destino en la misma tarde.",
      "Como “Recibí la Primavera”, que viajó por Nueva York, España, Reino Unido e Italia.",
    ],
    datos: ["Varios destinos", "Cupo propio", "Fechas especiales"],
    incluyeTitulo: "Cómo funcionan",
    incluye: [
      "Un recorrido por varios destinos en una misma tarde",
      "Cada evento tiene su propio cupo (“Recibí la Primavera” fue para 20 personas)",
      "Se anuncian primero a quienes están en la lista de espera",
    ],
    cta: "Quiero enterarme",
    mensaje: mensajes.evento(),
    imagen: "evento-temporada.jpg",
    imagenAlt: "Mesa ambientada para un evento de temporada",
  },
];
