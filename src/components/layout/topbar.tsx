"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function usePageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  const last = segments[segments.length - 1];
  // Convert kebab-case to Title Case
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface TopbarProps {
  mobileTrigger?: React.ReactNode;
  className?: string;
}

export function Topbar({ mobileTrigger, className }: TopbarProps) {
  const pathname = usePathname();
  const pageTitle = usePageTitle(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80",
        className
      )}
    >
      {/* Left: mobile menu trigger + page title */}
      <div className="flex items-center gap-3">
        {mobileTrigger}
        <h1 className="text-sm font-semibold text-foreground">{pageTitle}</h1>
      </div>

      {/* Right: Cmd+K badge + avatar */}
      <div className="ml-auto flex items-center gap-3">
        {/* Cmd+K badge (visual only) */}
        <div className="hidden items-center gap-1 rounded-md border border-border bg-muted px-2 py-1 sm:flex">
          <kbd className="text-[10px] font-medium text-muted-foreground">
            <span className="font-sans">⌘</span>K
          </kbd>
        </div>

        {/* User avatar */}
        <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          U
        </div>
      </div>
    </header>
  );
}
