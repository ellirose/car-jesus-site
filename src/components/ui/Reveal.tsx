"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  /** Start slightly out of focus and sharpen into place. */
  blur?: boolean;
};

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Fades, lifts and focuses its children the first time they enter the viewport. */
export function Reveal({ delay = 0, y = 36, x = 0, scale = 1, blur = true, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: easeOutExpo }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Curtain reveal for photos and videos: the frame wipes open from the bottom
 * while the media settles from a gentle zoom.
 */
export function MediaReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  // The unclipped outer element observes the viewport; a fully clipped element
  // may never be reported as intersecting.
  return (
    <motion.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-60px" }}>
      <motion.div
        className="size-full overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] } },
        }}
      >
        <motion.div
          className="size-full"
          variants={{
            hidden: { scale: 1.25 },
            shown: { scale: 1, transition: { duration: 2, delay, ease: easeOutExpo } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
