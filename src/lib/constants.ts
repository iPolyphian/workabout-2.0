import {
  Search,
  LayoutDashboard,
  Calendar,
  History,
  Users,
  Wallet,
  UsersRound,
  Building2,
  Settings,
  Plus,
  Package,
  ScrollText,
  Scale,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

export type NavSection = {
  label?: string;
  items: NavItem[];
};

export const employerNav: NavSection[] = [
  {
    items: [
      { label: "Search", href: "/search", icon: Search },
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Bookings",
    items: [
      { label: "My Bookings", href: "/bookings", icon: Calendar },
      { label: "Booking History", href: "/booking-history", icon: History },
    ],
  },
  {
    label: "Organisation",
    items: [
      { label: "Employees", href: "/employees", icon: Users },
      { label: "Budget", href: "/budget", icon: Wallet },
      { label: "Teams", href: "/teams", icon: UsersRound },
    ],
  },
  {
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const providerNav: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/space-provider", icon: LayoutDashboard },
    ],
  },
  {
    label: "Properties",
    items: [
      { label: "My Properties", href: "/space-provider/properties", icon: Building2 },
      { label: "Add Property", href: "/space-provider/properties/new", icon: Plus },
    ],
  },
  {
    label: "Bookings",
    items: [
      { label: "Booking History", href: "/space-provider/booking-history", icon: History },
    ],
  },
  {
    items: [
      { label: "Settings", href: "/space-provider/settings", icon: Settings },
    ],
  },
];

export const adminNav: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Providers", href: "/admin/providers", icon: Building2 },
      { label: "Properties", href: "/admin/properties", icon: Package },
      { label: "Employers", href: "/admin/employers", icon: Users },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Disputes", href: "/admin/disputes", icon: Scale },
      { label: "Settlements", href: "/admin/settlements", icon: Wallet },
      { label: "Audit Log", href: "/admin/audit-log", icon: ScrollText },
    ],
  },
  {
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export type Role = "employer" | "provider" | "admin";

export const navByRole: Record<Role, NavSection[]> = {
  employer: employerNav,
  provider: providerNav,
  admin: adminNav,
};

export const roleLabelMap: Record<Role, string> = {
  employer: "Employer",
  provider: "Space Provider",
  admin: "Admin",
};
