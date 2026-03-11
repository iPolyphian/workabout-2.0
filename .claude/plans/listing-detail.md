# Listing Detail [APP] — v0.3.x

## Overview

Full property listing page accessible from search results. Shows photo gallery, property description, amenities grid, space cards with pricing tiers, reviews section, and a "Book" CTA linking to the future booking flow. Mock data only — renders from fixtures.

## Route

`/search/[propertyId]` — stays within the `(employer)` route group, inherits AppShell layout.

## Data Dependencies

All data available from existing fixtures + helpers:
- `properties.ts` — property details (name, description, address, hours, rating, etc.)
- `spaces.ts` — 25 spaces across 8 properties with full/half/hourly pricing
- `amenities.ts` + `property-amenities.ts` — 15 amenities in 4 categories
- `reviews.ts` — 10 reviews with ratings and comments
- **New needed:** `photos.ts` — Photo type exists but no fixtures yet

Existing helpers in `src/lib/search.ts`:
- `getSpacesForProperty(id)` — active spaces for a property
- `getAmenitiesForProperty(id)` — amenities linked to property
- `getLowestPrice(id)` — minimum full-day price

New helpers needed in `src/lib/property.ts`:
- `getPropertyById(id)` — find single property
- `getReviewsForProperty(id)` — reviews for a property
- `getPhotosForProperty(id)` — photos for a property

## Steps

### Step 1: Photo fixtures + gallery component → v0.3.0
**Model: Sonnet + medium**

Create photo fixtures for each active property (4-6 photos each using Unsplash placeholder URLs). Build a gallery component with:
- Hero image (first photo, full-width)
- Thumbnail strip below (remaining photos)
- Click to expand (lightbox-style overlay with next/prev navigation)
- "Show all photos" button when > 4 photos
- Mobile: horizontal scroll thumbnails

Files:
- `src/data/fixtures/photos.ts` (new)
- `src/data/fixtures/index.ts` (update barrel export)
- `src/components/listing/photo-gallery.tsx` (new)
- `src/components/listing/lightbox.tsx` (new)

### Step 2: Property info + amenities grid → v0.3.1
**Model: Sonnet + medium**

Property header section:
- Property name (h1), city, rating stars + review count
- Address, opening hours, booking type badge (instant/manual)
- Description paragraph

Amenities grid:
- Grouped by category (Connectivity, Facilities, Comfort, Services)
- Each amenity shows lucide icon + name
- 4-column grid on desktop, 2-column on mobile
- Category headings

Files:
- `src/components/listing/property-header.tsx` (new)
- `src/components/listing/amenities-grid.tsx` (new)
- `src/lib/property.ts` (new — getPropertyById, getReviewsForProperty, getPhotosForProperty)

### Step 3: Space cards with pricing → v0.3.2
**Model: Sonnet + medium**

Cards for each space at the property:
- Space name, type badge, capacity
- Pricing table: full-day, half-day (if available), hourly (if available)
- Prices formatted in GBP (from pence)
- Description text
- "Book this space" button (disabled/placeholder — links to future booking flow)
- Cards in a responsive grid (1-col mobile, 2-col desktop)

Files:
- `src/components/listing/space-card.tsx` (new)
- `src/components/listing/space-list.tsx` (new)
- `src/lib/format.ts` (update — add formatPriceTier helper if needed)

### Step 4: Reviews section → v0.3.3
**Model: Sonnet + medium**

Reviews display:
- Summary bar: average rating (large), star display, total review count
- Individual review cards: rating stars, comment, date, anonymised user
- Sort by newest (default)
- "Show more" if > 3 reviews (expand in place)

Files:
- `src/components/listing/review-card.tsx` (new)
- `src/components/listing/reviews-section.tsx` (new)

### Step 5: Listing page assembly + search navigation → v0.3.4
**Model: Sonnet + medium**

Wire everything together:
- Create the dynamic route page `src/app/(employer)/search/[propertyId]/page.tsx`
- Server component — fetches all data, passes to client sub-components
- Layout: gallery → header → amenities → spaces → reviews → Book CTA
- Sticky "Book" CTA bar at bottom on mobile
- Update PropertyCard in search to link to `/search/[propertyId]`
- Back navigation (breadcrumb: Search > Property Name)
- 404 handling for invalid propertyId

Files:
- `src/app/(employer)/search/[propertyId]/page.tsx` (new)
- `src/components/listing/listing-page.tsx` (new — client layout orchestrator)
- `src/components/listing/book-cta.tsx` (new)
- `src/components/search/property-card.tsx` (update — add Link)

### Step 6: Responsive polish + SSR + empty states → v0.3.5
**Model: Sonnet + medium**

- Verify SSR (property data in page source)
- Mobile layout review at 375px
- Tablet layout at 768px
- Empty states: property with no reviews, property with no photos
- Scroll-to-section from anchor links (e.g. click review count → scroll to reviews)
- Unsplash image domains already configured in next.config.ts
- Accessibility: alt text on all images, heading hierarchy, keyboard nav

Files:
- Various component files (polish edits)
- `next.config.ts` (if additional image domains needed)

## Design Notes

- Keep the Linear-inspired aesthetic from the existing app — clean, spacious, muted
- Use existing design tokens (indigo primary, terracotta accents)
- Lucide icons throughout (amenities already have icon names in fixtures)
- All components in `src/components/listing/` (feature-scoped, per project convention)
- Server component at page level, client components where interactivity needed
