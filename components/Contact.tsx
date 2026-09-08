"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data";
import { buttonMotion, fadeUp, viewport } from "@/lib/animations";

export default function Contact() {
  const hasCv = profile.links.cv.length > 0;

  return (
    <motion.footer
      id="contacto"
      className="scroll-mt-24"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Hablemos<span className="text-accent">.</span>
        </h2>

        <p className="mt-4 max-w-md text-center text-muted">
          Abierto a oportunidades de práctica profesional o pasantías en
          desarrollo de software y sistemas.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-sm">
          <li>
            <motion.a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonMotion}
              className="text-foreground underline transition-colors hover:text-accent"
            >
              LinkedIn
            </motion.a>
          </li>
          <li>
            <motion.a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonMotion}
              className="text-foreground underline transition-colors hover:text-accent"
            >
              GitHub
            </motion.a>
          </li>
          <li>
            <motion.a
              href={`mailto:${profile.links.email}`}
              {...buttonMotion}
              className="text-accent underline"
            >
              {profile.links.email}
            </motion.a>
          </li>
          {hasCv && (
            <li>
              <motion.a
                href={profile.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                {...buttonMotion}
                className="text-foreground underline transition-colors hover:text-accent"
              >
                Curriculum Vitae
              </motion.a>
            </li>
          )}
        </ul>

        <div className="mt-10 h-px w-full max-w-xs bg-panel-border" />

        <p className="mt-6 text-xs text-muted">
          Diseñado & Desarrollado por Andres Monserrat · 2026
        </p>
      </div>
    </motion.footer>
  );
}