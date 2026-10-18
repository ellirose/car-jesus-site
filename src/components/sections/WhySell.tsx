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
  { icon: Lock, tone: "azure" },
  { icon: Armchair, tone: "mint" },
  { icon: Zap, tone: "sun" },
  { icon: Gift, tone: "berry" },
] as const satisfies readonly { icon: unknown; tone: Tone }[];

const halo: Record<Tone, string> = {
  sun: "from-sun-100",
  azure: "from-azure-100",
  mint: "from-mint-400/25",
  berry: "from-berry-400/20",
};

export function WhySell() {
  const { t } = useI18n();

  return (
    <section className="relative isolate overflow-hidden pt-6 pb-16 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-sun-50 to-canvas" />
      <div className="container-x">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} subtitle={t.why.subtitle} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12">
          {t.why.items.map((item, i) => {
            const { icon, tone } = items[i];
            return (
              <Reveal key={i} delay={i * 0.1} className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
                <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[999px] bg-white/80 px-7 pt-5 pb-14 text-center shadow-soft ring-1 ring-white backdrop-blur transition duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-lift">
                  <div aria-hidden className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b ${halo[tone]} to-transparent`} />
                  <div className="relative grid aspect-square w-full max-w-[13rem] place-items-center rounded-full bg-white shadow-[inset_0_-10px_30px_rgb(19_33_58/0.05),0_10px_30px_-12px_rgb(19_33_58/0.18)] transition duration-700 group-hover:rotate-[8deg]">
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
