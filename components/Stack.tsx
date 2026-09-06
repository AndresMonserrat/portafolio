import { stack } from "@/lib/data";

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 lg:scroll-mt-10">
      <h2 className="font-mono text-sm text-accent">
        <span className="text-accent-dim mr-2">01</span>
        stack
      </h2>
      <div className="mt-6 space-y-8">
        {stack.map((group) => (
          <div key={group.group}>
            <h3 className="font-mono text-xs text-muted">
              {group.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-panel-border bg-panel px-2.5 py-1 font-mono text-xs text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}