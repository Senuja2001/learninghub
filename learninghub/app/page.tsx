"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Route,
  BarChart2,
  GraduationCap,
  Brain,
  Users,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Star,
  PlayCircle,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Code2,
  Cloud,
  Cpu,
  MessageSquare,
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
    color: "from-violet-500 to-indigo-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Route,
    title: "Learning Paths",
    desc: "Follow structured learning paths designed by industry experts.",
    color: "from-teal-500 to-emerald-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Track Progress",
    desc: "Monitor your learning progress with detailed analytics.",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: GraduationCap,
    title: "Certificates",
    desc: "Earn certificates and showcase your new skills.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Brain,
    title: "Skill Assessment",
    desc: "Test your knowledge and track your skill improvement.",
    color: "from-rose-500 to-pink-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "Team Learning",
    desc: "Learn with your team and achieve more together.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

const trustedBy = [
  { name: "Microsoft", logo: "Microsoft" },
  { name: "Google", logo: "Google" },
  { name: "AWS", logo: "aws" },
  { name: "IBM", logo: "IBM" },
  { name: "Oracle", logo: "ORACLE" },
  { name: "Infosys", logo: "Infosys" },
];

const popularCourses = [
  {
    title: "React – The Complete Guide 2024",
    platform: "Udemy",
    duration: "49h 30m",
    rating: 4.8,
    students: "230K+",
    tag: "Frontend",
    tagColor: "bg-blue-100 text-blue-700",
    progress: 78,
    thumb: "/thumb_nextjs.png",
    icon: Code2,
    iconColor: "text-blue-500",
  },
  {
    title: "AWS Certified Solutions Architect",
    platform: "Coursera",
    duration: "45h 15m",
    rating: 4.9,
    students: "180K+",
    tag: "Cloud",
    tagColor: "bg-amber-100 text-amber-700",
    progress: 41,
    thumb: "/thumb_aws.png",
    icon: Cloud,
    iconColor: "text-amber-500",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    platform: "freeCodeCamp",
    duration: "35h 15m",
    rating: 4.7,
    students: "320K+",
    tag: "Core Skills",
    tagColor: "bg-emerald-100 text-emerald-700",
    progress: 60,
    thumb: "/thumb_reddit.png",
    icon: Cpu,
    iconColor: "text-emerald-500",
  },
  {
    title: "Docker & Kubernetes: The Complete Guide",
    platform: "YouTube",
    duration: "21h 30m",
    rating: 4.8,
    students: "95K+",
    tag: "DevOps",
    tagColor: "bg-violet-100 text-violet-700",
    progress: 30,
    thumb: "/thumb_kubernetes.png",
    icon: Globe,
    iconColor: "text-violet-500",
  },
];

const testimonials = [
  {
    name: "Sarah T.",
    role: "Backend Developer",
    company: "FinTech Startup",
    text: "LearningHub is the reason I got my first cloud job. I followed the AWS learning path, earned the certificate, and landed an interview within 3 weeks of finishing.",
    rating: 5,
    avatar: "ST",
    avatarBg: "from-violet-400 to-indigo-500",
  },
  {
    name: "Marcus J.",
    role: "Full-Stack Engineer",
    company: "Agency",
    text: "I've tried other platforms but nothing comes close to how LearningHub organises content. The progress tracking alone is worth it — I can actually see myself improving week on week.",
    rating: 5,
    avatar: "MJ",
    avatarBg: "from-teal-400 to-emerald-500",
  },
  {
    name: "Priya N.",
    role: "DevOps Lead",
    company: "Enterprise",
    text: "We rolled LearningHub out to our whole engineering team. The team-learning features and shared certificates made quarterly upskilling sessions something people actually look forward to.",
    rating: 5,
    avatar: "PN",
    avatarBg: "from-rose-400 to-pink-500",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    desc: "Great for getting started and exploring the platform.",
    features: [
      "Access to 50+ free courses",
      "Basic progress tracking",
      "Community access",
      "Mobile-friendly",
    ],
    cta: "Get Started Free",
    popular: false,
    ctaStyle: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  },
  {
    name: "Pro",
    price: "12",
    period: "per month",
    desc: "For serious learners who want full access and certificates.",
    features: [
      "All 300+ curated courses",
      "Full learning paths",
      "Verifiable certificates",
      "Advanced analytics",
      "Priority support",
      "Team features",
    ],
    cta: "Start 7-Day Free Trial",
    popular: true,
    ctaStyle: "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-300/40",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "for teams",
    desc: "For companies investing in their people's growth at scale.",
    features: [
      "Everything in Pro",
      "SSO & admin dashboard",
      "Custom learning paths",
      "Dedicated CSM",
      "SLA & compliance",
    ],
    cta: "Contact Sales",
    popular: false,
    ctaStyle: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  },
];

/* ─── Animated counter hook ─────────────────────────────────────────────── */
function useCountUp(target: string, duration = 1500) {
  const [count, setCount] = useState("0");
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const numeric = parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/\d/g, "");
    if (!numeric) {
      setCount(target);
      return;
    }
    const steps = 60;
    const increment = numeric / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current) + suffix);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
}

