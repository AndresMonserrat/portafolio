import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-24 lg:scroll-mt-10">
      <h2 className="font-mono text-sm text-accent">
        <span className="text-accent-dim mr-2">02</span>
        proyectos
      </h2>
      <div className="mt-6 space-y-10">
        {projects.map((project) => (
          <article key={project.slug} className="border-l-2 border-panel-border pl-6 transition-colors hover:border-accent">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="font-mono text-xs text-muted">{project.path}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">{project.period}</p>
              <p className="mt-3 max-w-prose leading-relaxed text-foreground">
                {project.description}
              </p>
            </a>
            <ul className="mt-4 space-y-2">
              {project.details.map((detail) => (
                <li key={detail} className="max-w-prose leading-relaxed text-muted">
                  · {detail}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-panel-border bg-panel px-2 py-0.5 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}