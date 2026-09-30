"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MagneticLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  /** Fracción de la distancia al cursor que el enlace se desplaza. */
  strength?: number;
};

export default function MagneticLink({
  strength = 0.35,
  className,
  children,
  ...props
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = linkRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Solo con puntero fino y sin reduced-motion; en táctil no aporta nada.
      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
          yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: linkRef, dependencies: [strength] },
  );

  return (
    <a
      ref={linkRef}
      className={cn(
        "inline-flex rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
