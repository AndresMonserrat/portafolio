"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitHeadingProps = Omit<React.ComponentPropsWithoutRef<"h2">, "children"> & {
  as?: "h1" | "h2";
  text: string;
  /** Sufijo decorativo (".", ">_"); se oculta a lectores de pantalla. */
  accent?: string;
  accentClassName?: string;
  /** "load": anima al montar (above the fold). "scroll": al entrar en el viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  className?: string;
};

export default function SplitHeading({
  as: Tag = "h2",
  text,
  accent,
  accentClassName,
  trigger = "scroll",
  delay = 0,
  className,
  ...props
}: SplitHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (!splitRef.current) return;
        // Con trigger "load" el encabezado arranca oculto por CSS; se revela antes de crear los tweens.
        if (trigger === "load") gsap.set(headingRef.current, { autoAlpha: 1 });

        // Cada palabra actúa como máscara (overflow: hidden) y los caracteres suben desde abajo.
        const split = new SplitType(splitRef.current, {
          types: "words,chars",
          tagName: "span",
        });

        const tl = gsap.timeline({
          delay,
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: headingRef.current, start: "top 85%", once: true }
              : undefined,
        });

        tl.from(split.chars, {
          yPercent: 115,
          rotate: 6,
          duration: 1,
          ease: EASE_OUT,
          stagger: 0.025,
        });

        if (accent) {
          tl.from(
            ".split-accent",
            { autoAlpha: 0, scale: 0.4, duration: 0.6, ease: "back.out(3)" },
            "-=0.6",
          );
        }

        // SplitType modifica el DOM que React renderizó: se restaura al limpiar.
        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: headingRef },
  );

  return (
    <Tag ref={headingRef} className={cn("text-balance", trigger === "load" && "reveal-on-load", className)} {...props}>
      <span className="sr-only">{text}</span>
      <span ref={splitRef} aria-hidden="true" className="split-text">
        {text}
      </span>
      {accent && (
        <span aria-hidden="true" className={cn("split-accent inline-block text-accent", accentClassName)}>
          {accent}
        </span>
      )}
    </Tag>
  );
}
