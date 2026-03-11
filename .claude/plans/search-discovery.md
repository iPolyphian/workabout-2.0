# Feature 2: Search & Discovery

**Type:** APP
**Version range:** v0.2.x
**Goal:** Build the primary search experience for employers finding coworking spaces. When done, a user can browse a split-view (list + map) of properties, filter by space type / capacity / price range / amenities, see property cards with thumbnails and ratings, and toggle between list and map on mobile. All data is mock (client-side filtering over fixtures). The page is SSR-rendered for initial load (SEO), with client-side interactivity for filters and map.

---

## Overview: What "Done" Looks Like

- `/search` renders a split-view: scrollable property card list on the left, interactive map on the right
- A filter bar above the results lets users filter by space type (multi-select), capacity (min guests), price range (slider), and amenities (multi-select)
- Filter state is synced to URL searchParams (shareable/bookmarkable)
- Property cards show thumbnail, name, city, rating, review count, available space types, and starting price
- Map shows pins at property coordinates with price labels; hovering a card highlights the corresponding pin, clicking a pin scrolls to its card
- On mobile (< 768px), list and map are full-width tabs (not side-by-side); filters collapse into a drawer
- Initial results are server-rendered (fixture data, no loading spinner on first paint)
- No real APIs, no Meilisearch, no paid Google Maps key required -- map uses `@vis.gl/react-google-maps` with a placeholder/static fallback, filter logic runs client-side over fixture arrays

---

## Step 1: Search data layer -- amenity fixtures + property search helpers
**Recommended:** Sonnet + low thinking

### What to build
The current fixtures have Properties and Spaces but no Amenity fixtures, no property-to-amenity mapping, and no helper functions for filtering. This step creates the data foundation the search UI will consume.

### Key files to create/modify
- `src/data/fixtures/amenities.ts` -- fixture data for ~15 amenities (subset of the 27 in the blueprint, enough to demonstrate filtering). Each amenity has id, name, icon (lucide icon name string), and category.
- `src/data/fixtures/property-amenities.ts` -- mapping of property IDs to amenity IDs (many-to-many join fixture)
- `src/data/fixtures/index.ts` -- add new barrel exports
- `src/lib/search.ts` -- pure functions for search/filter logic:
  - `getActiveProperties()` -- returns only status="active" properties
  - `getSpacesForProperty(propertyId)` -- returns spaces for a property
  - `getAmenitiesForProperty(propertyId)` -- returns amenities for a property
  - `getLowestPrice(propertyId)` -- returns the cheapest fullDayPrice across a property's spaces
  - `getSpaceTypes(propertyId)` -- returns unique SpaceType values for a property
  - `filterProperties(properties, filters)` -- applies all filters (space type, capacity, price range, amenities) and returns matching properties
  - `SearchFilters` type definition

### Contract
- [ ] [auto] Amenity fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/amenities.ts exists
- [ ] [auto] Property-amenity mapping exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/property-amenities.ts exists
- [ ] [auto] Barrel export updated. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/index.ts contains amenities
- [ ] [auto] Search helpers exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/search.ts contains filterProperties
- [ ] [auto] SearchFilters type exported. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/search.ts contains SearchFilters
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"

---

## Step 2: Property card component
**Recommended:** Sonnet + medium thinking

### What to build
A reusable `PropertyCard` component that displays a property's thumbnail, name, city, rating/reviews, available space types as badges, and starting price. This is the atomic building block of the list view. Design follows the existing card/badge patterns from shadcn/ui.

### Key files to create/modify
- `src/components/search/property-card.tsx` -- the card component
  - Thumbnail image (Next.js `<Image>` with blur placeholder or gradient fallback for missing images)
  - Property name (Barlow heading), city underneath
  - Star rating + review count (e.g. "4.7 (84 reviews)")
  - Space type badges (using existing Badge component with brand colors)
  - Starting price formatted as "From GBP XX/day" (convert pence to pounds)
  - Hover state: subtle elevation/border change
  - `isHighlighted` prop for map interaction (indigo left border when active)
  - `onMouseEnter`/`onMouseLeave` callbacks for map pin hover sync
- `src/lib/format.ts` -- utility functions:
  - `formatPrice(pence)` -- converts pence to formatted GBP string (e.g. 3500 -> "35")
  - `formatSpaceType(type)` -- converts enum to display label (e.g. "hot_desk" -> "Hot Desk")
  - `formatRating(rating)` -- formats to 1 decimal place

