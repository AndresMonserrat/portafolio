"use client";

import { usePathname } from "next/navigation";
import en from "@/lib/content/en";
import es from "@/lib/content/es";
import { href } from "@/lib/i18n";
import Robot from "@/components/Robot";
import BoopLink from "@/components/ui/BoopLink";

// not-found no recibe params: el idioma se deduce de la URL.
export default function NotFound() {
  const lang = usePathname().startsWith("/es") ? "es" : "en";
  const { notFound: t, footer } = lang === "es" ? es : en;

  return (
    <section className="grid items-center gap-10 py-10 md:grid-cols-[1fr_auto]">
      <div>
        <p className="font-mono text-sm text-accent-ink">{t.eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance text-fg sm:text-7xl">{t.title}</h1>
        <p className="mt-6 max-w-md text-lg text-muted">{t.body}</p>
        <div className="mt-8">
          <BoopLink href={href(lang, "/")}>{t.cta}</BoopLink>
        </div>
      </div>
      <div className="mx-auto w-48 rounded-full bg-navy p-8 sm:w-64">
        <Robot label={footer.robotLabel} />
      </div>
    </section>
  );
}
