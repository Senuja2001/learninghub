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

/* ─── Data ───────────────────────────────────────────────────────────────── */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "#features" },
  { label: "Courses", href: "/all-courses" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

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
    desc: "Access industry-leading courses from YouTube, Udemy, Coursera and more — hand-picked so you spend time learning, not searching.",
    color: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Route,
    title: "Learning Paths",
    desc: "Follow structured career roadmaps designed by industry experts — from junior dev to cloud architect, we map your journey.",
    color: "from-teal-500 to-emerald-600",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: BarChart2,
    title: "Track Progress",
    desc: "Real-time analytics on your learning hours, course completions and skill growth — stay motivated and never lose momentum.",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: GraduationCap,
    title: "Certificates",
    desc: "Earn verifiable certificates for each completed path and course — download as PDF, share on LinkedIn, or show employers.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Brain,
    title: "Skill Assessment",
    desc: "Take built-in quizzes and challenges after each module to test what you've learned and identify where to go deeper.",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Users,
    title: "Team Learning",
    desc: "Learn side-by-side with your team, share bookmarks, compare streaks, and celebrate wins together on the community board.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
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

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const count = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
        <Icon className="h-5 w-5 text-violet-600" />
      </div>
      <span className="text-2xl font-black text-slate-900">{count}</span>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}

/* ─── Hero section ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-10 lg:pb-24 lg:pt-16">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-150 w-150 rounded-full bg-violet-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-100 w-100 rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700">#1 Learning Platform for IT Professionals</span>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Empower Your Career.{" "}
              <span className="bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Learn. Grow. Succeed.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 lg:text-lg">
              LearningHub is your all-in-one learning management system for the IT industry. Access curated courses, track progress, earn certificates, and accelerate your career growth.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-300/40 transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-300/60"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/all-courses"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
              >
                <PlayCircle className="h-4 w-4 text-violet-500" />
                Explore Courses
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
              {[
                "No credit card required",
                "Cancel anytime",
                "7-day free trial",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right – hero card */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Main card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-200/60">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Your Progress</p>
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-700">78%</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500"
                  style={{ width: "78%" }}
                />
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { name: "React – The Complete Guide", prog: 78, color: "bg-violet-500" },
                  { name: "AWS Solutions Architect", prog: 41, color: "bg-amber-500" },
                  { name: "JavaScript Algorithms", prog: 60, color: "bg-teal-500" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-medium text-slate-700">{c.name}</p>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.prog}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{c.prog}%</span>
                  </div>
                ))}
              </div>

              {/* Certificates earned badge */}
              <div className="mt-5 flex items-center justify-between rounded-xl bg-linear-to-r from-violet-50 to-indigo-50 p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 text-white">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Certificates Earned</p>
                    <p className="text-xl font-black text-slate-900">12</p>
                  </div>
                </div>
                <TrendingUp className="h-5 w-5 text-teal-500" />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg shadow-slate-200/80">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-slate-700">5,000+ learners online</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trusted By ────────────────────────────────────────────────────────── */
function TrustedSection() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          Trusted by learners from leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {trustedBy.map((c) => (
            <span
              key={c.name}
              className="text-xl font-black tracking-tight text-slate-300 transition-colors hover:text-slate-500"
            >
              {c.logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ──────────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600">Platform Features</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Powerful features designed to make learning simple, effective, and engaging — all in one place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg}`}>
                  <Icon className={`h-5 w-5 ${f.iconColor}`} />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
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
              <p className="mb-5 text-sm leading-relaxed text-slate-600">"{t.text}"</p>

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
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-violet-600 via-indigo-600 to-purple-700 px-8 py-14 text-center shadow-2xl shadow-violet-300/30 lg:px-16">
          {/* Background dots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-violet-100">
              Join thousands of IT professionals who are already learning and growing with LearningHub. Your next career move starts here.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-violet-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Floating mini preview */}
          <div className="relative mx-auto mt-10 hidden max-w-xs rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm sm:block">
            <p className="mb-2 text-xs font-bold text-white/80">Continue Learning</p>
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-2.5">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-500/80">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-semibold text-white">React – The Complete Guide</p>
                <div className="mt-1 h-1 w-full rounded-full bg-white/20">
                  <div className="h-full w-[78%] rounded-full bg-white/70" />
                </div>
              </div>
              <span className="text-xs font-bold text-white/80">78%</span>
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

/* ─── Navbar ────────────────────────────────────────────────────────────── */
function HomeNavbar() {
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
          <Image
            src="/kaishi-logo.png"
            alt="LearningHub by Kaishi Innovations"
            width={130}
            height={50}
            className="object-contain"
            style={{ height: "auto" }}
            priority
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

/* ─── Footer ────────────────────────────────────────────────────────────── */
function HomeFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/kaishi-logo.png"
              alt="Kaishi Innovations"
              width={130}
              height={50}
              className="mb-3 object-contain"
              style={{ height: "auto" }}
            />
            <p className="text-sm leading-relaxed text-slate-500">
              LearningHub is built by Kaishi Innovations to help IT professionals learn faster, grow smarter, and reach their career goals.
            </p>
            <div className="mt-4 flex gap-3">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Platform",
              links: ["All Courses", "Learning Paths", "Certificates", "Community"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              title: "Support",
              links: ["Help Centre", "Privacy Policy", "Terms of Service", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-600 transition hover:text-violet-600">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Kaishi Innovations. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with ♥ for IT learners worldwide.
          </p>
        </div>
      </div>
    </footer>
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
