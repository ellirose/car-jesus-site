"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import es, { type Dictionary } from "./es";
import en from "./en";
import pt from "./pt";

export const locales = [
  { code: "es", label: "Español", short: "ES", htmlLang: "es-MX", intl: "es-MX" },
  { code: "en", label: "English", short: "EN", htmlLang: "en", intl: "en-US" },
  { code: "pt", label: "Português", short: "PT", htmlLang: "pt-BR", intl: "pt-BR" },
] as const;

export type Locale = (typeof locales)[number]["code"];

const dictionaries: Record<Locale, Dictionary> = { es, en, pt };
const STORAGE_KEY = "solara-locale";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  formatMoney: (value: number) => string;
  formatNumber: (value: number, decimals?: number) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return locales.some((l) => l.code === value);
}

function detectLocale(): Locale | null {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(fromUrl)) return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  const nav = navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("en")) return "en";
  return null;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const detected = detectLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with browser-only preference after hydration
    if (detected) setLocaleState(detected);
  }, []);

  useEffect(() => {
    const meta = locales.find((l) => l.code === locale)!;
    document.documentElement.lang = meta.htmlLang;
    document.title = dictionaries[locale].meta.title;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const intl = locales.find((l) => l.code === locale)!.intl;
    const money = new Intl.NumberFormat(intl, { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
    return {
      locale,
      t: dictionaries[locale],
      setLocale,
      formatMoney: (v) => money.format(v),
      formatNumber: (v, decimals = 0) =>
        new Intl.NumberFormat(intl, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Replace `{token}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
