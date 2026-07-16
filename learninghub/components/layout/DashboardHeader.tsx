import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react";

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>

        {/* Logo */}
        <Link href="/dashboard" className="flex flex-1 lg:flex-none justify-center lg:justify-start shrink-0 items-center lg:w-60">
          <img
            src="/kaishi-logo.png"
            alt="LearningHub by Kaishi Innovations"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Search */}
        <div className="hidden flex-1 justify-center md:flex">
          <label className="flex h-9 w-full max-w-120 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 shadow-sm transition-all duration-200 focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">
            <Search className="size-4 shrink-0 text-slate-400" />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search courses, skills or topics..."
            />
            <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-sm">
              ⌘K
            </kbd>
          </label>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2.5">
          {/* Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 grid size-3.5 place-items-center rounded-full bg-red-500 text-[9px] font-black text-white">
              5
            </span>
          </button>

          {/* User */}
          <button
            type="button"
            className="hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm transition hover:bg-slate-50 sm:flex"
          >
            {/* Avatar circle with gradient */}
            <div className="grid size-8 place-items-center overflow-hidden rounded-full bg-linear-to-br from-violet-400 via-purple-400 to-indigo-500 text-white">
              <User className="size-4" />
            </div>
            <span className="text-left">
              <span className="block text-xs font-bold text-slate-900">user123</span>
              <span className="block text-[11px] text-slate-400">Software Engineer</span>
            </span>
            <ChevronDown className="size-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
