# Feature 1: Project Scaffold & Design System

**Type:** INFRA
**Version range:** v0.1.x
**Goal:** Establish the Next.js project, design system, layout shell, mock data layer, and placeholder pages so that all subsequent features have a solid foundation to build on. After this feature, the app should boot, display the sidebar/topbar layout, navigate between all placeholder routes, and render with the correct fonts and colors.

**Blueprint reference:** `/Users/williamporter/Desktop/workabout/workabout-platform-architecture-v3.html` -- sections 3 (Screen Map), 4 (Data Model), 14 (Tech Stack), 16 (UX Redesign).

---

## Step 1: Next.js project init + Tailwind + shadcn/ui + folder structure
**Recommended:** Sonnet + medium thinking

### What to build
- Initialize Next.js 15 with App Router and TypeScript using `create-next-app`
- Install and configure Tailwind CSS v4
- Install and configure shadcn/ui
- Set up the folder structure matching DOE conventions plus Next.js app directory
- Configure path aliases (`@/` for `src/`)
- Add `.env.example` with placeholder keys
- Add ESLint + Prettier config

### Folder structure
```
src/
  app/                    # Next.js App Router pages
    (employer)/           # Route group for employer views
    (provider)/           # Route group for provider views
    (admin)/              # Route group for admin views
    layout.tsx            # Root layout
    page.tsx              # Landing redirect
  components/
    ui/                   # shadcn/ui components (auto-generated)
    layout/               # Sidebar, Topbar, etc.
    shared/               # Reusable composed components
  lib/
    utils.ts              # shadcn cn() utility
    constants.ts          # App-wide constants
  types/                  # TypeScript type definitions
  data/                   # Mock data fixtures
  hooks/                  # Custom React hooks
```

### Key decisions
- Use `src/` directory -- keeps root clean for config files
- Route groups `(employer)`, `(provider)`, `(admin)` for role-specific layouts without URL nesting
- shadcn/ui "new-york" style (matches Linear/Notion aesthetic from blueprint)
- Node 20+ required (Next.js 15 requirement)

### Contract
- [ ] [auto] Next.js dev server starts. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [auto] Tailwind is configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css exists
- [ ] [auto] shadcn/ui is installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/components.json exists
- [ ] [auto] Folder structure exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/layout.tsx exists
- [ ] [auto] Path aliases work. Verify: file: /Users/williamporter/Desktop/workabout-2.0/tsconfig.json contains @/

---

## Step 2: Design system tokens + base component variants
**Recommended:** Sonnet + medium thinking

### What to build
Configure Tailwind with the Workabout design system extracted from the blueprint CSS variables. Set up fonts, extend shadcn/ui component variants to match the brand.

### Design tokens (from blueprint CSS)

**Fonts:**
- Body: `'DM Sans', system-ui, sans-serif` -- import from Google Fonts via `next/font`
- Mono: `'Fira Code', 'SF Mono', Consolas, monospace` -- import from Google Fonts via `next/font`

**Colors (light mode):**
- `--bg: #f7f9fb` (page background)
- `--surface: #ffffff` (card background)
- `--surface2: #eef2f6` (secondary surface / hover)
- `--surface-elevated: #ffffff` (elevated card)
- `--surface-recessed: #f0f3f7` (inset areas)
- `--border: rgba(0,0,0,0.07)`
- `--border-bright: rgba(0,0,0,0.14)`
- `--text: #0f172a` (primary text)
- `--text-dim: #64748b` (secondary text)
- `--teal: #0d9488` (primary accent)
- `--teal-dim: rgba(13,148,136,0.08)`
- `--amber: #d97706` (secondary accent)
- `--amber-dim: rgba(217,119,6,0.08)`
- `--slate: #475569`
- `--rose: #be123c` (destructive / error)
- `--emerald: #059669` (success)
- `--blue: #0369a1` (info)
- `--indigo: #4338ca`

**Colors (dark mode):**
- `--bg: #0c1117`
- `--surface: #151c25`
- `--surface2: #1c2530`
- `--surface-elevated: #1e2734`
- `--surface-recessed: #111920`
- `--border: rgba(255,255,255,0.06)`
- `--border-bright: rgba(255,255,255,0.12)`
- `--text: #e2e8f0`
- `--text-dim: #94a3b8`
- `--teal: #2dd4bf`
- `--amber: #fbbf24`
- `--rose: #fb7185`
- `--emerald: #34d399`
- `--blue: #38bdf8`
- `--indigo: #818cf8`

**Spacing / Radii:**
- Card border-radius: `10px` (0.625rem)
- Badge border-radius: `4px`
- Card padding: `16px 20px`
- Section spacing: `48px` between major sections
- Base font size: `13px` for body text, `11px` for labels/captions