/* ─── Hero section ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-0">
      {/* Very subtle background glow top-right */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-blue-100/50 via-violet-100/40 to-transparent blur-3xl" />
        <div className="absolute top-20 right-40 h-[300px] w-[300px] rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start lg:grid-cols-[1fr_auto] gap-8">
          {/* Left copy */}
          <div className="pt-8 lg:pt-12 pb-10 max-w-[520px]">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5">
              <Zap className="h-3 w-3 text-blue-500 fill-blue-400" />
              <span className="text-[11px] font-semibold text-blue-600">#1 Learning Platform for IT Professionals</span>
            </div>

            <h1 className="font-black leading-tight tracking-tight">
              <span className="block text-[40px] sm:text-[44px] text-slate-900">
                Empower Your Career.
              </span>
              <span className="block text-[40px] sm:text-[44px] bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                Learn. Grow. Succeed.
              </span>
            </h1>

            <p className="mt-5 text-[14px] leading-relaxed text-slate-500 max-w-[400px]">
              LearnHub is your all-in-one learning management system for the IT industry. Access curated courses, track progress, earn certificates, and accelerate your career growth.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-300/40 transition hover:opacity-90"
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
          <div className="relative flex-shrink-0 w-[420px] hidden lg:block">
            {/* Decorative geometric lines behind the man */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Large circle outline */}
              <svg className="absolute top-8 right-4 w-[340px] h-[340px] opacity-20" viewBox="0 0 340 340" fill="none">
                <circle cx="170" cy="170" r="168" stroke="#6366f1" strokeWidth="1" strokeDasharray="6 6" />
              </svg>
              {/* Smaller circle */}
              <svg className="absolute top-20 right-12 w-[200px] h-[200px] opacity-15" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="98" stroke="#818cf8" strokeWidth="1" />
              </svg>
              {/* Corner brackets */}
              <svg className="absolute top-6 right-6 w-12 h-12 opacity-30" viewBox="0 0 48 48" fill="none">
                <path d="M0 12 L0 0 L12 0" stroke="#6366f1" strokeWidth="2" />
                <path d="M36 0 L48 0 L48 12" stroke="#6366f1" strokeWidth="2" />
              </svg>
              {/* Blue glow blob behind man */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-blue-200/50 to-violet-200/40 blur-2xl" />
            </div>

            {/* Person Image */}
            <div className="relative flex justify-center pt-4">
              <img
                src="/hero_person.png"
                alt="IT Professional learning on LearnHub"
                className="relative z-10 h-[420px] w-auto object-contain object-top"
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
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600"
                    style={{ width: "76%" }}
                  />
                </div>
              </div>

              {/* Floating Certificates Card – bottom right */}
              <div className="absolute bottom-16 -right-6 z-20 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-200/80">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shrink-0">
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
const trustedLogos = [
  {
    name: "Microsoft",
    render: () => (
      <div className="flex items-center gap-2 text-slate-300 hover:text-slate-400 transition-colors cursor-default">
        {/* Windows 4-square icon */}
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
      <span className="text-[22px] font-black tracking-[0.1em] text-slate-300 hover:text-slate-400 transition-colors cursor-default">
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

/* ─── Popular Courses ────────────────────────────────────────────────────── */
function CoursesSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-600">Popular Now</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Start with the Best Courses
            </h2>
          </div>
          <Link
            href="/all-courses"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularCourses.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                href="/all-courses"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={c.thumb}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <span className={`absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${c.tagColor}`}>
                    {c.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Icon className={`h-3.5 w-3.5 ${c.iconColor}`} />
                    <span className="text-[11px] font-semibold text-slate-400">{c.platform}</span>
                  </div>
                  <h3 className="mb-3 flex-1 text-sm font-bold leading-snug text-slate-900 line-clamp-2">
                    {c.title}
                  </h3>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-violet-600">{c.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-600">{c.rating}</span>
                    </div>
                    <span>{c.students} students</span>
                    <span>{c.duration}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600">Real People, Real Results</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            What Our Learners Say
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-5 text-sm leading-relaxed text-slate-600">&quot;{t.text}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linear-to-br ${t.avatarBg} text-sm font-black text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ───────────────────────────────────────────────────────────── */
function PricingSection() {
  return (
    <section id="pricing" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600">Simple Pricing</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Invest in Your Growth
          </h2>
          <p className="mt-4 text-base text-slate-500">
            No hidden fees, no complicated tiers — just honest pricing for real learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pricingPlans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                p.popular ? "border-violet-300 ring-2 ring-violet-200" : "border-slate-100"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-bold text-white shadow-sm">
                  Most Popular
                </div>
              )}

              <p className="text-base font-black text-slate-900">{p.name}</p>
              <div className="mt-3 flex items-end gap-1">
                {p.price === "Custom" ? (
                  <span className="text-3xl font-black text-slate-900">Custom</span>
                ) : (
                  <>
                    <span className="text-xs font-semibold text-slate-400">$</span>
                    <span className="text-4xl font-black text-slate-900">{p.price}</span>
                  </>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-400">{p.period}</p>

              <p className="mt-3 text-sm text-slate-500">{p.desc}</p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={p.name === "Enterprise" ? "#contact" : "/register"}
                className={`mt-8 inline-flex h-10 w-full items-center justify-center rounded-xl text-sm font-bold transition-all ${p.ctaStyle}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600 px-8 py-12 shadow-2xl shadow-violet-300/30 lg:px-14">
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
            <div className="w-full max-w-[260px] shrink-0 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
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


/* ─── Contact ───────────────────────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In a real app this would call an API endpoint
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600">Get in Touch</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            We&apos;d Love to Hear from You
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Whether you have a question about features, pricing, or anything else — our team is here to help.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-teal-500" />
            <p className="font-bold text-teal-800">Message sent! We'll be in touch shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-semibold text-slate-700" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-bold text-white shadow-md shadow-violet-300/40 transition hover:bg-violet-700"
            >
              Send Message
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
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
          <CoursesSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
          <ContactSection />
        </main>
        <HomeFooter />
      </div>
    </>
  );
}
