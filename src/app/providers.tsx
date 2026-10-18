"use client";

import { MotionConfig } from "motion/react";
import { I18nProvider } from "@/lib/i18n/provider";
import { SmoothScroll } from "@/lib/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <I18nProvider>{children}</I18nProvider>
    </MotionConfig>
  );
}
