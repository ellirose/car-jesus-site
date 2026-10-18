"use client";

import { motion } from "motion/react";

/**
 * Decorative "light trails": gentle contour lines across the background, each
 * carrying a short streak of light that glides along it like traffic at dusk.
 */
const curves = Array.from({ length: 7 }, (_, i) => {
  const y = 120 + i * 85;
  return `M-120 ${y}C260 ${y - 140 + i * 12} 640 ${y + 190 - i * 10} 980 ${y + 30}S1420 ${y - 120 + i * 18} 1580 ${y - 40}`;
});

type FlowLinesProps = {
  className?: string;
  color?: string;
  glow?: string;
};

export function FlowLines({ className = "", color = "var(--color-brand-200)", glow = "var(--color-brand-500)" }: FlowLinesProps) {
  return (
    <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`} aria-hidden>
      {curves.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, delay: 0.2 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
          />
          <path
            d={d}
            fill="none"
            stroke={i % 3 === 1 ? "var(--color-aqua-500)" : glow}
            strokeWidth="1.6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={400}
            strokeDasharray="26 374"
            className="animate-flow"
            style={{ animationDuration: `${11 + i * 2.3}s`, animationDelay: `${-i * 1.7}s`, opacity: 0.55 }}
          />
        </g>
      ))}
    </svg>
  );
}
