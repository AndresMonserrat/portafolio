"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const SPARKLE_PATH =
  "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

const COLORS = ["#d78b65", "#e8b04a", "#c8d8d0"];

/** Destellos que aparecen alrededor del texto, al estilo de joshwcomeau.com. Decorativos. */
export default function Sparkles({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const layer = layerRef.current;
        if (!layer) return;

        const spawn = () => {
          const size = gsap.utils.random(10, 20);
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("viewBox", "0 0 68 68");
          svg.setAttribute("width", String(size));
          svg.setAttribute("height", String(size));
          svg.style.cssText = `position:absolute;left:${gsap.utils.random(0, 100)}%;top:${gsap.utils.random(-10, 90)}%;pointer-events:none;`;
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", SPARKLE_PATH);
          path.setAttribute("fill", gsap.utils.random(COLORS));
          svg.appendChild(path);
          layer.appendChild(svg);

          gsap.fromTo(
            svg,
            { scale: 0, rotate: 0 },
            {
              keyframes: [
                { scale: 1, rotate: 90, duration: 0.4, ease: "power2.out" },
                { scale: 0, rotate: 180, duration: 0.4, ease: "power2.in" },
              ],
              onComplete: () => svg.remove(),
            },
          );
        };

        const loop = gsap.timeline({ repeat: -1 });
        loop.call(spawn).to({}, { duration: 0.45 });

        const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? loop.resume() : loop.pause()));
        if (rootRef.current) observer.observe(rootRef.current);
        return () => {
          observer.disconnect();
          layer.replaceChildren();
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <span ref={rootRef} className="relative inline-block">
      <span ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />
      <span className="relative">{children}</span>
    </span>
  );
}
