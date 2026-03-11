"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property, SpaceType } from "@/types/database";
import { formatPrice, formatSpaceType, formatRating } from "@/lib/format";

interface PropertyCardProps {
  property: Property;
  lowestPrice: number | null;
  spaceTypes: SpaceType[];
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export function PropertyCard({
  property,
  lowestPrice,
  spaceTypes,
  isHighlighted = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: PropertyCardProps) {
  return (
    <Link
      href={`/search/${property.id}`}
      className={[
        "block rounded-lg border bg-card cursor-pointer hover:shadow-md transition-shadow",
        isHighlighted
          ? "border-l-[3px] border-l-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-t-lg" style={{ aspectRatio: "16/9" }}>
        {property.coverImageUrl ? (
          <Image
            src={property.coverImageUrl}
            alt={property.name}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-slate-600" />
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2">
        {/* Name */}
        <p className="font-semibold text-lg font-barlow leading-tight">{property.name}</p>

        {/* City */}
        <p className="text-sm text-muted-foreground">{property.city}</p>

        {/* Rating row */}
        <div className="flex items-center gap-1 text-sm">
          {property.averageRating != null ? (
            <>
              <Star size={14} className="fill-yellow-400 text-yellow-400 shrink-0" />
              <span className="font-medium">{formatRating(property.averageRating)}</span>
              <span className="text-muted-foreground">
                ({property.reviewCount} review{property.reviewCount !== 1 ? "s" : ""})
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">New</span>
          )}
        </div>

        {/* Space type badges */}
        {spaceTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {spaceTypes.map((type) => (
              <Badge key={type} variant="secondary">
                {formatSpaceType(type)}
              </Badge>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="text-sm font-semibold">
          {lowestPrice != null ? (
            <>From £{formatPrice(lowestPrice)}/day</>
          ) : (
            "Price on request"
          )}
        </p>
      </div>
    </Link>
  );
}
