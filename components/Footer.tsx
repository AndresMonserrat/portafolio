import { profile } from "@/lib/data";

export default function Footer({ year }: { year: number }) {
  return (
    <footer className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-12">
      <div className="h-px w-full max-w-xs bg-panel-border" />
      <p className="mt-6 text-xs text-muted">
        Diseñado & Desarrollado por <span translate="no">{profile.name}</span> · {year}
      </p>
    </footer>
  );
}