### Contract
- [ ] [auto] Property card component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx exists
- [ ] [auto] Format utilities exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/format.ts contains formatPrice
- [ ] [auto] Card uses Next.js Image. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains next/image
- [ ] [auto] Card accepts highlight prop. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains isHighlighted
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Card renders with thumbnail, name, city, rating, badges, and price in a compact layout
- [ ] [manual] Hover state shows subtle visual feedback (elevation or border)

---

## Step 3: Filter bar with URL sync
**Recommended:** Opus + high thinking

### What to build
The filter bar above the search results. Filters sync bidirectionally with URL searchParams so results are shareable and SSR-compatible. This is the most architecturally important step -- the URL-as-state pattern determines how SSR and client-side filtering interact.

### Key files to create/modify
- `src/components/search/filter-bar.tsx` -- the horizontal filter bar (desktop)
  - Space type multi-select (checkboxes in a popover/dropdown)
  - Capacity input (number input, min guests)
  - Price range (dual-handle slider, min/max in GBP)
  - Amenities multi-select (checkboxes in a popover/dropdown)
  - Active filter count badges on each filter button
  - "Clear all" button when any filters are active
- `src/components/search/filter-drawer.tsx` -- mobile version: full filter UI in a Sheet/Drawer (uses existing shadcn Sheet component), triggered by a "Filters" button with active count badge
- `src/hooks/use-search-params-state.ts` -- custom hook that:
  - Reads current searchParams from `useSearchParams()`
  - Parses them into a `SearchFilters` object
  - Provides setter functions that update both local state and URL (via `useRouter().replace()` with shallow routing)
  - Serializes filter state to searchParams string
- Install shadcn/ui components needed: `Popover`, `Checkbox`, `Slider`, `Input`, `Separator`

### Technical notes
- Filters are parsed from searchParams on the server for SSR, then hydrated client-side
- URL format: `/search?types=hot_desk,private_office&capacity=4&priceMin=20&priceMax=100&amenities=wifi,parking`
- Price values in URL are in GBP (not pence) for human readability
- Use `nuqs` or a lightweight custom hook for searchParam state -- avoid heavy routing libraries. If custom, use `useSearchParams` + `useRouter` + `usePathname` from `next/navigation`.

### Contract
- [ ] [auto] Filter bar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/filter-bar.tsx exists
- [ ] [auto] Filter drawer exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/filter-drawer.tsx exists
- [ ] [auto] Search params hook exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/hooks/use-search-params-state.ts exists
- [ ] [auto] Hook reads URL params. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/hooks/use-search-params-state.ts contains useSearchParams
- [ ] [auto] Popover component installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/popover.tsx exists
- [ ] [auto] Slider component installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/slider.tsx exists
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Selecting filters updates the URL bar in real time
- [ ] [manual] Pasting a URL with filter params pre-selects the correct filters
- [ ] [manual] "Clear all" resets filters and URL
- [ ] [manual] On mobile (< 768px), filters appear in a slide-up drawer

---

## Step 4: Map panel with property pins
**Recommended:** Sonnet + medium thinking

### What to build
The right-side map panel showing property locations as pins with price labels. Uses `@vis.gl/react-google-maps` for the map. For development without a Google Maps API key, include a static fallback that renders a styled placeholder with pin dots at approximate positions (CSS-based).

### Key files to create/modify
- `src/components/search/search-map.tsx` -- the map component
  - Renders Google Map centered on London (or computed bounds from visible properties)
  - Custom pin markers showing the property's starting price (styled with brand colors)
  - `highlightedPropertyId` prop -- highlights the corresponding pin when a card is hovered
  - `onPropertyClick(propertyId)` callback -- fires when a pin is clicked
  - `onBoundsChange(bounds)` callback -- fires when map viewport changes (for future search-as-you-move)
  - Loading/error fallback: styled div with property dots plotted by lat/lng relative to a bounding box (works without API key)
- `src/components/search/map-pin.tsx` -- custom marker component
  - Pill shape with price text (e.g. "GBP 35")
  - Default: white bg + dark text
  - Highlighted: indigo bg + white text
  - Hover: subtle scale-up
- Install: `@vis.gl/react-google-maps`
- `src/components/search/map-fallback.tsx` -- static CSS-based map placeholder (used when no Google Maps API key is configured). Renders a grey rectangle with small dots at each property's relative position. Good enough for development and testing without credentials.

