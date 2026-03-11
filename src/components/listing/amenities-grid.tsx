import type { LucideIcon } from "lucide-react";
import {
  Wifi,
  Phone,
  Video,
  UtensilsCrossed,
  Droplets,
  Bike,
  Lock,
  ParkingSquare,
  Wind,
  Monitor,
  Sun,
  VolumeX,
  ConciergeBell,
  Mail,
  Printer,
} from "lucide-react";
import type { Amenity } from "@/types/database";

const ICON_MAP: Record<string, LucideIcon> = {
  Wifi,
  Phone,
  Video,
  UtensilsCrossed,
  Droplets,
  Bike,
  Lock,
  ParkingSquare,
  Wind,
  Monitor,
  Sun,
  VolumeX,
  ConciergeBell,
  Mail,
  Printer,
};

const CATEGORY_ORDER = ["Connectivity", "Facilities", "Comfort", "Services"];

interface AmenitiesGridProps {
  amenities: Amenity[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  // Group by category
  const grouped = amenities.reduce<Record<string, Amenity[]>>((acc, amenity) => {
    const cat = amenity.category ?? "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(amenity);
    return acc;
  }, {});

  // Sort categories by canonical order, then any extras alphabetically
  const categories = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped)
      .filter((c) => !CATEGORY_ORDER.includes(c))
      .sort(),
  ];

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {category}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {grouped[category].map((amenity) => {
              const Icon = amenity.icon ? ICON_MAP[amenity.icon] : undefined;
              return (
                <div
                  key={amenity.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  {Icon ? (
                    <Icon size={15} className="shrink-0 text-foreground/60" />
                  ) : (
                    <span className="w-[15px] shrink-0" />
                  )}
                  <span>{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
