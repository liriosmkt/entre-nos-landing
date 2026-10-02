// Testimonios de ejemplo (redactados para la web). Reemplazar por reseñas reales, con permiso de quien la escribió.

export type Testimonio = { texto: string; autor: string; experiencia: string };

export const testimonios: Testimonio[] = [
  {
    texto:
      "Cada paso fue mejor que el anterior. Se nota que todo es casero y con productos de calidad: la stracciatella, el tiramisú… Me fui pensando en cuándo vuelvo.",
    autor: "Carolina M.",
    experiencia: "Teanner Italia",
  },
  {
    texto:
      "El lugar es hermoso. Las lámparas encendidas, la mesa larga, la vajilla… Apenas entrás sentís que estás en otro lado. Es íntimo y cálido, como cenar en casa de amigas.",
    autor: "Julieta R.",
    experiencia: "Teanner Nueva York",
  },
  {
    texto:
      "Vero y Pili te reciben como si te conocieran de toda la vida. Nos explicaron cada plato con un cariño enorme y estuvieron atentas a todo. Fui sola y me sentí parte de la mesa.",
    autor: "Lucía G.",
    experiencia: "Teanner México",
  },
];

// Links a reels de Instagram (ej: "https://www.instagram.com/reel/XXXX/"). Vacío = se muestra un aviso.
export type Reel = { url: string; autor: string; titulo: string };

export const reels: Reel[] = [
  {
    url: "https://www.instagram.com/p/DdbyPqxzRnq/",
    autor: "@majoquinteros",
    titulo: "Una cafetería escondida en una mansión de Córdoba",
  },
  {
    url: "https://www.instagram.com/reel/DZs7tVpI4gt/",
    autor: "@cordobagourmet",
    titulo: "Merienda de 5 pasos a puertas cerradas",
  },
];
