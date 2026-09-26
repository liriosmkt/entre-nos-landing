// Datos generales de la marca. Todo el copy global vive acá.

export const site = {
  nombre: "Entre Nos",
  nombreCompleto: "Entre Nos · Sabores del mundo",
  ciudad: "Córdoba Capital",
  instagram: "entrenos.sabores",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://entrenos.com.ar",
  // Prefijo de rutas cuando el sitio no está en la raíz del dominio (ej: GitHub Pages)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Número de WhatsApp: se configura en .env (NEXT_PUBLIC_WHATSAPP)
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "549XXXXXXXXXX",

  seo: {
    title: "Entre Nos · Experiencia gastronómica a puertas cerradas en Córdoba",
    description:
      "Teanners, workshops y mesas privadas a puertas cerradas en Córdoba Capital. Un destino. Cinco pasos. Ocho invitados. Reservá tu lugar por WhatsApp.",
    ogImage: "/images/og-entre-nos.jpg",
  },

  nav: [
    { label: "Experiencias", href: "#experiencias" },
    { label: "Fechas", href: "#fechas" },
    { label: "Regalos", href: "#regalos" },
    { label: "Encargos", href: "#encargos" },
    { label: "Nosotras", href: "#nosotras" },
  ],

  hero: {
    eyebrow: "Experiencia gastronómica a puertas cerradas · Córdoba",
    titulo: "Viajá por el mundo sin salir de Córdoba",
    bajada: "Un destino. Cinco pasos. Ocho invitados.",
    manuscrito: "cupos limitados por fecha",
    imagen: "hero-mesa.jpg",
    imagenAlt: "La mesa larga armada con las lámparas de papel encendidas",
  },

  comoFunciona: {
    titulo: "¿Qué es un teanner?",
    definicion: "merienda y cena en un solo recorrido",
    diferencial:
      "No es un restaurante ni una casa de té. Es una tarde en casa que te lleva a otro lugar del mundo.",
    pasos: [
      { icono: "destino", titulo: "Elegí tu destino", texto: "Italia, Nueva York, México… cada fecha viaja a un lugar distinto." },
      { icono: "sobre", titulo: "Reservá tu lugar", texto: "Nos escribís por WhatsApp y, al confirmar, te enviamos la dirección secreta." },
      { icono: "mesa", titulo: "Viajá alrededor de la mesa", texto: "Cinco pasos dulces y salados, mesa compartida y mucha conversación." },
    ],
  },

  laTarde: {
    titulo: "Cómo es la tarde",
    bajada: "Tomamos el Teanner Italia como ejemplo real del recorrido.",
    linea: [
      { momento: "Llegada", detalle: "[COMPLETAR: horario de llegada]" },
      { momento: "Bienvenida", detalle: "Appetizer para arrancar el viaje" },
      { momento: "Los 5 pasos", detalle: "Dulces y salados, en orden de viaje" },
      { momento: "Sobremesa", detalle: "Que nunca falte la conversación" },
    ],
    pasosEjemplo: [
      "Appetizer de bienvenida",
      "Cannoli y cantucci con infusiones y café de especialidad de @rito.tostadores",
      "Bruschettas con stracciatella, prosciutto y pera",
      "Polenta con hongos trufados",
      "Tiramisú y un detalle final",
    ],
    datos: [
      { label: "Duración", valor: "[COMPLETAR: duración]" },
      { label: "Incluye", valor: "[COMPLETAR: qué incluye el precio]" },
      { label: "Restricciones", valor: "¿Sos veggie o tenés alguna restricción? Contanos al reservar y adaptamos tu menú." },
    ],
    notaMesa:
      "La mesa es compartida: también es un plan ideal para venir solo/a y conocer gente nueva.",
  },

  regalos: {
    titulo: "¿Buscás un regalo distinto?",
    subtitulo: "Regalá un viaje alrededor de la mesa.",
    texto:
      "Invitaciones Entre Nos para cumpleaños, amigo invisible, una cita o simplemente para mimarte.",
    ocasiones: ["Cumpleaños", "Amigo invisible", "Citas", "Mimate"],
    detalles: [
      { label: "Formato", valor: "[COMPLETAR: formato de la invitación]" },
      { label: "Vigencia", valor: "[COMPLETAR: vigencia]" },
      { label: "Canje", valor: "[COMPLETAR: cómo se canjea]" },
    ],
    // Destacado de temporada. Poné `null` para ocultarlo.
    destacado: { texto: "Día de la Madre · 18 de octubre", nota: "de madre e hija, para madres e hijas" } as
      | { texto: string; nota: string }
      | null,
  },

  nosotras: {
    titulo: "Vero y Pili",
    eyebrow: "Nosotras",
    parrafos: [
      "Somos madre e hija. Cocinamos todo en casa, con materia prima de calidad y el tiempo que cada receta pide.",
      "Para nosotras, la comida es una hermosa forma de conectar personas, crear recuerdos y viajar a través de los sabores.",
      "[COMPLETAR: anécdota fundacional — cuándo y por qué empezaron, el primer teanner y qué significa “Entre Nos”]",
    ],
    notaPili: "Hola! Soy Pili. Desde chiquita me gusta acompañar a mi mamá en la cocina.",
    firma: "Cuando algo está hecho con cariño, se nota en los detalles.",
    fotos: [
      { src: "vero-y-pili.jpg", alt: "Vero y Pili en la cocina", pie: "Vero & Pili" },
      { src: "manos-cocinando.jpg", alt: "Manos amasando en la mesada", pie: "hecho a mano" },
    ],
  },

  laCasa: {
    titulo: "Nuestra casa, tu lugar por una tarde",
    texto: "La dirección te la mandamos cuando confirmás.",
    fotos: [
      { src: "casa-entrada.jpg", alt: "La entrada de la casa" },
      { src: "casa-mesa-larga.jpg", alt: "La mesa larga armada" },
      { src: "casa-lamparas.jpg", alt: "Las lámparas de papel encendidas" },
      { src: "casa-vajilla.jpg", alt: "Vajilla negra mate servida" },
      { src: "casa-platos.jpg", alt: "Detalle de un plato" },
      { src: "casa-sobremesa.jpg", alt: "La sobremesa con velas" },
    ],
  },

  pasaporte: {
    titulo: "Pasaporte Entre Nos",
    texto: "Un sello por cada destino que visitás. El viaje continúa.",
    beneficio: "[COMPLETAR: beneficio al completar el pasaporte]",
  },

  listaEspera: {
    titulo: "Anotate y recibí la invitación antes que nadie",
    texto: "Avisamos primero a quienes están en la lista cuando abrimos fechas nuevas o se libera un lugar.",
    // Endpoint del formulario (Formspree, Google Apps Script, etc.).
    // Si queda vacío, el formulario abre WhatsApp con los datos cargados.
    action: "",
  },

  footer: {
    frase: "Que nunca falte la conversación y una rica comida sobre la mesa 🤎",
    politicasHref: "#", // [COMPLETAR: link a políticas de reserva y cancelación]
  },
};
