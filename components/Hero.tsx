import { profile } from "@/lib/data";

export default function Hero() {
  const hasLinkedin = profile.links.linkedin.length > 0;
  const hasEmail = profile.links.email.length > 0;
  const hasCv = profile.links.cv.length > 0;

  return (
    <header id="inicio" className="scroll-mt-24 lg:scroll-mt-10">
      <p className="font-mono text-sm text-accent">{profile.status}</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground">
        {profile.name}
      </h1>
      <p className="mt-2 text-lg text-muted">
        {profile.role} · {profile.university}
      </p>
      <p className="mt-1 font-mono text-xs text-muted">
        {profile.semester} · {profile.location}
      </p>
      <p className="mt-8 max-w-xl leading-relaxed text-foreground">
        {profile.intro}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          GitHub
        </a>
        {hasLinkedin && (
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
        )}
        {hasEmail && (
          <a
            href={`mailto:${profile.links.email}`}
            className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Email
          </a>
        )}
        {hasCv && (
          <a
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            CV
          </a>
        )}
      </div>
    </header>
  );
}