### Technical notes
- Google Maps API key goes in `.env` as `NEXT_PUBLIC_GOOGLE_MAPS_KEY`. When empty/missing, the fallback renders instead.
- The map component should be dynamically imported with `next/dynamic` + `ssr: false` to avoid SSR issues with the Maps JS API.
- Pin clustering is deferred to a later enhancement -- with only 6 active properties, it is not needed yet.

### Contract
- [ ] [auto] Map component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx exists
- [ ] [auto] Map pin component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/map-pin.tsx exists
- [ ] [auto] Map fallback exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/map-fallback.tsx exists
- [ ] [auto] Map accepts highlight prop. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx contains highlightedPropertyId
- [ ] [auto] Dynamic import used. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx contains next/dynamic
- [ ] [auto] Google Maps package installed. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && grep -q "react-google-maps" package.json
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Map (or fallback) renders with pins at correct relative positions
- [ ] [manual] Pin shows price and uses brand colors

---

## Step 5: Split-view search page -- list + map + filter integration
**Recommended:** Opus + high thinking

### What to build
Wire everything together into the final `/search` page. Replace the placeholder with the split-view layout: filter bar on top, property list on the left, map on the right. Implement the hover/click interaction between list and map. Apply client-side filtering. Server-render initial results.

### Key files to create/modify
- `src/app/(employer)/search/page.tsx` -- the search page (server component)
  - Reads searchParams, runs `filterProperties()` server-side for SSR
  - Passes filtered properties + filter state to the client layout component
- `src/components/search/search-layout.tsx` -- client component ("use client")
  - Split-view: left panel (scrollable card list), right panel (map), filter bar above both
  - Manages `highlightedPropertyId` state for hover interaction
  - Card hover -> updates highlightedPropertyId -> map pin highlights
  - Map pin click -> scrolls card list to the clicked property's card (via ref + scrollIntoView)
  - Responsive: on mobile (< 768px), show tab toggle ("List" / "Map") instead of split-view
  - Results count header (e.g. "6 workspaces in London")
  - Empty state when no results match filters
- `src/app/(employer)/search/layout.tsx` -- optional: override the default AppShell padding for the search page to allow the map to fill the right edge. The main content area needs the map to go edge-to-edge on the right, while the list panel retains padding.

### Interaction details
- **Card hover -> pin highlight:** `onMouseEnter` on PropertyCard sets `highlightedPropertyId`, which is passed to SearchMap. The corresponding MapPin gets the highlighted style (indigo bg).
- **Pin click -> scroll to card:** `onPropertyClick` from SearchMap triggers `scrollIntoView({ behavior: 'smooth', block: 'center' })` on the matching card. The card briefly flashes with a highlight animation.
- **Filter changes:** When filters change (via URL), the property list re-filters client-side from the full fixture set. The map updates to show only matching properties.
- **Mobile toggle:** A segmented control ("List" | "Map") switches between full-width views. Filter button sits in the same bar.

### Layout considerations
- The search page needs special layout treatment: the map should extend to the right edge of the viewport (no right padding), while the card list retains standard padding. This may require overriding the AppShell's `<main>` padding for this route, or wrapping the search content in a full-width container.
- Split ratio: ~55% list, ~45% map (adjustable via CSS, not a resize handle).
- Map height: fills the viewport below the filter bar (sticky, not scrolling with the list).

### Contract
- [ ] [auto] Search page replaced. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/page.tsx contains filterProperties
- [ ] [auto] Search layout component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx exists
- [ ] [auto] Layout is client component. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains use client
- [ ] [auto] Mobile toggle exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains List
- [ ] [auto] Highlight state managed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains highlightedPropertyId
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Split view shows list on left, map on right on desktop
- [ ] [manual] Hovering a card highlights the corresponding map pin
- [ ] [manual] Clicking a map pin scrolls to and highlights the corresponding card
- [ ] [manual] Filters reduce the visible results in both list and map
- [ ] [manual] On mobile, List/Map toggle switches between full-width views
- [ ] [manual] Empty state shows when no properties match filters

---

## Step 6: SSR, responsive polish, and empty states
**Recommended:** Sonnet + medium thinking

### What to build
Final polish pass: ensure SSR works correctly for SEO (server-rendered property cards in page source), refine responsive breakpoints, add proper loading/empty states, and verify accessibility basics.

