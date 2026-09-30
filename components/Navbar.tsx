"use client";

import { useRef, useState } from "react";
import { nav, profile } from "@/lib/data";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const focusRing =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink";

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(nav[0].id);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      // Sección activa: la última que cruza el centro del viewport. La última sección es corta y
      // nunca llega al centro, así que al final de la página se fuerza como activa.
      const sections = nav
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => ScrollTrigger.create({ trigger: el, start: "top center" }));

      // Se compara contra `start` (recalculado en cada refresh) y no contra `isActive`: ScrollTrigger
      // ordena los triggers por posición y este se actualiza antes que los de las secciones.
      const sync = (self: ScrollTrigger) => {
        const scroll = self.scroll();
        setScrolled(scroll > 8);
        const current =
          self.progress > 0.99
            ? sections.at(-1)
            : sections.findLast((trigger) => scroll >= trigger.start);
        setActive((current?.trigger as HTMLElement | undefined)?.id ?? nav[0].id);
      };

      // onRefresh cubre recargas a mitad de página, donde aún no hay evento de scroll.
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: sync, onRefresh: sync });

      // Barra de progreso de lectura ligada al scroll.
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(headerRef.current, { yPercent: -100, duration: 1, ease: EASE_OUT, delay: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-ink transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled && "border-panel-border bg-ink/75 backdrop-blur-md",
      )}
    >
      <nav
        aria-label="Principal"
        className="flex items-center justify-between px-6 py-5 lg:px-12"
      >
        <a
          href="#inicio"
          translate="no"
          className={cn("font-display text-xl font-bold text-foreground transition-colors hover:text-accent", focusRing)}
        >
          {profile.brand}
        </a>
        <ul className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative py-1 font-mono text-xs text-muted transition-colors hover:text-foreground",
                    isActive && "text-foreground",
                    focusRing,
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100",
                      isActive && "scale-x-100",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent"
      />
    </header>
  );
}
