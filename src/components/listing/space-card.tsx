"use client";

import { Users, Calendar, Clock, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Space } from "@/types/database";
import { formatPrice, formatSpaceType } from "@/lib/format";

interface SpaceCardProps {
  space: Space;
  onBook?: () => void;
}

export function SpaceCard({ space, onBook }: SpaceCardProps) {
  return (
    <div className="rounded-lg border bg-card flex flex-col gap-4 p-4">
      {/* Header: name + type badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-base font-barlow leading-tight">
          {space.name}
        </h3>
        <Badge variant="secondary" className="shrink-0">
          {formatSpaceType(space.type)}
        </Badge>
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Users size={14} className="shrink-0" />
        <span>Up to {space.capacity} {space.capacity === 1 ? "person" : "people"}</span>
      </div>

      {/* Pricing table */}
      <div className="flex flex-col gap-1.5">
        {/* Full day — always shown */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar size={14} className="shrink-0" />
            Full day
          </span>
          <span className="font-semibold">£{formatPrice(space.fullDayPrice)}/day</span>
        </div>

        {/* Half day — only if set */}
        {space.halfDayPrice != null && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={14} className="shrink-0" />
              Half day
            </span>
            <span className="font-semibold">£{formatPrice(space.halfDayPrice)}/half day</span>
          </div>
        )}

        {/* Hourly — only if set */}
        {space.hourlyPrice != null && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Timer size={14} className="shrink-0" />
              Hourly
            </span>
            <span className="font-semibold">£{formatPrice(space.hourlyPrice)}/hr</span>
          </div>
        )}
      </div>

      {/* Description */}
      {space.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {space.description}
        </p>
      )}

      {/* CTA */}
      <Button variant="outline" className="w-full mt-auto" onClick={onBook}>
        Book this space
      </Button>
    </div>
  );
}
