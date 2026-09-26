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

export const encargos: Encargo[] = [
  {
    id: "carrot-cake",
    nombre: "Carrot cake",
    descripcion: "Húmeda y especiada. También la hacemos personalizada para tu celebración.",
    precio: null,
    imagen: "encargo-carrot-cake.jpg",
    imagenAlt: "Carrot cake entera con frosting",
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
    imagen: "encargo-baci-di-dama.jpg",
    imagenAlt: "Baci di dama sobre un plato",
  },
];
