"use client";

import { useId } from "react";
import { motion } from "motion/react";
import type { IconNode } from "lucide";

export type Tone = "brand" | "aqua" | "mint" | "iris";

/** [plate colour, glyph accent] — flat fills, no gradients. */
const tones: Record<Tone, [string, string]> = {
  brand: ["#3d6ff8", "#2245b5"],
  aqua: ["#19b5be", "#0f7f86"],
  mint: ["#14b892", "#0d8a6d"],
  iris: ["#6e63f2", "#4f45c9"],
};

type MotionTag = "path" | "circle" | "rect" | "line" | "polyline" | "polygon" | "ellipse";

type GlassIconProps = {
  icon: IconNode;
  tone?: Tone;
  className?: string;
  /** Draw the glyph strokes when the icon scrolls into view. */
  draw?: boolean;
  delay?: number;
  /** Use on coloured backgrounds: white plate, tinted panel. */
  inverted?: boolean;
};

/**
 * A layered "3D glass" icon: a solid colour plate tilted behind a frosted
 * panel, with the glyph drawn on top. Hovering any `.group` ancestor separates
 * the layers (see `.gi-*` rules in globals.css).
 */
export function GlassIcon({ icon, tone = "brand", className = "size-24", draw = true, delay = 0, inverted = false }: GlassIconProps) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${raw}`;
  const [plateColor, accent] = tones[tone];
  const plateFill = inverted ? "#7edfe3" : plateColor;
  const plate = (
    <g transform="rotate(12 61 35)">
      <rect x="34" y="8" width="54" height="54" rx="18" fill={plateFill} />
    </g>
  );

  return (
    <svg viewBox="0 0 96 96" className={`overflow-visible ${className}`} aria-hidden>
      <defs>
        <clipPath id={id("clip")}>
          <rect x="8" y="26" width="62" height="62" rx="20" />
        </clipPath>
        <filter id={id("blur")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={id("shadow")} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#101d33" floodOpacity="0.14" />
        </filter>
      </defs>

      <g className="gi-plate">{plate}</g>

      <g className="gi-panel" filter={`url(#${id("shadow")})`}>
        {/* frosted: blurred copy of the plate seen through the panel */}
        <g clipPath={`url(#${id("clip")})`}>
          <g filter={`url(#${id("blur")})`} opacity="0.85">
            {plate}
          </g>
        </g>
        <rect
          x="8"
          y="26"
          width="62"
          height="62"
          rx="20"
          fill="#ffffff"
          fillOpacity={inverted ? 0.22 : 0.62}
          stroke="#fff"
          strokeOpacity="0.95"
          strokeWidth="1.5"
        />
      </g>

      <g className="gi-glyph">
        <svg
          x="20"
          y="38"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke={inverted ? "#ffffff" : "#101d33"}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          overflow="visible"
        >
          {icon.map(([tag, attrs], i) => {
            const Comp = motion[tag as MotionTag] as typeof motion.path;
            const stroke = !inverted && i === icon.length - 1 && icon.length > 1 ? accent : undefined;
            return draw ? (
              <Comp
                key={i}
                {...(attrs as object)}
                stroke={stroke}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.2, delay: delay + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
              />
            ) : (
              <Comp key={i} {...(attrs as object)} stroke={stroke} />
            );
          })}
        </svg>
      </g>

      {/* twinkle */}
      <path
        className="gi-spark"
        d="M84 6c.6 3.4 1.6 4.4 5 5-3.4.6-4.4 1.6-5 5-.6-3.4-1.6-4.4-5-5 3.4-.6 4.4-1.6 5-5Z"
        fill={inverted ? plateColor : "#fff"}
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}
