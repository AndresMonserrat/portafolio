import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import Robot from "@/components/Robot";
import SplitHeading from "@/components/ui/SplitHeading";
import MagneticLink from "@/components/ui/MagneticLink";
import Reveal from "@/components/ui/Reveal";

// Estrellas deterministas (mismo resultado en servidor y cliente: sin desajuste de hidratación).
function seededStars(count: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, () => ({
    cx: +(rand() * 100).toFixed(2),
    cy: +(rand() * 100).toFixed(2),
    r: +(rand() * 1.1 + 0.5).toFixed(2),
    o: +(rand() * 0.6 + 0.3).toFixed(2),
  }));
}

const stars = seededStars(90);

const linkClass =
  "group items-center gap-1 text-ivory underline decoration-ivory/30 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent focus-visible:ring-offset-navy";

export default function ContactFooter({ lang, year }: { lang: Locale; year: number }) {
  const { profile, footer, ui } = getContent(lang);
  const socials = [
    { label: footer.socials.linkedin, href: profile.links.linkedin },
    { label: footer.socials.github, href: profile.links.github },
    { label: footer.socials.cv, href: profile.links.cv },
  ];

  return (
    <footer id="contact" className="relative isolate mt-32 overflow-hidden bg-navy text-ivory">
      {/* Cielo */}
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="#f4f2ec" opacity={s.o} />
        ))}
      </svg>
      {/* Planeta asomando */}
      <div
        aria-hidden="true"
        className="absolute -right-[420px] -bottom-[640px] -z-10 h-[820px] w-[820px] rounded-full bg-[radial-gradient(circle_at_30%_20%,#34466a_0%,#1d2a45_45%,#141d33_75%)] shadow-[0_0_0_1px_rgb(200_216_208/0.18),0_0_120px_10px_rgb(215_139_101/0.25)] md:-right-[260px] md:-bottom-[700px] md:h-[1000px] md:w-[1000px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-3 py-1 font-mono text-xs text-sage">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
            {profile.availability}
          </p>

          <SplitHeading
            text={footer.heading}
            accent="."
            className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl"
          />

          <Reveal stagger>
            <p className="mt-6 max-w-md text-pretty text-ivory/75">
              {footer.body}
            </p>

            <MagneticLink
              href={`mailto:${profile.links.email}`}
              translate="no"
              className="mt-8 break-all font-mono text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:ring-offset-navy sm:text-lg"
            >
              {profile.links.email}
            </MagneticLink>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <MagneticLink href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> {ui.opensNewTab}</span>
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Robot label={footer.robotLabel} className="mx-auto w-40 sm:w-52 md:w-60" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-ivory/10 px-5 py-8 font-mono text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          <span translate="no">{profile.name.toUpperCase()}</span> · {profile.pillars.join(" · ")}
        </p>
        <p>
          {profile.motto} © {year}
        </p>
      </div>
    </footer>
  );
}
