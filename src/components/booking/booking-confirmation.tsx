"use client";

import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDurationType } from "@/lib/booking";
import { formatPrice, formatSpaceType } from "@/lib/format";
import type { Space, BookingType } from "@/types/database";
import type { DurationType } from "@/lib/booking";

interface BookingConfirmationProps {
  space: Space;
  propertyName: string;
  date: string;
  durationType: DurationType;
  startTime?: string;
  endTime?: string;
  guestCount: number;
  totalPrice: number; // pence
  bookingType: BookingType;
  cancellationHours: number;
  onConfirm: (notes?: string) => void;
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

export function BookingConfirmation({
  space,
  propertyName,
  date,
  durationType,
  startTime,
  endTime,
  guestCount,
  totalPrice,
  bookingType,
  cancellationHours,
  onConfirm,
}: BookingConfirmationProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [notes, setNotes] = useState("");

  function handleConfirm() {
    onConfirm(notes.trim() || undefined);
    setConfirmed(true);
  }

  if (confirmed) {
    if (bookingType === "instant") {
      return (
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground">
              {space.name} at {propertyName}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(date)} — {formatDurationType(durationType)}
            </p>
            {durationType === "hourly" && startTime && endTime && (
              <p className="text-sm text-muted-foreground">
                {startTime} – {endTime}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {guestCount === 1 ? "1 guest" : `${guestCount} guests`} · £
              {formatPrice(totalPrice)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive a confirmation email shortly.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <Clock className="h-12 w-12 text-amber-500" />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Booking Requested</h3>
          <p className="text-sm text-muted-foreground">
            The provider will review your request and confirm within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Full booking summary */}
      <div className="rounded-lg border bg-muted/40 p-4 space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground">
          Review Your Booking
        </h3>
        <div className="text-sm text-muted-foreground space-y-1 pt-1">
          <p>
            <span className="font-medium text-foreground">{space.name}</span>
            {" — "}
            {formatSpaceType(space.type)}
          </p>
          <p>{propertyName}</p>
          <p>{formatDate(date)}</p>
          <p>{formatDurationType(durationType)}</p>
          {durationType === "hourly" && startTime && endTime && (
            <p>
              {startTime} – {endTime}
            </p>
          )}
          <p>{guestCount === 1 ? "1 guest" : `${guestCount} guests`}</p>
          <p className="font-medium text-foreground pt-1">
            Total: £{formatPrice(totalPrice)}
          </p>
        </div>
      </div>

      {/* Optional notes */}
      <div className="space-y-1.5">
        <label
          htmlFor="booking-notes"
          className="block text-sm font-medium text-foreground"
        >
          Notes{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="booking-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requirements?"
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Cancellation policy */}
      <p className="text-xs text-muted-foreground">
        Free cancellation up to {cancellationHours}{" "}
        {cancellationHours === 1 ? "hour" : "hours"} before
      </p>

      {/* Confirm button */}
      {bookingType === "instant" ? (
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirm}>
          Confirm Booking
        </Button>
      ) : (
        <Button className="w-full" variant="default" onClick={handleConfirm}>
          Request Booking
        </Button>
      )}
    </div>
  );
}
