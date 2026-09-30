import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { alternates, hasLocale } from "@/lib/i18n";
import PageHeader from "@/components/ui/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/Reveal";

export async function generateMetadata(props: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  return { ...getContent(lang).meta.projects, alternates: alternates(lang, "/projects") };
}

export default async function ProjectsPage(props: PageProps<"/[lang]/projects">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <>
      <PageHeader index="02" eyebrow={c.projectsPage.eyebrow} title={c.projectsPage.title} intro={c.projectsPage.intro} />

      <Reveal stagger className="mt-20 grid gap-16 md:grid-cols-2">
        {c.projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} lang={lang} labels={c.projectCard} />
        ))}
      </Reveal>
    </>
  );
}
