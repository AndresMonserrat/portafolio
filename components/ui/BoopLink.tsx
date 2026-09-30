import Link from "next/link";
import { cn } from "@/lib/utils";

type BoopLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary";
};

export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/** Botón-enlace con rebote tipo resorte al pasar el mouse (la flecha "hace boop"). */
export default function BoopLink({ variant = "primary", className, children, ...props }: BoopLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-sm font-medium",
        "transition-[translate,background-color,color,box-shadow] duration-500 ease-spring hover:-translate-y-0.5 active:translate-y-0 active:duration-100",
        variant === "primary" &&
          "bg-fg text-bg shadow-[0_4px_0_0_var(--accent)] hover:shadow-[0_6px_0_0_var(--accent)] active:shadow-[0_2px_0_0_var(--accent)]",
        variant === "secondary" && "border border-line bg-surface text-fg hover:border-fg",
        focusRing,
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-spring group-hover:translate-x-1 group-hover:-rotate-12"
      >
        →
      </span>
    </Link>
  );
}
