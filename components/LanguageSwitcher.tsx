"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { focusRing } from "@/components/ui/BoopLink";

type LanguageSwitcherProps = {
  lang: Locale;
  label: string;
  className?: string;
};

/** Cambia entre /en y /es conservando la página actual, y recuerda la elección para próximas visitas. */
export default function LanguageSwitcher({ lang, label, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const target: Locale = lang === "en" ? "es" : "en";
  const targetPath = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${target}`);

  const remember = () => {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <Link
      href={targetPath}
      hrefLang={target}
      lang={target}
      onClick={remember}
      aria-label={label}
      title={label}
      className={cn(
        "group relative flex h-9 items-center overflow-hidden rounded-full border border-line bg-surface p-0.5 font-mono text-xs transition-colors hover:border-fg",
        focusRing,
        className,
      )}
    >
      {(["en", "es"] as const).map((l) => (
        <span
          key={l}
          aria-hidden="true"
          className={cn(
            "grid h-full place-items-center rounded-full px-2.5 uppercase transition-[background-color,color] duration-500 ease-spring",
            l === lang ? "bg-fg text-bg" : "text-muted group-hover:text-fg",
          )}
        >
          {l}
        </span>
      ))}
    </Link>
  );
}
