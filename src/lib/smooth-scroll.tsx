"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const HEADER_OFFSET = -96;
let lenis: Lenis | null = null;

/** Inertial page scrolling. Disabled for visitors who prefer reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: { offset: HEADER_OFFSET },
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

/** Scroll to a section by id, gliding when Lenis is active. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Pause page scrolling (e.g. while a drawer is open). */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
