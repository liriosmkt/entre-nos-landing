import { mensajes } from "@/lib/whatsapp";

// Servicios de "Más allá del teanner". Textos tomados de "TEXTOS PARA WEB" y del brief,
// en versión corta para que se lean de un vistazo.

export type Icono = "mesa" | "destino" | "taza" | "sobre" | "hoja" | "reloj";

export type Experiencia = {
  id: string;
  eyebrow: string;
  titulo: string;
  bajada: string; // frase de la tarjeta
  resumen: string; // una o dos líneas
  claves: { icono: Icono; texto: string }[]; // los datos más importantes
  incluyeTitulo: string;
  incluye: string[]; // ítems cortos
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
    bajada: "Más que una clase de cocina: una experiencia para regalar, vivir y recordar.",
    resumen:
      "Cocinamos pastas artesanales del sur de Italia y después compartimos todo en la mesa, con vinos seleccionados y postre.",
    claves: [
      { icono: "mesa", texto: "8 lugares" },
      { icono: "taza", texto: "Con vinos" },
      { icono: "sobre", texto: "Recetas para llevar" },
    ],
    incluyeTitulo: "Incluye",
    incluye: [
      "Workshop guiado de pasta artesanal",
      "2 o 3 tipos de pasta típica",
      "Preparación de taralli",
      "Degustación con salsas y acompañamientos",
      "Mesa compartida con vinos",
      "Tiramisù de cierre",
      "Recetas finales para llevar",
      "Delantal, tabla e ingredientes",
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
    resumen: "Tu grupo elige un destino y la mesa es toda de ustedes, con la experiencia completa y nosotras como anfitrionas.",
    claves: [
      { icono: "mesa", texto: "Hasta 10 personas" },
      { icono: "destino", texto: "Elegís el destino" },
      { icono: "hoja", texto: "Opción veggie" },
    ],
    incluyeTitulo: "Ideal para",
    incluye: ["Cumpleaños", "Aniversarios", "Reuniones de amigos", "Encuentros empresariales"],
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
    resumen: "Fechas especiales del año con un recorrido por más de un destino, como “Recibí la Primavera”: Nueva York, España, Reino Unido e Italia.",
    claves: [
      { icono: "destino", texto: "Varios destinos" },
      { icono: "mesa", texto: "Cupo propio" },
      { icono: "sobre", texto: "Aviso anticipado" },
    ],
    incluyeTitulo: "Cómo funcionan",
    incluye: [
      "Un recorrido por varios destinos en la misma tarde",
      "Cada evento tiene su cupo (Primavera fue para 20)",
      "Se avisa primero a la lista de espera",
    ],
    cta: "Quiero enterarme",
    mensaje: mensajes.evento(),
    imagen: "evento-temporada.jpg",
    imagenAlt: "Mesa ambientada para un evento de temporada",
  },
];
