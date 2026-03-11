"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/types/database";
import { getLowestPrice } from "@/lib/search";
import { formatPrice } from "@/lib/format";
import MapFallback from "./map-fallback";
import MapPin from "./map-pin";

interface SearchMapProps {
  properties: Property[];
  highlightedPropertyId?: string | null;
  onPropertyClick?: (propertyId: string) => void;
  onBoundsChange?: (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
}

// London center coordinates
const LONDON_CENTER = { lat: 51.515, lng: -0.09 };
const DEFAULT_ZOOM = 12;

function SearchMapInner({
  properties,
  highlightedPropertyId,
  onPropertyClick,
  onBoundsChange: _onBoundsChange,
}: SearchMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (!apiKey) {
    return (
      <MapFallback
        properties={properties}
        highlightedPropertyId={highlightedPropertyId}
        onPropertyClick={onPropertyClick}
        getPrice={getLowestPrice}
      />
    );
  }

  // Dynamically require Google Maps components only when key is present
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { APIProvider, Map, AdvancedMarker } = require("@vis.gl/react-google-maps");

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={LONDON_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapId="workabout-search-map"
        style={{ width: "100%", height: "100%" }}
      >
        {properties.map((property) => {
          const pricePence = getLowestPrice(property.id);
          if (pricePence === null) return null;

          return (
            <AdvancedMarker
              key={property.id}
              position={{ lat: property.latitude, lng: property.longitude }}
              onClick={() => onPropertyClick?.(property.id)}
            >
              <MapPin
                price={formatPrice(pricePence)}
                isHighlighted={property.id === highlightedPropertyId}
              />
            </AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
}

const SearchMap = dynamic(() => Promise.resolve(SearchMapInner), { ssr: false });
export default SearchMap;
export type { SearchMapProps };
