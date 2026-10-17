"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { SocialIcon } from "./icons/BrandLogo";
import { useI18n } from "@/lib/i18n/provider";
import { whatsappLink } from "@/lib/site";

/** Floating WhatsApp button that appears once the visitor scrolls past the hero. */
export function WhatsAppFab() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.6));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink(t.fabMessage)}
          target="_blank"
          rel="noreferrer"
          aria-label={t.fab}
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed right-4 bottom-4 z-40 flex items-center sm:right-6 sm:bottom-6"
        >
          <span className="glass mr-3 hidden translate-x-3 rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap text-ink opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            {t.fab}
          </span>
          <span className="relative grid size-16 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_34px_-10px_#25d366]">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25d366]/60" />
            <SocialIcon name="whatsapp" className="relative size-8" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
