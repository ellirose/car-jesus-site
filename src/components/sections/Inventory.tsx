"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { ArrowRight, SearchX, X } from "lucide";
import { Glyph } from "../icons/Glyph";
import { ButtonLink } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { VehicleCard } from "./VehicleCard";
import { useI18n } from "@/lib/i18n/provider";
import { useSearch } from "@/lib/search-context";
import { bodyTypes, vehicles, type BodyType } from "@/lib/inventory";

export function Inventory() {
  const { t, formatMoney } = useI18n();
  const { filters, setFilters, reset } = useSearch();

  const results = useMemo(() => {
    const q = filters.query.toLowerCase();
    return vehicles.filter(
      (v) =>
        (!filters.brand || v.brand === filters.brand) &&
        (!filters.type || v.type === filters.type) &&
        (!filters.maxPrice || v.price <= filters.maxPrice) &&
        (!q || `${v.brand} ${v.model} ${v.version} ${v.year}`.toLowerCase().includes(q)),
    );
  }, [filters]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: vehicles.length };
    for (const v of vehicles) c[v.type] = (c[v.type] ?? 0) + 1;
    return c;
  }, []);

  const chips: { key: BodyType | null; label: string; count: number }[] = [
    { key: null, label: t.inventory.all, count: counts.all },
    ...bodyTypes.map((b) => ({ key: b, label: t.types[b], count: counts[b] ?? 0 })),
  ];

  const active = [
    filters.brand && { label: filters.brand, clear: () => setFilters({ brand: null }) },
    filters.maxPrice && { label: `${t.search.upTo} ${formatMoney(filters.maxPrice)}`, clear: () => setFilters({ maxPrice: null }) },
    filters.query && { label: `“${filters.query}”`, clear: () => setFilters({ query: "" }) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <section id="inventario" className="relative isolate py-20 lg:py-28">
      {/* the wave divider above pours the canvas into this white section */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white" />
      <div className="container-x">
        <div className="flex flex-col gap-10 2xl:flex-row 2xl:items-end 2xl:justify-between">
          <SectionHeading
            align="left"
            eyebrow={t.inventory.eyebrow}
            title={t.inventory.title}
            subtitle={t.inventory.subtitle}
            className="2xl:max-w-xl"
          />

          <div role="tablist" aria-label={t.search.type} className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:rounded-[2rem] sm:bg-canvas sm:p-2 sm:ring-1 sm:ring-line [&::-webkit-scrollbar]:hidden">
            {chips.map((c) => {
              const selected = filters.type === c.key;
              return (
                <button
                  key={c.label}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilters({ type: c.key })}
                  className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-bold transition-colors max-sm:bg-white max-sm:shadow-soft sm:px-5 ${
                    selected ? "text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="inv-chip"
                      className="absolute inset-0 rounded-full bg-brand-600 shadow-brand"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                  <span
                    className={`relative grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${
                      selected ? "bg-white/25" : "bg-white text-ink-mute"
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex min-h-10 flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-ink-soft">
            <span className="font-display text-lg font-bold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? t.inventory.result : t.inventory.results}
          </p>
          {active.map((a) => (
            <button
              key={a.label}
              onClick={a.clear}
              className="flex items-center gap-1.5 rounded-full bg-brand-50 py-1.5 pr-2 pl-3.5 text-sm font-bold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-100"
            >
              {a.label}
              <Glyph icon={X} size={14} strokeWidth={2.6} />
            </button>
          ))}
          {active.length > 0 && (
            <button onClick={reset} className="text-sm font-bold text-ink-mute underline-offset-4 hover:text-ink hover:underline">
              {t.inventory.reset}
            </button>
          )}
        </div>

        <motion.ul layout className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((car, i) => (
              <motion.li
                key={car.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <VehicleCard car={car} priority={i < 2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {results.length === 0 && (
          <div className="mx-auto mt-4 flex max-w-md flex-col items-center rounded-[3rem] bg-white p-10 text-center shadow-soft">
            <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Glyph icon={SearchX} size={30} />
            </span>
            <p className="mt-4 font-display text-lg font-bold text-ink">{t.inventory.empty}</p>
            <button onClick={reset} className="mt-4 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
              {t.inventory.reset}
            </button>
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <ButtonLink href="#contacto" variant="outline" size="lg">
            {t.inventory.viewAll}
            <Glyph icon={ArrowRight} size={20} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
