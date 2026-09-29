// Banderas minimalistas (3:2) de los países de cada destino.

type P = { className?: string };

function Marco({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={`overflow-hidden rounded-[3px] ring-1 ring-black/10 ${className}`} aria-hidden>
      {children}
    </svg>
  );
}

export const BanderaItalia = ({ className }: P) => (
  <Marco className={className}>
    <rect width="10" height="20" fill="#3E8E5E" />
    <rect x="10" width="10" height="20" fill="#F4F1EA" />
    <rect x="20" width="10" height="20" fill="#C8453C" />
  </Marco>
);

export const BanderaMexico = ({ className }: P) => (
  <Marco className={className}>
    <rect width="10" height="20" fill="#2F6F4E" />
    <rect x="10" width="10" height="20" fill="#F4F1EA" />
    <rect x="20" width="10" height="20" fill="#B8423A" />
    <circle cx="15" cy="10" r="2.6" fill="#9A7650" />
  </Marco>
);

export const BanderaEstadosUnidos = ({ className }: P) => {
  const franja = 20 / 13;
  return (
    <Marco className={className}>
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} y={i * franja} width="30" height={franja + 0.02} fill={i % 2 ? "#F4F1EA" : "#B8423A"} />
      ))}
      <rect width="13" height={franja * 7} fill="#2F3F6E" />
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={1.4 + (i % 5) * 2.55 + (Math.floor(i / 5) % 2) * 1.2} cy={1.3 + Math.floor(i / 5) * 2.5} r="0.45" fill="#F4F1EA" />
      ))}
    </Marco>
  );
};

export const banderas: Record<string, (p: P) => React.ReactElement> = {
  italia: BanderaItalia,
  mexico: BanderaMexico,
  "estados-unidos": BanderaEstadosUnidos,
};
