// Testimonios reales de invitados (solo con redacción y puntuación corregidas).
// "autor" y "experiencia" son opcionales: si faltan, la tarjeta se muestra sin pie.

export type Testimonio = { texto: string; autor?: string; experiencia?: string };

export const testimonios: Testimonio[] = [
  {
    texto:
      "Gracias, Vero y familia, por tan hermosa noche compartiendo pasiones. La pasamos hermoso. Disfrutamos mucho del grupo y de todo lo que transmitiste, no solo en las recetas. Nos llevaste a Italia y nos olvidamos de todo. ¡Volveré! Saludos para todos.",
  },
  {
    texto:
      "Muchas gracias, Vero, Pili y tu hijo, que hace esos riquísimos tragos. ¡Hermosa experiencia! Agradezco también habernos encontrado con tan buena gente. ¡Muy lindo grupo! Hasta la próxima. ¡Saludos!",
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
