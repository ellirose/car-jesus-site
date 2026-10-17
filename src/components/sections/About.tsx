"use client";

import Image from "next/image";
import { ArrowRight, Award, CircleCheck } from "lucide";
import { Glyph } from "../icons/Glyph";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { RotatingBadge } from "../ui/RotatingBadge";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "@/lib/i18n/provider";

const statRings = ["ring-sun-200", "ring-azure-100", "ring-mint-400/40", "ring-berry-400/30"];
const statText = ["text-sun-600", "text-azure-600", "text-mint-500", "text-berry-400"];

export function About() {
  const { t, formatNumber } = useI18n();

  return (
    <section id="nosotros" className="relative isolate overflow-hidden py-20 lg:py-32">
      <div aria-hidden className="absolute -bottom-40 left-1/4 -z-10 size-[34rem] rounded-full bg-sun-100/70 blur-[120px]" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* collage */}
        <Reveal y={50} className="relative mx-auto w-full max-w-[560px] pb-16 sm:pb-10">
          <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-[999px] rounded-b-[2.75rem] shadow-lift ring-[10px] ring-white">
            <Image
              src="/media/images/showroom.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="object-cover transition duration-[1.5s] hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 aspect-square w-[52%] overflow-hidden rounded-full shadow-lift ring-[10px] ring-white">
            <Image src="/media/images/handshake.jpg" alt="" fill sizes="(min-width: 1024px) 18rem, 50vw" className="object-cover" />
          </div>
          <RotatingBadge text={t.about.ring} className="absolute top-[8%] left-[2%] size-28 sm:size-36">
            <Glyph icon={Award} size="55%" strokeWidth={2.2} />
          </RotatingBadge>
          <div className="glass absolute right-0 bottom-[26%] animate-float rounded-full px-5 py-3 shadow-lift sm:-right-4">
            <p className="font-display text-lg font-extrabold text-ink">{t.about.since}</p>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading align="left" eyebrow={t.about.eyebrow} title={t.about.title} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-soft">{t.about.text}</p>
            <ul className="mt-6 space-y-3">
              {t.about.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-semibold text-ink">
                  <Glyph icon={CircleCheck} size={22} strokeWidth={2.2} className="shrink-0 text-mint-500" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {t.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.08} scale={0.85} y={0}>
                <div
                  className={`group grid aspect-square place-items-center rounded-full bg-white p-3 text-center shadow-soft ring-4 transition duration-500 hover:-translate-y-2 hover:shadow-lift ${statRings[i]}`}
                >
                  <div>
                    <p className={`font-display text-2xl font-extrabold tracking-tight lg:text-[1.7rem] ${statText[i]}`}>
                      <AnimatedNumber
                        value={s.value}
                        countUp
                        format={(v) => formatNumber(v, s.decimals)}
                      />
                      {s.suffix}
                    </p>
                    <p className="mx-auto mt-1 max-w-[6.5rem] text-[11px] leading-tight font-bold text-ink-soft sm:text-xs">{s.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10">
            <ButtonLink href="#contacto" variant="ink" size="lg">
              {t.about.cta}
              <Glyph icon={ArrowRight} size={20} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
