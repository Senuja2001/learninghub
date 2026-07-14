"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Bookmark,
  Boxes,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";

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
  { title: "Explore by Platform", href: "/platforms", icon: Boxes },
  { title: "New & Trending", href: "/trending", icon: Sparkles },
  { title: "Community", href: "/community", icon: Users },
  { title: "News", href: "/news", icon: Newspaper },
];

const accountLinks = [
  { title: "My Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help & Support", href: "/help-support", icon: CircleHelp },
];

function NavGroup({
  title,
  links,
}: {
  title: string;
  links: Array<{
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }>;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <p className="px-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex h-10 items-center gap-3 rounded-lg px-4 text-sm font-medium transition ${
                active
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="size-4" />
              <span className="min-w-0 flex-1 truncate">{link.title}</span>
              {link.badge ? (
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">
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

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-[74px] items-center gap-6 px-5 lg:px-7">
          <Link href="/dashboard" className="flex w-[250px] items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <p className="text-xl font-black leading-none tracking-normal">
                LearningHub
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Powered by Kaishi Innovations
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <label className="flex h-10 w-full max-w-[520px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm">
              <Search className="size-4 text-slate-500" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
                placeholder="Search courses, skills or topics..."
              />
              <span className="rounded-md border border-slate-200 px-1.5 py-0.5 text-[11px] font-semibold text-slate-400">
                ⌘K
              </span>
            </label>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                5
              </span>
            </button>
            <button
              type="button"
              className="hidden items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-100 sm:flex"
            >
              <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-emerald-200 to-sky-200 text-slate-700">
                <User className="size-5" />
              </div>
              <span className="text-left">
                <span className="block text-sm font-bold">John Doe</span>
                <span className="block text-xs text-slate-500">
                  Software Engineer
                </span>
              </span>
              <ChevronDown className="size-4 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[74px] hidden h-[calc(100vh-74px)] w-[270px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-7 lg:block">
          <div className="space-y-7">
            <NavGroup title="Learn" links={learnLinks} />
            <NavGroup title="Explore" links={exploreLinks} />
            <NavGroup title="Account" links={accountLinks} />

            <div className="rounded-lg bg-violet-50 p-5">
              <p className="text-base font-black leading-tight">
                Learn together.
                <br />
                Grow together.
              </p>
              <p className="mt-3 text-sm leading-5 text-slate-600">
                Join discussions, share knowledge, and build your network.
              </p>
              <Link
                href="/community"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
              >
                Create Post
              </Link>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1360px]">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-700">
                <ShieldCheck className="size-4" />
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
