import { MapPin } from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <header id="inicio" className="scroll-mt-24">
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-panel px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-xs text-foreground">
            {profile.available}
          </span>
        </span>

        <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-foreground lg:text-7xl">
          {profile.name}
        </h1>

        <p className="mt-3 font-mono text-sm text-muted">
          {profile.metadata} · {profile.university} ·{" "}
          <span className="text-accent">{profile.semester}</span>
        </p>

        <blockquote className="mt-10 max-w-xl border-l-2 border-accent pl-5 text-lg leading-relaxed text-foreground">
          {profile.quote}
        </blockquote>

        <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {profile.location}
        </p>
      </div>
    </header>
  );
}