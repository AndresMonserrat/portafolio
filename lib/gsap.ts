"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

// Registrar una sola vez; cualquier componente que importe desde aquí ya tiene los plugins.
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const EASE_OUT = "expo.out";

export { gsap, ScrollTrigger, useGSAP };
