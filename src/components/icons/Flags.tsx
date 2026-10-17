import { useId } from "react";
import type { Locale } from "@/lib/i18n/provider";

/** Glossy circular flags (Mexico, United States, Brazil) for the language toggle. */
export function Flag({ locale, className = "size-8" }: { locale: Locale; className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `fc-${raw}`;
  const gloss = `fg-${raw}`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <clipPath id={clip}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
        <radialGradient id={gloss} cx="0.32" cy="0.22" r="0.85">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {locale === "es" && <Mexico />}
        {locale === "en" && <UnitedStates />}
        {locale === "pt" && <Brazil />}
        <circle cx="16" cy="16" r="16" fill={`url(#${gloss})`} />
      </g>
      <circle cx="16" cy="16" r="15.5" fill="none" stroke="#13213a" strokeOpacity="0.12" />
    </svg>
  );
}

function Mexico() {
  return (
    <>
      <rect width="11" height="32" fill="#006847" />
      <rect x="11" width="10" height="32" fill="#fff" />
      <rect x="21" width="11" height="32" fill="#ce1126" />
      {/* simplified coat of arms: eagle on nopal inside a wreath */}
      <path d="M12.6 18.4c1 1.6 2.1 2.3 3.4 2.3s2.4-.7 3.4-2.3" fill="none" stroke="#2e7d32" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="16" cy="15.6" rx="2.2" ry="2.6" fill="#8c5a2b" />
      <path d="M14.3 14.2l-1.6-1.3 2.2.3M17.7 14.2l1.6-1.3-2.2.3" fill="none" stroke="#8c5a2b" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="16" cy="18.6" r="0.9" fill="#4caf50" />
    </>
  );
}

function UnitedStates() {
  const stripe = 32 / 13;
  return (
    <>
      <rect width="32" height="32" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * stripe} width="32" height={stripe} fill="#b22234" />
      ))}
      <rect width="15" height={stripe * 7} fill="#3c3b6e" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={3 + col * 4.5 + (row % 2) * 2.2}
            cy={2.6 + row * 3.9}
            r="0.8"
            fill="#fff"
          />
        )),
      )}
    </>
  );
}

function Brazil() {
  return (
    <>
      <rect width="32" height="32" fill="#009c3b" />
      <polygon points="2.5,16 16,5.5 29.5,16 16,26.5" fill="#ffdf00" />
      <circle cx="16" cy="16" r="6.4" fill="#002776" />
      <path d="M9.8 14.9c3.9-.9 8.3-.3 12.3 2" fill="none" stroke="#fff" strokeWidth="1.2" />
      <circle cx="13.6" cy="18.6" r="0.45" fill="#fff" />
      <circle cx="16.4" cy="19.6" r="0.45" fill="#fff" />
      <circle cx="18.9" cy="18.4" r="0.45" fill="#fff" />
      <circle cx="17.2" cy="21.2" r="0.4" fill="#fff" />
    </>
  );
}
