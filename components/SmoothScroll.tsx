"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Con reduced-motion se mantiene el scroll nativo.
    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({
        duration: 1.1,
        anchors: true, // respeta scroll-padding-top de <html>
      });

      // Lenis avanza con el ticker de GSAP y notifica a ScrollTrigger en cada frame.
      const update = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  });

  return <>{children}</>;
}
