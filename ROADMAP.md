# Roadmap

## Vision

Workabout is a two-sided marketplace for flexible workspace booking in the UK -- coworking spaces, meeting rooms, and event venues. This rebuild replaces the legacy Rails platform with a modern Next.js stack, delivering a fully styled, production-grade application with employer budget controls, provider management, and platform admin tooling.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Hosting:** Vercel
- **Database:** Supabase (managed Postgres)
- **ORM:** Prisma
- **Auth:** Clerk (orgs, roles, MFA)
- **Payments:** Stripe Connect (Custom accounts)
- **Search:** Meilisearch (geo + facets + typo-tolerant)
- **UI:** shadcn/ui + Tailwind CSS
- **Maps:** Google Maps Platform
- **File Storage:** Cloudflare R2
- **Email:** Resend + React Email
- **Background Jobs:** Inngest
- **Analytics:** PostHog
- **Errors:** Sentry

## Up Next

### 2. Search & Discovery [APP]
**Status:** NOT STARTED
Map + list split view (Airbnb-style), filters (space type, date, capacity, amenities, price range), listing cards with thumbnails, SSR for SEO, responsive layout.

### 3. Listing Detail [APP]
**Status:** NOT STARTED
Photo gallery, property description, amenities grid (27 items), space cards with pricing (full-day/half-day/hourly), reviews section, "Book" CTA linking to booking flow.

### 4. Booking Flow [APP]
**Status:** NOT STARTED
Date/time picker, space selection, guest count, price summary with budget impact, booking modal with confirmation, instant vs manual booking paths.

### 5. Employer Dashboard [APP]
**Status:** NOT STARTED
My bookings (upcoming/past), quick search bar, employee management table (invite, CSV import, role/team assignment), booking history with filters.

### 6. Budget & Restrictions [APP]
**Status:** NOT STARTED
Company budget pool, tier config (Tier 1/2/3 with amounts), team allocation, geofencing UI, booking restrictions, budget impact preview before booking.

### 7. Provider Dashboard [APP]
**Status:** NOT STARTED
Earnings KPIs (total, current month, booking count), revenue chart (monthly), property list with status indicators, booking history across all properties.

### 8. Property Wizard [APP]
**Status:** NOT STARTED
8-tab create/edit flow: Location, Description, Time Settings, Booking Process, Gallery, Amenities, Spaces, Status. Progress bar with completion percentage.

### 9. Admin Panel [APP]
**Status:** NOT STARTED
Admin dashboard (GMV, take rate, active bookings), provider onboarding pipeline (Applied > Documents > Review > Approved), property review queue, settlement processing, employer activation, dispute resolution, audit log.

### 10. Auth & Role Switching [APP]
**Status:** NOT STARTED
Clerk integration, three account types (Provider/Employer/Individual), role-based navigation and views, org hierarchy (Admin > Manager > Employee), signup flow with email verification.

## Ideas

<!-- Future ideas go here -->

## Complete

### 1. Project Scaffold & Design System [INFRA] -- v0.1.4 (11/03/26)
Next.js 15 + Tailwind v4 + shadcn/ui, DM Sans/Fira Code fonts, Workabout brand design tokens (light/dark), collapsible sidebar with role-aware nav, topbar, 26-entity TypeScript types with mock fixtures, all placeholder pages navigable across employer/provider/admin routes.
