"use client";

import { useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import type { SearchFilters } from "@/lib/search";
import type { SpaceType } from "@/types/database";
import { formatSpaceType } from "@/lib/format";
import { amenities } from "@/data/fixtures";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const SPACE_TYPES: SpaceType[] = [
  "hot_desk",
  "private_office",
  "private_meeting_room",
  "communal_space",
  "event",
];

const PRICE_MIN_GBP = 0;
const PRICE_MAX_GBP = 500;

// Group amenities by category, preserving fixture order
const amenitiesByCategory = amenities.reduce<
  { category: string; items: typeof amenities }[]
>((acc, amenity) => {
  const group = acc.find((g) => g.category === amenity.category);
  if (group) {
    group.items.push(amenity);
  } else {
    acc.push({ category: amenity.category, items: [amenity] });
  }
  return acc;
}, []);

interface FilterBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClear: () => void;
  activeFilterCount: number;
}

export function FilterBar({
  filters,
  onFilterChange,
  onClear,
  activeFilterCount,
}: FilterBarProps) {
  // -- Space type helpers --
  const selectedTypes = filters.spaceTypes ?? [];

  const toggleSpaceType = useCallback(
    (type: SpaceType) => {
      const current = filters.spaceTypes ?? [];
      const next = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      onFilterChange({
        ...filters,
        spaceTypes: next.length > 0 ? next : undefined,
      });
    },
    [filters, onFilterChange]
  );

  // -- Capacity helper --
  const handleCapacityChange = useCallback(
    (value: string) => {
      const n = parseInt(value, 10);
      onFilterChange({
        ...filters,
        minCapacity: !isNaN(n) && n >= 1 ? n : undefined,
      });
    },
    [filters, onFilterChange]
  );

  // -- Price helpers --
  const priceMinGbp =
    filters.priceMin !== undefined ? filters.priceMin / 100 : PRICE_MIN_GBP;
  const priceMaxGbp =
    filters.priceMax !== undefined ? filters.priceMax / 100 : PRICE_MAX_GBP;

  const handlePriceSliderChange = useCallback(
    (value: number | readonly number[]) => {
      const arr = Array.isArray(value) ? value : [PRICE_MIN_GBP, value];
      const [min, max] = arr;
      onFilterChange({
        ...filters,
        priceMin: min > PRICE_MIN_GBP ? Math.round(min * 100) : undefined,
        priceMax: max < PRICE_MAX_GBP ? Math.round(max * 100) : undefined,
      });
    },
    [filters, onFilterChange]
  );

  const handlePriceInputChange = useCallback(
    (which: "min" | "max", value: string) => {
      const n = parseFloat(value);
      if (which === "min") {
        onFilterChange({
          ...filters,
          priceMin: !isNaN(n) && n > PRICE_MIN_GBP ? Math.round(n * 100) : undefined,
        });
      } else {
        onFilterChange({
          ...filters,
          priceMax: !isNaN(n) && n < PRICE_MAX_GBP ? Math.round(n * 100) : undefined,
        });
      }
    },
    [filters, onFilterChange]
  );

  // -- Amenity helpers --
  const selectedAmenities = filters.amenityIds ?? [];

  const toggleAmenity = useCallback(
    (id: string) => {
      const current = filters.amenityIds ?? [];
      const next = current.includes(id)
        ? current.filter((a) => a !== id)
        : [...current, id];
      onFilterChange({
        ...filters,
        amenityIds: next.length > 0 ? next : undefined,
      });
    },
    [filters, onFilterChange]
  );

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 border-b bg-background">
      {/* Space Type */}
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm">
              Space Type
              {selectedTypes.length > 0 && (
                <Badge className="ml-1">{selectedTypes.length}</Badge>
              )}
              <ChevronDown className="ml-1" />
            </Button>
          }
        />
        <PopoverContent align="start" className="w-56">
          <div className="flex flex-col gap-2">
            {SPACE_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleSpaceType(type)}
                  aria-label={formatSpaceType(type)}
                />
                <span className="text-sm">{formatSpaceType(type)}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Capacity */}
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm">
              Capacity
              {filters.minCapacity !== undefined && (
                <Badge className="ml-1">{filters.minCapacity}+</Badge>
              )}
              <ChevronDown className="ml-1" />
            </Button>
          }
        />
        <PopoverContent align="start" className="w-48">
          <label className="text-sm font-medium">Minimum guests</label>
          <Input
            type="number"
            min={1}
            placeholder="Min guests"
            value={filters.minCapacity ?? ""}
            onChange={(e) => handleCapacityChange(e.target.value)}
            aria-label="Minimum guest capacity"
          />
        </PopoverContent>
      </Popover>

      {/* Price Range */}
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm">
              Price
              {(filters.priceMin !== undefined ||
                filters.priceMax !== undefined) && (
                <Badge className="ml-1">
                  {"\u00A3"}
                  {priceMinGbp}-{"\u00A3"}
                  {priceMaxGbp}
                </Badge>
              )}
              <ChevronDown className="ml-1" />
            </Button>
          }
        />
        <PopoverContent align="start" className="w-72">
          <div className="flex flex-col gap-3">
            <Slider
              value={[priceMinGbp, priceMaxGbp]}
              min={PRICE_MIN_GBP}
              max={PRICE_MAX_GBP}
              onValueChange={handlePriceSliderChange}
              aria-label="Price range"
            />
            <div className="text-xs text-muted-foreground text-center">
              {"\u00A3"}{priceMinGbp} &ndash; {"\u00A3"}{priceMaxGbp}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={PRICE_MIN_GBP}
                max={PRICE_MAX_GBP}
                placeholder="Min"
                value={
                  filters.priceMin !== undefined ? priceMinGbp : ""
                }
                onChange={(e) => handlePriceInputChange("min", e.target.value)}
                aria-label="Minimum price in pounds"
              />
              <span className="text-muted-foreground text-sm">&ndash;</span>
              <Input
                type="number"
                min={PRICE_MIN_GBP}
                max={PRICE_MAX_GBP}
                placeholder="Max"
                value={
                  filters.priceMax !== undefined ? priceMaxGbp : ""
                }
                onChange={(e) => handlePriceInputChange("max", e.target.value)}
                aria-label="Maximum price in pounds"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Amenities */}
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm">
              Amenities
              {selectedAmenities.length > 0 && (
                <Badge className="ml-1">{selectedAmenities.length}</Badge>
              )}
              <ChevronDown className="ml-1" />
            </Button>
          }
        />
        <PopoverContent align="start" className="w-64 max-h-72 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {amenitiesByCategory.map((group, gi) => (
              <div key={group.category}>
                {gi > 0 && <Separator className="mb-2" />}
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                  {group.category}
                </div>
                <div className="flex flex-col gap-1.5">
                  {group.items.map((amenity) => (
                    <label
                      key={amenity.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={() => toggleAmenity(amenity.id)}
                        aria-label={amenity.name}
                      />
                      <span className="text-sm">{amenity.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear all */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="mr-1" />
          Clear all
        </Button>
      )}
    </div>
  );
}
