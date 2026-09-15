"use client";

import { ExternalLink, FolderGit, Lock } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "@/lib/data";
import { buttonMotion, fadeUp, viewport } from "@/lib/animations";

export default function Projects() {
  return (
    <motion.section
      id="proyectos"
      className="scroll-mt-24"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <h2 className="font-display text-3xl font-bold text-foreground">
        Proyectos
      </h2>

      <div className="mt-10 space-y-10">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="rounded-xl border border-panel-border bg-panel p-6 lg:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {project.name }
                <span className="ml-3 font-sans text-base font-normal text-muted">
                  {project.tagline}
                </span>
              </h3>
              <p className="font-mono text-xs text-accent">{project.period}</p>
            </div>

            <p className="mt-4 max-w-prose text-muted">{project.description}</p>

            <blockquote className="mt-5 max-w-prose border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground">
              {project.highlight}
            </blockquote>

            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                {...buttonMotion}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-xs font-bold text-ink transition-opacity hover:opacity-90"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {project.liveLabel}
              </motion.a>
            )}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.sections.map((section) => (
                <div
                  key={section.key}
                  className="min-w-0 rounded-lg border border-panel-border p-4"
                >
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    {section.label}
                  </h4>

                  {/* <p className="mt-3 font-mono text-xs text-muted">
                    {section.tech.join(", ")}
                  </p> */}

                  <motion.a
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...buttonMotion}
                    className="mt-4 flex w-full max-w-full items-center gap-2 rounded-lg border border-panel-border bg-panel px-3 py-2 font-mono text-xs text-foreground transition-colors hover:text-accent"
                  >
                    {section.private ? (
                      <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <FolderGit className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    )}
                    <span className="break-all">{section.repo}</span>
                    {section.private && (
                      <span className="shrink-0 text-muted">(privado)</span>
                    )}
                  </motion.a>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
