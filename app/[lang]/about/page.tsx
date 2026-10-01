import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { alternates, hasLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import PageHeader, { SectionHeading } from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Timeline from "@/components/Timeline";

export async function generateMetadata(props: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  return { ...getContent(lang).meta.about, alternates: alternates(lang, "/about") };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { about, landscapes, pets, skills, sportsPhotos, timeline, timelineKinds } = getContent(lang);

  return (
    <div className="space-y-32">
      <section className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <PageHeader index="03" eyebrow={about.eyebrow} title={about.title} />
          <Reveal stagger className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-pretty text-muted">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>

        <Reveal className="self-end">
          <dl className="divide-y divide-line rounded-3xl border border-line bg-surface">
            <div className="px-6 pt-5 pb-3">
              <p className="font-mono text-xs uppercase tracking-widest text-accent-ink">{about.factsTitle}</p>
            </div>
            {about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                <dt className="font-mono text-xs text-muted">{f.label}</dt>
                <dd className="text-right font-medium text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <Reveal>
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="font-display text-3xl font-medium leading-snug text-balance text-fg sm:text-5xl">
            <span aria-hidden="true" className="text-accent">“</span>
            {about.why}
            <span aria-hidden="true" className="text-accent">”</span>
          </p>
          <footer className="mt-6 font-mono text-sm text-muted">{about.whyCaption}</footer>
        </blockquote>
      </Reveal>

      <section>
        <SectionHeading {...about.categoriesHeading} />
        <Reveal stagger className="divide-y divide-line border-y border-line">
          {about.categories.map((c, i) => (
            <div key={c.title} className="group grid gap-3 py-8 md:grid-cols-[80px_280px_1fr] md:gap-8">
              <span className="font-mono text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-2xl font-bold text-fg transition-transform duration-500 ease-spring group-hover:translate-x-2">
                {c.title}
              </h3>
              <p className="text-pretty text-muted">{c.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section>
        <SectionHeading {...about.court} />
        <Reveal stagger className="grid gap-6 sm:grid-cols-2">
          {sportsPhotos.map((photo, i) => (
            <figure key={photo.caption} className={cn(i === 1 && "sm:mt-16")}>
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="aspect-[2/3] w-full rounded-3xl object-cover"
              />
              <figcaption className="mt-3 font-mono text-xs text-muted">{photo.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <section className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading {...about.journey} />
          <Reveal stagger className="space-y-8">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{group.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      translate={group.translatable ? undefined : "no"}
                      className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-sm text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
        <Timeline items={timeline} kinds={timelineKinds} />
      </section>

      <section>
        <SectionHeading {...about.crew} />
        <Reveal stagger className="flex flex-wrap items-start justify-center gap-10 sm:justify-start">
          {pets.map((pet, i) => (
            <figure
              key={pet.caption}
              className={cn(
                "w-64 rounded-2xl bg-surface p-3 pb-2 shadow-[0_20px_40px_-20px_rgb(16_24_39/0.4)] transition-transform duration-700 ease-spring hover:scale-105 hover:rotate-0",
                i === 0 ? "-rotate-3" : "rotate-3 sm:mt-10",
              )}
            >
              <Image src={pet.src} alt={pet.alt} placeholder="blur" sizes="256px" className="aspect-square w-full rounded-xl object-cover" />
              <figcaption className="py-2 text-center font-display text-lg font-medium text-fg">{pet.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <section>
        <SectionHeading {...about.gallery} />
        <Reveal stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {landscapes.map((photo, i) => (
            <figure key={photo.caption} className={cn(i % 2 === 1 && "md:mt-12")}>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-spring hover:scale-105"
                />
              </div>
              <figcaption className="mt-3">
                <span className="block font-mono text-xs text-muted">{photo.caption}</span>
                {photo.skill && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-display text-sm font-medium text-accent-ink">
                    <span aria-hidden="true">✦</span>
                    <span className="sr-only">{about.gallery.skillLabel}: </span>
                    {photo.skill}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <Reveal className="rounded-3xl bg-surface p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-ink">{about.music.eyebrow}</p>
        <p className="mt-3 max-w-xl text-lg text-pretty text-fg">{about.music.intro}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {about.music.picks.map((song) => (
            <li
              key={song}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 font-display font-medium text-fg"
            >
              <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-125">
                ♪
              </span>
              {song}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
