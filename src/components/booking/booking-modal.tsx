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
import type { Space, BookingType } from "@/types/database";

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
  propertyName,
  spaces,
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

  // Reset state whenever the modal opens
  useEffect(() => {
    if (open) {
      setSelectedSpaceId(preSelectedSpaceId ?? null);
      setStep(preSelectedSpaceId ? "date-time" : "select-space");
    }
  }, [open, preSelectedSpaceId]);

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

          {step === "date-time" && (
            <p className="text-sm text-muted-foreground py-4">
              Date picker coming in Step 4
            </p>
          )}

          {step === "details" && (
            <p className="text-sm text-muted-foreground py-4">
              Details coming in Step 5
            </p>
          )}

          {step === "confirmation" && (
            <p className="text-sm text-muted-foreground py-4">
              Confirmation coming in Step 5
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
