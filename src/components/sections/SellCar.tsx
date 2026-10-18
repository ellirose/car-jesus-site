"use client";

import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide";
import { Glyph } from "../icons/Glyph";
import { ButtonLink } from "../ui/Button";
import { MediaReveal, Reveal, easeOutExpo } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "@/lib/i18n/provider";
import { site, whatsappLink } from "@/lib/site";

export function SellCar() {
  const { t } = useI18n();

  return (
    <section id="vender" className="relative isolate overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mist" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* visual */}
        <Reveal y={50} className="relative mx-auto w-full max-w-[540px] pt-10 pb-6 lg:order-none">
          {/* orbit */}
          <div aria-hidden className="absolute top-0 left-1/2 aspect-square w-[118%] -translate-x-1/2 animate-spin-slow rounded-full border border-dashed border-brand-300" />
          <div aria-hidden className="absolute top-[6%] left-[4%] size-4 rounded-full bg-aqua-500 shadow-aqua" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[3rem] shadow-lift ring-[10px] ring-white">
            <MediaReveal className="size-full">
            <video
              className="size-full object-cover"
              src="/media/videos/showroom.mp4"
              poster="/media/images/handshake.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            </MediaReveal>
          </div>

          {/* offer seal */}
          <motion.div
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.3 }}
            className="absolute top-[14%] -left-2 sm:-left-8"
          >
            <div className="relative grid size-36 place-items-center rounded-full bg-aqua-500 p-6 text-center shadow-aqua sm:size-40">
              <span aria-hidden className="absolute inset-2 rounded-full border border-dashed border-white/60" />
              <span className="relative font-display text-[15px] leading-tight font-semibold text-white sm:text-base">{t.sell.badge}</span>
            </div>
          </motion.div>

          {/* stat bubble */}
          <div className="absolute -right-2 bottom-0 sm:-right-6">
            <div className="glass grid size-40 animate-float place-items-center rounded-full text-center shadow-lift sm:size-44">
              <div>
                <p className="font-display text-5xl font-semibold tracking-tight text-brand-600">{t.sell.statValue}</p>
                <p className="mx-auto mt-1 max-w-[7.5rem] text-xs font-bold text-ink-soft">{t.sell.statLabel}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading align="left" eyebrow={t.sell.eyebrow} title={t.sell.title} subtitle={t.sell.text} />

          <ol className="relative mt-10 space-y-4">
            {/* the timeline draws itself as it scrolls into view */}
            <motion.span
              aria-hidden
              className="absolute top-8 bottom-8 left-8 w-px origin-top bg-brand-300"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, ease: easeOutExpo }}
            />
            {t.sell.steps.map((step, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12} x={30} y={0}>
                <li className="group relative flex items-center gap-5 rounded-full bg-white py-3 pr-6 pl-3 shadow-soft ring-1 ring-line/60 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2 hover:shadow-lift">
                  <span className="relative grid size-[3.25rem] shrink-0 place-items-center rounded-full bg-brand-600 font-display text-lg font-semibold text-white shadow-brand transition duration-700 group-hover:rotate-[360deg]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{step.title}</p>
                    <p className="text-sm text-ink-soft sm:text-[15px]">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={whatsappLink(t.sell.whatsapp)} target="_blank" rel="noreferrer" size="lg">
              {t.sell.cta}
              <Glyph icon={ArrowRight} size={20} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="outline" size="lg">
              <Glyph icon={Phone} size={18} strokeWidth={2.4} className="text-brand-600" />
              {site.phone}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
