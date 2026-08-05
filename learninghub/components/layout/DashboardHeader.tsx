import Link from "next/link";
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react";

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-[72px] items-center px-4 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="mr-4 grid size-9 shrink-0 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>

        {/* Logo */}
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5 lg:w-[220px] xl:w-[240px]">
          <div className="grid size-9 place-items-center rounded-lg bg-violet-600 text-white shadow-sm shadow-violet-200 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
          </div>
          <div className="hidden sm:flex flex-col justify-center h-full min-w-0">
            <span className="text-[17px] font-black leading-none text-slate-900 tracking-tight truncate">LearningHub</span>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 tracking-tight truncate">Powered by Kaishi Innovations</span>
          </div>
        </Link>

        {/* Center Nav Removed */}
        <div className="hidden xl:flex flex-1"></div>
        {/* Right Section */}
        <div className="ml-auto flex shrink-0 items-center gap-5">
          {/* Search */}
          <div className="hidden lg:block relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, skills or topics..."
              className="h-[38px] w-64 rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-10 text-[13px] text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50 placeholder:text-slate-400 font-medium"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-xs">
              ⌘K
            </kbd>
          </div>

          {/* Notifications */}
          <button type="button" className="relative text-slate-500 hover:text-slate-900 transition mr-2">
            <Bell className="size-[20px]" />
            <span className="absolute -top-1.5 -right-1.5 flex size-[15px] items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white border-2 border-white">
              5
            </span>
          </button>

          {/* User Avatar */}
          <button type="button" className="flex items-center gap-3 text-left group">
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&background=e0e7ff&color=4f46e5&rounded=true" 
              alt="User123" 
              className="size-9 rounded-full object-cover shadow-sm border border-slate-200" 
            />
            <div className="hidden lg:flex flex-col">
              <span className="text-[13px] font-bold leading-tight text-slate-900 group-hover:text-violet-600 transition">John Doe</span>
              <span className="text-[11px] font-medium text-slate-500 mt-0.5">Software Engineer</span>
            </div>
            <ChevronDown className="hidden lg:block size-4 text-slate-400 group-hover:text-slate-600 transition ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
