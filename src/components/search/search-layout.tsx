"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import type { Property } from "@/types/database";
import type { SearchFilters } from "@/lib/search";
import { filterProperties, getActiveProperties, getLowestPrice, getSpaceTypes } from "@/lib/search";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { PropertyCard } from "@/components/search/property-card";
import { FilterBar } from "@/components/search/filter-bar";
import { FilterDrawer } from "@/components/search/filter-drawer";
import { EmptyState } from "@/components/search/empty-state";
import SearchMap from "@/components/search/search-map";
import { List, Map as MapIcon } from "lucide-react";

interface SearchLayoutProps {
  initialProperties: Property[];
  initialFilters: SearchFilters;
}

export function SearchLayout({ initialProperties, initialFilters }: SearchLayoutProps) {
  const { filters, setFilters, clearFilters, activeFilterCount } = useSearchParamsState();
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "map">("list");
  const cardRefs = useRef(new Map<string, HTMLDivElement | null>());

  // Client-side re-filter whenever filters change
  const properties = useMemo(
    () => filterProperties(getActiveProperties(), filters),
    [filters]
  );

  const handlePinClick = useCallback((propertyId: string) => {
    const card = cardRefs.current.get(propertyId);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setHighlightedPropertyId(propertyId);
    setTimeout(() => setHighlightedPropertyId(null), 2000);
  }, []);

  const setCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);

  return (
    <div className="-mx-6 -my-6 flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Filter bar (desktop) */}
      <div className="hidden md:block">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onClear={clearFilters}
          activeFilterCount={activeFilterCount}
        />
      </div>

      {/* Filter button (mobile) */}
      <div className="md:hidden px-4 py-2 border-b">
        <FilterDrawer
          filters={filters}
          onFilterChange={setFilters}
          onClear={clearFilters}
          activeFilterCount={activeFilterCount}
        />
      </div>

      {/* Results count */}
      <div className="px-6 py-2 text-sm text-muted-foreground border-b">
        {properties.length} workspace{properties.length !== 1 ? "s" : ""} found
      </div>

      {/* Split view (desktop) / Toggle view (mobile) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop: side by side */}
        <div className="hidden md:flex flex-1">
          {/* List panel - 55% */}
          <div className="w-[55%] overflow-y-auto p-4 space-y-3">
            {properties.map((p) => (
              <div key={p.id} ref={(el) => setCardRef(p.id, el)}>
                <PropertyCard
                  property={p}
                  lowestPrice={getLowestPrice(p.id)}
                  spaceTypes={getSpaceTypes(p.id)}
                  isHighlighted={highlightedPropertyId === p.id}
                  onMouseEnter={() => setHighlightedPropertyId(p.id)}
                  onMouseLeave={() => setHighlightedPropertyId(null)}
                />
              </div>
            ))}
            {properties.length === 0 && (
              <EmptyState onClearFilters={clearFilters} />
            )}
          </div>

          {/* Map panel - 45% */}
          <div className="w-[45%] border-l">
            <SearchMap
              properties={properties}
              highlightedPropertyId={highlightedPropertyId}
              onPropertyClick={handlePinClick}
            />
          </div>
        </div>

        {/* Mobile: toggle between list and map */}
        <div className="md:hidden flex-1 flex flex-col">
          {/* Toggle bar */}
          <div className="flex border-b">
            <button
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                activeTab === "list"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("list")}
            >
              <List size={16} />
              List
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                activeTab === "map"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("map")}
            >
              <MapIcon size={16} />
              Map
            </button>
          </div>

          {/* Content */}
          {activeTab === "list" ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {properties.map((p) => (
                <div key={p.id} ref={(el) => setCardRef(p.id, el)}>
                  <PropertyCard
                    property={p}
                    lowestPrice={getLowestPrice(p.id)}
                    spaceTypes={getSpaceTypes(p.id)}
                    isHighlighted={highlightedPropertyId === p.id}
                    onMouseEnter={() => setHighlightedPropertyId(p.id)}
                    onMouseLeave={() => setHighlightedPropertyId(null)}
                  />
                </div>
              ))}
              {properties.length === 0 && (
                <EmptyState onClearFilters={clearFilters} />
              )}
            </div>
          ) : (
            <div className="flex-1">
              <SearchMap
                properties={properties}
                highlightedPropertyId={highlightedPropertyId}
                onPropertyClick={handlePinClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
