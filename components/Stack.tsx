"use client";

import { useRef } from "react";
import { stack } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-stack='group']").forEach((group) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
            defaults: { ease: EASE_OUT },
          });
          tl.from(group.querySelector("[data-stack='rule']"), {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.9,
          })
            .from(group.querySelector("h3"), { autoAlpha: 0, x: -12, duration: 0.6 }, "<0.1")
            .from(group.querySelectorAll("li"), { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.05 }, "<0.1");
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="stack">
      <SplitHeading
        text="Stack"
        accent=">_"
        accentClassName="ml-1 font-mono text-[1.25rem]"
        className="font-display text-3xl font-bold text-foreground"
      />

      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.group} data-stack="group" className="flex min-w-0 flex-col">
            <div data-stack="rule" aria-hidden="true" className="mb-4 h-px w-full bg-panel-border" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              {group.group}
            </h3>
            <ul
              className="mt-4 space-y-1.5"
              translate={group.group === "IDIOMAS" ? undefined : "no"}
            >
              {group.strong.map((item) => (
                <li key={item} className="font-semibold text-foreground">
                  {item}
                </li>
              ))}
              {group.items.map((item) => (
                <li key={item} className="text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
