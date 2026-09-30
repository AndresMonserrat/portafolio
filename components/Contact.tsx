"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import MagneticLink from "@/components/ui/MagneticLink";

const linkClass =
  "group items-center gap-1 text-foreground underline decoration-panel-border underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent";

function ExternalIcon() {
  return (
    <ArrowUpRight
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    />
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasCv = profile.links.cv.length > 0;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
            defaults: { ease: EASE_OUT },
          })
          .from("[data-contact='intro']", { autoAlpha: 0, y: 24, duration: 0.9 }, 0.3)
          .from("[data-contact='link']", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, "<0.15");
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="contacto" className="pb-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <SplitHeading
          text="Hablemos"
          accent="."
          className="font-display text-3xl font-bold text-foreground lg:text-5xl"
        />

        <p data-contact="intro" className="mt-4 max-w-md text-center text-pretty text-muted">
          Abierto a oportunidades de práctica profesional o pasantías en
          desarrollo de software y sistemas.
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-mono text-sm">
          <li data-contact="link">
            <MagneticLink
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
              <ExternalIcon />
            </MagneticLink>
          </li>
          <li data-contact="link">
            <MagneticLink
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
              <ExternalIcon />
            </MagneticLink>
          </li>
          <li data-contact="link" className="min-w-0 max-w-full">
            <MagneticLink
              href={`mailto:${profile.links.email}`}
              translate="no"
              className="break-all text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:decoration-accent hover:text-foreground"
            >
              {profile.links.email}
            </MagneticLink>
          </li>
          {hasCv && (
            <li data-contact="link">
              <MagneticLink
                href={profile.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Currículum
                <ExternalIcon />
              </MagneticLink>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
