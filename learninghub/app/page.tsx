"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Route,
  BarChart2,
  GraduationCap,
  Brain,
  Users,
  Star,
  Zap,
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HomeNavbar } from "@/components/layout/HomeNavbar";
import { HomeFooter } from "@/components/layout/HomeFooter";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const stats = [
  { value: "5000+", label: "Active Learners", icon: Users },
  { value: "300+", label: "Curated Courses", icon: BookOpen },
  { value: "50+", label: "Learning Paths", icon: Route },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
];

const features = [
  {
    icon: BookOpen,
    title: "Curated Courses",
    desc: "Access industry-leading courses from YouTube, Udemy, Coursera and more.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Route,
    title: "Learning Paths",
    desc: "Follow structured learning paths designed by industry experts.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Track Progress",
    desc: "Monitor your learning progress with detailed analytics.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: GraduationCap,
    title: "Certificates",
    desc: "Earn certificates and showcase your new skills.",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Brain,
    title: "Skill Assessment",
    desc: "Test your knowledge and track your skill improvement.",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "Team Learning",
    desc: "Learn with your team and achieve more together.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

const trustedLogos = [
  {
    name: "Microsoft",
    render: () => (
      <div className="flex items-center gap-2 text-slate-300 hover:text-slate-400 transition-colors cursor-default">
        <svg viewBox="0 0 21 21" className="h-5 w-5" fill="currentColor">
          <path d="M0 0h10v10H0zM11 0h10v10H11zM0 11h10v10H0zM11 11h10v10H11z" />
        </svg>
        <span className="text-[17px] font-semibold tracking-tight">Microsoft</span>
      </div>
    ),
  },
  {
    name: "Google",
    render: () => (
      <span className="text-[22px] font-medium tracking-tight text-slate-300 hover:text-slate-400 transition-colors cursor-default">
        Google
      </span>
    ),
  },
  {
    name: "AWS",
    render: () => (
      <div className="flex flex-col items-center cursor-default">
        <span className="text-[18px] font-black tracking-tight text-slate-300 hover:text-slate-400 transition-colors leading-none">aws</span>
        <div className="mt-0.5 h-0.5 w-10 bg-slate-300 rounded" />
      </div>
    ),
  },
  {
    name: "IBM",
    render: () => (
      <span className="text-[22px] font-black tracking-widest text-slate-300 hover:text-slate-400 transition-colors cursor-default">
        IBM
      </span>
    ),
  },
  {
    name: "Oracle",
    render: () => (
      <span className="text-[18px] font-bold tracking-tight text-slate-300 hover:text-slate-400 transition-colors cursor-default uppercase">
        ORACLE
      </span>
    ),
  },
  {
    name: "Infosys",
    render: () => (
      <span className="text-[18px] font-semibold tracking-tight text-slate-300 hover:text-slate-400 transition-colors cursor-default">
        Infosys
      </span>
    ),
  },
];

/* ─── Hero section ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-0">
      {/* Very subtle background glow top-right */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-125 w-125 rounded-full bg-linear-to-bl from-blue-100/50 via-violet-100/40 to-transparent blur-3xl" />
        <div className="absolute top-20 right-40 h-75 w-75 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start lg:grid-cols-[1fr_auto] gap-8">
          {/* Left copy */}
          <div className="pt-8 lg:pt-12 pb-10 max-w-130">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5">
              <Zap className="h-3 w-3 text-blue-500 fill-blue-400" />
              <span className="text-[11px] font-semibold text-blue-600">#1 Learning Platform for IT Professionals</span>
            </div>

            <h1 className="font-black leading-tight tracking-tight">
              <span className="block text-[40px] sm:text-[44px] text-slate-900">
                Empower Your Career.
              </span>
              <span className="block text-[40px] sm:text-[44px] bg-linear-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                Learn. Grow. Succeed.
              </span>
            </h1>

            <p className="mt-5 text-[14px] leading-relaxed text-slate-500 max-w-100">
              LearnHub is your all-in-one learning management system for the IT industry. Access curated courses, track progress, earn certificates, and accelerate your career growth.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-violet-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-300/40 transition hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                href="/all-courses"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="text-slate-400">&#9654;</span>
                Explore Courses
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex items-start gap-10">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-col items-start">
                    <div className="mb-2">
                      <Icon className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
                    </div>
                    <span className="text-[22px] font-black text-slate-900 leading-none">{s.value}</span>
                    <span className="mt-1 text-[11px] text-slate-500 leading-tight">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right – hero image with floating cards */}
          <div className="relative shrink-0 w-105 hidden lg:block">
            {/* Decorative geometric lines behind the man */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute top-8 right-4 w-85 h-85 opacity-20" viewBox="0 0 340 340" fill="none">
                <circle cx="170" cy="170" r="168" stroke="#6366f1" strokeWidth="1" strokeDasharray="6 6" />
              </svg>
              <svg className="absolute top-20 right-12 w-50 h-50 opacity-15" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="98" stroke="#818cf8" strokeWidth="1" />
              </svg>
              <svg className="absolute top-6 right-6 w-12 h-12 opacity-30" viewBox="0 0 48 48" fill="none">
                <path d="M0 12 L0 0 L12 0" stroke="#6366f1" strokeWidth="2" />
                <path d="M36 0 L48 0 L48 12" stroke="#6366f1" strokeWidth="2" />
              </svg>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-75 h-75 rounded-full bg-linear-to-br from-blue-200/50 to-violet-200/40 blur-2xl" />
            </div>

            {/* Person Image */}
            <div className="relative flex justify-center pt-4">
              <img
                src="/hero_person.png"
                alt="IT Professional learning on LearnHub"
                className="relative z-10 h-105 w-auto object-contain object-top"
                style={{
                  maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              />

              {/* Floating Progress Card – top right */}
              <div className="absolute top-6 -right-6 z-20 w-44 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/80">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Your Progress</p>
                  <span className="text-xs font-bold text-slate-700">76%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-600"
                    style={{ width: "76%" }}
                  />
                </div>
              </div>

              {/* Floating Certificates Card – bottom right */}
              <div className="absolute bottom-16 -right-6 z-20 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-200/80">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-blue-500 to-violet-600 text-white shrink-0">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">Certificates Earned</p>
                  <p className="text-xl font-black text-slate-900">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trusted By ────────────────────────────────────────────────────────── */
function TrustedSection() {
  return (
    <section className="bg-white py-10 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          TRUSTED BY LEADING IT COMPANIES
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {trustedLogos.map((c) => (
            <div key={c.name}>
              {c.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ──────────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[28px] font-black tracking-tight text-slate-900 sm:text-3xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Powerful features designed to make learning simple, effective, and engaging.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}>
                  <Icon className={`h-5 w-5 ${f.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ────────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-indigo-600 to-violet-600 px-8 py-12 shadow-2xl shadow-violet-300/30 lg:px-14">
          {/* Background blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 right-40 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left copy */}
            <div className="max-w-md">
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="mt-3 text-[13px] text-blue-100 leading-relaxed">
                Join thousands of IT professionals who are already learning and growing.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/30 bg-white/15 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* Right – Continue Learning card */}
            <div className="w-full max-w-65 shrink-0 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-white">Continue Learning</p>
                <span className="text-white/50 text-lg leading-none">···</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-blue-600/60">
                  <img src="/thumb_nextjs.png" alt="React course" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-semibold text-white">React – The Complete Guide</p>
                  <p className="mt-0.5 text-[10px] text-blue-200">In Progress</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-white/20">
                    <div className="h-full w-[78%] rounded-full bg-white/70" />
                  </div>
                </div>
                <span className="text-xs font-bold text-white/80 shrink-0">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <div className="flex min-h-screen flex-col">
        <HomeNavbar />
        <main className="flex-1">
          <HeroSection />
          <TrustedSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <HomeFooter />
      </div>
    </>
  );
}
