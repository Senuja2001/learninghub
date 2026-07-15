"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Bookmark,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  Newspaper,
  PenLine,
  Route,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

/* â”€â”€â”€ Nav links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const learnLinks = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Courses", href: "/courses", icon: BookOpen },
  { title: "Learning Paths", href: "/learning-paths", icon: Route },
  { title: "Certificates", href: "/certificates", icon: GraduationCap },
  { title: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { title: "Notifications", href: "/notifications", icon: Bell, badge: "5" },
];

const exploreLinks = [
  { title: "All Courses", href: "/all-courses", icon: BookOpen },
  { title: "Explore by Role", href: "/roles", icon: Users },
  { title: "Explore by Platform", href: "/platforms", icon: LayoutGrid },
  { title: "New & Trending", href: "/trending", icon: Sparkles },
  { title: "Community", href: "/community", icon: Users },
  { title: "News", href: "/news", icon: Newspaper },
];

const accountLinks = [
  { title: "My Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help & Support", href: "/help-support", icon: CircleHelp },
];

/* â”€â”€â”€ NavGroup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function NavGroup({
  title,
  links,
  onItemClick,
}: {
  title: string;
  links: Array<{
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }>;
  onItemClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div>
      <p className="mb-1.5 px-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
        {title}
      </p>
      <nav className="space-y-0.5">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onItemClick}
              className={`flex h-9 items-center gap-3 rounded-lg px-3 text-sm transition-all duration-150 ${
                active
                  ? "bg-violet-600 font-semibold text-white"
                  : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className={`size-4 shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
              <span className="min-w-0 flex-1 truncate">{link.title}</span>
              {link.badge ? (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-violet-100 text-violet-700"
                  }`}
                >
                  {link.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/* â”€â”€â”€ Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex shrink-0 items-center lg:w-60">
            <Image
              src="/kaishi-logo.png"
              alt="LearningHub by Kaishi Innovations"
              width={120}
              height={46}
              className="object-contain"
              style={{ height: "auto" }}
              priority
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
                âŒ˜K
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

      {/* â”€â”€ Body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex">
        {/* â”€â”€ Mobile Sidebar Overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className="relative flex w-64 flex-col bg-white h-full shadow-2xl animate-in slide-in-from-left-full duration-200">
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
                <span className="font-black tracking-tight text-slate-900">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-5 space-y-5">
                <NavGroup title="Learn" links={learnLinks} onItemClick={() => setIsMobileMenuOpen(false)} />
                <NavGroup title="Explore" links={exploreLinks} onItemClick={() => setIsMobileMenuOpen(false)} />
                <NavGroup title="Account" links={accountLinks} onItemClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-60 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-3 py-5 lg:block">
          <div className="space-y-5">
            <NavGroup title="Learn" links={learnLinks} />
            <NavGroup title="Explore" links={exploreLinks} />
            <NavGroup title="Account" links={accountLinks} />

            {/* CTA */}
            <div className="rounded-xl bg-violet-50 p-4">
              <p className="text-sm leading-tight font-black text-slate-900">
                Learn together.
                <br />
                Grow together.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Join discussions, share knowledge, and build your network.
              </p>
              <Link
                href="/community"
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-violet-600 text-xs font-bold text-white shadow-md shadow-violet-300/40 transition hover:bg-violet-700"
              >
                <PenLine className="size-3.5" />
                Create Post
              </Link>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-340">
            {/* "Registered users only" badge â€” kept as original requested */}
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

