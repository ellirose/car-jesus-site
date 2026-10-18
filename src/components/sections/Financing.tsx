"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, CircleCheck, Percent } from "lucide";
import { Glyph } from "../icons/Glyph";
import { GlassIcon } from "../icons/GlassIcon";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { ButtonLink } from "../ui/Button";
import { MediaReveal, Reveal } from "../ui/Reveal";
import { FlowLines } from "../ui/FlowLines";
import { SectionHeading } from "../ui/SectionHeading";
import { fill, useI18n } from "@/lib/i18n/provider";
import { whatsappLink } from "@/lib/site";

const RATE = 0.139;
const TERMS = [12, 24, 36, 48, 60];
const PRICE = { min: 150000, max: 1500000, step: 10000 };
const DOWN = { min: 10, max: 60, step: 5 };

function SplitRing({ downPct }: { downPct: number }) {
  const r = 84;
  const c = 2 * Math.PI * r;
  const down = (downPct / 100) * c;
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90">
      <circle cx="100" cy="100" r={r} fill="none" stroke="#c2d5ff" strokeWidth="14" />
      <motion.circle
        cx="100"
        cy="100"
        r={r}
        fill="none"
        stroke="#2b57e0"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={c}
        animate={{ strokeDashoffset: c - down }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      />
    </svg>
  );
}

