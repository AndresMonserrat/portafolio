"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Content } from "@/lib/content";
import { href, type Locale } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { focusRing } from "@/components/ui/BoopLink";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function isActive(pathname: string, lang: Locale, path: string) {
  if (path.startsWith("#")) return false;
  const target = href(lang, path);
  return path === "/" ? pathname === target : pathname.startsWith(target);
}

type NavbarProps = {
  lang: Locale;
  nav: Content["nav"];
  ui: Content["ui"];
  name: string;
};

export default function Navbar({ lang, nav, ui, name }: NavbarProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Cerrar el menú móvil al cambiar de página (ajuste de estado durante el render, sin efecto).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setScrolled(self.scroll() > 8),
        onRefresh: (self) => setScrolled(self.scroll() > 8),
      });

      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );

    },
    // Cada página tiene otra altura: se recrean los triggers al navegar.
    { scope: headerRef, dependencies: [pathname], revertOnUpdate: true },
  );

  // Entrada del header: solo al montar, no en cada navegación.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(headerRef.current, { yPercent: -100, duration: 1, ease: EASE_OUT, delay: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: headerRef },
  );

  const links = nav.map((item) => {
    const active = isActive(pathname, lang, item.href);
    return (
      <li key={item.href}>
        <Link
          href={href(lang, item.href)}
          aria-current={active ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={cn(
            "group relative inline-block rounded-sm py-1 font-mono text-sm text-muted transition-colors hover:text-fg",
            active && "text-fg",
            focusRing,
          )}
        >
          {item.label}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-500 ease-spring group-hover:scale-x-100",
              active && "scale-x-100",
            )}
          />
        </Link>
      </li>
    );
  });

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-[background-color,border-color] duration-300",
        (scrolled || open) && "border-line bg-bg/80 backdrop-blur-md",
      )}
    >
      <nav aria-label={ui.mainNav} className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href={href(lang, "/")}
          translate="no"
          className={cn(
            "group font-display text-xl font-bold text-fg",
            "inline-block rounded-sm transition-transform duration-500 ease-spring hover:-rotate-6",
            focusRing,
          )}
        >
          AM<span className="text-accent">.</span>
          <span className="sr-only"> — {name}, {ui.home}</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ul className="mr-2 hidden items-center gap-6 md:flex">{links}</ul>
          <LanguageSwitcher lang={lang} label={ui.language.label} />
          <ThemeToggle labels={ui.theme} />
          <button
            type="button"
            className={cn("grid h-9 w-9 place-items-center rounded-full border border-line bg-surface md:hidden", focusRing)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line px-5 pb-6 md:hidden">
        <ul className="flex flex-col gap-3 pt-4">
          {links}
        </ul>
      </div>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent"
      />
    </header>
  );
}
