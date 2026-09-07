"use client";

import { framerMotion } from "@/lib/imports";
import type { ReactNode } from "react";

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedText({
  children,
  className,
  delay = 0,
}: AnimatedTextProps) {
  return (
    <framerMotion.p
      className={className}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </framerMotion.p>
  );
}