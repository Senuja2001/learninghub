"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex">
        <DashboardSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-340">
            {/* "Registered users only" badge */}
            <div className="mb-5 flex items-center justify-end">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                This section is available only for registered users.
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
