"use client";

import type { Property } from "@/types/database";
import MapPin from "./map-pin";
import { formatPrice } from "@/lib/format";

interface MapFallbackProps {
  properties: Property[];
  highlightedPropertyId?: string | null;
  onPropertyClick?: (propertyId: string) => void;
  getPrice: (propertyId: string) => number | null;
}

export default function MapFallback({
  properties,
  highlightedPropertyId,
  onPropertyClick,
  getPrice,
}: MapFallbackProps) {
  // Compute bounding box from all property coordinates
  const lats = properties.map((p) => p.latitude);
  const lngs = properties.map((p) => p.longitude);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat || 0.01;
  const lngRange = maxLng - minLng || 0.01;

  // Convert lat/lng to percentage position within bounding box (10% padding each side)
  function toPercent(lat: number, lng: number) {
    const paddingFraction = 0.1;
    const usable = 1 - 2 * paddingFraction;
    // lat: higher value = further north = lower on screen (inverted)
    const top =
      paddingFraction +
      ((maxLat - lat) / latRange) * usable;
    const left =
      paddingFraction +
      ((lng - minLng) / lngRange) * usable;
    return {
      top: `${(top * 100).toFixed(2)}%`,
      left: `${(left * 100).toFixed(2)}%`,
    };
  }

  return (
    <div
      className="relative w-full h-full min-h-[400px] rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Header label */}
      <span className="absolute top-3 left-3 text-xs text-slate-400 dark:text-slate-500 font-medium z-10 select-none">
        Map preview (no API key)
      </span>

      {/* Property pins */}
      {properties.map((property) => {
        const pricePence = getPrice(property.id);
        if (pricePence === null) return null;

        const { top, left } = toPercent(property.latitude, property.longitude);

        return (
          <div
            key={property.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-full"
            style={{ top, left }}
            onClick={() => onPropertyClick?.(property.id)}
          >
            <MapPin
              price={formatPrice(pricePence)}
              isHighlighted={property.id === highlightedPropertyId}
            />
          </div>
        );
      })}
    </div>
  );
}

export type { MapFallbackProps };
