"use client";

import { ArrowRight, Armchair, Gift, Lock, Zap } from "lucide";
import { GlassIcon, type Tone } from "../icons/GlassIcon";
import { Glyph } from "../icons/Glyph";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "@/lib/i18n/provider";
import { whatsappLink } from "@/lib/site";

const items = [
  { icon: Lock, tone: "aqua" },
  { icon: Armchair, tone: "mint" },
  { icon: Zap, tone: "brand" },
  { icon: Gift, tone: "iris" },
] as const satisfies readonly { icon: unknown; tone: Tone }[];

/** Solid tinted dome behind each icon. */
const dome: Record<Tone, string> = {
  brand: "bg-brand-50",
  aqua: "bg-aqua-50",
  mint: "bg-mint-50",
  iris: "bg-iris-50",
};

export function WhySell() {
  const { t } = useI18n();

  return (
    <section className="relative isolate overflow-hidden pt-6 pb-6 lg:pb-10">
      <div aria-hidden className="absolute inset-0 -z-10 bg-mist" />
      <div className="container-x">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} subtitle={t.why.subtitle} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12">
          {t.why.items.map((item, i) => {
            const { icon, tone } = items[i];
            return (
              <Reveal key={i} delay={i * 0.1} className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
                <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[999px] bg-white px-7 pt-5 pb-14 text-center shadow-soft ring-1 ring-line/60 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:shadow-lift">
                  <div aria-hidden className={`absolute inset-x-0 top-0 h-[42%] rounded-b-[50%] transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-[48%] ${dome[tone]}`} />
                  <div className="relative grid aspect-square w-full max-w-[13rem] place-items-center rounded-full bg-white shadow-[0_10px_30px_-12px_rgb(16_29_51/0.16)] transition duration-700 group-hover:rotate-[8deg]">
                    <div aria-hidden className="absolute inset-3 rounded-full border border-dashed border-line" />
                    <GlassIcon icon={icon} tone={tone} delay={i * 0.12} className="size-32 lg:size-36" />
                  </div>
                  <span className="relative mt-6 font-display text-sm font-bold text-ink-mute">0{i + 1}</span>
                  <h3 className="relative mt-1 font-display text-2xl font-bold tracking-tight text-ink">{item.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-ink-soft">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href={whatsappLink(t.sell.whatsapp)} target="_blank" rel="noreferrer" size="lg">
            {t.why.cta}
            <Glyph icon={ArrowRight} size={20} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
