/**
 * Fluid section transition: three translucent wave layers plus a hairline
 * contour drift at different speeds, so one section pours into the next.
 * `from` is the colour above the wave, `to` the colour of the section below.
 */
const wave =
  "M0 60C240 0 480 0 720 60C960 120 1200 120 1440 60C1680 0 1920 0 2160 60C2400 120 2640 120 2880 60";
const filled = `${wave}V160H0Z`;

const layers = [
  { height: "100%", opacity: 0.28, duration: "28s", reverse: false, delay: "-4s" },
  { height: "82%", opacity: 0.5, duration: "21s", reverse: true, delay: "-11s" },
  { height: "64%", opacity: 1, duration: "34s", reverse: false, delay: "0s" },
];

type WaveDividerProps = {
  from: string;
  to: string;
  /** Contour line colour. */
  line?: string;
  className?: string;
};

export function WaveDivider({ from, to, line = "var(--color-brand-300)", className = "" }: WaveDividerProps) {
  return (
    <div aria-hidden className={`relative h-20 overflow-hidden sm:h-28 lg:h-36 ${className}`} style={{ background: from }}>
      {layers.map((l, i) => (
        <div
          key={i}
          className={`absolute bottom-0 left-0 w-[200%] ${l.reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
          style={{ height: l.height, ["--marquee-duration" as string]: l.duration, animationDelay: l.delay }}
        >
          <svg viewBox="0 0 2880 160" preserveAspectRatio="none" className="size-full">
            <path d={filled} fill={to} fillOpacity={l.opacity} />
          </svg>
        </div>
      ))}
      {/* hairline contour riding just above the front wave */}
      <div
        className="absolute bottom-[58%] left-0 h-[46%] w-[200%] animate-marquee-reverse"
        style={{ ["--marquee-duration" as string]: "40s" }}
      >
        <svg viewBox="0 0 2880 160" preserveAspectRatio="none" className="size-full">
          <path d={wave} fill="none" stroke={line} strokeWidth="1.5" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
