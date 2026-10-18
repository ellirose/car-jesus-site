"use client";

import {
  ArrowUpRight,
  CarFront,
  FileCheck2,
  Gauge,
  HandCoins,
  MessageCircleMore,
  Percent,
  Repeat,
  ScanSearch,
  ShieldCheck,
  Truck,
  Umbrella,
} from "lucide";
import type { IconNode } from "lucide";
import { GlassIcon, type Tone } from "../icons/GlassIcon";
import { Glyph, SteeringWheel } from "../icons/Glyph";
import { SocialIcon } from "../icons/BrandLogo";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Tilt } from "../ui/Tilt";
import { useI18n } from "@/lib/i18n/provider";
import { whatsappLink } from "@/lib/site";

const icons: IconNode[] = [
  CarFront,
  HandCoins,
  Repeat,
  Percent,
  ScanSearch,
  ShieldCheck,
  FileCheck2,
  Umbrella,
  Truck,
  Gauge,
  MessageCircleMore,
  SteeringWheel,
];

const toneCycle: Tone[] = ["sun", "azure", "mint", "berry"];

/** Alternating organic outlines so the grid never reads as a wall of rectangles. */
const shapes = [
  "rounded-[3.5rem_0.75rem_3.5rem_0.75rem]",
  "rounded-[0.75rem_3.5rem_0.75rem_3.5rem]",
  "rounded-[3.5rem]",
  "rounded-[3.5rem_3.5rem_0.75rem_3.5rem]",
];

const FEATURED = 0;
const WIDE = 10;

export function Services() {
  const { t } = useI18n();
  const items = t.services.items;

  return (
    <section id="servicios" className="relative pt-10 pb-20 lg:pt-14 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute top-40 -left-32 size-96 rounded-full bg-azure-100/70 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => {
            const tone = toneCycle[i % toneCycle.length];

            if (i === FEATURED) {
              return (
                <Reveal key={i} className="sm:col-span-2 lg:row-span-2">
                  <Tilt max={6} className="group h-full rounded-[3rem]">
                    <article className="relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[3rem] bg-gradient-to-br from-sun-50 via-white to-white p-8 shadow-soft ring-1 ring-sun-100 transition-shadow duration-500 group-hover:shadow-lift lg:p-12">
                      <div aria-hidden className="absolute -right-24 -bottom-24 size-[26rem] rounded-full bg-gradient-sun opacity-15 blur-2xl" />
                      <div aria-hidden className="absolute top-10 right-10 size-56 rounded-full border-[18px] border-sun-200/40" />
                      <span className="relative w-fit rounded-full bg-gradient-sun px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-white uppercase shadow-sun">
                        {t.services.featuredTag}
                      </span>
                      <div className="relative" style={{ transform: "translateZ(40px)" }}>
                        <GlassIcon icon={icons[i]} tone="sun" className="size-40 lg:size-52" />
                      </div>
                      <div className="relative">
                        <h3 className="font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">{item.title}</h3>
                        <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-soft">{item.text}</p>
                      </div>
                    </article>
                  </Tilt>
                </Reveal>
              );
            }

            if (i === WIDE) {
              return (
                <Reveal key={i} delay={0.05} className="sm:col-span-2">
                  <a
                    href={whatsappLink(t.fabMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-full items-center gap-6 overflow-hidden rounded-full bg-gradient-to-r from-azure-50 via-white to-white py-5 pr-8 pl-5 shadow-soft ring-1 ring-azure-100 transition duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <GlassIcon icon={icons[i]} tone="azure" className="size-24 shrink-0 lg:size-28" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold tracking-tight text-ink lg:text-2xl">{item.title}</h3>
                      <p className="mt-1 text-ink-soft">{item.text}</p>
                    </div>
                    <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_24px_-8px_#25d366] transition group-hover:scale-110 sm:grid">
                      <SocialIcon name="whatsapp" className="size-7" />
                    </span>
                  </a>
                </Reveal>
              );
            }

            return (
              <Reveal key={i} delay={(i % 4) * 0.06}>
                <article
                  className={`group relative h-full overflow-hidden bg-white/80 p-7 shadow-soft ring-1 ring-white backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lift ${shapes[i % shapes.length]}`}
                >
                  <div
                    aria-hidden
                    className={`absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-2xl transition duration-700 group-hover:opacity-100 ${
                      tone === "sun" ? "bg-sun-200" : tone === "azure" ? "bg-azure-100" : tone === "mint" ? "bg-mint-400/30" : "bg-berry-400/25"
                    }`}
                  />
                  <div className="relative flex items-start justify-between">
                    <GlassIcon icon={icons[i]} tone={tone} delay={(i % 4) * 0.1} className="size-24 lg:size-28" />
                    <span className="grid size-10 place-items-center rounded-full text-ink-mute ring-1 ring-line transition duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white group-hover:ring-ink">
                      <Glyph icon={ArrowUpRight} size={18} strokeWidth={2.4} />
                    </span>
                  </div>
                  <h3 className="relative mt-6 font-display text-xl font-bold tracking-tight text-ink">{item.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-ink-soft">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
