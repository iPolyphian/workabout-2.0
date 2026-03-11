import type { Property, Space, Amenity, SpaceType } from "@/types/database";
import { properties, spaces, amenities, propertyAmenities } from "@/data/fixtures";

export interface SearchFilters {
  spaceTypes?: SpaceType[];
  minCapacity?: number;
  priceMin?: number; // pence
  priceMax?: number; // pence
  amenityIds?: string[];
}

export function getActiveProperties(): Property[] {
  return properties.filter((p) => p.status === "active");
}

export function getSpacesForProperty(propertyId: string): Space[] {
  return spaces.filter((s) => s.propertyId === propertyId && s.isActive);
}

export function getAmenitiesForProperty(propertyId: string): Amenity[] {
  const amenityIds = propertyAmenities
    .filter((pa) => pa.propertyId === propertyId)
    .map((pa) => pa.amenityId);
  return amenities.filter((a) => amenityIds.includes(a.id));
}

export function getLowestPrice(propertyId: string): number | null {
  const activeSpaces = getSpacesForProperty(propertyId);
  if (activeSpaces.length === 0) return null;
  return Math.min(...activeSpaces.map((s) => s.fullDayPrice));
}

export function getSpaceTypes(propertyId: string): SpaceType[] {
  const activeSpaces = getSpacesForProperty(propertyId);
  return [...new Set(activeSpaces.map((s) => s.type))];
}

export function filterProperties(
  propertiesToFilter: Property[],
  filters: SearchFilters
): Property[] {
  return propertiesToFilter.filter((property) => {
    const activeSpaces = getSpacesForProperty(property.id);

    if (filters.spaceTypes && filters.spaceTypes.length > 0) {
      const hasMatchingType = activeSpaces.some((s) =>
        filters.spaceTypes!.includes(s.type)
      );
      if (!hasMatchingType) return false;
    }

    if (filters.minCapacity !== undefined) {
      const hasCapacity = activeSpaces.some(
        (s) => s.capacity >= filters.minCapacity!
      );
      if (!hasCapacity) return false;
    }

    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      const lowestPrice = getLowestPrice(property.id);
      if (lowestPrice === null) return false;
      if (filters.priceMin !== undefined && lowestPrice < filters.priceMin)
        return false;
      if (filters.priceMax !== undefined && lowestPrice > filters.priceMax)
        return false;
    }

    if (filters.amenityIds && filters.amenityIds.length > 0) {
      const propertyAmenityIds = propertyAmenities
        .filter((pa) => pa.propertyId === property.id)
        .map((pa) => pa.amenityId);
      const hasAllAmenities = filters.amenityIds.every((id) =>
        propertyAmenityIds.includes(id)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });
}
