"use client";

import { Star, Clock, Zap, Hand, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types/database";
import { formatRating } from "@/lib/format";

interface PropertyHeaderProps {
  property: Property;
  reviewCount: number;
  averageRating: number;
}

export function PropertyHeader({
  property,
  reviewCount,
  averageRating,
}: PropertyHeaderProps) {
  function scrollToReviews() {
    const el = document.getElementById("reviews");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Name */}
      <h1 className="text-3xl font-bold font-barlow leading-tight">
        {property.name}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <MapPin size={14} className="shrink-0" />
        <span>
          {property.city}, {property.postcode}
        </span>
      </div>

      {/* Rating */}
      <button
        onClick={scrollToReviews}
        className="flex items-center gap-1.5 text-sm w-fit hover:underline"
        type="button"
      >
        <Star size={14} className="fill-yellow-400 text-yellow-400 shrink-0" />
        <span className="font-medium">{formatRating(averageRating)}</span>
        <span className="text-muted-foreground">
          ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
        </span>
      </button>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {/* Opening hours */}
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="shrink-0" />
          <span>
            {property.openingTime}–{property.closingTime}
          </span>
        </div>

        {/* Booking type */}
        {property.bookingType === "instant" ? (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
            <Zap size={11} className="shrink-0" />
            Instant booking
          </Badge>
        ) : (
          <Badge className="flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
            <Hand size={11} className="shrink-0" />
            Manual booking
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
        {property.description}
      </p>
    </div>
  );
}
