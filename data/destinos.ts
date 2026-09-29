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
  fotos: { src: string; alt: string }[]; // secuencia de la carta
};

export const destinos: Destino[] = [
  {
    id: "italia",
    nombre: "Italia",
    sello: "segunda edición",
    descripcion: "Una experiencia en cinco pasos para viajar a Italia a través de sus sabores.",
    pasos: [
      "Appetizer dulce para abrir la experiencia: amaretti y praliné de pistachos, con mocktail",
      "Crostata della babbaiola de limón y baci di dama de avellanas",
      "Bruschetta di stracciatella e prosciutto di Parma, en pan de masa madre con peras asadas, miel y pistachos",
      "Risotto “Io ti bacio, tu mi baci”: cremoso, con langostinos y remolacha",
      "El final lo elegís vos: affogato alla Nutella o tiramisù di cuore liquido, nuestra reinterpretación del clásico con corazón líquido de café",
    ],
    bebidas: "Limonada, aguas infusionadas, té o café de especialidad y tragos típicos del país",
    colaboracion: "rito.tostadores",
    veggie: true,
    imagen: "destino-italia.jpg",
    imagenAlt: "Bruschetta de stracciatella con peras asadas, miel y pistachos",
    fotos: [
      { src: "italia-1-amaretti.jpg", alt: "Amaretti y praliné de pistachos" },
      { src: "italia-2-crostata.jpg", alt: "Crostata de limón y baci di dama" },
      { src: "italia-3-bruschetta.jpg", alt: "Bruschetta de stracciatella con peras asadas" },
      { src: "italia-4-risotto.jpg", alt: "Risotto de langostinos y remolacha" },
      { src: "italia-5-tiramisu.jpg", alt: "Tiramisù di cuore liquido" },
    ],
  },
  {
    id: "nueva-york",
    nombre: "Nueva York",
    sello: null,
    descripcion: "Un recorrido dulce y salado por los sabores de la ciudad que nunca duerme.",
    pasos: [
      "Appetizer dulce de bienvenida: cinnamon roll con frosting de queso",
      "Una porción de carrot cake",
      "Dumplings de cerdo laqueados, típicos del barrio chino neoyorquino",
      "Sándwich de pastrami estilo Katz en pan de masa madre, con sopa de tomate",
      "De postre, NY cookie de chocolate amargo y caramelo salado que sale calentita, con helado",
    ],
    bebidas: "Limonadas, aguas, té o café de especialidad y un trago típico de la ciudad",
    colaboracion: null,
    veggie: true,
    imagen: "destino-nueva-york.jpg",
    imagenAlt: "NY cookie de chocolate partida al medio",
    fotos: [
      { src: "encargo-carrot-cake.jpg", alt: "Carrot cake con frosting" },
      { src: "destino-nueva-york.jpg", alt: "NY cookie de chocolate" },
      { src: "pasteleria-cookie.jpg", alt: "Cookie con café de especialidad" },
    ],
  },
  {
    id: "mexico",
    nombre: "México",
    sello: "nuevo destino!",
    descripcion: "Color, maíz y picante justo: un viaje a México hecho junto a amigos que saben.",
    pasos: [
      "Pan de muertos relleno de dulce de leche",
      "Pastel tres leches con crema y frutas de estación",
      "Quesadillas de hongos",
      "Tacos de ribeye con queso gratinado",
      "Domo de mousse de arroz con leche sobre una base crocante de canela",
    ],
    bebidas: "Limonadas, aguas, té o café de especialidad, el clásico café de olla y un trago típico del país",
    colaboracion: "taquitos.mexa",
    veggie: true,
    imagen: "destino-mexico.jpg",
    imagenAlt: "Pastel con crema y frutas de estación",
    fotos: [
      { src: "mexico-pan-de-muertos.jpg", alt: "Pan de muertos" },
      { src: "destino-mexico.jpg", alt: "Pastel tres leches con frutas de estación" },
    ],
  },
  {
    id: "chicago",
    nombre: "Chicago",
    sello: "Yes, Chef!",
    descripcion: "Inspirado en la serie “The Bear”. Every second counts.",
    pasos: [
      "Sydney’s donut",
      "Marcus’ chocolate cake: torta húmeda de chocolate, rellena de mousse y cubierta con ganache",
      "The Michael: cannolo de parmesano y mousse de mortadela con pistachos",
      "The Original Beef: sándwich de italian beef con giardiniera",
      "Copenhagen sundae: panna cotta con frutos rojos",
    ],
    bebidas: "Limonada, aguas infusionadas, té o café de especialidad y tragos típicos de la ciudad",
    colaboracion: null,
    veggie: false,
    imagen: "destino-chicago.jpg",
    imagenAlt: "Teanner Chicago inspirado en The Bear",
    fotos: [],
  },
];
