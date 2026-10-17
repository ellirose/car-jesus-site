import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "sun" | "azure";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "sun", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.18em] uppercase shadow-soft ring-1 ${
          tone === "sun"
            ? "bg-sun-50 text-sun-700 ring-sun-200/70"
            : "bg-azure-50 text-azure-600 ring-azure-100"
        }`}
      >
        <span className={`size-1.5 rounded-full ${tone === "sun" ? "bg-sun-500" : "bg-azure-500"}`} />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-balance text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed text-pretty text-ink-soft ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
