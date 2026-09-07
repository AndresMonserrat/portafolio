"use client";

import {framerMotion} from "@/lib/imports";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return (
    <framerMotion.div
      className={className}
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </framerMotion.div>
  );
}