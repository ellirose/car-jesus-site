import { useId, type ReactNode } from "react";

type RotatingBadgeProps = {
  text: string;
  children: ReactNode;
  /** Must include a position utility (e.g. `absolute top-4 right-4`) and a size. */
  className?: string;
};

/** Circular badge whose label text slowly orbits around a gradient core. */
export function RotatingBadge({ text, children, className = "" }: RotatingBadgeProps) {
  const id = `ring-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="glass absolute inset-0 rounded-full" />
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id={id} d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
        </defs>
        {/* textLength stretches/condenses the phrase to wrap the ring exactly once in any language */}
        <text className="fill-ink font-display text-[8.8px] font-bold">
          <textPath href={`#${id}`} textLength={288} lengthAdjust="spacingAndGlyphs">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="relative grid size-[44%] place-items-center rounded-full bg-gradient-sun text-white shadow-sun">
        {children}
      </span>
    </div>
  );
}
