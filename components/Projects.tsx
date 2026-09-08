"use client";

import { FolderGit } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "@/lib/data";
import { buttonMotion, fadeUp, viewport } from "@/lib/animations";

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatPushedAt(pushedAt: string) {
  const [year, month] = pushedAt.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

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

      <div className="mt-8 space-y-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="rounded-xl border border-panel-border bg-panel p-6 lg:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {project.name}
              </h3>
              <p className="font-mono text-xs text-accent">{project.period}</p>
            </div>

            <div className="mt-2 space-y-2">
              {project.sections.map((section, i) => (
                <div
                  key={section.key}
                  className={i > 0 ? "border-t border-panel-border pt-6" : ""}
                >
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    {section.label}
                  </h4>

                  <p className="mt-3 max-w-prose text-muted">
                    {section.description}
                  </p>

                  <blockquote className="mt-4 max-w-prose border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground">
                    {section.highlight}
                  </blockquote>

                  <p className="mt-4 font-mono text-xs text-muted">
                    {section.tech.join(", ")}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <motion.a
                      href={section.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...buttonMotion}
                      className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-3 py-1 font-mono text-xs text-foreground transition-colors hover:text-accent"
                    >
                      <FolderGit className="h-3.5 w-3.5" aria-hidden="true" />
                      {section.repo}
                    </motion.a>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}