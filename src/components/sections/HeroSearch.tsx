"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Search } from "lucide";
import { Glyph } from "../icons/Glyph";
import { useI18n } from "@/lib/i18n/provider";
import { useSearch } from "@/lib/search-context";
import { bodyTypes, brandNames, budgets, type BodyType } from "@/lib/inventory";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="group/field relative flex min-w-0 flex-col justify-center rounded-[1.4rem] px-5 py-2 transition hover:bg-white/70">
      <span className="text-[11px] font-bold tracking-[0.16em] text-ink-mute uppercase">{label}</span>
      {children}
    </label>
  );
}

const selectCls =
  "w-full cursor-pointer appearance-none truncate bg-transparent pr-6 font-display text-[15px] font-bold text-ink outline-none xl:text-base";

export function HeroSearch() {
  const { t, formatMoney } = useI18n();
  const { searchAndGo } = useSearch();
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [query, setQuery] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    searchAndGo({
      brand: brand || null,
      type: (type || null) as BodyType | null,
      maxPrice: budget ? Number(budget) : null,
      query: query.trim(),
    });
  }

  const chevron = (
    <Glyph
      icon={ChevronDown}
      size={18}
      strokeWidth={2.4}
      className="pointer-events-none absolute right-4 bottom-3 text-ink-mute transition group-hover/field:text-brand-600"
    />
  );

  return (
    <form onSubmit={onSubmit} role="search" aria-label={t.search.title} className="relative">
      {/* folder-tab title */}
      <div className="glass absolute -top-10 left-6 hidden items-center gap-2 rounded-t-2xl rounded-b-none border-b-0 px-5 pt-2.5 pb-3 text-sm font-bold text-ink shadow-none lg:flex short:lg:hidden">
        <span className="grid size-5 place-items-center rounded-full bg-brand-600 text-white">
          <Glyph icon={Search} size={11} strokeWidth={3} />
        </span>
        {t.search.title}
      </div>

      <div className="glass flex items-stretch gap-1 rounded-[2rem] p-2 shadow-lift lg:grid lg:grid-cols-[1.1fr_1fr_1fr_1.5fr_auto] lg:p-2.5">
        <div className="hidden lg:contents">
          <Field label={t.search.brand}>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectCls}>
              <option value="">{t.search.anyBrand}</option>
              {[...brandNames].sort().map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {chevron}
          </Field>
          <Field label={t.search.type}>
            <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
              <option value="">{t.search.anyType}</option>
              {bodyTypes.map((b) => (
                <option key={b} value={b}>
                  {t.types[b]}
                </option>
              ))}
            </select>
            {chevron}
          </Field>
          <Field label={t.search.budget}>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
              <option value="">{t.search.anyBudget}</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {t.search.upTo} {formatMoney(b)}
                </option>
              ))}
            </select>
            {chevron}
          </Field>
        </div>

        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.4rem] bg-white/80 px-4 ring-1 ring-ink/5 lg:px-5">
          <Glyph icon={Search} size={20} strokeWidth={2.4} className="shrink-0 text-brand-600" />
          <span className="sr-only">{t.search.title}</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.query}
            className="h-12 w-full min-w-0 bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-mute lg:h-14"
          />
        </label>

        <button
          type="submit"
          className="group/btn relative flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[1.4rem] bg-brand-600 px-5 text-base font-bold text-white shadow-brand transition duration-500 hover:bg-brand-700 active:scale-[0.97] lg:h-auto lg:px-9"
        >
          <Glyph icon={Search} size={20} strokeWidth={2.6} className="lg:hidden" />
          <span className="hidden sm:inline">{t.search.button}</span>
        </button>
      </div>
    </form>
  );
}
