"use client";

import { useEffect, useState } from "react";

/** true si la persona pidió menos movimiento en su sistema (prefers-reduced-motion). */
export function useMenosMovimiento() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setReduce(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, []);
  return reduce;
}
