"use client";

import { useRef } from "react";
import { MapPin } from "lucide-react";
import SplitType from "split-type";
import { profile } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // El contenedor arranca oculto por CSS (.reveal-on-load). Se revela de forma síncrona para que
        // los tweens siguientes no lean el `visibility: hidden` heredado como opacidad 0.
        gsap.set(sectionRef.current, { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

        const badge = new SplitType(badgeTextRef.current!, { types: "chars", tagName: "span" });
        tl.from("[data-hero='badge']", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.2)
          .from(badge.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.04 }, 0.35)
          .from("[data-hero='fade']", { autoAlpha: 0, y: 32, duration: 1.1, stagger: 0.12 }, 0.8)
          .from("[data-hero='rule']", { scaleY: 0, duration: 1, transformOrigin: "top" }, 1);

        // Parallax suave al salir del hero.
        gsap.fromTo("[data-hero='content']", { yPercent: 0, opacity: 1 }, {
          yPercent: -12,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero='glow']", {
          yPercent: 40,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => badge.revert();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="reveal-on-load relative"
    >
      <div
        data-hero="glow"
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -left-48 -z-10 h-[36rem] w-[36rem] bg-[radial-gradient(circle,rgb(61_220_151/0.12),transparent_65%)]"
      />

      <div data-hero="content" className="flex flex-col items-start">
        <span
          data-hero="badge"
          className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-3 py-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span ref={badgeTextRef} translate="no" className="font-mono text-xs text-foreground">
            {profile.available}
          </span>
        </span>

        <SplitHeading
          as="h1"
          text={profile.name}
          trigger="load"
          delay={0.3}
          translate="no"
          className="mt-6 font-display text-5xl font-bold tracking-tight text-foreground lg:text-7xl"
        />

        <p data-hero="fade" className="mt-3 font-mono text-sm text-muted">
          {profile.metadata} · {profile.university} ·{" "}
          <span className="text-accent">{profile.semester}</span>
        </p>

        <blockquote
          data-hero="fade"
          className="relative mt-10 max-w-xl pl-5 text-lg leading-relaxed text-pretty text-foreground"
        >
          <span data-hero="rule" aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-accent" />
          {profile.quote}
        </blockquote>

        <p
          data-hero="fade"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {profile.location}
        </p>
      </div>
    </section>
  );
}
