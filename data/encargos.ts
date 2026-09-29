export type Encargo = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string | null; // null = "Precio a consultar"
  imagen: string;
  imagenAlt: string;
};

export const encargosIntro = {
  titulo: "Hay sabores que piden volver a vivirse.",
  bajada: "Llevate una partecita de Entre Nos a tu mesa.",
  datos: [
    { label: "Anticipación", valor: "[COMPLETAR: anticipación mínima]" },
    { label: "Entrega", valor: "[COMPLETAR: retiro o envío]" },
  ],
};

// Fotos de la pastelería de la casa para la galería de Encargos (solo imágenes, sin precios)
export const creaciones: { src: string; alt: string }[] = [
  { src: "pasteleria-pan.jpg", alt: "Pan de masa madre con greñado de espiga" },
  { src: "pasteleria-cookie.jpg", alt: "Cookie con chips de chocolate y café" },
  { src: "pasteleria-torta-flores.jpg", alt: "Torta decorada con flores naturales" },
  { src: "pasteleria-macarons.jpg", alt: "Macarons rosados" },
  { src: "pasteleria-lemon-pie.jpg", alt: "Tarta de limón con merengue" },
  { src: "pasteleria-torta.jpg", alt: "Torta con crema y flores violetas" },
];

export const encargos: Encargo[] = [
  {
    id: "carrot-cake",
    nombre: "Carrot cake",
    descripcion: "Húmeda y especiada. También la hacemos personalizada para tu celebración.",
    precio: null,
    imagen: "encargo-carrot-cake.jpg",
    imagenAlt: "Carrot cake entera con frosting y nueces caramelizadas",
  },
  {
    id: "tarta-vasca",
    nombre: "Tarta vasca",
    descripcion: "Cremosa por dentro, bien tostada por fuera.",
    precio: null,
    imagen: "encargo-tarta-vasca.jpg",
    imagenAlt: "Tarta vasca con la superficie tostada",
  },
  {
    id: "baci-di-dama",
    nombre: "Baci di dama",
    descripcion: "Los besitos italianos: dos galletitas unidas por chocolate.",
    precio: null,
    imagen: "italia-2-crostata.jpg",
    imagenAlt: "Baci di dama junto a una crostata de limón",
  },
];
