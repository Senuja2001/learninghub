"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Lock,
  BookOpen,
  Palette,
  Globe,
  Link as LinkIcon,
  CreditCard,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { name: "Profile Settings", href: "/settings/profile", icon: User },
  { name: "Account Settings", href: "/settings/account", icon: SettingsIcon },
  { name: "Notification Preferences", href: "/settings/notifications", icon: Bell },
  { name: "Privacy & Security", href: "/settings/privacy-security", icon: Lock },
  { name: "Learning Preferences", href: "/settings/learning", icon: BookOpen },
  { name: "Appearance", href: "/settings/appearance", icon: Palette },
  { name: "Language & Region", href: "/settings/language-region", icon: Globe },
  { name: "Connected Accounts", href: "/settings/connected-accounts", icon: LinkIcon },
  { name: "Billing & Subscription", href: "/settings/billing", icon: CreditCard },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden flex flex-col">

      {/* Slim Settings-only top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-[60px] items-center gap-4 px-5 md:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-slate-900 transition"
          >
            <ChevronLeft className="size-4" />
            Back to Dashboard
          </Link>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-md bg-violet-600 text-white">
              <SettingsIcon className="size-3.5" />
            </div>
            <h1 className="text-[15px] font-black tracking-tight text-slate-900">Settings</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-[1920px] mx-auto min-w-0">

        {/* Settings-only sidebar — sticky, full-height */}
        <aside className="sticky top-[60px] hidden h-[calc(100vh-60px)] w-[240px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 lg:block">
          <p className="mb-3 px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Settings</p>
          <nav className="flex flex-col space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/settings/profile" && pathname === "/settings");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex h-[38px] items-center gap-3 rounded-lg px-3 text-[13px] font-bold transition-colors ${
                    isActive
                      ? "bg-violet-50/80 text-violet-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`size-[18px] shrink-0 ${
                      isActive ? "text-violet-600" : "text-slate-400"
                    }`}
                  />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 flex flex-col">
          {/* Mobile settings nav */}
          <div className="block lg:hidden overflow-x-auto border-b border-slate-200 bg-white px-4">
            <nav className="flex gap-1 py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href === "/settings/profile" && pathname === "/settings");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-bold transition-colors ${
                      isActive
                        ? "bg-violet-50/80 text-violet-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`size-4 ${isActive ? "text-violet-600" : "text-slate-400"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 px-5 py-8 md:px-10 md:py-10">
            <div className="mx-auto w-full max-w-[1100px]">
              {children}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto border-t border-slate-200 px-5 py-5 md:px-8 bg-transparent">
            <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-3 sm:flex-row text-[11px] font-semibold text-slate-400 text-center sm:text-left">
              <p>© 2026 Learning Hub. Powered by Kaishi Innovations.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-slate-700 transition">Privacy Policy</Link>
                <span className="text-slate-200">|</span>
                <Link href="/terms" className="hover:text-slate-700 transition">Terms of Service</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
