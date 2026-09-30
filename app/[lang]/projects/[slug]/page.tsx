import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { projectsShared } from "@/lib/content/shared";
import { alternates, hasLocale, href } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";
import BoopLink, { focusRing } from "@/components/ui/BoopLink";

export function generateStaticParams() {
  return Object.values(projectsShared).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) return {};
  const project = getContent(lang).projects.find((p) => p.slug === slug);
  return project
    ? { title: project.name, description: project.summary, alternates: alternates(lang, `/projects/${slug}`) }
    : {};
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line pt-8 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent-ink">{title}</h2>
      <div className="text-lg leading-relaxed text-pretty text-fg">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage(props: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { projects, projectPage: t, projectCard, ui } = getContent(lang);
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: t.meta.role, value: project.role },
    { label: t.meta.org, value: project.org },
    { label: t.meta.period, value: project.period },
    { label: t.meta.duration, value: project.duration },
  ];

  return (
    <article>
      <Link
        href={href(lang, "/projects")}
        className={cn(
          "group inline-flex items-center gap-2 rounded-sm font-mono text-sm text-muted transition-colors hover:text-fg",
          focusRing,
        )}
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-spring group-hover:-translate-x-1" aria-hidden="true" />
        {t.back}
      </Link>

      <header className="mt-8">
        <p className="font-mono text-sm text-accent-ink">
          {t.caseStudy} · {String(index + 1).padStart(2, "0")}
        </p>
        <SplitHeading
          as="h1"
          text={project.name}
          accent="."
          trigger="load"
          translate="no"
          className="mt-3 font-display text-6xl font-bold tracking-tight text-fg sm:text-8xl"
        />
        <p className="mt-4 max-w-2xl text-xl text-pretty text-muted">{project.summary}</p>

        <Reveal stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="bg-bg p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">{m.label}</p>
              <p className="mt-2 font-medium text-fg">{m.value}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 font-mono text-sm text-bg shadow-[0_4px_0_0_var(--accent)] transition-[translate,box-shadow] duration-500 ease-spring hover:-translate-y-0.5",
              focusRing,
            )}
          >
            {t.visit} {project.name}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            <span className="sr-only"> {ui.opensNewTab}</span>
          </a>
        </div>
      </header>

      <Reveal className="mt-16">
        <figure>
          <Image
            src={project.image}
            alt={project.imageAlt}
            placeholder="blur"
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="w-full rounded-3xl border border-line object-cover"
          />
          <figcaption className="mt-3 font-mono text-xs text-muted">{t.teamCaption(project.name)}</figcaption>
        </figure>
      </Reveal>

      <div className="mt-20 space-y-14">
        <Section title={t.sections.problem}>
          <p>{project.problem}</p>
        </Section>

        <Section title={t.sections.whatIDid}>
          <ul className="space-y-4">
            {project.contributions.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.sections.scope}>
          <p>{project.scope}</p>
        </Section>

        {project.architecture && (
          <Section title={t.sections.architecture}>
            <p>{project.architecture}</p>
          </Section>
        )}

        <Section title={t.sections.stack}>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} translate="no" className="rounded-full bg-sage/60 px-3 py-1 font-mono text-sm text-sage-ink dark:bg-sage/10">
                {t}
              </li>
            ))}
          </ul>
        </Section>

      </div>

      <Reveal className="mt-24 flex flex-col items-start gap-4 rounded-3xl bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{t.next}</p>
          <p translate="no" className="mt-1 font-display text-3xl font-bold text-fg">
            {next.name}
          </p>
        </div>
        <BoopLink href={href(lang, `/projects/${next.slug}`)}>{projectCard.readCaseStudy}</BoopLink>
      </Reveal>
    </article>
  );
}
