// Destinos del Teanner. El `sello` es la nota manuscrita de la tarjeta.

export type Destino = {
  id: string;
  nombre: string;
  sello: string | null;
  descripcion: string;
  pasos: string[]; // los 5 pasos, una línea cada uno
  bebidas: string;
  colaboracion: string | null; // cuenta de Instagram, sin @
  veggie: boolean;
  imagen: string;
  imagenAlt: string;
};

export const destinos: Destino[] = [
  {
    id: "italia",
    nombre: "Italia",
    sello: "menú renovado!",
    descripcion: "De los cannoli a la polenta trufada: una tarde entera alrededor de una mesa italiana.",
    pasos: [
      "Appetizer de bienvenida",
      "Cannoli y cantucci con infusiones",
      "Bruschettas con stracciatella, prosciutto y pera",
      "Polenta con hongos trufados",
      "Tiramisú y un detalle final",
    ],
    bebidas: "Café de especialidad e infusiones",
    colaboracion: "rito.tostadores",
    veggie: true,
    imagen: "destino-italia.jpg",
    imagenAlt: "Mesa del Teanner Italia con cannoli y bruschettas",
  },
  {
    id: "nueva-york",
    nombre: "Nueva York",
    sello: null,
    descripcion: "Un recorrido dulce y salado por los sabores de la ciudad que nunca duerme.",
    pasos: [
      "[COMPLETAR: paso 1]",
      "[COMPLETAR: paso 2]",
      "[COMPLETAR: paso 3]",
      "[COMPLETAR: paso 4]",
      "[COMPLETAR: paso 5]",
    ],
    bebidas: "[COMPLETAR: bebidas]",
    colaboracion: null,
    veggie: true,
    imagen: "destino-nueva-york.jpg",
    imagenAlt: "Mesa del Teanner Nueva York",
  },
  {
    id: "mexico",
    nombre: "México",
    sello: "nuevo destino!",
    descripcion: "Color, maíz y picante justo: un viaje a México hecho junto a amigos que saben.",
    pasos: [
      "[COMPLETAR: paso 1]",
      "[COMPLETAR: paso 2]",
      "[COMPLETAR: paso 3]",
      "[COMPLETAR: paso 4]",
      "[COMPLETAR: paso 5]",
    ],
    bebidas: "[COMPLETAR: bebidas]",
    colaboracion: "taquitos.mexa",
    veggie: true,
    imagen: "destino-mexico.jpg",
    imagenAlt: "Mesa del Teanner México",
  },
];
