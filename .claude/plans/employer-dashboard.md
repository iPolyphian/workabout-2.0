# Employer Dashboard [APP] — v0.6.x

## Overview

Employer-facing dashboard with overview stats, bookings management, employee administration, and booking history. The logged-in employer admin sees KPIs (active employees, period spend, upcoming bookings), a quick search bar to find workspaces, upcoming/past bookings, an employee management table (invite, CSV import, role/team assignment), and a filterable booking history across the organisation. Mock data only — no API calls.

## Routes

All routes exist as placeholder stubs in `src/app/(employer)/`:
- `/dashboard` — Overview page (KPI cards, quick search, recent bookings)
- `/bookings` — My Bookings (upcoming/past for logged-in user)
- `/booking-history` — All org bookings with filters
- `/employees` — Employee table with management actions
- `/hq` — HQ placeholder (employer's own office as internal bookable space — built later as separate feature, depends on Property Wizard)

Sidebar nav already has bookings/employees/budget/teams wired up. HQ nav item to be added in Step 1.

## Data Dependencies

**Existing:**
- `types/database.ts` — Organisation, Member, Team, Budget, BudgetTier, BookingRestriction, Booking, User types all defined
- `data/fixtures/bookings.ts` — 12 bookings with mixed statuses
- `data/fixtures/users.ts` — 8 users (3 employer roles at techcorp.co.uk)
- `src/lib/booking.ts` — calculateBookingPrice, createBooking, availability helpers
- `src/lib/format.ts` — formatPrice, formatSpaceType, formatRating

**New fixtures needed:**
- `data/fixtures/organisations.ts` — 2 orgs (TechCorp as primary, DesignCo as secondary)
- `data/fixtures/teams.ts` — 3-4 teams per org
- `data/fixtures/members.ts` — Map existing users to orgs with roles/tiers
- `data/fixtures/budgets.ts` — Budget + tiers per org

**New helpers needed in `src/lib/dashboard.ts`:**
- `getOrganisationById(id)` — org lookup
- `getMembersForOrg(orgId)` — filtered member list
- `getTeamsForOrg(orgId)` — filtered team list
- `getBookingsForOrg(orgId)` — all org bookings
- `getBookingsForUser(userId)` — user-specific bookings
- `getUpcomingBookings(userId)` — future bookings sorted by date
- `getPastBookings(userId)` — past bookings sorted by date desc
- `getOrgSpendThisPeriod(orgId)` — sum of confirmed/completed booking prices
- `getBudgetForOrg(orgId)` — current active budget with tiers

**New UI components needed:**
- `shadcn/ui table` — employee and booking history tables
- `shadcn/ui tabs` — upcoming/past booking tabs
- `shadcn/ui avatar` — employee avatars
- `shadcn/ui dropdown-menu` — row actions (edit role, remove)

## Component Architecture

```
src/components/dashboard/
├── dashboard-page.tsx          (client orchestrator)
├── stats-cards.tsx             (KPI grid: employees, spend, bookings, budget)
├── quick-search.tsx            (search bar linking to /search)
├── recent-bookings.tsx         (last 5 bookings with status)
├── booking-card.tsx            (reusable booking card with status badge)
├── my-bookings.tsx             (upcoming/past tabs, uses booking-card)
├── employee-table.tsx          (sortable table with search)
├── employee-row.tsx            (table row: avatar, name, role, team, tier)
├── invite-modal.tsx            (email invite form)
├── csv-import-modal.tsx        (CSV upload + preview table)
├── booking-history.tsx         (filterable table: date range, status, employee)
└── booking-history-filters.tsx (filter controls for history)
```

## Steps

### Step 1: Dashboard data layer — org, team, member, budget fixtures + helpers → v0.6.0
**Model: Sonnet + medium**

Create mock data fixtures:
- `organisations.ts` — 2 orgs: TechCorp (org-001, primary) and DesignCo (org-002). Fields: name, domain, logoUrl, billingEmail.
- `teams.ts` — TechCorp: Engineering, Design, Marketing, Sales. DesignCo: Studio, Strategy. Each with managerId pointing to existing users.
- `members.ts` — Map existing users to orgs. Sarah Chen → admin, James Okafor → manager, Priya Sharma → employee (all TechCorp). Nina Patel → employee (DesignCo). Include tier assignments (1/2/3).
- `budgets.ts` — TechCorp budget: £50,000 total, £18,500 used, period 2026-01-01 to 2026-06-30. Three tiers: Tier 1 (£150/person), Tier 2 (£100/person), Tier 3 (£50/person). DesignCo budget: £20,000 total, £6,200 used.

Update barrel export in `index.ts`. Create `src/lib/dashboard.ts` with org/member/team/budget/booking query helpers.

Add "HQ" nav item to employer sidebar in `src/lib/constants.ts` (Building2 icon, href `/hq`), placed in the Organisation section after Teams. Create placeholder page at `src/app/(employer)/hq/page.tsx` ("Coming in a future feature — requires Property Wizard").

### Step 2: Dashboard overview page — stats, quick search, recent bookings → v0.6.1
**Model: Sonnet + medium**

Replace dashboard placeholder with overview page:
- `StatsCards` — 4-card grid: Active Employees (count), Period Spend (£ used / total with progress bar), Upcoming Bookings (count), Budget Utilisation (% with colour coding: green < 70%, amber 70-90%, red > 90%).
- `QuickSearch` — Search input with icon that navigates to `/search?q=...` on submit.
- `RecentBookings` — Last 5 org bookings using `BookingCard`. Each shows: space name, property, date, status badge, price. "View all" link to `/booking-history`.
- Server component fetches data, passes to client `DashboardPage` orchestrator.

### Step 3: My Bookings — upcoming/past tabs with booking cards → v0.6.2
**Model: Sonnet + medium**

Replace bookings placeholder:
- `MyBookings` — Tabs component with "Upcoming" and "Past" tabs.
- Upcoming: bookings where date >= today, sorted ascending. Shows date, space, property, status, price, cancel button (if within cancellation window).
- Past: bookings where date < today, sorted descending. Shows same fields plus "Book again" shortcut.
- `BookingCard` — reusable card with status badge colours: confirmed (green), pending (amber), completed (grey), cancelled (red), disputed (orange).
- Empty state per tab: "No upcoming bookings — find a workspace" with link to /search.

### Step 4: Employee management table — sortable table with search → v0.6.3
**Model: Sonnet + medium**

Replace employees placeholder:
- `EmployeeTable` — Table with columns: Name (avatar + name), Email, Role (badge), Team, Tier, Status (active/inactive), Actions.
- Search bar filters by name or email (client-side).
- Column header click sorts ascending/descending.
- Role badges: Admin (indigo), Manager (blue), Employee (grey).
- Tier badges: Tier 1/2/3 with corresponding colours.
- Summary row above table: "N employees, M active".
- Install shadcn/ui table, avatar, dropdown-menu.

### Step 5: Employee actions — invite, CSV import, role/team assignment → v0.6.4
**Model: Sonnet + medium**

Add management actions to employee page:
- `InviteModal` — Form: email, first name, last name, role (select), team (select), tier (select). "Send Invite" button (mock — adds to fixture array in memory, shows success toast).
- `CSVImportModal` — File upload zone (drag & drop or click). Preview table showing parsed rows with validation (highlight invalid emails, duplicate entries). "Import N employees" button.
- Row actions dropdown: Edit role, Change team, Change tier, Deactivate. Each opens inline edit or confirmation dialog.
- Install shadcn/ui toast (for success feedback).

### Step 6: Booking history with filters + responsive polish → v0.6.5
**Model: Sonnet + medium**

Replace booking-history placeholder:
- `BookingHistory` — Table: Date, Employee, Space, Property, Duration, Price, Status. Paginated (10 per page).
- `BookingHistoryFilters` — Date range picker (from/to), status multi-select, employee search, space type filter. Filters update URL params (same pattern as search page).
- Summary stats above table: total bookings, total spend, average booking value.
- Export button (mock — logs to console).
- Responsive: tables become card lists on mobile (< 768px). All pages mobile-usable.
- Keyboard navigation for tables and modals.

## Edge Cases

- **No bookings yet** — Dashboard stats show zeros, recent bookings shows empty state with CTA to search.
- **Budget exhausted** — Stats card shows red, dashboard shows warning banner "Budget limit reached — contact your admin".
- **Employee already exists** — Invite modal validates against existing members, shows error for duplicate emails.
- **CSV format errors** — Import preview highlights rows with issues, allows skipping invalid rows.
- **Single employee org** — Table still renders correctly with one row.
- **Cancelled bookings** — Excluded from spend calculations, included in history with cancelled badge.
- **Date filtering edge** — Bookings on today's date count as "upcoming" not "past".
