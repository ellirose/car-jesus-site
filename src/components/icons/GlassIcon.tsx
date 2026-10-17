"use client";

import { useId } from "react";
import { motion } from "motion/react";
import type { IconNode } from "lucide";

export type Tone = "sun" | "azure" | "mint" | "berry";

const tones: Record<Tone, [string, string, string]> = {
  sun: ["#ffd27a", "#ff8a1f", "#ee5419"],
  azure: ["#b3ccff", "#3f7bfa", "#2a50cf"],
  mint: ["#a6f4d8", "#22c79b", "#0b8f6d"],
  berry: ["#ffc6d5", "#ff6f91", "#d63c66"],
};

type MotionTag = "path" | "circle" | "rect" | "line" | "polyline" | "polygon" | "ellipse";

type GlassIconProps = {
  icon: IconNode;
  tone?: Tone;
  className?: string;
  /** Draw the glyph strokes when the icon scrolls into view. */
  draw?: boolean;
  delay?: number;
};

/**
 * A layered "3D glass" icon: a vivid gradient plate tilted behind a frosted
 * panel, with the glyph drawn on top. Hovering any `.group` ancestor separates
 * the layers (see `.gi-*` rules in globals.css).
 */
export function GlassIcon({ icon, tone = "sun", className = "size-24", draw = true, delay = 0 }: GlassIconProps) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${raw}`;
  const [c1, c2, c3] = tones[tone];
  const plate = (
    <g transform="rotate(12 61 35)">
      <rect x="34" y="8" width="54" height="54" rx="18" fill={`url(#${id("plate")})`} />
      <rect x="34" y="8" width="54" height="54" rx="18" fill={`url(#${id("shine")})`} />
    </g>
  );

  return (
    <svg viewBox="0 0 96 96" className={`overflow-visible ${className}`} aria-hidden>
      <defs>
        <linearGradient id={id("plate")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="0.5" stopColor={c2} />
          <stop offset="1" stopColor={c3} />
        </linearGradient>
        <radialGradient id={id("shine")} cx="0.25" cy="0.15" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("panel")} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.92" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id={id("ink")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#13213a" />
          <stop offset="1" stopColor={c3} />
        </linearGradient>
        <clipPath id={id("clip")}>
          <rect x="8" y="26" width="62" height="62" rx="20" />
        </clipPath>
        <filter id={id("blur")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={id("shadow")} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#13213a" floodOpacity="0.16" />
        </filter>
        <filter id={id("glow")} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* coloured ground glow */}
      <ellipse cx="50" cy="92" rx="34" ry="4" fill={c2} opacity="0.35" filter={`url(#${id("glow")})`} />

      <g className="gi-plate">{plate}</g>

      <g className="gi-panel" filter={`url(#${id("shadow")})`}>
        {/* frosted: blurred copy of the plate seen through the panel */}
        <g clipPath={`url(#${id("clip")})`}>
          <g filter={`url(#${id("blur")})`} opacity="0.9">
            {plate}
          </g>
        </g>
        <rect
          x="8"
          y="26"
          width="62"
          height="62"
          rx="20"
          fill={`url(#${id("panel")})`}
          stroke="#fff"
          strokeOpacity="0.95"
          strokeWidth="1.5"
        />
        <path d="M26 27h26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="gi-glyph">
        <svg
          x="20"
          y="38"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke={`url(#${id("ink")})`}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          overflow="visible"
        >
          {icon.map(([tag, attrs], i) => {
            const Comp = motion[tag as MotionTag] as typeof motion.path;
            return draw ? (
              <Comp
                key={i}
                {...(attrs as object)}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.1, delay: delay + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
              />
            ) : (
              <Comp key={i} {...(attrs as object)} />
            );
          })}
        </svg>
      </g>

      {/* twinkle */}
      <path
        className="gi-spark"
        d="M84 6c.6 3.4 1.6 4.4 5 5-3.4.6-4.4 1.6-5 5-.6-3.4-1.6-4.4-5-5 3.4-.6 4.4-1.6 5-5Z"
        fill="#fff"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}
