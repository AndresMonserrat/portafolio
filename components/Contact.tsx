import { profile } from "@/lib/data";

export default function Contact() {
  const githubLabel = profile.links.github.replace(/^https?:\/\//, "");

  return (
    <footer id="contacto" className="scroll-mt-24 lg:scroll-mt-10">
      <h2 className="font-mono text-sm text-accent">
        <span className="text-accent-dim mr-2">03</span>
        contacto
      </h2>
      <p className="mt-4 text-muted">
        Disponible para prácticas profesionales, colaboraciones y proyectos
        académicos.
      </p>
      <ul className="mt-6 space-y-2 font-mono text-sm">
        <li>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
          >
            {githubLabel}
          </a>
        </li>
        {profile.links.linkedin && (
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </li>
        )}
        {profile.links.email && (
          <li>
            <a
              href={`mailto:${profile.links.email}`}
              className="text-foreground transition-colors hover:text-accent"
            >
              {profile.links.email}
            </a>
          </li>
        )}
      </ul>
    </footer>
  );
}