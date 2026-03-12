import type { Space, Booking, BookingType } from "@/types/database";
import { bookings } from "@/data/fixtures";
import { getSpacesForProperty } from "@/lib/search";

export type DurationType = "full_day" | "half_day" | "hourly";

export interface TimeSlot {
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  available: boolean;
}

export interface BookingParams {
  userId: string;
  spaceId: string;
  propertyId: string;
  organisationId?: string;
  date: string; // YYYY-MM-DD
  durationType: DurationType;
  startTime?: string; // HH:mm (hourly only)
  endTime?: string; // HH:mm (hourly only)
  guestCount: number;
  totalPrice: number; // pence
  bookingType: BookingType;
  notes?: string;
}

/**
 * Calculate the price for a booking based on space pricing and duration.
 * All prices in pence.
 */
export function calculateBookingPrice(
  space: Space,
  durationType: DurationType,
  hours?: number
): number {
  switch (durationType) {
    case "full_day":
      return space.fullDayPrice;
    case "half_day":
      return space.halfDayPrice ?? Math.round(space.fullDayPrice * 0.6);
    case "hourly":
      if (!space.hourlyPrice || !hours || hours <= 0) return 0;
      return space.hourlyPrice * hours;
  }
}

/**
 * Get the duration types available for a given space based on its pricing.
 */
export function getAvailableDurationTypes(space: Space): DurationType[] {
  const types: DurationType[] = ["full_day"];
  if (space.halfDayPrice !== undefined) types.push("half_day");
  if (space.hourlyPrice !== undefined) types.push("hourly");
  return types;
}

/**
 * Parse HH:mm time string to total minutes since midnight.
 */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Convert minutes since midnight to HH:mm string.
 */
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Get available 1-hour time slots for a space on a given date.
 * Checks existing bookings for conflicts.
 */
export function getAvailableTimeSlots(
  spaceId: string,
  date: string,
  openingTime: string,
  closingTime: string
): TimeSlot[] {
  const openMinutes = timeToMinutes(openingTime);
  const closeMinutes = timeToMinutes(closingTime);

  // Get existing bookings for this space on this date
  const existingBookings = bookings.filter(
    (b) =>
      b.spaceId === spaceId &&
      b.date === date &&
      b.status !== "cancelled"
  );

  const slots: TimeSlot[] = [];

  for (let start = openMinutes; start + 60 <= closeMinutes; start += 60) {
    const slotStart = minutesToTime(start);
    const slotEnd = minutesToTime(start + 60);

    // Check if any existing booking overlaps this slot
    const isOccupied = existingBookings.some((b) => {
      // Full-day or half-day bookings without times block the whole day
      if (!b.startTime || !b.endTime) return true;

      const bookingStart = timeToMinutes(b.startTime);
      const bookingEnd = timeToMinutes(b.endTime);
      return start < bookingEnd && start + 60 > bookingStart;
    });

    slots.push({
      startTime: slotStart,
      endTime: slotEnd,
      available: !isOccupied,
    });
  }

  return slots;
}

/**
 * Check if a space is available for a given date and duration.
 */
export function isSpaceAvailable(
  spaceId: string,
  date: string,
  durationType: DurationType,
  startTime?: string,
  endTime?: string
): boolean {
  const existingBookings = bookings.filter(
    (b) =>
      b.spaceId === spaceId &&
      b.date === date &&
      b.status !== "cancelled"
  );

  if (existingBookings.length === 0) return true;

  if (durationType === "full_day") {
    // Full day conflicts with any existing booking
    return false;
  }

  if (durationType === "half_day" || durationType === "hourly") {
    // If any existing booking is full-day, space is unavailable
    if (existingBookings.some((b) => !b.isHalfDay && !b.startTime)) {
      return false;
    }

    if (startTime && endTime) {
      const reqStart = timeToMinutes(startTime);
      const reqEnd = timeToMinutes(endTime);

      return !existingBookings.some((b) => {
        if (!b.startTime || !b.endTime) return true;
        const bStart = timeToMinutes(b.startTime);
        const bEnd = timeToMinutes(b.endTime);
        return reqStart < bEnd && reqEnd > bStart;
      });
    }
  }

  return true;
}

/**
 * Get spaces for a property with availability info for a given date.
 */
export function getSpacesWithAvailability(
  propertyId: string,
  date: string
): (Space & { available: boolean })[] {
  const propertySpaces = getSpacesForProperty(propertyId);
  return propertySpaces.map((space) => ({
    ...space,
    available: isSpaceAvailable(space.id, date, "full_day"),
  }));
}

let bookingCounter = 100;

/**
 * Create a new booking (in-memory, mock only).
 * Returns the created Booking object.
 */
export function createBooking(params: BookingParams): Booking {
  bookingCounter++;
  const now = new Date().toISOString();

  return {
    id: `booking-${String(bookingCounter).padStart(3, "0")}`,
    userId: params.userId,
    spaceId: params.spaceId,
    propertyId: params.propertyId,
    organisationId: params.organisationId,
    status: params.bookingType === "instant" ? "confirmed" : "pending",
    date: params.date,
    startTime: params.startTime,
    endTime: params.endTime,
    isHalfDay: params.durationType === "half_day",
    guestCount: params.guestCount,
    totalPrice: params.totalPrice,
    notes: params.notes,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Format a duration type for display.
 */
export function formatDurationType(durationType: DurationType): string {
  switch (durationType) {
    case "full_day":
      return "Full day";
    case "half_day":
      return "Half day";
    case "hourly":
      return "Hourly";
  }
}
