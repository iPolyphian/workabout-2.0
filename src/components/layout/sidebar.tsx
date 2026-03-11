"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navByRole, roleLabelMap, type Role, type NavSection } from "@/lib/constants";

interface SidebarProps {
  role: Role;
}

function NavSectionGroup({
  section,
  collapsed,
  pathname,
}: {
  section: NavSection;
  collapsed: boolean;
  pathname: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {section.label && !collapsed && (
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {section.label}
        </p>
      )}
      {section.label && collapsed && (
        <div className="my-1 mx-3 h-px bg-border" />
      )}
      {section.items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href + "/"));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive
                ? "border-l-2 border-primary text-primary bg-[var(--indigo-dim)] pl-[10px]"
                : "text-foreground/70 border-l-2 border-transparent"
            )}
            title={collapsed ? item.label : undefined}
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                isActive ? "text-primary" : "text-foreground/60 group-hover:text-foreground"
              )}
            />
            {!collapsed && (
              <span className="truncate">{item.label}</span>
            )}
            {!collapsed && item.badge && (
              <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

function SidebarContent({
  role,
  collapsed,
  onRoleChange,
}: {
  role: Role;
  collapsed: boolean;
  onRoleChange: (role: Role) => void;
}) {
  const pathname = usePathname();
  const sections = navByRole[role];
  const roles: Role[] = ["employer", "provider", "admin"];

  return (
    <div className="flex h-full flex-col">
      {/* Wordmark / logo */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-border",
          collapsed ? "justify-center px-0" : "px-4"
        )}
      >
        {collapsed ? (
          <span className="text-lg font-bold text-primary">W</span>
        ) : (
          <span className="text-base font-bold tracking-tight text-foreground">
            Workabout
          </span>
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="flex flex-col gap-4">
          {sections.map((section, i) => (
            <NavSectionGroup
              key={i}
              section={section}
              collapsed={collapsed}
              pathname={pathname}
            />
          ))}
        </div>
      </nav>

      {/* Role switcher */}
      <div className="shrink-0 border-t border-border px-2 py-3">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Dev: Switch Role
          </p>
        )}
        <div className={cn("flex flex-col gap-0.5", collapsed && "items-center")}>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                r === role
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                collapsed && "flex justify-center px-0 py-1.5"
              )}
              title={collapsed ? roleLabelMap[r] : undefined}
            >
              {collapsed ? roleLabelMap[r].charAt(0) : roleLabelMap[r]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ role: initialRole }: SidebarProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = React.useState(false);
  const [role, setRole] = React.useState<Role>(initialRole);

  // Persist collapsed state in localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) {
      setCollapsed(stored === "true");
    }
  }, []);

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  }, []);

  const handleRoleChange = React.useCallback(
    (newRole: Role) => {
      setRole(newRole);
      // Navigate to the default page for the new role
      const roleRoutes: Record<Role, string> = {
        employer: "/dashboard",
        provider: "/space-provider",
        admin: "/admin",
      };
      router.push(roleRoutes[newRole]);
    },
    [router]
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-full flex-col bg-[var(--sidebar)] border-r border-border transition-all duration-200 md:flex",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <SidebarContent
          role={role}
          collapsed={collapsed}
          onRoleChange={handleRoleChange}
        />

        {/* Toggle button */}
        <button
          onClick={toggleCollapsed}
          className="absolute -right-3 top-[68px] flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-foreground transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-3" />
          ) : (
            <ChevronLeft className="size-3" />
          )}
        </button>
      </aside>

      {/* Spacer to push content (desktop only) */}
      <div
        className={cn(
          "hidden shrink-0 transition-all duration-200 md:block",
          collapsed ? "w-16" : "w-60"
        )}
        aria-hidden="true"
      />
    </>
  );
}

export function MobileSidebar({ role: initialRole }: SidebarProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState<Role>(initialRole);

  const handleRoleChange = React.useCallback(
    (newRole: Role) => {
      setRole(newRole);
      setOpen(false);
      const roleRoutes: Record<Role, string> = {
        employer: "/dashboard",
        provider: "/space-provider",
        admin: "/admin",
      };
      router.push(roleRoutes[newRole]);
    },
    [router]
  );

  return (
    <>
      {/* Trigger button exported for use in Topbar */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-accent hover:text-foreground md:hidden"
        aria-label="Open menu"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="2" y1="4" x2="14" y2="4" />
          <line x1="2" y1="8" x2="14" y2="8" />
          <line x1="2" y1="12" x2="14" y2="12" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-[var(--sidebar)] shadow-xl transition-transform duration-200 md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          role={role}
          collapsed={false}
          onRoleChange={handleRoleChange}
        />
      </div>
    </>
  );
}
