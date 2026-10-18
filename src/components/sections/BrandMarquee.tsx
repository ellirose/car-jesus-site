"use client";

import { MousePointerClick } from "lucide";
import { BrandLogo } from "../icons/BrandLogo";
import { Glyph } from "../icons/Glyph";
import { Reveal } from "../ui/Reveal";
import { useI18n } from "@/lib/i18n/provider";
import { useSearch } from "@/lib/search-context";
import { brandNames } from "@/lib/inventory";

export function BrandMarquee() {
  const { t } = useI18n();
  const { filters, searchAndGo } = useSearch();
  const loop = [...brandNames, ...brandNames];

  return (
    <section aria-labelledby="brands-title" className="relative py-14 lg:py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-white px-2 py-10 shadow-soft ring-1 ring-line/60 sm:rounded-[3.5rem] lg:py-12">
          <div className="relative flex flex-col items-center gap-2 px-6 text-center lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:text-left">
            <div>
              <h2 id="brands-title" className="font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
                {t.brands.title}
              </h2>
              <p className="mt-2 text-ink-soft">{t.brands.subtitle}</p>
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <Glyph icon={MousePointerClick} size={18} />
              {t.brands.hint}
            </p>
          </div>

          <div className="group/marquee relative mt-10 mask-fade-x">
            <ul
              className="flex w-max animate-marquee gap-5 py-4 [--marquee-duration:55s] group-hover/marquee:[animation-play-state:paused]"
              aria-label={t.brands.title}
            >
              {loop.map((name, i) => {
                const active = filters.brand === name;
                return (
                  <li key={`${name}-${i}`} aria-hidden={i >= brandNames.length ? true : undefined}>
                    <button
                      type="button"
                      tabIndex={i >= brandNames.length ? -1 : 0}
                      onClick={() => searchAndGo({ brand: active ? null : name })}
                      className={`group flex flex-col items-center gap-3 rounded-[2rem] px-2 py-1 transition-transform duration-500 hover:-translate-y-2`}
                    >
                      <span
                        className={`relative grid size-24 place-items-center rounded-full bg-canvas shadow-soft ring-1 transition-all duration-500 group-hover:shadow-lift lg:size-28 ${
                          active ? "text-brand-600 ring-2 ring-brand-400" : "text-ink/70 ring-line group-hover:text-ink"
                        }`}
                      >
                        <span className="absolute inset-1.5 rounded-full bg-white shadow-[inset_0_2px_6px_rgb(16_29_51/0.05)]" />
                        <BrandLogo name={name} className="relative size-11 transition-transform duration-500 group-hover:scale-110 lg:size-12" />
                      </span>
                      <span className={`text-sm font-bold ${active ? "text-brand-700" : "text-ink-soft group-hover:text-ink"}`}>{name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
