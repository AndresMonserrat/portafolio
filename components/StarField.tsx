"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number };
type Shooting = { x: number; y: number; vx: number; vy: number; life: number };

const isDark = () => document.documentElement.dataset.theme === "dark";

/** Cielo nocturno del modo oscuro. Solo dibuja en modo oscuro; con reduced-motion queda estático. */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: Star[] = [];
    let shooting: Shooting | null = null;
    let nextShootAt = 4;
    let width = 0;
    let height = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 3200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.2,
        depth: Math.random() * 0.6 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY;
      const animate = !reduceMotion.matches;

      for (const s of stars) {
        // Parallax: las estrellas "cercanas" se desplazan más con el scroll.
        const y = (((s.y - scroll * s.depth * 0.25) % height) + height) % height;
        const twinkle = animate ? 0.55 + 0.45 * Math.sin(time * s.speed + s.phase) : 0.8;
        ctx.globalAlpha = twinkle * (0.4 + s.depth);
        ctx.fillStyle = s.depth > 0.55 ? "#f4f2ec" : "#c8d8d0";
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!animate) return;

      if (!shooting && time > nextShootAt) {
        shooting = { x: Math.random() * width * 0.8, y: Math.random() * height * 0.4, vx: 9, vy: 3.5, life: 1 };
        nextShootAt = time + 6 + Math.random() * 8;
      }
      if (shooting) {
        const { x, y, vx, vy, life } = shooting;
        const gradient = ctx.createLinearGradient(x, y, x - vx * 12, y - vy * 12);
        gradient.addColorStop(0, `rgba(231, 169, 135, ${life})`);
        gradient.addColorStop(1, "rgba(231, 169, 135, 0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - vx * 12, y - vy * 12);
        ctx.stroke();
        shooting.x += vx;
        shooting.y += vy;
        shooting.life -= 0.012;
        if (shooting.life <= 0) shooting = null;
      }
    };

    const tick = (time: number) => draw(time);

    // Enciende o apaga el bucle según el tema y la preferencia de movimiento.
    const sync = () => {
      const shouldRun = isDark() && !reduceMotion.matches;
      if (shouldRun && !running) gsap.ticker.add(tick);
      if (!shouldRun && running) gsap.ticker.remove(tick);
      running = shouldRun;
      if (isDark() && !shouldRun) draw(gsap.ticker.time); // estático
    };

    resize();
    sync();

    const onResize = () => {
      resize();
      if (isDark()) draw(gsap.ticker.time);
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    reduceMotion.addEventListener("change", sync);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      reduceMotion.removeEventListener("change", sync);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-700 dark:opacity-100"
    />
  );
}
