// IMPORTANTE: cargar solo reseñas reales, con permiso de quien la escribió.

export type Testimonio = { texto: string; autor: string; experiencia: string };

export const testimonios: Testimonio[] = [
  { texto: "[TESTIMONIO REAL — completar]", autor: "[Nombre / @usuario]", experiencia: "[Experiencia / destino]" },
  { texto: "[TESTIMONIO REAL — completar]", autor: "[Nombre / @usuario]", experiencia: "[Experiencia / destino]" },
  { texto: "[TESTIMONIO REAL — completar]", autor: "[Nombre / @usuario]", experiencia: "[Experiencia / destino]" },
];

// Links a reels de Instagram (ej: "https://www.instagram.com/reel/XXXX/"). Vacío = se muestra un aviso.
export const reels: string[] = [];
