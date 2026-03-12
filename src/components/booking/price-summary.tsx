"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateBookingPrice, formatDurationType } from "@/lib/booking";
import { formatPrice, formatSpaceType } from "@/lib/format";
import type { Space } from "@/types/database";
import type { DurationType } from "@/lib/booking";

interface PriceSummaryProps {
  space: Space;
  date: string;
  durationType: DurationType;
  startTime?: string;
  endTime?: string;
  onContinue: (guestCount: number) => void;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getHours(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em - sh * 60 - sm) / 60;
}

export function PriceSummary({
  space,
  date,
  durationType,
  startTime,
  endTime,
  onContinue,
}: PriceSummaryProps) {
  const [guestCount, setGuestCount] = useState(1);

  const hours =
    durationType === "hourly" && startTime && endTime
      ? getHours(startTime, endTime)
      : undefined;

  const totalPrice = calculateBookingPrice(space, durationType, hours);

  const guestOptions = Array.from({ length: space.capacity }, (_, i) => i + 1);

  return (
    <div className="space-y-5">
      {/* Booking summary */}
      <div className="rounded-lg border bg-muted/40 p-4 space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground">
          Booking Summary
        </h3>
        <div className="text-sm text-muted-foreground space-y-1 pt-1">
          <p>
            <span className="font-medium text-foreground">{space.name}</span>
            {" — "}
            {formatSpaceType(space.type)}
          </p>
          <p>{formatDate(date)}</p>
          <p>{formatDurationType(durationType)}</p>
          {durationType === "hourly" && startTime && endTime && (
            <p>
              {startTime} – {endTime}
            </p>
          )}
        </div>
      </div>

      {/* Guest count selector */}
      <div className="space-y-1.5">
        <label
          htmlFor="guest-count"
          className="block text-sm font-medium text-foreground"
        >
          Number of guests
        </label>
        <select
          id="guest-count"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {guestOptions.map((n) => (
            <option key={n} value={n}>
              {n === 1 ? "1 guest" : `${n} guests`}
            </option>
          ))}
        </select>
      </div>

      {/* Price breakdown */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">
          Price Breakdown
        </h3>
        <div className="space-y-1">
          {durationType === "hourly" && hours !== undefined && space.hourlyPrice ? (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {space.name} — {hours} {hours === 1 ? "hour" : "hours"} × £
                {formatPrice(space.hourlyPrice)}/hr
              </span>
              <span>£{formatPrice(totalPrice)}</span>
            </div>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {space.name} — {formatDurationType(durationType)}
              </span>
              <span>£{formatPrice(totalPrice)}</span>
            </div>
          )}
        </div>
        <div className="border-t pt-2 flex justify-between text-sm font-semibold">
          <span>Total</span>
          <span>£{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <Button className="w-full" onClick={() => onContinue(guestCount)}>
        Continue
      </Button>
    </div>
  );
}
