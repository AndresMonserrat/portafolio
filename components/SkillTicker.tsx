"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Escribe y borra cada skill en bucle (GSAP TextPlugin). Lectores de pantalla reciben la lista completa. */
export default function SkillTicker({ skills }: { skills: string[] }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ repeat: -1, delay: 1.6 });
        skills.forEach((skill) => {
          tl.to(textRef.current, { text: { value: skill }, duration: skill.length * 0.06, ease: "none" })
            .to({}, { duration: 1.4 }) // pausa para leerla
            .to(textRef.current, { text: { value: "" }, duration: skill.length * 0.03, ease: "none" });
        });

        // Pausar fuera de pantalla.
        const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? tl.resume() : tl.pause()));
        if (rootRef.current) observer.observe(rootRef.current);
        return () => observer.disconnect();
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <span ref={rootRef} className="inline-flex items-baseline">
      <span className="sr-only">{skills.join(", ")}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        <span ref={textRef} translate="no" className="text-accent-ink">
          {skills[0]}
        </span>
        <span className="ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.12em] animate-pulse bg-accent" />
      </span>
    </span>
  );
}
