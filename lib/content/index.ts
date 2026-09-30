import type { Locale } from "@/lib/i18n";
import en from "./en";
import es from "./es";

export type { Content, Photo, Project, TimelineKind } from "./en";

const content = { en, es };

export const getContent = (lang: Locale) => content[lang];
