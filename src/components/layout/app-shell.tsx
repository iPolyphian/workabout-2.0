"use client";

import * as React from "react";
import { type Role } from "@/lib/constants";
import { Sidebar, MobileSidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface AppShellProps {
  role: Role;
  children: React.ReactNode;
}

export function AppShell({ role, children }: AppShellProps) {
  const mobileSidebar = <MobileSidebar role={role} />;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Fixed desktop sidebar + its spacer div (both rendered by Sidebar) */}
      <Sidebar role={role} />

      {/* Main area: topbar + scrollable content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <Topbar mobileTrigger={mobileSidebar} />

        {/* Content area */}
        <main className="flex-1 px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
