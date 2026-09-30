import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import StarField from "@/components/StarField";
import { getContent } from "@/lib/content";
import { alternates, hasLocale, locales } from "@/lib/i18n";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const { profile, meta } = getContent(lang);
  const title = `${profile.name} — ${profile.roleLead} ${profile.roleSparkle}`;

  return {
    // metadataBase: new URL("https://..."), // TODO: set once deployed (Vercel domain)
    title: { default: title, template: `%s — ${profile.name}` },
    description: meta.description,
    alternates: alternates(lang, "/"),
    openGraph: { title, description: meta.description, type: "website", locale: meta.ogLocale },
    twitter: { card: "summary_large_image", title, description: meta.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f2ec",
};

// Aplica el tema guardado antes del primer pintado (sin parpadeo). El claro es el predeterminado.
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#101827")}}catch(e){}`;

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <html
      lang={lang}
      // El script de tema modifica data-theme antes de hidratar.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript>
          <style>{".reveal-on-load{visibility:visible!important}"}</style>
        </noscript>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-bg"
        >
          {content.ui.skipLink}
        </a>
        <StarField />
        <SmoothScroll>
          <Navbar lang={lang} nav={content.nav} ui={content.ui} name={content.profile.name} />
          <main id="content" tabIndex={-1} className="mx-auto max-w-6xl px-5 pt-12 outline-none sm:px-8 sm:pt-16">
            {props.children}
          </main>
          <ContactFooter lang={lang} year={new Date().getFullYear()} />
        </SmoothScroll>
      </body>
    </html>
  );
}