### Key files to create/modify
- `src/app/(employer)/search/page.tsx` -- verify SSR: initial HTML includes property names and prices (not just a loading skeleton)
- `src/components/search/search-layout.tsx` -- responsive refinements:
  - Breakpoint behaviour: < 768px = mobile (toggle view), 768-1024px = narrow split (40/60), > 1024px = standard split (55/45)
  - Filter bar: collapses cleanly at each breakpoint
  - Card list: adjusts padding/margins for narrow viewports
- `src/components/search/empty-state.tsx` -- friendly empty state component
  - Illustration or icon
  - "No workspaces match your filters" message
  - "Clear filters" button
  - "Try widening your search" suggestion
- Accessibility checks:
  - All filter controls have labels (aria-label or visible label)
  - Map pins have aria-label with property name and price
  - Card images have alt text
  - Keyboard navigation works through filter controls
- `next.config.ts` -- add `images.remotePatterns` for Unsplash domain (required for Next.js Image optimization of fixture cover photos)

### Contract
- [ ] [auto] Empty state component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/empty-state.tsx exists
- [ ] [auto] Unsplash image domain configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/next.config.ts contains unsplash
- [ ] [auto] Property cards have alt text. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains alt
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] View page source shows property names and prices in HTML (SSR working)
- [ ] [manual] Mobile layout is usable at 375px width (iPhone SE)
- [ ] [manual] Tablet layout (768px) shows a sensible split or toggle
- [ ] [manual] Empty state appears when all filters are set to impossible values
- [ ] [manual] Tab key navigates through filter controls in logical order

---

## Technical Decisions

### State management for filters
URL searchParams are the single source of truth for filter state. This gives us SSR compatibility (server can read params and pre-filter), shareability (copy URL = share search), and browser history (back button undoes filter changes). A custom `useSearchParamsState` hook wraps `next/navigation` to provide a React-friendly API. No external state library (Zustand, Jotai) needed -- the URL is the store.

### Map library
`@vis.gl/react-google-maps` -- the official Google-maintained React wrapper for Google Maps. Lightweight, well-typed, and tree-shakeable. Alternatives considered:
- `react-leaflet` (Leaflet/OpenStreetMap): free and no API key, but less polished map tiles and no Street View. Could swap in later if cost matters.
- `mapbox-gl`: excellent but requires a paid key for production and a separate React wrapper.
- Decision: start with `@vis.gl/react-google-maps` + a CSS fallback for when no key is configured. This lets us develop without a key and upgrade seamlessly when a Google Maps key is provisioned.

### Component structure
All search components live in `src/components/search/` -- not in `src/components/ui/` (which is for shadcn/ui primitives) or `src/components/shared/` (which is for cross-feature components). The search page is the only consumer of these components for now.

### SSR strategy
The search page (`page.tsx`) is a server component that reads `searchParams`, runs `filterProperties()` over fixture data, and passes results to a client component (`SearchLayout`). This means the initial HTML includes real property data (good for SEO). Client-side filter changes re-run the filter logic in the browser (no server round-trip needed since all data is in fixtures). When Meilisearch is integrated later, the server component will call the Meilisearch API instead of filtering fixtures, and the client will call a Route Handler for subsequent filter changes.

### Prices
All internal prices are in pence (integers), matching the database schema. Display formatting converts to GBP with `formatPrice()`. URL params use GBP values (human-readable). The conversion boundary is at the UI layer only.

### Image handling
Fixture properties use Unsplash URLs with `?w=800` for reasonable sizing. Next.js `<Image>` with `remotePatterns` for Unsplash handles optimization. A gradient/placeholder fallback handles missing images (one fixture property has no `coverImageUrl`).

---

## Dependencies

### shadcn/ui components to install
```bash
npx shadcn@latest add popover
npx shadcn@latest add checkbox
npx shadcn@latest add slider
npx shadcn@latest add input
npx shadcn@latest add separator
npx shadcn@latest add tabs        # for mobile list/map toggle
npx shadcn@latest add toggle-group # alternative for list/map toggle
```

### npm packages to install
```bash
npm install @vis.gl/react-google-maps
```

### Environment variables to add
```env
NEXT_PUBLIC_GOOGLE_MAPS_KEY=   # optional -- fallback renders without it
```

### No additional packages needed for:
- URL state management (using Next.js built-in `useSearchParams` + `useRouter`)
- Client-side filtering (pure TypeScript functions over fixture arrays)
- Icons (using existing `lucide-react`)
- Styling (using existing Tailwind + shadcn/ui)
