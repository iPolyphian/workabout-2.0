"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SpaceSelector } from "@/components/booking/space-selector";
import { DateTimePicker } from "@/components/booking/date-time-picker";
import { PriceSummary } from "@/components/booking/price-summary";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { createBooking, calculateBookingPrice } from "@/lib/booking";
import type { Space, BookingType } from "@/types/database";
import type { DurationType } from "@/lib/booking";

type BookingStep = "select-space" | "date-time" | "details" | "confirmation";

const STEPS: BookingStep[] = [
  "select-space",
  "date-time",
  "details",
  "confirmation",
];

const STEP_LABELS: Record<BookingStep, string> = {
  "select-space": "Select a Space",
  "date-time": "Date & Time",
  details: "Your Details",
  confirmation: "Confirmation",
};

interface BookingModalProps {
  propertyId: string;
  propertyName: string;
  spaces: Space[];
  bookingType: BookingType;
  openingTime: string; // HH:mm
  closingTime: string; // HH:mm
  cancellationHours: number;
  preSelectedSpaceId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({
  propertyId,
  propertyName,
  spaces,
  bookingType,
  openingTime,
  closingTime,
  cancellationHours,
  preSelectedSpaceId,
  open,
  onOpenChange,
}: BookingModalProps) {
  const initialStep: BookingStep = preSelectedSpaceId
    ? "date-time"
    : "select-space";

  const [step, setStep] = useState<BookingStep>(initialStep);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(
    preSelectedSpaceId ?? null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDurationType, setSelectedDurationType] = useState<DurationType | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string | undefined>(undefined);
  const [selectedEndTime, setSelectedEndTime] = useState<string | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(1);

  // Reset state whenever the modal opens
  useEffect(() => {
    if (open) {
      setSelectedSpaceId(preSelectedSpaceId ?? null);
      setStep(preSelectedSpaceId ? "date-time" : "select-space");
      setSelectedDate(null);
      setSelectedDurationType(null);
      setSelectedStartTime(undefined);
      setSelectedEndTime(undefined);
      setGuestCount(1);
    }
  }, [open, preSelectedSpaceId]);

  const selectedSpace = spaces.find((s) => s.id === selectedSpaceId);

  // Steps shown to the user depend on whether space selection is needed
  const visibleSteps = preSelectedSpaceId
    ? (["date-time", "details", "confirmation"] as BookingStep[])
    : STEPS;

  const stepNumber = visibleSteps.indexOf(step) + 1;
  const totalSteps = visibleSteps.length;

  function handleSpaceSelect(spaceId: string) {
    setSelectedSpaceId(spaceId);
    setStep("date-time");
  }

  function handleDateTimeContinue(
    date: string,
    durationType: DurationType,
    startTime?: string,
    endTime?: string
  ) {
    setSelectedDate(date);
    setSelectedDurationType(durationType);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setStep("details");
  }

  function handleDetailsContinue(guests: number) {
    setGuestCount(guests);
    setStep("confirmation");
  }

  function handleConfirm(notes?: string) {
    if (!selectedSpace || !selectedDate || !selectedDurationType) return;

    let hours: number | undefined;
    if (selectedDurationType === "hourly" && selectedStartTime && selectedEndTime) {
      const [sh, sm] = selectedStartTime.split(":").map(Number);
      const [eh, em] = selectedEndTime.split(":").map(Number);
      hours = (eh * 60 + em - sh * 60 - sm) / 60;
    }

    const total = calculateBookingPrice(selectedSpace, selectedDurationType, hours);

    createBooking({
      userId: "user-001",
      spaceId: selectedSpace.id,
      propertyId,
      date: selectedDate,
      durationType: selectedDurationType,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
      guestCount,
      totalPrice: total,
      bookingType,
      notes,
    });
  }

  // Pre-calculate hours and total price for the confirmation step
  const confirmedHours =
    selectedDurationType === "hourly" && selectedStartTime && selectedEndTime
      ? (() => {
          const [sh, sm] = selectedStartTime.split(":").map(Number);
          const [eh, em] = selectedEndTime.split(":").map(Number);
          return (eh * 60 + em - sh * 60 - sm) / 60;
        })()
      : undefined;

  const totalPrice =
    selectedSpace && selectedDurationType
      ? calculateBookingPrice(selectedSpace, selectedDurationType, confirmedHours)
      : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{propertyName}</DialogTitle>
          <DialogDescription>
            Step {stepNumber} of {totalSteps} — {STEP_LABELS[step]}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          {step === "select-space" && (
            <SpaceSelector spaces={spaces} onSelect={handleSpaceSelect} />
          )}

          {step === "date-time" && selectedSpace && (
            <DateTimePicker
              space={selectedSpace}
              openingTime={openingTime}
              closingTime={closingTime}
              onContinue={handleDateTimeContinue}
            />
          )}

          {step === "details" && selectedSpace && selectedDate && selectedDurationType && (
            <PriceSummary
              space={selectedSpace}
              date={selectedDate}
              durationType={selectedDurationType}
              startTime={selectedStartTime}
              endTime={selectedEndTime}
              onContinue={handleDetailsContinue}
            />
          )}

          {step === "confirmation" && selectedSpace && selectedDate && selectedDurationType && (
            <BookingConfirmation
              space={selectedSpace}
              propertyName={propertyName}
              date={selectedDate}
              durationType={selectedDurationType}
              startTime={selectedStartTime}
              endTime={selectedEndTime}
              guestCount={guestCount}
              totalPrice={totalPrice}
              bookingType={bookingType}
              cancellationHours={cancellationHours}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
