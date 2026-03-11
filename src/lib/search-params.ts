import type { SearchFilters } from "@/lib/search";
import type { SpaceType } from "@/types/database";

const VALID_SPACE_TYPES: SpaceType[] = [
  "hot_desk",
  "private_office",
  "private_meeting_room",
  "communal_space",
  "event",
];

/**
 * Parse URL search params into SearchFilters.
 * Prices in URL are GBP (human-readable); converted to pence for the app.
 */
export function parseSearchFilters(
  searchParams: URLSearchParams
): SearchFilters {
  const filters: SearchFilters = {};

  const types = searchParams.get("types");
  if (types) {
    const parsed = types
      .split(",")
      .filter((t): t is SpaceType =>
        VALID_SPACE_TYPES.includes(t as SpaceType)
      );
    if (parsed.length > 0) {
      filters.spaceTypes = parsed;
    }
  }

  const capacity = searchParams.get("capacity");
  if (capacity) {
    const n = parseInt(capacity, 10);
    if (!isNaN(n) && n >= 1) {
      filters.minCapacity = n;
    }
  }

  const priceMin = searchParams.get("priceMin");
  if (priceMin) {
    const n = parseFloat(priceMin);
    if (!isNaN(n) && n >= 0) {
      filters.priceMin = Math.round(n * 100); // GBP -> pence
    }
  }

  const priceMax = searchParams.get("priceMax");
  if (priceMax) {
    const n = parseFloat(priceMax);
    if (!isNaN(n) && n > 0) {
      filters.priceMax = Math.round(n * 100); // GBP -> pence
    }
  }

  const amenities = searchParams.get("amenities");
  if (amenities) {
    const ids = amenities.split(",").filter(Boolean);
    if (ids.length > 0) {
      filters.amenityIds = ids;
    }
  }

  return filters;
}

/**
 * Serialize SearchFilters to a URL search string.
 * Prices are converted from pence to GBP for readability.
 */
export function serializeFilters(filters: SearchFilters): string {
  const params = new URLSearchParams();

  if (filters.spaceTypes && filters.spaceTypes.length > 0) {
    params.set("types", filters.spaceTypes.join(","));
  }

  if (filters.minCapacity !== undefined) {
    params.set("capacity", String(filters.minCapacity));
  }

  if (filters.priceMin !== undefined) {
    params.set("priceMin", String(filters.priceMin / 100)); // pence -> GBP
  }

  if (filters.priceMax !== undefined) {
    params.set("priceMax", String(filters.priceMax / 100)); // pence -> GBP
  }

  if (filters.amenityIds && filters.amenityIds.length > 0) {
    params.set("amenities", filters.amenityIds.join(","));
  }

  return params.toString();
}
