"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState(nav[0].id);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const offset = window.scrollY + 120;
      let current = nav[0].id;
      for (const section of sections) {
        if (section.offsetTop <= offset) {
          current = section.id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-ink">
      <nav className="flex items-center justify-between px-6 py-5 lg:px-12">
        <a
          href="#inicio"
          className="font-display text-xl font-bold text-foreground"
        >
          {profile.brand}
        </a>
        <ul className="flex items-center gap-6">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`font-mono text-xs transition-colors ${
                  active === item.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}