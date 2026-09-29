export type Faq = { pregunta: string; respuesta: string };
export type FaqGrupo = { tema: string; items: Faq[] };

export const faqs: FaqGrupo[] = [
  {
    tema: "La experiencia",
    items: [
      { pregunta: "¿Puedo ir solo/a?", respuesta: "Sí. Es una mesa compartida: también es un plan ideal para conocer gente nueva." },
      { pregunta: "¿Cuánto dura y a qué hora empieza?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Se repiten los destinos? ¿Cada cuánto hay fechas?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "La comida",
    items: [
      { pregunta: "Tengo celiaquía, alergias o intolerancias, ¿pueden adaptarlo?", respuesta: "[COMPLETAR CON EL CLIENTE: límites y anticipación]" },
      { pregunta: "¿Pueden ir chicos?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Reservas y pagos",
    items: [
      { pregunta: "¿Cómo pago? ¿Seña o total?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué pasa si no puedo ir? ¿Puedo ceder mi lugar?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué pasa si ustedes suspenden?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Workshop, grupos y regalos",
    items: [
      { pregunta: "¿Necesito saber cocinar para el workshop?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Cómo funciona la invitación de regalo? ¿Cuánto dura?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Encargos",
    items: [
      { pregunta: "¿Con cuánta anticipación encargo?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Hacen envíos?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
];
