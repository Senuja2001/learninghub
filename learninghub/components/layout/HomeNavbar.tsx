"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";

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
        scrolled ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/kaishi-logo.png"
            alt="Kaishi Innovations Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-8 hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden h-9 items-center rounded-lg px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:flex"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-violet-600 px-4 text-sm font-bold text-white shadow-sm shadow-violet-300/40 transition hover:bg-violet-700"
          >
            Get Started <ChevronRight className="h-3.5 w-3.5" />
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
              className="flex-1 rounded-xl bg-violet-600 py-2 text-center text-sm font-bold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
