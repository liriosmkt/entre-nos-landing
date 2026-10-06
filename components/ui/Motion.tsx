import type { CSSProperties } from "react";

/**
 * Fade-in + slide-up al entrar en pantalla. No usa JavaScript propio: marca el elemento con
 * data-reveal y un único observador (RevealObserver) le agrega data-visible cuando aparece.
 * La animación está en globals.css y respeta prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
