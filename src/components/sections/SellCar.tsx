"use client";

import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide";
import { Glyph } from "../icons/Glyph";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "@/lib/i18n/provider";
import { site, whatsappLink } from "@/lib/site";

/** Polygon for a starburst sticker. */
function starburst(points = 16, inner = 0.86) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 50 : 50 * inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    coords.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${coords.join(",")})`;
}

const burst = starburst();

export function SellCar() {
  const { t } = useI18n();

  return (
    <section id="vender" className="relative isolate overflow-hidden py-20 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-sun-50 to-sun-50" />
      <div aria-hidden className="absolute top-1/4 -right-40 -z-10 size-[36rem] rounded-full bg-sun-200/50 blur-[120px]" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* visual */}
        <Reveal y={50} className="relative mx-auto w-full max-w-[540px] pt-10 pb-6 lg:order-none">
          {/* orbit */}
          <div aria-hidden className="absolute top-0 left-1/2 aspect-square w-[118%] -translate-x-1/2 animate-spin-slow rounded-full border-2 border-dashed border-sun-300/60" />
          <div aria-hidden className="absolute top-[6%] left-[4%] size-4 rounded-full bg-azure-500 shadow-azure" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[3rem] shadow-lift ring-[10px] ring-white">
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
            <div className="absolute inset-0 bg-gradient-to-t from-sun-600/25 via-transparent to-transparent" />
          </div>

          {/* starburst sticker */}
          <motion.div
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.3 }}
            className="absolute top-[14%] -left-2 sm:-left-8"
          >
            <div
              className="grid size-36 place-items-center bg-gradient-sun p-5 text-center shadow-sun sm:size-40"
              style={{ clipPath: burst }}
            >
              <span className="font-display text-[15px] leading-tight font-extrabold text-white sm:text-base">{t.sell.badge}</span>
            </div>
          </motion.div>

          {/* stat bubble */}
          <div className="absolute -right-2 bottom-0 sm:-right-6">
            <div className="glass grid size-40 animate-float place-items-center rounded-full text-center shadow-lift sm:size-44">
              <div>
                <p className="font-display text-5xl font-extrabold tracking-tight text-gradient-sun">{t.sell.statValue}</p>
                <p className="mx-auto mt-1 max-w-[7.5rem] text-xs font-bold text-ink-soft">{t.sell.statLabel}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading align="left" eyebrow={t.sell.eyebrow} title={t.sell.title} subtitle={t.sell.text} />

          <ol className="relative mt-10 space-y-4">
            <span aria-hidden className="absolute top-8 bottom-8 left-8 w-0.5 bg-gradient-to-b from-sun-300 via-sun-500 to-azure-500" />
            {t.sell.steps.map((step, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12} x={30} y={0}>
                <li className="group relative flex items-center gap-5 rounded-full bg-white/70 py-3 pr-6 pl-3 shadow-soft ring-1 ring-white backdrop-blur transition duration-500 hover:translate-x-2 hover:bg-white hover:shadow-lift">
                  <span className="relative grid size-[3.25rem] shrink-0 place-items-center rounded-full bg-gradient-sun font-display text-lg font-extrabold text-white shadow-sun transition duration-500 group-hover:rotate-[360deg]">
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
              <Glyph icon={Phone} size={18} strokeWidth={2.4} className="text-sun-600" />
              {site.phone}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
