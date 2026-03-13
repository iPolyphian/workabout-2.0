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

### 11. Employer HQ [APP]
**Status:** NOT STARTED
**Depends on:** Property Wizard (#8)
Employer lists their own office as a bookable internal workspace. Reuses the Property Wizard with `internal_only: true` + `organisation_id`. Visible only to org employees, hidden from public search. Lets employers manage who is in the office on any given day. Paid module (£5/employee/month in production). Nav item added in Employer Dashboard (#5).

## Ideas

<!-- Future ideas go here -->

## Complete

### 4. Booking Flow [APP] -- v0.4.5 (12/03/26)
Multi-step booking modal from listing detail. Space selector grid, calendar date picker with past-date disabling, duration type radio (full/half/hourly based on space pricing), time slot picker with availability checking, guest count with capacity cap, price breakdown, instant vs manual confirmation paths, back navigation, mobile full-screen. 6 steps, 24 auto contracts passed.

### 3. Listing Detail [APP] -- v0.3.5 (11/03/26)
Photo gallery with lightbox, property header with rating/hours/booking type, amenities grid grouped by category with Lucide icons, space cards with pricing tiers, reviews section with show-more, Book CTA (sticky on mobile), SSR server component, 404 handling. 6 steps, 18 auto contracts passed.

### 2. Search & Discovery [APP] -- v0.2.5 (11/03/26)
Split-view search page (list + map), filter bar with URL sync (space type, capacity, price range, amenities), property cards with thumbnails/ratings/badges, mobile list/map toggle, SSR server component, CSS map fallback for dev. 6 steps, 35 auto contracts passed.

### 1. Project Scaffold & Design System [INFRA] -- v0.1.4 (11/03/26)
Next.js 15 + Tailwind v4 + shadcn/ui, DM Sans/Fira Code fonts, Workabout brand design tokens (light/dark), collapsible sidebar with role-aware nav, topbar, 26-entity TypeScript types with mock fixtures, all placeholder pages navigable across employer/provider/admin routes.
