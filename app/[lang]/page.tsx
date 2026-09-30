import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { hasLocale, href } from "@/lib/i18n";
import Hero from "@/components/home/Hero";
import ProjectCard from "@/components/ProjectCard";
import Stats from "@/components/Stats";
import Reveal from "@/components/ui/Reveal";
import BoopLink from "@/components/ui/BoopLink";
import { SectionHeading } from "@/components/ui/PageHeader";

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const [serve] = c.sportsPhotos;

  return (
    <div className="space-y-32 sm:space-y-40">
      <Hero lang={lang} profile={c.profile} home={c.home} />

      <section aria-label={c.home.work.eyebrow}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={c.home.work.eyebrow} title={c.home.work.title} />
          <BoopLink href={href(lang, "/projects")} variant="secondary" className="mb-10">
            {c.home.work.all}
          </BoopLink>
        </div>
        <Reveal stagger className="grid gap-12 md:grid-cols-2">
          {c.projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} lang={lang} labels={c.projectCard} />
          ))}
        </Reveal>
      </section>

      <section aria-label={c.home.numbers.eyebrow}>
        <SectionHeading eyebrow={c.home.numbers.eyebrow} title={c.home.numbers.title} />
        <Stats stats={c.stats} />
      </section>

      <section className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <Image
            src={serve.src}
            alt={serve.alt}
            placeholder="blur"
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[4/5] w-full rounded-3xl object-cover"
          />
          {/* Mascotas como polaroids */}
          <div className="absolute -right-2 -bottom-8 flex sm:-right-6">
            {c.pets.map((pet, i) => (
              <figure
                key={pet.caption}
                className={`w-28 rounded-xl bg-surface p-2 pb-1 shadow-xl transition-transform duration-500 ease-spring hover:z-10 hover:-translate-y-2 hover:rotate-0 sm:w-36 ${
                  i === 0 ? "-rotate-6" : "-ml-6 rotate-6"
                }`}
              >
                <Image src={pet.src} alt={pet.alt} placeholder="blur" sizes="144px" className="aspect-square rounded-lg object-cover" />
                <figcaption className="py-1 text-center font-mono text-xs text-fg">{pet.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal stagger>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-ink">{c.home.beyond.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-fg sm:text-5xl">
            {c.home.beyond.title}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted">{c.home.beyond.body}</p>
          <div className="mt-8">
            <BoopLink href={href(lang, "/about")}>{c.home.getToKnow}</BoopLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
