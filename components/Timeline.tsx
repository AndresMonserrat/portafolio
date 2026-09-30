"use client";

import { useRef } from "react";
import type { Content, TimelineKind } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DOT: Record<TimelineKind, string> = {
  education: "bg-fg",
  project: "bg-accent",
  certification: "bg-sage-ink",
  sport: "bg-accent",
  volunteering: "bg-sage-ink",
  training: "bg-muted",
};

type TimelineProps = { items: Content["timeline"]; kinds: Content["timelineKinds"] };

export default function Timeline({ items, kinds }: TimelineProps) {
  const rootRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-tl='line']", {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%", end: "bottom 70%", scrub: 0.5 },
        });
        gsap.utils.toArray<HTMLElement>("[data-tl='item']").forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: -24,
            duration: 0.9,
            ease: EASE_OUT,
            scrollTrigger: { trigger: item, start: "top 80%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <ol ref={rootRef} className="relative space-y-10 pl-8">
      <span data-tl="line" aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-0.5 rounded-full bg-line" />
      {items.map((item) => (
        <li key={item.title} data-tl="item" className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 -left-8 h-3 w-3 rounded-full ring-4 ring-bg",
              DOT[item.kind],
              item.upcoming && "bg-bg ring-2 ring-muted",
            )}
          />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
            <span className="text-accent-ink">{item.date}</span>
            <span className="rounded-full border border-line px-2 py-0.5">{kinds[item.kind]}</span>
          </p>
          <h3 className="mt-2 font-display text-xl font-bold text-fg">{item.title}</h3>
          {item.detail && <p className="mt-1 text-pretty text-muted">{item.detail}</p>}
        </li>
      ))}
    </ol>
  );
}
