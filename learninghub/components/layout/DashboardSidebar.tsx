"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Bookmark,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  Newspaper,
  PenLine,
  Route,
  Settings,
  Sparkles,
  User,
  Users,
  X,
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

export function DashboardSidebar({
  isMobileMenuOpen,
  onCloseMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}) {
  return (
    <>
      {/* ── Mobile Sidebar Overlay ────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileMenu}
          />
          <aside className="relative flex w-64 flex-col bg-white h-full shadow-2xl animate-in slide-in-from-left-full duration-200">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <span className="font-black tracking-tight text-slate-900">Menu</span>
              <button
                onClick={onCloseMobileMenu}
                className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-5 space-y-5">
              <NavGroup title="Learn" links={learnLinks} onItemClick={onCloseMobileMenu} />
              <NavGroup title="Explore" links={exploreLinks} onItemClick={onCloseMobileMenu} />
              <NavGroup title="Account" links={accountLinks} onItemClick={onCloseMobileMenu} />
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
    </>
  );
}
