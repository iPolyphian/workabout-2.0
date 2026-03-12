import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Space } from "@/types/database";
import { formatPrice, formatSpaceType } from "@/lib/format";

interface SpaceSelectorProps {
  spaces: Space[];
  onSelect: (spaceId: string) => void;
}

export function SpaceSelector({ spaces, onSelect }: SpaceSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {spaces.map((space) => (
        <button
          key={space.id}
          type="button"
          onClick={() => onSelect(space.id)}
          className="rounded-lg border bg-card p-4 text-left flex flex-col gap-3 hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
        >
          {/* Name + type badge */}
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-sm font-barlow leading-tight">
              {space.name}
            </span>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {formatSpaceType(space.type)}
            </Badge>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users size={14} className="shrink-0" />
            <span>
              Up to {space.capacity}{" "}
              {space.capacity === 1 ? "person" : "people"}
            </span>
          </div>

          {/* Starting price */}
          <p className="text-sm font-semibold">
            From £{formatPrice(space.fullDayPrice)}/day
          </p>
        </button>
      ))}
    </div>
  );
}
