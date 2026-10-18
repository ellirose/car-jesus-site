import { useId } from "react";

/**
 * Solara brand mark: a sun rising over an open road. Rays breathe and the
 * lane dashes roll forward — the same artwork as `app/icon.svg`.
 */
export function LogoMark({ className = "size-11", animated = true }: { className?: string; animated?: boolean }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const grad = `lm-${raw}`;
  const shine = `ls-${raw}`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc24b" />
          <stop offset="0.5" stopColor="#ff8a1f" />
          <stop offset="1" stopColor="#ee5419" />
        </linearGradient>
        <radialGradient id={shine} cx="0.2" cy="0.1" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="19" fill={`url(#${grad})`} />
      <rect width="64" height="64" rx="19" fill={`url(#${shine})`} />
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
        {[-150, -120, -90, -60, -30].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 32 + Math.cos(rad) * 16.5;
          const y1 = 34 + Math.sin(rad) * 16.5;
          const x2 = 32 + Math.cos(rad) * 21.5;
          const y2 = 34 + Math.sin(rad) * 21.5;
          return (
            <line
              key={deg}
              x1={x1.toFixed(2)}
              y1={y1.toFixed(2)}
              x2={x2.toFixed(2)}
              y2={y2.toFixed(2)}
              style={animated ? { animation: `lm-ray 2.6s ease-in-out ${i * 0.18}s infinite` } : undefined}
            />
          );
        })}
      </g>
      <path d="M20 34a12 12 0 0 1 24 0Z" fill="#fff" />
      <path d="M10 34.5h44" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M22.5 56 30.6 38h2.8l8.1 18Z" fill="#fff" />
      <path
        d="M32 40v16"
        stroke="#f26b12"
        strokeWidth="1.6"
        strokeDasharray="2.4 2.6"
        style={animated ? { animation: "lm-road 1.2s linear infinite" } : undefined}
      />
      <style>{`
        @keyframes lm-ray { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        @keyframes lm-road { to { stroke-dashoffset: -5 } }
      `}</style>
    </svg>
  );
}
