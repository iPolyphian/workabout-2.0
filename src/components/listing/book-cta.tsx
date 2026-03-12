"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface BookCtaProps {
  propertyName: string;
  lowestPrice: number | null;
  onBook?: () => void;
}

export function BookCta({ propertyName, lowestPrice, onBook }: BookCtaProps) {
  return (
    <div className="sticky bottom-0 md:static bg-background border-t md:border-t-0 p-4 md:p-0">
      <div className="flex items-center justify-between gap-4 md:flex-col md:items-stretch">
        <div className="md:hidden">
          <p className="font-semibold text-sm">{propertyName}</p>
          {lowestPrice != null && (
            <p className="text-sm text-muted-foreground">
              From £{formatPrice(lowestPrice)}/day
            </p>
          )}
        </div>
        <Button size="lg" className="shrink-0" onClick={onBook}>
          Book a Space
        </Button>
      </div>
    </div>
  );
}
