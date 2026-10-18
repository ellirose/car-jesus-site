import { createElement } from "react";
import type { IconNode } from "lucide";

type GlyphProps = {
  icon: IconNode;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

/** Renders a lucide icon node as an inline SVG (server-safe, no runtime). */
export function Glyph({ icon, size = 24, strokeWidth = 2, className, title }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {icon.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}

/** Custom glyphs that lucide does not ship. */
export const SteeringWheel: IconNode = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "12", r: "2.5" }],
  ["path", { d: "M12 14.5V22" }],
  ["path", { d: "M9.6 11.3 2.4 9.7" }],
  ["path", { d: "M14.4 11.3l7.2-1.6" }],
];
