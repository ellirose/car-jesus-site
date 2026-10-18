"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Clock, MapPin, Menu, Phone, X } from "lucide";
import { Glyph } from "./icons/Glyph";
import { LogoMark } from "./icons/LogoMark";
import { SocialIcon } from "./icons/BrandLogo";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n/provider";
import { site, whatsappLink } from "@/lib/site";

const sections = [
  { id: "inicio", key: "home" },
  { id: "inventario", key: "inventory" },
  { id: "vender", key: "sell" },
  { id: "financiamiento", key: "financing" },
  { id: "nosotros", key: "about" },
  { id: "contacto", key: "contact" },
] as const;

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="group flex shrink-0 items-center gap-2.5 sm:gap-3" aria-label={site.name}>
      <span className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
        <LogoMark className={compact ? "size-10" : "size-10 sm:size-12"} />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.3rem] font-extrabold tracking-tight text-ink sm:text-[1.6rem]">Solara</span>
        <span className="mt-1 block text-[0.6rem] font-bold tracking-[0.42em] text-sun-600 sm:text-[0.65rem]">AUTOS</span>
      </span>
    </a>
  );
}

export function Header() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Highlight the nav item of the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top info bar */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden overflow-hidden lg:block"
        >
          <div className="container-x flex h-10 items-center justify-between text-[13px] font-medium text-ink-soft">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Glyph icon={Clock} size={15} className="text-sun-600" />
                {t.topbar.hours}
              </span>
              <span className="flex items-center gap-2">
                <Glyph icon={MapPin} size={15} className="text-sun-600" />
                {t.topbar.location}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a href={site.phoneHref} className="flex items-center gap-2 transition hover:text-ink">
                <Glyph icon={Phone} size={15} className="text-sun-600" />
                {site.phone}
              </a>
              <span className="h-4 w-px bg-ink/15" />
              {(["instagram", "facebook", "tiktok"] as const).map((s) => (
                <a key={s} href={site.socials[s]} target="_blank" rel="noreferrer" aria-label={s} className="transition hover:text-sun-600">
                  <SocialIcon name={s} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main bar — becomes a floating glass island on scroll */}
        <div className={`transition-all duration-500 ${scrolled ? "px-3 pt-3 sm:px-5" : "px-0 pt-0"}`}>
          <div
            className={`mx-auto transition-all duration-500 ${
              scrolled
                ? "max-w-[1400px] rounded-[1.75rem] bg-white/88 shadow-lift ring-1 ring-white backdrop-blur-2xl backdrop-saturate-150"
                : "max-w-[1440px] rounded-none border border-transparent"
            }`}
          >
            <div
              className={`flex items-center justify-between gap-4 transition-all duration-500 ${
                scrolled ? "h-20 px-4 sm:px-6" : "container-x h-20 lg:h-24"
              }`}
            >
              <Logo compact={scrolled} />

              <nav aria-label="Principal" className="hidden xl:block">
                <ul className="flex items-center gap-1">
                  {sections.map((s) => {
                    const isActive = active === s.id;
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`relative block rounded-full px-3.5 py-2.5 text-[17px] font-bold tracking-tight transition-colors duration-300 2xl:px-5 ${
                            isActive ? "text-ink" : "text-ink-soft hover:text-sun-600"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="nav-pill"
                              className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-sun-200/80"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span className="relative">{t.nav[s.key]}</span>
                          {isActive && (
                            <motion.span
                              layoutId="nav-dot"
                              className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-sun-500"
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <LanguageToggle compact className="sm:hidden" layoutKey="lang-xs" />
                <LanguageToggle className="hidden sm:flex" layoutKey="lang-header" />
                <a
                  href={whatsappLink(t.fabMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative hidden h-14 items-center gap-2.5 overflow-hidden rounded-full bg-gradient-sun px-4 text-[17px] font-bold text-white shadow-sun transition hover:-translate-y-0.5 lg:flex 2xl:px-6"
                >
                  <SocialIcon name="whatsapp" className="size-6" />
                  <span className="hidden 2xl:inline">{t.nav.cta}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={t.nav.menu}
                  aria-expanded={open}
                  className="glass grid size-12 place-items-center rounded-full text-ink transition hover:scale-105 xl:hidden"
                >
                  <Glyph icon={Menu} size={22} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button
              type="button"
              aria-label={t.nav.close}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto rounded-l-[2.5rem] bg-canvas/95 p-6 shadow-lift backdrop-blur-xl sm:p-8"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-sun-300/40 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <Logo compact />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.nav.close}
                  className="glass grid size-12 place-items-center rounded-full"
                >
                  <Glyph icon={X} size={22} strokeWidth={2.4} />
                </button>
              </div>
              <nav className="relative mt-10">
                <ul className="space-y-1">
                  {sections.map((s, i) => (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                    >
                      <a
                        href={`#${s.id}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-3xl px-5 py-4 font-display text-3xl font-extrabold tracking-tight transition ${
                          active === s.id ? "bg-white text-ink shadow-soft" : "text-ink-soft hover:bg-white/60 hover:text-ink"
                        }`}
                      >
                        {t.nav[s.key]}
                        <span className={`size-2.5 rounded-full ${active === s.id ? "bg-sun-500" : "bg-transparent"}`} />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="relative mt-auto space-y-5 pt-10">
                <LanguageToggle layoutKey="lang-drawer" className="w-fit" />
                <a
                  href={whatsappLink(t.fabMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-16 items-center justify-center gap-3 rounded-full bg-gradient-sun text-lg font-bold text-white shadow-sun"
                >
                  <SocialIcon name="whatsapp" className="size-6" />
                  {t.nav.cta}
                </a>
                <p className="text-center text-sm text-ink-mute">{t.topbar.hours}</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
