export type Faq = { pregunta: string; respuesta: string };
export type FaqGrupo = { tema: string; items: Faq[] };

export const faqs: FaqGrupo[] = [
  {
    tema: "La experiencia",
    items: [
      { pregunta: "¿Cuánto dura y a qué hora empieza?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Se repiten los destinos?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "La comida",
    items: [
      { pregunta: "¿Pueden adaptar el menú a mi tipo de alimentación?", respuesta: "[COMPLETAR CON EL CLIENTE: límites y anticipación]" },
    ],
  },
  {
    tema: "Reservas y pagos",
    items: [
      { pregunta: "¿Cómo es la forma de pago? ¿Se debe abonar una seña?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué pasa si no puedo ir? ¿Puedo ceder mi lugar?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué pasa si se suspende la experiencia?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Workshop, grupos y regalos",
    items: [
      { pregunta: "¿Necesito saber cocinar para el workshop?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Cómo funciona la invitación de regalo? ¿Por cuánto tiempo es válida?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Encargos",
    items: [
      { pregunta: "¿Con cuánta anticipación debo encargar?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Realizan envíos?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
];
