import Image from "next/image";
import Link from "next/link";
import type { Content, Project } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { focusRing } from "@/components/ui/BoopLink";

type ProjectCardProps = { project: Project; index: number; lang: Locale; labels: Content["projectCard"] };

export default function ProjectCard({ project, index, lang, labels }: ProjectCardProps) {
  return (
    <article className="group relative">
      <Link
        href={href(lang, `/projects/${project.slug}`)}
        className={cn("block rounded-3xl", focusRing)}
        aria-label={`${project.name}: ${project.summary}. ${labels.readCaseStudy}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface">
          <Image
            src={project.image}
            alt={project.imageAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
          />


          {/* Información extra al pasar el mouse o enfocar */}
          <div className="absolute inset-x-3 bottom-3 translate-y-[calc(100%+1rem)] rounded-2xl bg-bg/90 p-4 backdrop-blur-md transition-transform duration-500 ease-spring group-hover:translate-y-0 group-focus-within:translate-y-0">
            <dl className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <dt className="text-muted">{labels.role}</dt>
                <dd className="mt-0.5 text-fg">{project.role}</dd>
              </div>
              <div>
                <dt className="text-muted">{labels.scope}</dt>
                <dd className="mt-0.5 text-fg">{project.scope}</dd>
              </div>
            </dl>
          </div>

          <span className="absolute top-4 left-4 rounded-full bg-bg/90 px-3 py-1 font-mono text-xs text-fg backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 translate="no" className="font-display text-3xl font-bold text-fg">
              {project.name}
            </h3>
            <p className="mt-1 text-pretty text-muted">{project.summary}</p>
          </div>
          <span
            aria-hidden="true"
            className="mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-fg transition-[rotate,background-color,color] duration-500 ease-spring group-hover:-rotate-45 group-hover:bg-fg group-hover:text-bg"
          >
            →
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={labels.technologies}>
          <li className="font-mono text-xs text-accent-ink">{project.period}</li>
          {project.tech.slice(0, 4).map((t) => (
            <li key={t} translate="no" className="rounded-full bg-sage/60 px-2.5 py-0.5 font-mono text-xs text-sage-ink dark:bg-sage/10">
              {t}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
