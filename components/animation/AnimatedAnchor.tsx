'use client';

import {framerMotion} from "@/lib/imports";
import type { ReactNode } from "react";

type AnimatedAnchorProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

export default function AnimatedAnchor({
  children,
  className,
  href,
}: AnimatedAnchorProps) {
  return (
    <framerMotion.a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.1, ease: "backInOut" }}
    >
      {children}
    </framerMotion.a>
  );
}