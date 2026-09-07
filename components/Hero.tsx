import { profile } from "@/lib/data";
import AnimatedText from "./animation/AnimatedText";
import AnimatedAnchor from "./animation/AnimatedAnchor";


export default function Hero() {
  const hasLinkedin = profile.links.linkedin.length > 0;
  const hasEmail = profile.links.email.length > 0;
  const hasCv = profile.links.cv.length > 0;
  return (
    <header id="inicio" className="scroll-mt-24 lg:scroll-mt-10 gap-1000000 ">
      <div className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground">
        <AnimatedText

        > {profile.status[0]}</AnimatedText>

        <AnimatedText className="text-accent text-7xl" delay={0.3}>
          {profile.status[1]}
        </AnimatedText>
      </div>
      <div id="divContentLinks" className="mt-[5vh]">
        <p  className="mt-2 text-[1.25rem] text-shadow-white font-semibold text-muted">
          {profile.role} 
        </p>
        <p className="mt-1 font-mono text-xs text-muted">
          {profile.semester} · {profile.location} · {profile.university}
        </p>
        <p className="mt-8 max-w-xl leading-relaxed text-foreground">
          {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <AnimatedAnchor
            href={profile.links.github}
            className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </AnimatedAnchor  >
          {hasLinkedin && (
            <AnimatedAnchor
              href={profile.links.linkedin}
              className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </AnimatedAnchor>
          )}
          {hasEmail && (
            <AnimatedAnchor
              href={`mailto:${profile.links.email}`}
              className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Email
            </AnimatedAnchor>
          )}
          {hasCv && (
            <AnimatedAnchor
              href={profile.links.cv}
              className="border border-panel-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              CV
            </AnimatedAnchor>
          )}
        </div>
      </div>
    </header>
  );
}
