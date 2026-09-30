"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, FINE_POINTER } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Pequeño robot explorador (diseño original): flota con un propulsor, cuida un brote de planta
 * y sigue el cursor con la mirada.
 */
export default function Robot({ label, className }: { label: string; className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = rootRef.current;
      if (!svg) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Flotar + llama del propulsor. Se pausa fuera de pantalla.
        const float = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
        float.to("[data-robot='body']", { y: -10, rotate: -2, duration: 2.4, svgOrigin: "100 130" });
        const flame = gsap.to("[data-robot='flame']", {
          scaleY: 0.6,
          duration: 0.12,
          repeat: -1,
          yoyo: true,
          ease: "none",
          svgOrigin: "100 196",
        });
        // Parpadeo: cerrar y abrir seguidos; la pausa va entre parpadeos, no con los ojos cerrados.
        const blink = gsap
          .timeline({ repeat: -1, repeatDelay: 3.2, delay: 1.5 })
          .to("[data-robot='eyes']", { scaleY: 0.1, duration: 0.08, svgOrigin: "100 72" })
          .to("[data-robot='eyes']", { scaleY: 1, duration: 0.1, svgOrigin: "100 72" });
        const animations = [float, flame, blink];

        const observer = new IntersectionObserver(([entry]) => {
          animations.forEach((a) => (entry.isIntersecting ? a.resume() : a.pause()));
        });
        observer.observe(svg);
        return () => observer.disconnect();
      });

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const xTo = gsap.quickTo("[data-robot='pupils']", "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo("[data-robot='pupils']", "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const rect = svg.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height * 0.33);
          const angle = Math.atan2(dy, dx);
          const reach = Math.min(Math.hypot(dx, dy) / 60, 1) * 4;
          xTo(Math.cos(angle) * reach);
          yTo(Math.sin(angle) * reach);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 200 230"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={label}
    >
      <g data-robot="body">
        {/* Antena */}
        <line x1="100" y1="40" x2="100" y2="20" stroke="#f4f2ec" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="16" r="7" fill="#d78b65" />
        <circle cx="100" cy="16" r="13" fill="#d78b65" opacity="0.25" />

        {/* Cabeza */}
        <rect x="52" y="38" width="96" height="66" rx="30" fill="#f4f2ec" stroke="#101827" strokeWidth="4" />
        <rect x="66" y="53" width="68" height="36" rx="18" fill="#101827" />
        <g data-robot="eyes">
          <g data-robot="pupils">
            <circle cx="87" cy="71" r="7" fill="#c8d8d0" />
            <circle cx="113" cy="71" r="7" fill="#c8d8d0" />
            <circle cx="89" cy="68" r="2" fill="#f4f2ec" />
            <circle cx="115" cy="68" r="2" fill="#f4f2ec" />
          </g>
        </g>
        <circle cx="52" cy="71" r="6" fill="#d78b65" stroke="#101827" strokeWidth="3" />
        <circle cx="148" cy="71" r="6" fill="#d78b65" stroke="#101827" strokeWidth="3" />

        {/* Cuello y cuerpo */}
        <rect x="90" y="102" width="20" height="10" fill="#c8d8d0" stroke="#101827" strokeWidth="3" />
        <rect x="60" y="110" width="80" height="70" rx="24" fill="#f4f2ec" stroke="#101827" strokeWidth="4" />
        <circle cx="100" cy="132" r="7" fill="#d78b65" />
        <line x1="84" y1="150" x2="116" y2="150" stroke="#c8d8d0" strokeWidth="4" strokeLinecap="round" />
        <line x1="90" y1="160" x2="110" y2="160" stroke="#c8d8d0" strokeWidth="4" strokeLinecap="round" />

        {/* Brazos sosteniendo la maceta (contorno navy + relleno ivory) */}
        <path d="M63 136 Q 44 150, 80 170" fill="none" stroke="#101827" strokeWidth="12" strokeLinecap="round" />
        <path d="M63 136 Q 44 150, 80 170" fill="none" stroke="#f4f2ec" strokeWidth="6" strokeLinecap="round" />
        <path d="M137 136 Q 156 150, 120 170" fill="none" stroke="#101827" strokeWidth="12" strokeLinecap="round" />
        <path d="M137 136 Q 156 150, 120 170" fill="none" stroke="#f4f2ec" strokeWidth="6" strokeLinecap="round" />

        {/* Maceta y brote */}
        <path d="M78 164 L122 164 L116 190 L84 190 Z" fill="#d78b65" stroke="#101827" strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 164 C 100 152, 100 146, 100 138" stroke="#7fa88f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M100 148 C 88 146, 84 138, 86 132 C 96 134, 100 140, 100 148 Z" fill="#9cc2a8" stroke="#101827" strokeWidth="2" />
        <path d="M100 144 C 112 142, 116 134, 114 128 C 104 130, 100 136, 100 144 Z" fill="#9cc2a8" stroke="#101827" strokeWidth="2" />

        {/* Propulsor */}
        <rect x="88" y="180" width="24" height="12" rx="4" fill="#c8d8d0" stroke="#101827" strokeWidth="3" />
        <path data-robot="flame" d="M92 194 Q100 222 108 194 Z" fill="#d78b65" />
        <path d="M96 194 Q100 208 104 194 Z" fill="#f4f2ec" opacity="0.8" />
      </g>
    </svg>
  );
}
