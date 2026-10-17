"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { BodyType } from "./inventory";

export type Filters = {
  brand: string | null;
  type: BodyType | null;
  maxPrice: number | null;
  query: string;
};

const empty: Filters = { brand: null, type: null, maxPrice: null, query: "" };

type SearchValue = {
  filters: Filters;
  setFilters: (patch: Partial<Filters>) => void;
  reset: () => void;
  /** Apply filters and smooth-scroll to the inventory section. */
  searchAndGo: (patch: Partial<Filters>) => void;
};

const SearchContext = createContext<SearchValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filters, set] = useState<Filters>(empty);

  const value = useMemo<SearchValue>(() => {
    const setFilters = (patch: Partial<Filters>) => set((prev) => ({ ...prev, ...patch }));
    return {
      filters,
      setFilters,
      reset: () => set(empty),
      searchAndGo: (patch) => {
        setFilters(patch);
        document.getElementById("inventario")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    };
  }, [filters]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside <SearchProvider>");
  return ctx;
}
