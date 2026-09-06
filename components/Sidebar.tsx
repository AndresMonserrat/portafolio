import { nav } from "@/lib/data";

export default function Sidebar() {
  return (
    <aside className="border-b border-panel-border bg-ink lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-10">
      <nav
        aria-label="Secciones"
        className="flex overflow-x-auto gap-6 px-4 py-3 lg:flex-col lg:gap-0 lg:overflow-x-visible lg:px-0 lg:py-0"
      >
        {nav.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 font-mono text-xs text-muted transition-colors hover:text-accent lg:py-3 lg:text-sm"
          >
            <span className="text-accent-dim mr-2">{String(i).padStart(2, "0")}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="hidden lg:mt-auto lg:block">
        <p className="font-mono text-xs text-muted">
          {">"} README.md
        </p>
      </div>
    </aside>
  );
}