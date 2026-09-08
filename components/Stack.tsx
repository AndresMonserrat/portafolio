"use client";

import { motion } from "motion/react";
import { stack } from "@/lib/data";
import { fadeUp, viewport } from "@/lib/animations";

export default function Stack() {
  return (
    <motion.section
      id="stack"
      className="scroll-mt-24"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <h2 className="font-display text-3xl font-bold text-foreground">
        Stack<span className="text-accent text-[1.25rem]">{">"}_</span>
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {stack.map((group) => (
          <div key={group.group}>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              {group.group}
            </h3>
            <ul className="mt-4 space-y-1.5">
              {group.strong.map((item) => (
                <li key={item} className="font-semibold text-foreground">
                  {item}
                </li>
              ))}
              {group.items.map((item) => (
                <li key={item} className="text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}