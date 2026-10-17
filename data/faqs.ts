export type Faq = { pregunta: string; respuesta: string };
export type FaqGrupo = { tema: string; items: Faq[] };

// Respuestas del cliente (solo con redacción y puntuación corregidas)
export const faqs: FaqGrupo[] = [
  {
    tema: "La experiencia",
    items: [
      {
        pregunta: "¿Cuánto dura y a qué hora empieza?",
        respuesta:
          "Los Teanners empiezan a las 18 h y el workshop de pastas, a las 20 h. Los tiempos suelen variar según la dinámica de la mesa, haciéndole justicia a nuestro concepto: «una misma mesa, sin rotación y sin tiempos». Igualmente, calculá unas 3 horas por experiencia.",
      },
      {
        pregunta: "¿Se repiten los destinos?",
        respuesta:
          "¡Sí! Según la demanda, vamos lanzando nuevas ediciones de un mismo destino. Incluso llegamos a renovar el menú de Italia para ofrecerles sabores nuevos.",
      },
    ],
  },
  {
    tema: "La comida",
    items: [
      {
        pregunta: "¿Pueden adaptar el menú a mi tipo de alimentación?",
        respuesta:
          "¡Sí! Todos nuestros destinos tienen opción vegetariana. Además, podés contarnos si tenés alguna intolerancia o alergia, así adaptamos el menú a tu medida.",
      },
    ],
  },
  {
    tema: "Reservas y pagos",
    items: [
      {
        pregunta: "¿Cómo es la forma de pago?",
        respuesta:
          "Para reservar el lugar, pedimos una seña del 50 % por transferencia a cada persona que asiste a la experiencia. Si preferís pagar en efectivo, escribinos y coordinamos para que nos acerques el monto. El resto se abona el mismo día, antes de que empiece la experiencia, en efectivo o por transferencia, así no tenés que ocuparte de eso durante la mesa.",
      },
      {
        pregunta: "¿Qué pasa si no puedo ir?",
        respuesta:
          "Si no podés asistir, la seña no es reembolsable, pero podés usarla para otra experiencia o cederle tu lugar a alguien conocido. Te pedimos que nos avises con tiempo para poder ocupar el lugar.",
      },
      {
        pregunta: "¿Qué pasa si se suspende la experiencia?",
        respuesta:
          "Si la experiencia se suspende por algún motivo, te avisamos y le devolvemos la seña a cada persona.",
      },
    ],
  },
  {
    tema: "Workshop, grupos y regalos",
    items: [
      {
        pregunta: "¿Necesito saber cocinar para el workshop?",
        respuesta:
          "¡No! El workshop es muy relajado y las explicaciones y demostraciones son súper detalladas. Armar las pastas es muy sencillo, y el clima se presta para ayudarnos entre todos entre charlas, tragos y picadas. Es un espacio para aprender, pero sobre todo para disfrutar.",
      },
      {
        pregunta: "¿Cómo funciona la invitación de regalo? ¿Por cuánto tiempo es válida?",
        respuesta:
          "Para regalar una invitación, se abona el valor total de la experiencia y nos pasás el nombre de quien la recibe, así armamos el voucher personalizado. Para usar su regalo, esa persona nos contacta, se identifica y elige cualquier fecha disponible de Entre Nos dentro de los tres meses desde que se emite el voucher. Por eso, sugerimos reservar con anticipación.",
      },
    ],
  },
  {
    tema: "Encargos",
    items: [
      {
        pregunta: "¿Con cuánta anticipación debo encargar?",
        respuesta:
          "Los encargos se hacen con un mínimo de 4 días de anticipación, aunque siempre recomendamos hacerlos lo antes posible.",
      },
      {
        pregunta: "¿Realizan envíos?",
        respuesta:
          "Por el momento no hacemos envíos. Los pedidos se retiran en nuestro domicilio, que te enviamos una vez confirmado el encargo.",
      },
    ],
  },
];
