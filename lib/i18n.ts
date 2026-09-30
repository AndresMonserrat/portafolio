export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Ruta interna con prefijo de idioma: href("es", "/about") → "/es/about". Los anclas (#) se dejan igual. */
export function href(lang: Locale, path: string) {
  if (path.startsWith("#")) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Enlaces hreflang para los metadatos de cada página. */
export function alternates(lang: Locale, path: string) {
  return {
    canonical: href(lang, path),
    languages: Object.fromEntries(locales.map((l) => [l, href(l, path)])),
  };
}
