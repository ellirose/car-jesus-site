"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Calendar, Cog, Fuel, Gauge, Heart } from "lucide";
import { BrandLogo } from "../icons/BrandLogo";
import { Glyph } from "../icons/Glyph";
import { fill, useI18n } from "@/lib/i18n/provider";
import { estimateMonthly, type Vehicle } from "@/lib/inventory";
import { whatsappLink } from "@/lib/site";

const badgeStyles = {
  new: "bg-gradient-sun text-white",
  deal: "bg-berry-400 text-white",
  lowKm: "bg-mint-500 text-white",
  certified: "bg-azure-500 text-white",
} as const;

export function VehicleCard({ car, priority = false }: { car: Vehicle; priority?: boolean }) {
  const { t, formatMoney, formatNumber } = useI18n();
  const [saved, setSaved] = useState(false);
  const name = `${car.brand} ${car.model} ${car.year}`;

  const specs = [
    { icon: Calendar, label: String(car.year) },
    { icon: Gauge, label: `${formatNumber(car.km)} ${t.inventory.km}` },
    { icon: Cog, label: t.inventory.transmission[car.transmission] },
    { icon: Fuel, label: t.inventory.fuel[car.fuel] },
  ];

  return (
    <article className="group h-full drop-shadow-[0_18px_28px_rgb(19_33_58/0.10)] transition duration-500 hover:-translate-y-2 hover:drop-shadow-[0_28px_40px_rgb(19_33_58/0.16)]">
      <div className="mask-ticket flex h-full flex-col rounded-[2rem] bg-white [--notch-y:15.5rem] sm:[--notch-y:16rem]">
        {/* photo */}
        <div className="relative m-2 h-[14.5rem] overflow-hidden rounded-[1.6rem] bg-sand sm:h-[15rem]">
          <Image
            src={car.image}
            alt={name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
            preload={priority}
            className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110"
            style={{ objectPosition: car.focus }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow-soft ${badgeStyles[car.badge]}`}
          >
            {t.inventory.badges[car.badge]}
          </span>
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            aria-label={saved ? t.inventory.saved : t.inventory.save}
            className="glass absolute top-3 right-3 grid size-10 place-items-center rounded-full transition hover:scale-110"
          >
            <Glyph
              icon={Heart}
              size={18}
              strokeWidth={2.4}
              className={`transition ${saved ? "scale-110 fill-berry-400 text-berry-400" : "text-ink"}`}
            />
          </button>
          <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow-soft">
            <BrandLogo name={car.brand} className="size-6 text-[10px]" />
          </span>
        </div>

        {/* perforation between photo and details */}
        <div aria-hidden className="mx-6 mt-2 border-t-2 border-dashed border-line" />

        {/* details */}
        <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
          <p className="text-xs font-bold tracking-[0.16em] text-ink-mute uppercase">
            {car.brand} · {t.types[car.type]}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink">
            {car.model} <span className="font-semibold text-ink-soft">{car.year}</span>
          </h3>
          <p className="text-sm text-ink-soft">{car.version}</p>

          <ul className="mt-4 grid grid-cols-2 gap-2">
            {specs.map((s) => (
              <li key={s.label} className="flex items-center gap-2 rounded-full bg-canvas px-3 py-1.5 text-[13px] font-semibold text-ink-soft">
                <Glyph icon={s.icon} size={15} className="shrink-0 text-sun-600" />
                <span className="truncate">{s.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              <p className="font-display text-2xl font-extrabold tracking-tight text-ink">{formatMoney(car.price)}</p>
              <p className="text-xs font-semibold text-ink-mute">
                {t.inventory.from} <span className="text-azure-600">{formatMoney(estimateMonthly(car.price))}</span>
                {t.inventory.perMonth}
              </p>
            </div>
            <a
              href={whatsappLink(fill(t.inventory.whatsapp, { car: `${car.brand} ${car.model} ${car.version} ${car.year}` }))}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t.inventory.details}: ${name}`}
              className="flex h-12 items-center gap-1 rounded-full bg-ink pr-1.5 pl-4 text-sm font-bold text-white transition duration-300 hover:bg-sun-600 hover:shadow-sun"
            >
              <span className="hidden min-[400px]:inline">{t.inventory.details}</span>
              <span className="grid size-9 place-items-center rounded-full bg-white/15 transition group-hover:rotate-45">
                <Glyph icon={ArrowUpRight} size={18} strokeWidth={2.4} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
