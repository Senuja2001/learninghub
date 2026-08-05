"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import Link from "next/link";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950 font-sans overflow-x-hidden flex flex-col">
      {/* The header is now always rendered, but its center navigation links have been removed inside DashboardHeader.tsx */}
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex flex-1 w-full max-w-480 mx-auto min-w-0">
        <DashboardSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Main */}
        <main className="min-w-0 flex-1 flex flex-col">
          <div className="flex-1 px-5 py-8 md:px-8 md:py-10">
            <div className="mx-auto w-full max-w-300">
              {children}
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-auto border-t border-slate-200 px-5 py-6 md:px-8 bg-transparent">
            <div className="mx-auto flex w-full max-w-300 flex-col items-center justify-between gap-4 sm:flex-row text-[12px] font-semibold text-slate-500 text-center sm:text-left">
              <p>© 2026 Learning Hub. Powered by Kaishi Innovations.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-slate-900 transition">Privacy Policy</Link>
                <span className="text-slate-300">|</span>
                <Link href="/terms" className="hover:text-slate-900 transition">Terms of Service</Link>
                <span className="text-slate-300">|</span>
                <Link href="/help-support" className="hover:text-slate-900 transition">Help Center</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
