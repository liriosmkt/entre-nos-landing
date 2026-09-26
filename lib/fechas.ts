import data from "@/data/fechas.json";

export type Estado = "disponible" | "ultimos" | "agotado";

export type Fecha = {
  id: string;
  ejemplo?: boolean;
  tipo: "Teanner" | "Workshop" | "Evento" | string;
  destino: string;
  fecha: string; // AAAA-MM-DD
  horario: string;
  cupos: number;
  disponibles: number;
  precio: number | null;
  nota?: string;
};

const DIAS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function parse(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function estadoDe(f: Fecha): Estado {
  if (f.disponibles <= 0) return "agotado";
  if (f.disponibles <= 2) return "ultimos";
  return "disponible";
}

export const estadoLabel: Record<Estado, string> = {
  disponible: "Disponible",
  ultimos: "Últimos lugares",
  agotado: "Agotado",
};

/** "10 DE OCTUBRE" */
export function fechaLarga(iso: string): string {
  const d = parse(iso);
  return `${d.getDate()} de ${MESES[d.getMonth()]}`.toUpperCase();
}

/** "SÁB" */
export function diaSemana(iso: string): string {
  return DIAS[parse(iso).getDay()];
}

/** "10/10" — para los mensajes de WhatsApp */
export function fechaCorta(iso: string): string {
  const d = parse(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function precioTexto(precio: number | null): string {
  if (precio == null) return "[COMPLETAR: precio]";
  return `$${precio.toLocaleString("es-AR")}`;
}

export function cuposTexto(f: Fecha): string {
  const e = estadoDe(f);
  if (e === "agotado") return `${f.cupos} lugares · agotado`;
  if (f.disponibles === 1) return "Queda el último lugar";
  return `Quedan ${f.disponibles} de ${f.cupos} lugares`;
}

/** Próximas fechas (desde hoy), ordenadas. Se evalúa en el build. */
export function proximasFechas(): Fecha[] {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return (data.fechas as Fecha[])
    .filter((f) => parse(f.fecha) >= hoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

/** La próxima fecha con lugares, para el microdato del hero. */
export function proximaConLugar(): Fecha | undefined {
  return proximasFechas().find((f) => estadoDe(f) !== "agotado");
}