### What to configure
- Extend Tailwind theme with custom colors mapped to CSS variables (for light/dark mode switching)
- Set up `globals.css` with CSS custom properties for both light and dark themes
- Configure `next/font` for DM Sans (weights 400, 500, 600, 700) and Fira Code (weights 400, 500, 600)
- Create base component variants in shadcn/ui: Button (primary=teal, secondary=amber, destructive=rose), Badge (teal, amber, rose, emerald, blue, slate, indigo -- matching blueprint's 7 accent colors), Card (default, hero, recessed)
- Add a `ThemeProvider` component for dark mode support using `next-themes`

### Key decisions
- Use CSS custom properties (not Tailwind's built-in dark mode classes) for theme switching -- matches shadcn/ui convention and enables future theme customization
- Import fonts via `next/font/google` for performance (automatic font optimization)
- Install `next-themes` for dark mode toggle

### Contract
- [ ] [auto] DM Sans font loads. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/layout.tsx contains DM_Sans
- [ ] [auto] Design tokens defined. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains --teal
- [ ] [auto] Dark mode variables present. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains .dark
- [ ] [auto] Tailwind config extended. Verify: file: /Users/williamporter/Desktop/workabout-2.0/tailwind.config.ts contains teal
- [ ] [auto] Button component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/button.tsx exists
- [ ] [auto] Badge component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/badge.tsx exists
- [ ] [auto] Build succeeds with tokens. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Fonts render correctly (DM Sans body, Fira Code for code/mono elements)
- [ ] [manual] Colors match blueprint -- teal primary (#0d9488), amber secondary (#d97706)

---

## Step 3: Layout shell -- collapsible sidebar nav + topbar
**Recommended:** Opus + high thinking

### What to build
The core application shell: a collapsible sidebar with role-aware navigation, a topbar with search/user menu, and a main content area. This is the persistent frame around every page.

### Components to create
- `src/components/layout/sidebar.tsx` -- collapsible sidebar (Linear-style)
  - Expanded: icon + label (240px wide)
  - Collapsed: icon-only (64px wide)
  - Toggle button (chevron or hamburger)
  - Sections grouped by role context
  - Active route highlighting with teal accent border
  - Smooth transition animation
- `src/components/layout/topbar.tsx` -- top navigation bar
  - Breadcrumb or page title
  - Command palette trigger (Cmd+K badge)
  - Notification bell (placeholder)
  - User avatar + dropdown (placeholder)
  - Dark mode toggle
- `src/components/layout/app-shell.tsx` -- combines sidebar + topbar + content area
- `src/components/layout/nav-item.tsx` -- individual nav link with icon, label, optional badge

### Navigation structure (from blueprint screen map)

**Employer nav:**
- Search (magnifying glass icon)
- Dashboard
- Bookings > My Bookings, Booking History
- Employees
- Budget Management
- Teams
- HQ (if module enabled)
- Settings

**Provider nav:**
- Dashboard
- Properties
- Add Property
- Booking History
- Settings

**Admin nav:**
- Dashboard
- Providers > Pipeline, Properties
- Employers > Activation
- Bookings > Disputes
- Settlements
- Audit Log
- Settings

### Key decisions
- Use a `role` prop or context to switch between employer/provider/admin nav configurations
- Store sidebar collapsed state in localStorage for persistence
- Use `lucide-react` icons (ships with shadcn/ui)
- Mobile: sidebar becomes a slide-out drawer (use shadcn Sheet component)
- Topbar is fixed; sidebar scrolls independently

### Contract
- [ ] [auto] Sidebar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/sidebar.tsx exists
- [ ] [auto] Topbar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/topbar.tsx exists
- [ ] [auto] App shell component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/app-shell.tsx exists
- [ ] [auto] Root layout uses app shell. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/layout.tsx contains AppShell
- [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Sidebar collapses/expands smoothly with animation
- [ ] [manual] Nav items highlight correctly when active (teal left border)
- [ ] [manual] Layout looks clean and Linear-inspired -- no visual clutter, proper spacing
- [ ] [manual] Mobile: sidebar appears as slide-out drawer

---

## Step 4: Mock data layer -- TypeScript types + fixture data
**Recommended:** Sonnet + low thinking

### What to build
TypeScript type definitions for all 26 database entities from the blueprint's ER diagram, plus realistic fixture data for search results, listings, and bookings. This lets subsequent features render real-looking UI without a backend.

### Entities (26 total, from blueprint Section 4)
```
User, SpaceProvider, Organisation, Member, Team, Property, Space, Amenity,
Photo, FloorPlan, FloorPlanMapping, Booking, BookingSlot, Purchase,
PlatformPurchase, PaymentEvent, PlatformTransaction, Settlement,
Review, Budget, BudgetTier, BookingRestriction, ApprovalRule,
ChannelIntegration, OrgBilling, PaidModule
```

### Files to create
- `src/types/database.ts` -- all 26 entity types with proper TypeScript interfaces
  - All monetary values as `number` (integer cents, matching blueprint convention)
  - Enums for: space types (`hot_desk | private_office | private_meeting_room | communal_space | event`), booking statuses, property statuses (`draft | review | active | inactive | imported`), user roles, purchase categories (`meet | work`)
  - Timestamps as `string` (ISO 8601)
  - UUID `id` fields as `string`

- `src/data/fixtures/properties.ts` -- 8-10 mock properties with varied London locations
- `src/data/fixtures/spaces.ts` -- 20-30 spaces across the mock properties (mix of all 5 types)
- `src/data/fixtures/bookings.ts` -- 10-15 mock bookings in various statuses
- `src/data/fixtures/users.ts` -- mock users for each role (provider, employer admin, employee, individual)
- `src/data/fixtures/reviews.ts` -- 10-15 mock reviews
- `src/data/fixtures/index.ts` -- barrel export

### Key decisions
- Types mirror the database schema but use TypeScript conventions (camelCase properties, not snake_case)
- Include a `snakeToCamel` note/mapping comment for when Prisma is added later
- Fixtures use deterministic IDs (UUIDs) so they can be cross-referenced
- Property locations use real London coworking area coordinates (Shoreditch, Clerkenwell, Soho, Kings Cross, etc.)
- Pricing in fixtures uses realistic UK coworking rates (hot desk: 2500-5000 pence/day, private office: 5000-15000 pence/day, meeting room: 3000-8000 pence/half-day)

### Amenities list (27, from blueprint)
```
Car parking, Bicycle storage, Printer, Free tea & coffee, Espresso bar,
Outdoor space, Recreational games, Wellness room, Disabled access,
Swimming pool, Showers, Gym, Creche, Cafe/Restaurant, Phone Booth,
Kitchen/Kitchenette, Reception, Lockers, Pet/Dog Friendly, AC/Heating,
Roof Terrace, Communal Area, Wi-Fi, Projector, Video Conferencing,
Event Space, Meeting Space
```

### Contract
- [ ] [auto] Types file exists with all entities. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/types/database.ts contains BookingRestriction
- [ ] [auto] Space type enum defined. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/types/database.ts contains hot_desk
- [ ] [auto] Property fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/properties.ts exists
- [ ] [auto] Booking fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/bookings.ts exists
- [ ] [auto] Barrel export exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/index.ts exists
- [ ] [auto] Types compile without errors. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx tsc --noEmit 2>&1 | tail -3 | grep -v "error"

---

## Step 5: Placeholder pages wired to layout
**Recommended:** Sonnet + low thinking

### What to build
Empty page shells for every route in the screen map, so sidebar navigation works end-to-end. Each page shows its title, a brief description of what will be built there, and a "coming soon" state. This proves the routing and layout work correctly.

### Routes to create

**Employer routes (under `src/app/(employer)/`):**
- `/dashboard/page.tsx` -- Dashboard
- `/search/page.tsx` -- Search & Discovery
- `/listings/[id]/page.tsx` -- Listing Detail
- `/bookings/page.tsx` -- My Bookings
- `/booking-history/page.tsx` -- Booking History
- `/employees/page.tsx` -- Employees
- `/budget/page.tsx` -- Budget Management
- `/teams/page.tsx` -- Teams
- `/settings/page.tsx` -- Settings (+ nested routes later)

**Provider routes (under `src/app/(provider)/space-provider/`):**
- `/page.tsx` -- Provider Dashboard
- `/booking-history/page.tsx` -- Provider Booking History
- `/properties/page.tsx` -- Properties List
- `/properties/new/page.tsx` -- Add Property
- `/properties/[id]/edit/page.tsx` -- Property Edit (Location tab)

**Admin routes (under `src/app/(admin)/admin/`):**
- `/page.tsx` -- Admin Dashboard
- `/providers/page.tsx` -- Provider Pipeline
- `/properties/page.tsx` -- Property Review Queue
- `/employers/page.tsx` -- Employer Activation
- `/settlements/page.tsx` -- Settlement Processing
- `/disputes/page.tsx` -- Dispute Resolution
- `/audit-log/page.tsx` -- Audit Log

### Shared placeholder component
Create `src/components/shared/page-placeholder.tsx` -- a reusable component that renders:
- Page title (h1)
- Feature description
- "Coming in Feature N" badge
- A subtle dotted border area representing where the content will go

### Route group layouts
- `src/app/(employer)/layout.tsx` -- wraps employer pages with sidebar (employer nav)
- `src/app/(provider)/layout.tsx` -- wraps provider pages with sidebar (provider nav)
- `src/app/(admin)/layout.tsx` -- wraps admin pages with sidebar (admin nav)
- Root `page.tsx` redirects to `/dashboard`

### Key decisions
- Each route group gets its own layout that passes the correct `role` to the sidebar
- Use Next.js `redirect()` from root to `/dashboard`
- Dynamic routes (`[id]`) use placeholder data from fixtures
- Keep each page.tsx minimal -- just the placeholder component with props

### Contract
- [ ] [auto] Employer dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/dashboard/page.tsx exists
- [ ] [auto] Search page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/page.tsx exists
- [ ] [auto] Provider dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(provider)/space-provider/page.tsx exists
- [ ] [auto] Admin dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(admin)/admin/page.tsx exists
- [ ] [auto] Placeholder component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/shared/page-placeholder.tsx exists
- [ ] [auto] Route group layouts exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(provider)/layout.tsx exists
- [ ] [auto] Full build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
- [ ] [manual] Clicking every sidebar link navigates to the correct placeholder page
- [ ] [manual] Active nav item highlights correctly for each route
- [ ] [manual] Role switching between employer/provider/admin shows different nav items and routes
