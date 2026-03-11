import { Suspense } from "react";
import { getActiveProperties, filterProperties } from "@/lib/search";
import { parseSearchFilters } from "@/hooks/use-search-params-state";
import { SearchLayout } from "@/components/search/search-layout";

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") urlParams.set(key, value);
    else if (Array.isArray(value)) value.forEach((v) => urlParams.append(key, v));
  });

  const filters = parseSearchFilters(urlParams);
  const allActive = getActiveProperties();
  const filtered = filterProperties(allActive, filters);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchLayout initialProperties={filtered} initialFilters={filters} />
    </Suspense>
  );
}
