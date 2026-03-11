"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { SearchFilters } from "@/lib/search";
import { parseSearchFilters, serializeFilters } from "@/lib/search-params";

// Re-export for backward compatibility
export { parseSearchFilters, serializeFilters } from "@/lib/search-params";

function countActiveFilters(filters: SearchFilters): number {
  let count = 0;
  if (filters.spaceTypes && filters.spaceTypes.length > 0) count++;
  if (filters.minCapacity !== undefined) count++;
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
  if (filters.amenityIds && filters.amenityIds.length > 0) count++;
  return count;
}

export function useSearchParamsState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => parseSearchFilters(searchParams),
    [searchParams]
  );

  const activeFilterCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );

  const hasActiveFilters = activeFilterCount > 0;

  const setFilters = useCallback(
    (newFilters: SearchFilters) => {
      const qs = serializeFilters(newFilters);
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname]
  );

  const updateFilter = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
      const next = { ...filters, [key]: value };
      // Remove keys with empty/undefined values
      if (
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete next[key];
      }
      setFilters(next);
    },
    [filters, setFilters]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
