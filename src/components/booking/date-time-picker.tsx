"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  getAvailableDurationTypes,
  getAvailableTimeSlots,
  isSpaceAvailable,
  formatDurationType,
} from "@/lib/booking";
import { formatPrice } from "@/lib/format";
import type { Space } from "@/types/database";
import type { DurationType } from "@/lib/booking";

interface DateTimePickerProps {
  space: Space;
  openingTime: string; // HH:mm
  closingTime: string; // HH:mm
  onContinue: (
    date: string,
    durationType: DurationType,
    startTime?: string,
    endTime?: string
  ) => void;
}

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function DateTimePicker({
  space,
  openingTime,
  closingTime,
  onContinue,
}: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [durationType, setDurationType] = useState<DurationType | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const availableTypes = getAvailableDurationTypes(space);

  const dateString = date ? toDateString(date) : null;

  // Time slots — only computed when we have a date and hourly is selected
  const timeSlots =
    dateString && durationType === "hourly"
      ? getAvailableTimeSlots(space.id, dateString, openingTime, closingTime)
      : [];

  const availableStartTimes = timeSlots
    .filter((s) => s.available)
    .map((s) => s.startTime);

  // End times: all slot end times that come after the selected start time,
  // with no gap of unavailable slots between start and the chosen end.
  function getAvailableEndTimes(selectedStart: string): string[] {
    if (!selectedStart) return [];
    const startIdx = timeSlots.findIndex((s) => s.startTime === selectedStart);
    if (startIdx === -1) return [];
    const ends: string[] = [];
    for (let i = startIdx; i < timeSlots.length; i++) {
      if (!timeSlots[i].available) break; // stop at first unavailable slot
      ends.push(timeSlots[i].endTime);
    }
    return ends;
  }

  const availableEndTimes = getAvailableEndTimes(startTime);

  // Availability check for full/half day
  const isDayUnavailable =
    dateString &&
    durationType &&
    durationType !== "hourly" &&
    !isSpaceAvailable(space.id, dateString, durationType);

  // No hourly slots available
  const noHourlySlots =
    dateString && durationType === "hourly" && timeSlots.length > 0 && availableStartTimes.length === 0;

  const canContinue =
    !!date &&
    !!durationType &&
    !isDayUnavailable &&
    (durationType !== "hourly" || (!!startTime && !!endTime));

  function handleDurationChange(value: string) {
    setDurationType(value as DurationType);
    setStartTime("");
    setEndTime("");
  }

  function handleStartTimeChange(value: string) {
    setStartTime(value);
    setEndTime(""); // reset end when start changes
  }

  function handleContinue() {
    if (!date || !durationType) return;
    const ds = toDateString(date);
    if (durationType === "hourly") {
      onContinue(ds, durationType, startTime || undefined, endTime || undefined);
    } else {
      onContinue(ds, durationType);
    }
  }

  function getPriceLabel(type: DurationType): string {
    switch (type) {
      case "full_day":
        return `£${formatPrice(space.fullDayPrice)}`;
      case "half_day":
        return space.halfDayPrice != null
          ? `£${formatPrice(space.halfDayPrice)}`
          : `£${formatPrice(Math.round(space.fullDayPrice * 0.6))}`;
      case "hourly":
        return space.hourlyPrice != null
          ? `£${formatPrice(space.hourlyPrice)}/hr`
          : "";
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Calendar */}
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ before: new Date() }}
        />
      </div>

      {/* Duration type */}
      {date && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Duration</p>
          <RadioGroup
            value={durationType ?? ""}
            onValueChange={handleDurationChange}
          >
            {availableTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer rounded-md border border-input px-3 py-2.5 hover:bg-muted/50 transition-colors has-[input[data-checked]]:border-primary"
              >
                <RadioGroupItem value={type} />
                <span className="flex-1 text-sm">{formatDurationType(type)}</span>
                <span className="text-sm text-muted-foreground">
                  {getPriceLabel(type)}
                </span>
              </label>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* No availability message for full/half day */}
      {isDayUnavailable && (
        <p className="text-sm text-muted-foreground text-center">
          No availability on this date. Try another date.
        </p>
      )}

      {/* Time slot picker (hourly only) */}
      {date && durationType === "hourly" && (
        <div className="flex flex-col gap-3">
          {noHourlySlots ? (
            <p className="text-sm text-muted-foreground text-center">
              No availability on this date. Try another date.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="start-time">
                  Start time
                </label>
                <select
                  id="start-time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a start time</option>
                  {availableStartTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="end-time">
                  End time
                </label>
                <select
                  id="end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select an end time</option>
                  {availableEndTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      )}

      {/* Continue button */}
      <Button
        className="w-full"
        disabled={!canContinue}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}
