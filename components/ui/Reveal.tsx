"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";

type RevealProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Anima cada hijo directo por separado, escalonado. Si es false, anima el bloque completo. */
  stagger?: boolean;
  y?: number;
};

/** Aparición suave al entrar en el viewport. Permite animar desde componentes de servidor. */
export default function Reveal({ stagger = false, y = 40, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current;
        if (!el) return;
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 1,
          ease: EASE_OUT,
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
