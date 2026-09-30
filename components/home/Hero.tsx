"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Content } from "@/lib/content";
import { rotatingSkills } from "@/lib/content/shared";
import { href, type Locale } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import Sparkles from "@/components/ui/Sparkles";
import SkillTicker from "@/components/SkillTicker";
import BoopLink from "@/components/ui/BoopLink";

const STICKER_STYLES = [
  "-left-4 top-10 -rotate-6 bg-accent text-navy",
  "-right-5 top-1/2 rotate-6 bg-sage text-navy",
  "left-6 -bottom-4 rotate-2 bg-fg text-bg",
];

type HeroProps = { lang: Locale; profile: Content["profile"]; home: Content["home"] };

export default function Hero({ lang, profile, home }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Se revela de forma síncrona para que los tweens no lean el `visibility: hidden` heredado.
        gsap.set(sectionRef.current, { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: EASE_OUT } })
          .from("[data-hero='pill']", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.2)
          .from("[data-hero='fade']", { autoAlpha: 0, y: 28, duration: 1, stagger: 0.1 }, 0.7)
          .from("[data-hero='photo']", { autoAlpha: 0, y: 60, rotate: 8, duration: 1.4 }, 0.3)
          .from("[data-hero='sticker']", { scale: 0, duration: 0.9, stagger: 0.12, ease: "back.out(2.5)" }, 1.1)
          .from("[data-hero='strip'] > *", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, 1.2);

        gsap.to("[data-hero='photo']", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="reveal-on-load">
      <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p
            data-hero="pill"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-fg"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-sage-ink opacity-40" />
              <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-sage-ink" />
            </span>
            {profile.availability}
          </p>

          <SplitHeading
            as="h1"
            text={profile.name}
            trigger="load"
            delay={0.25}
            translate="no"
            className="mt-6 font-display text-5xl font-bold tracking-tight text-fg sm:text-7xl lg:text-8xl"
          />

          <p data-hero="fade" className="mt-4 font-display text-2xl font-medium text-fg sm:text-3xl">
            {profile.roleLead} <Sparkles>{profile.roleSparkle}</Sparkles>
          </p>

          <p data-hero="fade" className="mt-5 font-mono text-sm text-muted sm:text-base">
            {home.buildingWith} <SkillTicker skills={rotatingSkills} />
          </p>

          <p data-hero="fade" className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fg">
            {profile.tagline}
          </p>
          <p data-hero="fade" className="mt-3 max-w-xl leading-relaxed text-pretty text-muted">
            {profile.intro}
          </p>

          <div data-hero="fade" className="mt-9 flex flex-wrap gap-4">
            <BoopLink href={href(lang, "/projects")}>{home.explore}</BoopLink>
            <BoopLink href={href(lang, "/about")} variant="secondary">
              {home.getToKnow}
            </BoopLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            data-hero="photo"
            className="relative rotate-2 rounded-[2rem] border border-line bg-surface p-3 shadow-[0_30px_60px_-30px_rgb(16_24_39/0.45)] transition-transform duration-700 ease-spring hover:rotate-0"
          >
            <Image
              src={profile.portrait}
              alt={profile.portraitAlt}
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 384px, 90vw"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
            />
            {home.stickers.map((text, i) => (
              <span
                key={text}
                data-hero="sticker"
                aria-hidden="true"
                className={`absolute rounded-full px-3 py-1.5 font-mono text-xs font-medium shadow-lg ${STICKER_STYLES[i]}`}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <dl
        data-hero="strip"
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
      >
        {home.infoStrip.map((item) => (
          <div key={item.label} className="bg-bg p-5">
            <dt className="font-mono text-xs uppercase tracking-widest text-muted">{item.label}</dt>
            <dd className="mt-2 font-display text-lg font-medium text-fg">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
