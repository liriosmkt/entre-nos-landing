// Íconos de línea fina (stroke 1.25), heredan el color del texto.

type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 32 32",
  "aria-hidden": true,
};

export const IconoDestino = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="16" cy="16" r="12" />
    <path d="M4 16h24M16 4c4 3.5 5.5 7.5 5.5 12S20 24.5 16 28M16 4c-4 3.5-5.5 7.5-5.5 12S12 24.5 16 28" />
  </svg>
);

export const IconoSobre = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="4" y="8" width="24" height="17" rx="1.5" />
    <path d="M4.5 9 16 18l11.5-9" />
    <circle cx="16" cy="21" r="2.4" />
  </svg>
);

export const IconoMesa = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9 12h11v4a5.5 5.5 0 0 1-11 0v-4Z" />
    <path d="M20 13h2a2.5 2.5 0 0 1 0 5h-2.3" />
    <path d="M5 25h22M12 8c0-1.5 1.5-1.5 1.5-3M16 8c0-1.5 1.5-1.5 1.5-3" />
  </svg>
);

export const IconoReloj = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 9v7l4.5 3" />
  </svg>
);

export const IconoHoja = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 25C7 13 14 7 26 6c0 12-6 19-18 19Z" />
    <path d="M7 25 18 14" />
  </svg>
);

export const IconoEtiqueta = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 5h10l12 12-10 10L5 15V5Z" />
    <circle cx="10.5" cy="10.5" r="1.8" />
  </svg>
);

export const IconoTaza = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 12h14v6a7 7 0 0 1-14 0v-6Z" />
    <path d="M21 14h2a3 3 0 0 1 0 6h-2.5" />
  </svg>
);

export const IconoInstagram = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24" strokeWidth={1.4}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);

export const IconoWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.22 8.22 0 1 1 6.86 3.74Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

export const IconoFlecha = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconoMas = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconoCerrar = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconoMenu = ({ className }: P) => (
  <svg {...base} className={className} viewBox="0 0 24 24">
    <path d="M4 8h16M4 16h16" />
  </svg>
);
