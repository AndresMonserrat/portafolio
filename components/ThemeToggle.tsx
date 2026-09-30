"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusRing } from "@/components/ui/BoopLink";

type Theme = "light" | "dark";

const THEME_COLORS: Record<Theme, string> = { light: "#f4f2ec", dark: "#101827" };

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Almacenamiento bloqueado (modo privado): el tema funciona igual, solo no se recuerda.
  }
}

type ThemeLabels = { toDark: string; toLight: string; toDarkTitle: string; toLightTitle: string };

export default function ThemeToggle({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // El nuevo tema se revela como un círculo que crece desde el botón.
    const { clientX: x, clientY: y } = e;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(() => applyTheme(next)));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? labels.toDark : labels.toLight}
      title={next === "dark" ? labels.toDarkTitle : labels.toLightTitle}
      className={cn(
        "group grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-fg",
        focusRing,
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 transition-transform duration-700 ease-spring group-hover:rotate-90" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-700 ease-spring group-hover:-rotate-[25deg]" aria-hidden="true" />
      )}
    </button>
  );
}
