import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/lib/data";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = `${profile.name} — ${profile.brand}`;
const description = `${profile.metadata} · ${profile.university}. ${profile.quote}`;

export const metadata: Metadata = {
  // metadataBase: new URL("https://..."), // TODO: set once deployed (Vercel domain)
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#12151b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <noscript>
          <style>{".reveal-on-load{visibility:visible!important}"}</style>
        </noscript>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-ink"
        >
          Saltar al contenido
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