export function Financing() {
  const { t, formatMoney, formatNumber } = useI18n();
  const [price, setPrice] = useState(450000);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(48);

  const { monthly, financed, total } = useMemo(() => {
    const financed = price * (1 - downPct / 100);
    const r = RATE / 12;
    const monthly = (financed * r) / (1 - Math.pow(1 + r, -term));
    return { monthly, financed, total: monthly * term + price * (downPct / 100) };
  }, [price, downPct, term]);

  const money = useCallback((v: number) => formatMoney(Math.round(v)), [formatMoney]);
  const pct = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`;

  return (
    <section id="financiamiento" className="relative isolate overflow-hidden pt-6 pb-10 lg:pt-8 lg:pb-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-white" />
      <FlowLines className="absolute inset-x-0 bottom-0 -z-10 h-2/3 w-full opacity-60" color="var(--color-aqua-100)" glow="var(--color-aqua-500)" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading align="left" tone="aqua" eyebrow={t.finance.eyebrow} title={t.finance.title} subtitle={t.finance.subtitle} />

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {t.finance.perks.map((perk, i) => (
              <Reveal key={perk} delay={i * 0.08} y={16}>
                <li className="flex items-center gap-3 rounded-full bg-white/80 py-3 pr-5 pl-3 font-semibold text-ink shadow-soft ring-1 ring-white">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-aqua-50 text-aqua-600">
                    <Glyph icon={CircleCheck} size={20} strokeWidth={2.4} />
                  </span>
                  {perk}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="relative mt-12 hidden sm:block">
            <div className="blob relative aspect-[16/10] w-full max-w-lg overflow-hidden shadow-lift ring-8 ring-white">
              <MediaReveal className="absolute inset-0">
                <Image src="/media/images/interior.jpg" alt="" fill sizes="(min-width: 1024px) 32rem, 90vw" className="object-cover" />
              </MediaReveal>
            </div>
            <div className="glass absolute -right-2 -bottom-6 flex animate-float items-center gap-3 rounded-[1.5rem] rounded-tr-md py-3 pr-5 pl-3 shadow-lift lg:right-6">
              <GlassIcon icon={Percent} tone="aqua" className="size-14" />
              <div>
                <p className="text-xs font-bold tracking-wider text-ink-mute uppercase">{t.finance.rate}</p>
                <p className="font-display text-2xl font-extrabold text-ink">{formatNumber(RATE * 100, 1)}%</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* calculator */}
        <Reveal y={50} className="relative drop-shadow-[0_30px_50px_rgb(16_29_51/0.14)]">
          <span className="absolute top-2 right-2 z-10 grid size-14 place-items-center rounded-full bg-brand-600 text-white shadow-brand">
            <Glyph icon={Percent} size={24} strokeWidth={2.6} />
          </span>
          <div className="clip-chamfer rounded-[2.5rem] bg-white p-6 pt-16 sm:p-10 sm:pt-20">
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor="fin-price" className="font-bold text-ink-soft">
                    {t.finance.price}
                  </label>
                  <AnimatedNumber value={price} format={money} className="font-display text-2xl font-extrabold text-ink" />
                </div>
                <input
                  id="fin-price"
                  type="range"
                  className="range mt-4"
                  min={PRICE.min}
                  max={PRICE.max}
                  step={PRICE.step}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{ ["--fill" as string]: pct(price, PRICE.min, PRICE.max) }}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor="fin-down" className="font-bold text-ink-soft">
                    {t.finance.down} <span className="text-brand-600">{downPct}%</span>
                  </label>
                  <AnimatedNumber value={price * (downPct / 100)} format={money} className="font-display text-2xl font-extrabold text-ink" />
                </div>
                <input
                  id="fin-down"
                  type="range"
                  className="range mt-4"
                  min={DOWN.min}
                  max={DOWN.max}
                  step={DOWN.step}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  style={{ ["--fill" as string]: pct(downPct, DOWN.min, DOWN.max) }}
                />
              </div>

              <div>
                <p className="font-bold text-ink-soft">{t.finance.term}</p>
                <div role="radiogroup" aria-label={t.finance.term} className="mt-3 grid grid-cols-5 gap-1.5 rounded-full bg-canvas p-1.5 ring-1 ring-line">
                  {TERMS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={term === m}
                      onClick={() => setTerm(m)}
                      className={`relative rounded-full py-2.5 font-display text-[15px] font-bold transition-colors ${
                        term === m ? "text-white" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {term === m && (
                        <motion.span layoutId="term-pill" className="absolute inset-0 rounded-full bg-ink shadow-soft" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                      )}
                      <span className="relative">{m}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-right text-xs font-semibold text-ink-mute">{t.finance.months}</p>
              </div>

              <div className="grid items-center gap-8 rounded-[2rem] bg-mist p-6 sm:grid-cols-[auto_1fr]">
                <div className="relative mx-auto grid size-52 place-items-center">
                  <SplitRing downPct={downPct} />
                  <div className="text-center">
                    <p className="mx-auto max-w-[8rem] text-[11px] leading-tight font-bold tracking-wider text-ink-mute uppercase">{t.finance.monthly}</p>
                    <AnimatedNumber value={monthly} format={money} className="mt-1 block font-display text-[1.7rem] font-extrabold tracking-tight text-ink" />
                  </div>
                </div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between gap-3 border-b border-dashed border-line pb-4">
                    <dt className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                      <span className="size-3 rounded-full bg-brand-600" />
                      {t.finance.down}
                    </dt>
                    <dd className="font-display font-bold text-ink">{money(price * (downPct / 100))}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-dashed border-line pb-4">
                    <dt className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                      <span className="size-3 rounded-full bg-brand-200" />
                      {t.finance.financed}
                    </dt>
                    <dd className="font-display font-bold text-ink">{money(financed)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-sm font-semibold text-ink-soft">{t.finance.totalPaid}</dt>
                    <dd className="font-display font-bold text-ink">{money(total)}</dd>
                  </div>
                </dl>
              </div>

              <ButtonLink
                href={whatsappLink(
                  fill(t.finance.whatsapp, { price: money(price), down: money(price * (downPct / 100)), term }),
                )}
                target="_blank"
                rel="noreferrer"
                size="lg"
                className="w-full"
              >
                {t.finance.cta}
                <Glyph icon={ArrowRight} size={20} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1" />
              </ButtonLink>
              <p className="text-center text-xs text-ink-mute">{t.finance.disclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
