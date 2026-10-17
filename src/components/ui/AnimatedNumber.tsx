"use client";

import { animate, useInView, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  format: (value: number) => string;
  /** Animate from 0 the first time it scrolls into view (otherwise tween between values). */
  countUp?: boolean;
  duration?: number;
  className?: string;
};

export function AnimatedNumber({ value, format, countUp = false, duration = 0.9, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(countUp ? 0 : value);
  const [display, setDisplay] = useState(() => format(countUp ? 0 : value));

  useMotionValueEvent(mv, "change", (v) => setDisplay(format(v)));

  useEffect(() => {
    if (countUp && !inView) return;
    const controls = animate(mv, value, { duration: countUp ? 2 : duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, inView, countUp, duration, mv]);

  // Re-format when the formatter changes (e.g. locale switch) without re-animating.
  useEffect(() => {
    setDisplay(format(mv.get()));
  }, [format, mv]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {display}
    </span>
  );
}
