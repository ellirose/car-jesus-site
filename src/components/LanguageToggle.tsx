"use client";

import { AnimatePresence, motion } from "motion/react";
import { Flag } from "./icons/Flags";
import { locales, useI18n } from "@/lib/i18n/provider";

type LanguageToggleProps = {
  /** Hide the language code next to the active flag (for tight spaces). */
  compact?: boolean;
  /** Unique id so several toggles can animate independently. */
  layoutKey?: string;
  className?: string;
};

export function LanguageToggle({ compact = false, layoutKey = "lang", className = "" }: LanguageToggleProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="radiogroup"
      aria-label={t.nav.language}
      className={`glass relative flex items-center gap-1 rounded-full p-1.5 ${className}`}
    >
      {locales.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={l.label}
            title={l.label}
            onClick={() => setLocale(l.code)}
            className="group/flag relative flex items-center rounded-full p-1 outline-offset-2"
          >
            {active && (
              <motion.span
                layoutId={`${layoutKey}-pill`}
                className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-brand-200"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span
              className={`relative grid place-items-center rounded-full transition duration-300 ${
                active
                  ? "scale-100 shadow-[0_6px_14px_-4px_rgb(16_29_51/0.3)]"
                  : "scale-90 opacity-70 saturate-[0.65] group-hover/flag:scale-100 group-hover/flag:opacity-100 group-hover/flag:saturate-100"
              }`}
            >
              <Flag locale={l.code} className={compact ? "size-7" : "size-8"} />
            </span>
            <AnimatePresence initial={false}>
              {active && !compact && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                >
                  <span className="block pr-2 pl-2 font-display text-sm font-extrabold tracking-wide text-ink">
                    {l.short}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
