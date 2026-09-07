import { projects } from "@/lib/data";

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatPushedAt(pushedAt: string) {
  const [year, month] = pushedAt.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export default function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-24">
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
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl font-bold text-foreground transition-colors hover:text-accent"
              >
                {project.name}
              </a>
              <p className="font-mono text-xs text-accent">{project.period}</p>
            </div>

            <p className="mt-3 max-w-prose text-muted">{project.description}</p>

            <blockquote className="mt-5 max-w-prose border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground">
              {project.highlight}
            </blockquote>

            <p className="mt-4 font-mono text-xs text-muted">
              {project.tech.join(", ")}
            </p>

            <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                Actualizado {formatPushedAt(project.pushedAt)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}