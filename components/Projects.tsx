"use client";

import { useRef } from "react";
import { ArrowUpRight, FolderGit, Lock } from "lucide-react";
import { projects } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import SplitHeading from "@/components/ui/SplitHeading";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
            defaults: { ease: EASE_OUT },
          });
          tl.fromTo(
            card,
            { clipPath: "inset(12% 6% 12% 6% round 0.75rem)", autoAlpha: 0, y: 60 },
            {
              clipPath: "inset(0% 0% 0% 0% round 0.75rem)",
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              clearProps: "clipPath,transform",
            },
          )
            .from(card.querySelectorAll("[data-project-item]"), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08 }, "<0.3");
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Spotlight: posición del cursor como variables CSS; solo toca estilos, no el layout.
  const onPointerMove = contextSafe((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    gsap.set(card, {
      "--spot-x": `${e.clientX - rect.left}px`,
      "--spot-y": `${e.clientY - rect.top}px`,
    });
  });

  return (
    <section ref={sectionRef} id="proyectos">
      <SplitHeading text="Proyectos" className="font-display text-3xl font-bold text-foreground" />

      <div className="mt-10 space-y-10">
        {projects.map((project) => (
          <article
            key={project.slug}
            data-project
            onPointerMove={onPointerMove}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-panel-border bg-panel p-6 transition-colors duration-500 hover:border-accent/40 lg:p-10",
              "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
              "before:bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(61_220_151/0.09),transparent_65%)]",
            )}
          >
            <div className="relative">
              <div data-project-item className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3">
                  <h3 translate="no" className="font-display text-2xl font-bold text-foreground">
                    {project.name}
                  </h3>
                  <p className="text-base text-muted">{project.tagline}</p>
                </div>
                <p className="font-mono text-xs text-accent">{project.period}</p>
              </div>

              <p data-project-item className="mt-4 max-w-prose text-pretty text-muted">
                {project.description}
              </p>

              <blockquote
                data-project-item
                className="mt-5 max-w-prose border-l-2 border-accent pl-4 text-sm leading-relaxed text-pretty text-foreground"
              >
                {project.highlight}
              </blockquote>

              {project.liveUrl && (
                <div data-project-item className="mt-6">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group/live inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-xs font-bold text-ink transition-[background-color,box-shadow] duration-300 hover:bg-foreground hover:shadow-[0_0_24px_rgb(61_220_151/0.35)]",
                      focusRing,
                    )}
                  >
                    {project.liveLabel}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              )}

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {project.sections.map((section) => (
                  <div
                    key={section.key}
                    data-project-item
                    className="min-w-0 rounded-lg border border-panel-border p-4"
                  >
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                      {section.label}
                    </h4>

                    <a
                      href={section.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "mt-4 flex w-full items-center gap-2 rounded-lg border border-panel-border bg-panel px-3 py-2 font-mono text-xs text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent",
                        focusRing,
                      )}
                    >
                      {section.private ? (
                        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <FolderGit className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      )}
                      <span translate="no" className="min-w-0 break-all">
                        {section.repo}
                      </span>
                      {section.private && <span className="shrink-0 text-muted">(privado)</span>}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
