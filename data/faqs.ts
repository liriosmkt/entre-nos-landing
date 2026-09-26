export type Faq = { pregunta: string; respuesta: string };
export type FaqGrupo = { tema: string; items: Faq[] };

export const faqs: FaqGrupo[] = [
  {
    tema: "La experiencia",
    items: [
      { pregunta: "¿Qué es un teanner?", respuesta: "Tea + Dinner: merienda y cena en cinco pasos, dulces y salados, inspirados en un destino." },
      { pregunta: "¿Dónde es?", respuesta: "En Córdoba Capital. La dirección te la enviamos al confirmar tu reserva." },
      { pregunta: "¿Cuántas personas hay por mesa?", respuesta: "Es una mesa compartida de 8 invitados. Las reservas privadas son de hasta 10 personas." },
      { pregunta: "¿Puedo ir solo/a?", respuesta: "Sí. Es una mesa compartida: también es un plan ideal para conocer gente nueva." },
      { pregunta: "¿Cuánto dura y a qué hora empieza?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué incluye el precio? ¿Hay alcohol?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Se repiten los destinos? ¿Cada cuánto hay fechas?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "La comida",
    items: [
      { pregunta: "¿Hay opción veggie?", respuesta: "Sí. Avisanos al reservar y adaptamos tu menú." },
      { pregunta: "Tengo celiaquía, alergias o intolerancias, ¿pueden adaptarlo?", respuesta: "[COMPLETAR CON EL CLIENTE: límites y anticipación]" },
      { pregunta: "¿Pueden ir chicos?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Reservas y pagos",
    items: [
      { pregunta: "¿Cómo reservo?", respuesta: "Por WhatsApp: tocá cualquier botón de “Reservar” y te respondemos en pocos minutos." },
      { pregunta: "¿Cómo pago? ¿Seña o total?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué pasa si no puedo ir? ¿Puedo ceder mi lugar?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Qué pasa si la fecha está agotada?", respuesta: "Anotate en la lista de espera y te avisamos si se libera un lugar." },
      { pregunta: "¿Qué pasa si ustedes suspenden?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
    ],
  },
  {
    tema: "Workshop, grupos y regalos",
    items: [
      { pregunta: "¿Necesito saber cocinar para el workshop?", respuesta: "[COMPLETAR CON EL CLIENTE]" },
      { pregunta: "¿Hacen eventos privados o empresariales?", respuesta: "Sí. Con la reserva privada, un grupo de hasta 10 personas elige el destino." },
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
