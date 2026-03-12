# Booking Flow [APP] — v0.4.x

## Overview

Multi-step booking modal triggered from the listing detail page. Users select a space (or arrive with one pre-selected), pick a date and duration type, set guest count, review a price summary, and confirm. Two booking paths: instant (confirmed immediately) and manual (pending provider approval). Mock data only — bookings are created in-memory, no API calls.

## Route

No new routes. The booking flow lives in a modal dialog overlaying `/search/[propertyId]`. Booking state is ephemeral (not URL-synced) since it's a transactional flow, not a browsable page.

## Data Dependencies

All data available from existing fixtures + helpers:
- `spaces.ts` — 25 spaces with full/half/hourly pricing in pence
- `properties.ts` — bookingType (instant/manual), openingTime/closingTime, cancellationHours
- `bookings.ts` — 12 existing fixture bookings (for availability checking)
- `src/lib/format.ts` — formatPrice, formatSpaceType

New helpers needed in `src/lib/booking.ts`:
- `calculateBookingPrice(space, durationType, hours?)` — price calculation for full/half/hourly
- `getAvailableTimeSlots(spaceId, date)` — check fixture bookings for conflicts
- `isSpaceAvailable(spaceId, date, durationType, startTime?, endTime?)` — availability check
- `createBooking(params)` — in-memory booking creation (returns Booking object)
- `getBookingsByDate(date)` — filter fixtures by date

New UI components needed:
- `shadcn/ui dialog` — modal container (not yet installed)
- `shadcn/ui calendar` — date picker (not yet installed, needs `react-day-picker`)
- `shadcn/ui radio-group` — duration type selector (not yet installed)
- `shadcn/ui select` — guest count dropdown (not yet installed)

## Component Architecture

```
BookingModal (dialog shell, manages step state)
├── SpaceSelector (grid of space cards, skipped if space pre-selected)
├── DateTimePicker
│   ├── Calendar (shadcn calendar)
│   ├── DurationTypeSelector (full-day / half-day / hourly radio)
│   └── TimeSlotPicker (for hourly bookings only)
├── GuestCountInput + PriceSummary
│   ├── GuestCounter (select dropdown, max = space.capacity)
│   └── PriceBreakdown (base price, duration, total)
└── BookingConfirmation
    ├── BookingSummary (all details in review format)
    ├── BookingNotes (optional textarea)
    └── ConfirmButton (instant → "Confirm Booking" / manual → "Request Booking")
```

## Flow States

1. **Space Selection** — Only shown when user clicks property-level "Book a Space" CTA. Skipped when clicking per-space "Book this space" button.
2. **Date & Time** — Calendar + duration type. Hourly shows time slot picker. Dates before today disabled. Dates with no availability shown greyed.
3. **Details** — Guest count (1 to space.capacity) + price summary with breakdown.
4. **Confirmation** — Review all details. Instant booking → confirmed immediately with success state. Manual booking → pending state with "we'll notify you" message.

## Steps

### Step 1: Booking UI primitives — dialog, calendar, radio group, select → v0.4.0
**Model: Sonnet + low**

Install missing shadcn/ui components: dialog, calendar (+ react-day-picker dep), radio-group, select. Verify they build and export correctly.

### Step 2: Booking data helpers → v0.4.1
**Model: Sonnet + medium**

Create `src/lib/booking.ts` with:
- `calculateBookingPrice(space, durationType, hours?)` — returns price in pence. Full day = fullDayPrice, half day = halfDayPrice (fallback: fullDayPrice * 0.6), hourly = hourlyPrice * hours.
- `getAvailableTimeSlots(spaceId, date, openingTime, closingTime)` — returns array of available 1-hour slots. Checks against fixture bookings for conflicts.
- `isSpaceAvailable(spaceId, date, durationType, startTime?, endTime?)` — boolean check.
- `createBooking(params)` — constructs a Booking object with generated ID and timestamps. Returns the booking (no persistence — mock only).
- Duration type: `"full_day" | "half_day" | "hourly"`.

### Step 3: Booking modal shell + space selector → v0.4.2
**Model: Sonnet + medium**

Create `src/components/booking/` directory. Build:
- `BookingModal` — dialog wrapper managing multi-step flow (steps 1-4). Accepts `propertyId`, optional `preSelectedSpaceId`, `open`/`onOpenChange` props.
- `SpaceSelector` — grid of clickable space cards showing name, type, capacity, starting price. Selecting advances to next step.
- Wire "Book this space" buttons in `space-card.tsx` and "Book a Space" in `book-cta.tsx` to open the modal.

### Step 4: Date picker + duration selector → v0.4.3
**Model: Sonnet + medium**

Build the date/time step:
- `DateTimePicker` — Calendar for date selection (past dates disabled). Duration type radio group (full-day/half-day/hourly — only show options the space supports based on pricing). For hourly: time slot picker showing available slots from property opening to closing time.
- Visual feedback: selected date highlighted, unavailable slots greyed out.
- "Continue" button enabled only when date + duration are valid.

### Step 5: Guest count, price summary, and confirmation → v0.4.4
**Model: Sonnet + medium**

Build the details + confirmation steps:
- `GuestCountInput` — select dropdown from 1 to space.capacity.
- `PriceBreakdown` — shows: space name, date, duration type, base price, total. For hourly: shows hours x rate. Clean tabular layout.
- `BookingConfirmation` — review screen with all details. Optional notes textarea. Confirm button text varies: "Confirm Booking" (instant) vs "Request Booking" (manual). Shows property's cancellationHours policy.
- On confirm: call `createBooking()`, show success state (instant: "Booking confirmed!" with details) or pending state (manual: "Request sent — the provider will confirm within 24 hours").

### Step 6: Integration, responsive polish, and edge states → v0.4.5
**Model: Sonnet + medium**

- Back navigation between modal steps (breadcrumb or back arrow).
- Mobile responsive: modal becomes full-screen sheet on mobile.
- Edge states: no available slots message, space at max capacity warning, property closed on selected date.
- Keyboard navigation: Escape closes modal, Tab navigates form controls.
- Accessibility: focus trap in modal, aria labels on form controls.

## Edge Cases

- **Space has no hourly pricing** — Don't show "Hourly" option in duration selector. Same for halfDayPrice.
- **All slots booked** — Show "No availability on this date" with suggestion to try another date.
- **Guest count exceeds capacity** — Dropdown maxes at space.capacity. Show capacity in label.
- **Property closed** — Calendar should disable days outside property operating schedule (future enhancement — skip for mock).
- **Instant vs manual** — Read from property.bookingType. Both paths create a booking; only the status differs (confirmed vs pending).
