"use client";

import { Quote, Star } from "lucide";
import { Glyph } from "../icons/Glyph";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { useI18n } from "@/lib/i18n/provider";

type Item = { name: string; city: string; car: string; text: string };

const avatarGradients = [
  "from-sun-300 to-sun-600",
  "from-azure-300 to-azure-600",
  "from-mint-400 to-mint-500",
  "from-berry-400 to-sun-500",
];

const starPath = Star[0][1].d as string;

function Stars() {
  return (
    <div className="flex gap-0.5 text-sun-500">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-current">
          <path d={starPath} />
        </svg>
      ))}
    </div>
  );
}

function Bubble({ item, index }: { item: Item; index: number }) {
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <figure className="w-[20rem] shrink-0 sm:w-[24rem]">
      <blockquote className="relative rounded-[2rem] rounded-bl-md bg-gradient-to-br from-white to-canvas p-7 shadow-soft ring-1 ring-line/70">
        <Glyph icon={Quote} size={40} strokeWidth={1.5} className="absolute top-5 right-6 text-sun-200" />
        <Stars />
        <p className="mt-4 leading-relaxed text-ink">{item.text}</p>
        <span className="mt-5 inline-flex rounded-full bg-sun-50 px-3 py-1 text-xs font-bold text-sun-700 ring-1 ring-sun-100">
          {item.car}
        </span>
        {/* bubble tail */}
        <svg viewBox="0 0 24 20" className="absolute -bottom-[18px] left-0 h-5 w-6 text-canvas" aria-hidden>
          <path d="M0 0h24C16 4 8 10 0 20Z" fill="currentColor" />
        </svg>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 pl-2">
        <span
          className={`grid size-12 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-soft ring-4 ring-white ${avatarGradients[index % avatarGradients.length]}`}
        >
          {initials}
        </span>
        <span>
          <span className="block font-display font-bold text-ink">{item.name}</span>
          <span className="block text-sm text-ink-soft">{item.city}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { t, formatNumber } = useI18n();
  const items = t.testimonials.items;
  const rowA = [...items, ...items];
  const rowB = [...items.slice(3), ...items.slice(0, 3)];
  const rowBLoop = [...rowB, ...rowB];

  return (
    <section className="relative py-10 lg:py-16">
      <div className="mx-3 overflow-hidden rounded-[3rem] bg-white py-20 shadow-soft sm:mx-5 sm:rounded-[4rem] lg:py-28">
        <div className="container-x flex flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading align="left" eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} subtitle={t.testimonials.subtitle} className="max-lg:text-center" />
          <Reveal className="flex items-center gap-5 rounded-full bg-canvas py-3 pr-7 pl-3 ring-1 ring-line">
            <span className="grid size-20 place-items-center rounded-full bg-gradient-sun font-display text-3xl font-extrabold text-white shadow-sun">
              4.9
            </span>
            <div>
              <Stars />
              <p className="mt-1 font-display font-bold text-ink">Google Reviews</p>
              <p className="text-sm text-ink-soft">+{formatNumber(1200)}</p>
            </div>
          </Reveal>
        </div>

        <div className="group/marquee mt-16 space-y-10 mask-fade-x">
          <div className="flex w-max animate-marquee gap-6 [--marquee-duration:70s] group-hover/marquee:[animation-play-state:paused]">
            {rowA.map((item, i) => (
              <Bubble key={`a-${i}`} item={item} index={i} />
            ))}
          </div>
          <div className="flex w-max animate-marquee-reverse gap-6 [--marquee-duration:80s] group-hover/marquee:[animation-play-state:paused]">
            {rowBLoop.map((item, i) => (
              <Bubble key={`b-${i}`} item={item} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
