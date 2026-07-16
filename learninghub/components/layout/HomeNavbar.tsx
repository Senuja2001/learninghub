"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/#features" },
  { label: "Courses", href: "/all-courses" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md" : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="mx-auto flex h-15 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-600">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-[17px] font-bold text-slate-900">LearnHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-10 hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/login"
            className="hidden h-9 items-center rounded-lg px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:flex border border-slate-200"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center rounded-lg bg-linear-to-r from-blue-500 to-violet-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Get Started
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 lg:hidden">
          <nav className="space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <Link
              href="/login"
              className="flex-1 rounded-xl border border-slate-200 py-2 text-center text-sm font-semibold text-slate-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex-1 rounded-xl bg-linear-to-r from-blue-500 to-violet-600 py-2 text-center text-sm font-bold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
