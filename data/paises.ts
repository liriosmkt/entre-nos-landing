// Países de los destinos. Si un país tiene más de un destino (o ciudad),
// se muestra su bandera y, al entrar, las opciones de cada uno.

export type Opcion = {
  nombre: string; // igual al `destino` de fechas.json
  etiqueta: string; // cómo se muestra
  destinoId: string | null; // id en destinos.ts si es un teanner con carta
};

export type Pais = {
  id: string; // también la clave de su bandera
  nombre: string;
  lat: number; // dónde va la bandera en el mapa
  lon: number;
  opciones: Opcion[];
};

export const paises: Pais[] = [
  {
    id: "italia",
    nombre: "Italia",
    lat: 42.5,
    lon: 12.5,
    opciones: [
      { nombre: "Italia", etiqueta: "Teanner Italia", destinoId: "italia" },
      { nombre: "Puglia", etiqueta: "Workshop Puglia", destinoId: null },
    ],
  },
  {
    id: "estados-unidos",
    nombre: "Estados Unidos",
    lat: 40.5,
    lon: -82,
    opciones: [
      { nombre: "Nueva York", etiqueta: "Nueva York", destinoId: "nueva-york" },
      { nombre: "Chicago", etiqueta: "Chicago", destinoId: "chicago" },
    ],
  },
  {
    id: "mexico",
    nombre: "México",
    lat: 20.5,
    lon: -101,
    opciones: [{ nombre: "México", etiqueta: "México", destinoId: "mexico" }],
  },
];
