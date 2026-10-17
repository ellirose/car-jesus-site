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
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-white/70 px-2 py-10 shadow-soft ring-1 ring-white backdrop-blur-xl sm:rounded-[3.5rem] lg:py-12">
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/3 h-48 w-2/3 rounded-full bg-sun-100/70 blur-3xl" />
          <div className="relative flex flex-col items-center gap-2 px-6 text-center lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:text-left">
            <div>
              <h2 id="brands-title" className="font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">
                {t.brands.title}
              </h2>
              <p className="mt-2 text-ink-soft">{t.brands.subtitle}</p>
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold text-sun-700">
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
                        className={`relative grid size-24 place-items-center rounded-full bg-gradient-to-b from-white to-canvas shadow-soft ring-1 transition-all duration-500 group-hover:shadow-lift lg:size-28 ${
                          active ? "text-sun-600 ring-2 ring-sun-400" : "text-ink/70 ring-line group-hover:text-ink"
                        }`}
                      >
                        <span className="absolute inset-1.5 rounded-full bg-white shadow-[inset_0_2px_6px_rgb(19_33_58/0.06)]" />
                        <BrandLogo name={name} className="relative size-11 transition-transform duration-500 group-hover:scale-110 lg:size-12" />
                      </span>
                      <span className={`text-sm font-bold ${active ? "text-sun-700" : "text-ink-soft group-hover:text-ink"}`}>{name}</span>
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
