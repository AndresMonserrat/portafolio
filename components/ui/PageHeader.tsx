import SplitHeading from "@/components/ui/SplitHeading";
import Reveal from "@/components/ui/Reveal";

type PageHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
};

export default function PageHeader({ index, eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-sm text-muted">
        <span className="text-accent-ink">{index}</span> — {eyebrow}
      </p>
      <SplitHeading
        as="h1"
        text={title}
        accent="."
        trigger="load"
        className="mt-4 font-display text-5xl font-bold tracking-tight text-fg sm:text-7xl"
      />
      {intro && (
        <Reveal>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}

/** Encabezado de sección dentro de una página. */
export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-ink">{eyebrow}</p>
      <SplitHeading text={title} className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl" />
    </div>
  );
}
