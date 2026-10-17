"use client";

import { MotionConfig } from "motion/react";
import { I18nProvider } from "@/lib/i18n/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>{children}</I18nProvider>
    </MotionConfig>
  );
}
