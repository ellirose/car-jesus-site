"use client";

import { motion } from "motion/react";
import { Reveal, easeOutExpo } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "brand" | "aqua";
  className?: string;
};

/** Eyebrow with a hairline rule, a title that rises word by word, and an optional lead. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "brand", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  const words = title.split(" ");
  const accent = tone === "brand" ? "text-brand-600" : "text-aqua-600";
  const rule = tone === "brand" ? "bg-brand-400" : "bg-aqua-500";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal blur={false} y={12}>
        <span className={`inline-flex items-center gap-3 text-xs font-bold tracking-[0.24em] uppercase ${accent}`}>
          <motion.span
            className={`h-px w-10 origin-left ${rule}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOutExpo }}
          />
          {eyebrow}
          {centered && (
            <motion.span
              className={`h-px w-10 origin-right ${rule}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easeOutExpo }}
            />
          )}
        </span>
      </Reveal>
      {/* The heading observes the viewport (its words start clipped, so they can't observe themselves). */}
      <motion.h2
        className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-ink"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.045, delayChildren: 0.05 }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
                  shown: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease: easeOutExpo } },
                }}
              >
                {word}
              </motion.span>
            </span>{" "}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <Reveal delay={0.25} y={16}>
          <p className={`mt-5 text-lg leading-relaxed text-pretty text-ink-soft ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
