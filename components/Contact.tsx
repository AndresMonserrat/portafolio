import { profile } from "@/lib/data";

export default function Contact() {
  const hasCv = profile.links.cv.length > 0;

  return (
    <footer id="contacto" className="scroll-mt-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Hablemos<span className="text-accent">.</span>
        </h2>

        <p className="mt-4 max-w-md text-center text-muted">
          Abierto a oportunidades de práctica profesional o pasantías en
          desarrollo de software y sistemas.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-sm">
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={`mailto:${profile.links.email}`}
              className="text-accent underline"
            >
              {profile.links.email}
            </a>
          </li>
          {hasCv && (
            <li>
              <a
                href={profile.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline transition-colors hover:text-accent"
              >
                Curriculum Vitae
              </a>
            </li>
          )}
        </ul>

        <div className="mt-10 h-px w-full max-w-xs bg-panel-border" />

        <p className="mt-6 text-xs text-muted">
          Diseñado & Desarrollado por Andres Monserrat · 2026
        </p>
      </div>
    </footer>
  );
}