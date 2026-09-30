"use client";

import { useRef } from "react";
import type { Content } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";

export default function Stats({ stats }: { stats: Content["stats"] }) {
  const rootRef = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-stat]");
        gsap.from(items, {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          stagger: 0.08,
          ease: EASE_OUT,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        });

        // Solo los valores puramente numéricos cuentan desde 0.
        items.forEach((item) => {
          const el = item.querySelector<HTMLElement>("[data-stat-value]");
          const target = Number(el?.dataset.statValue);
          if (!el || !Number.isFinite(target)) return;
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = String(counter.v);
            },
            scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <dl ref={rootRef} className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <div key={s.label} data-stat className="flex flex-col border-t-2 border-fg pt-4">
          <dt className="order-2 mt-2 font-mono text-xs font-medium uppercase tracking-widest text-fg">{s.label}</dt>
          <dd
            data-stat-value={s.value}
            className="order-1 font-display text-6xl font-bold tracking-tight text-fg tabular-nums sm:text-7xl"
          >
            {s.value}
          </dd>
          <dd className="order-3 mt-1 text-sm text-pretty text-muted">{s.note}</dd>
        </div>
      ))}
    </dl>
  );
}
