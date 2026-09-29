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
  // (por defecto, el de Vero). Los dos contactos se muestran en el footer.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5491151104758",
  contactos: [
    { nombre: "Vero", numero: "5491151104758", visible: "11 5110-4758" },
    { nombre: "Pili", numero: "5493512618070", visible: "351 261-8070" },
  ],

  seo: {
    title: "Entre Nos · Experiencia gastronómica a puertas cerradas en Córdoba",
    description:
      "Teanners, workshops y mesas privadas a puertas cerradas en Córdoba Capital. Un destino. Cinco pasos. Diez invitados. Reservá tu lugar por WhatsApp.",
    ogImage: "/images/og-entre-nos.jpg",
  },

  nav: [
    { label: "Destinos", href: "#destinos" },
    { label: "Workshop y eventos", href: "#experiencias" },
    { label: "Fechas", href: "#fechas" },
    { label: "Regalos", href: "#regalos" },
    { label: "Encargos", href: "#encargos" },
    { label: "Nosotras", href: "#nosotras" },
  ],

  hero: {
    titulo: "Viajá por el mundo sin salir de Córdoba",
    // Videos en /public/images: horizontal (tríptico) para pantallas anchas y vertical para celulares
    video: "hero.mp4",
    videoMovil: "hero-movil.mp4",
    poster: "hero.jpg",
    posterMovil: "hero-movil.jpg",
    videoAlt: "El proceso de Entre Nos: café, cremas, emplatado, la mesa puesta y el brindis",
  },

  porQue: {
    eyebrow: "¿Por qué Entre Nos?",
    titulo: "Los mejores recuerdos comienzan alrededor de una mesa",
    bajada: "Una experiencia para desconectar de lo cotidiano y reconectar con el alma.",
    texto:
      "Porque la comida no es solo comida: es emoción, es cultura, es un lenguaje universal. Cada brunch o teanner que preparamos es un pasaje directo a un rincón del mundo: vos elegís el destino y nosotras te llevamos hasta allí.",
    cita: "Una mesa larga, una música suave, un viaje sin pasaporte.",
    imagen: "porque-mesa.jpg",
    imagenAlt: "Un plato servido en la mesa larga, con taza, cubiertos y limonada",
  },

  comoFunciona: {
    titulo: "¿Qué es un teanner?",
    definicion: "merienda y cena en un solo recorrido",
    // La "ecuación" visual: Tea + Dinner = Teanner
    ecuacion: [
      { palabra: "Tea", detalle: "la merienda", src: "pasteleria-cookie.jpg", alt: "Cookie con café de especialidad" },
      { palabra: "Dinner", detalle: "la cena", src: "italia-4-risotto.jpg", alt: "Risotto de langostinos y remolacha" },
      { palabra: "Teanner", detalle: "las dos, en un solo viaje", src: "teanner-mesa.jpg", alt: "Invitados alrededor de la mesa compartida" },
    ],
    diferencial:
      "No es un restaurante ni una casa de té. Es una tarde en casa que te lleva a otro lugar del mundo.",
    pasos: [
      { icono: "destino", titulo: "Elegí tu destino", texto: "Italia, México, Chicago o Nueva York: cada fecha viaja a un lugar distinto." },
      { icono: "sobre", titulo: "Reservá tu lugar", texto: "Nos escribís por WhatsApp y, al confirmar, te enviamos la dirección secreta." },
      { icono: "mesa", titulo: "Viajá alrededor de la mesa", texto: "Cinco pasos dulces y salados, mesa compartida y mucha conversación." },
    ],
  },

  laTarde: {
    titulo: "Cómo es la tarde",
    bajada: "Cada teanner sigue el mismo recorrido; lo que cambia es el destino. Elegí uno y mirá su carta.",
    linea: [
      { momento: "Llegada", detalle: "[COMPLETAR: horario de llegada]" },
      { momento: "Bienvenida", detalle: "Un appetizer para arrancar el viaje" },
      { momento: "Los 5 pasos", detalle: "Dulces y salados, en orden de viaje" },
      { momento: "Sobremesa", detalle: "Que nunca falte la conversación" },
    ],
    datos: [
      { label: "Duración", valor: "[COMPLETAR: duración]" },
      { label: "Incluye", valor: "Limonada, aguas infusionadas, té o café de especialidad y tragos típicos del destino" },
      { label: "Restricciones", valor: "¿Sos veggie o tenés alguna restricción? Contanos al reservar y adaptamos tu menú." },
    ],
    notaMesa:
      "No hay relojes ni mesas que rotan. Solo diez personas compartiendo un momento único, íntimo, sin apuros.",
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
    destacado: { texto: "Día de la Madre · 18 de octubre" } as { texto: string } | null,
  },

  nosotras: {
    titulo: "Vero y Pili",
    eyebrow: "Quiénes somos",
    subtitulo: "Madre e hija · cocineras, anfitrionas, viajeras de alma",
    intro:
      "Todo lo que ves, sentís y probás lo hacemos nosotras: nuestra manera de celebrar el amor, la memoria y la conexión compartiendo una comida entre nos.",
    bios: [
      {
        nombre: "Vero",
        foto: "vero.jpg",
        fotoAlt: "Vero sonriendo en su cocina",
        destacado: "La cocina fue mi refugio y mi juego desde muy chica.",
        texto:
          "Crecí entre las cocinas de mis abuelas, una con alma romana y otra nacida en Granada. Ahí aprendí que el amor se transmite en silencio, entre cucharones, ollas y risas. Hoy tengo el privilegio de compartirlo con mi hija.",
      },
      {
        nombre: "Pili",
        foto: "pili.jpg",
        fotoAlt: "Pili mirando a cámara",
        destacado: "La comida es nuestra mejor excusa para reunirnos.",
        texto:
          "Desde chiquita acompaño a mi mamá en la cocina. Descubrí mi pasión por la pastelería y, estudiando nutrición, confirmé que el alimento es un puente que conecta personas, recuerdos y culturas.",
      },
    ],
    firma: "Gracias por estar acá. Bienvenid@s a nuestra cocina.",
  },

  laCasa: {
    titulo: "Nuestra casa, tu lugar por una tarde",
    texto: "La dirección te la mandamos cuando confirmás.",
    video: "casa-recorrido.mp4",
    videoMovil: "casa-recorrido-movil.mp4",
    poster: "casa-recorrido.jpg",
    posterMovil: "casa-recorrido-movil.jpg",
    videoAlt: "Recorrido por el comedor: las lámparas, la mesa larga puesta y las flores",
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
