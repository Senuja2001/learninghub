import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeNavbar } from "@/components/layout/HomeNavbar";
import { HomeFooter } from "@/components/layout/HomeFooter";
import {
  Users,
  Shield,
  Minus,
  CheckCircle2,
  Headphones,
  ArrowRight,
  Crown,
} from "lucide-react";
import { PricingFAQ } from "./PricingFAQ";

/* ─── Metadata ──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing plans for smarter team learning. Choose the right plan for your organization.",
};

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const plans = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    desc: "Perfect for small teams getting started with structured learning.",
    target: "For Small Teams",
    limit: "Up to 20 users",
    cta: "Get Started",
    ctaHref: "/register",
    ctaVariant: "outline" as const,
    features: [
      "Curated learning resources",
      "Basic learning paths",
      "Bookmarks & saved content",
      "Progress tracking",
      "Email support",
    ],
    highlight: false,
  },
  {
    id: "professional",
    name: "Professional",
    badge: "Most Popular",
    desc: "Ideal for growing companies looking to develop their teams.",
    target: "For Growing Teams",
    limit: "Up to 200 users",
    cta: "Get Started",
    ctaHref: "/register",
    ctaVariant: "solid" as const,
    features: [
      "Advanced learning paths",
      "Certificates & achievements",
      "Community & tech news access",
      "Team analytics & insights",
      "Priority email support",
      "Employee management",
    ],
    featuresPrefix: "Everything in Starter, plus:",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: null,
    desc: "Enterprise-grade solutions for large organizations with advanced needs.",
    target: "Custom Solutions",
    limit: "Unlimited users",
    cta: "Contact Sales",
    ctaHref: "/contact",
    ctaVariant: "outline" as const,
    features: [
      "Custom learning paths",
      "Advanced reporting & analytics",
      "SSO & role-based access",
      "Dedicated account manager",
      "Priority support & SLAs",
      "Custom integrations",
    ],
    featuresPrefix: "Everything in Professional, plus:",
    highlight: false,
  },
];

type Cell = boolean | "partial";

const comparisonFeatures: { label: string; starter: Cell; professional: Cell; enterprise: Cell }[] = [
  { label: "Curated Learning Resources", starter: true, professional: true, enterprise: true },
  { label: "Basic Learning Paths", starter: true, professional: true, enterprise: true },
  { label: "Advanced Learning Paths", starter: false, professional: true, enterprise: true },
  { label: "Certificates & Achievements", starter: "partial", professional: true, enterprise: true },
  { label: "Community & Tech News", starter: false, professional: true, enterprise: true },
  { label: "Team Analytics & Insights", starter: false, professional: true, enterprise: true },
  { label: "Employee Management", starter: false, professional: true, enterprise: true },
  { label: "SSO & Role-based Access", starter: false, professional: false, enterprise: true },
  { label: "Dedicated Account Manager", starter: false, professional: false, enterprise: true },
  { label: "Custom Integrations", starter: false, professional: false, enterprise: true },
];

const faqs = [
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "How is pricing calculated?",
    a: "Pricing is based on the number of active users in your organization. You only pay for the seats you use.",
  },
  {
    q: "Is there a free trial available?",
    a: "We offer a 14-day free trial on the Professional plan so your team can explore all features before committing.",
  },
  {
    q: "Do you offer onboarding and training?",
    a: "Yes! Enterprise customers receive a dedicated onboarding session. All plans have access to our Help Center and documentation.",
  },
];

/* ─── Cell Component ─────────────────────────────────────────────────────────── */
function CellIcon({ value }: { value: Cell }) {
  if (value === true)
    return <CheckCircle2 className="mx-auto h-5 w-5 text-violet-600" strokeWidth={2} />;
  if (value === "partial")
    return <CheckCircle2 className="mx-auto h-5 w-5 text-slate-400" strokeWidth={2} />;
  return <Minus className="mx-auto h-4 w-4 text-slate-300" strokeWidth={2} />;
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HomeNavbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white">
          {/* Dot grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage: "radial-gradient(circle, #c4b5fd 1.2px, transparent 1.2px)",
              backgroundSize: "28px 28px",
              opacity: 0.35,
            }}
          />

          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left */}
              <div className="lg:col-span-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-600">
                  PRICING PLANS
                </p>
                <h1 className="mb-5 text-[38px] font-bold leading-[1.1] tracking-tight text-slate-900 lg:text-[44px]">
                  Simple plans for{" "}
                  <span className="text-violet-600">smarter team learning.</span>
                </h1>
                <p className="mb-8 max-w-md text-[14.5px] leading-[1.75] text-slate-500">
                  Choose the right plan for your organization and empower your teams
                  with curated learning resources, structured career paths, and
                  continuous professional development.
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                      <Users className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-bold text-slate-900">Built for Teams</p>
                      <p className="text-[11.5px] text-slate-500">
                        Designed to help teams learn, grow, and achieve more together.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                      <Shield className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-bold text-slate-900">Secure & Reliable</p>
                      <p className="text-[11.5px] text-slate-500">
                        Enterprise-grade security to keep your data and team safe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Office Image */}
              <div className="relative lg:col-span-7">
                <div className="relative overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(91,62,230,0.15)]">
                  <Image
                    src="/pricing-office.png"
                    alt="Modern collaborative office space"
                    width={1200}
                    height={700}
                    className="h-70 w-full object-cover sm:h-85 lg:h-95"
                    priority
                  />
                  {/* Subtle violet tint overlay */}
                  <div className="absolute inset-0 rounded-[24px] bg-violet-900/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            PRICING CARDS
        ══════════════════════════════════════════════════ */}
        <section className="bg-[#F8F9FE] py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-[20px] border p-7 ${
                    plan.highlight
                      ? "border-violet-600 bg-white shadow-[0_8px_40px_rgba(91,62,230,0.20)]"
                      : "border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  {/* Most Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-violet-600 px-4 py-1 text-[11px] font-bold text-white shadow-sm">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h2 className="text-[22px] font-bold text-slate-900">{plan.name}</h2>
                      <p className="mt-1.5 text-[12.5px] leading-[1.6] text-slate-500">{plan.desc}</p>
                    </div>
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        plan.highlight ? "bg-violet-100 text-violet-600" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {plan.id === "enterprise" ? (
                        <Crown className="h-4.5 w-4.5" strokeWidth={1.75} />
                      ) : (
                        <Users className="h-4.5 w-4.5" strokeWidth={1.75} />
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`mb-5 h-0.5 w-8 rounded-full ${plan.highlight ? "bg-violet-600" : "bg-slate-200"}`} />

                  {/* Target */}
                  <p className="mb-0.5 text-[13.5px] font-bold text-slate-900">{plan.target}</p>
                  <p className="mb-6 text-[12.5px] text-slate-500">{plan.limit}</p>

                  {/* CTA */}
                  <Link
                    href={plan.ctaHref}
                    className={`mb-6 flex h-10 w-full items-center justify-center rounded-[10px] text-[13.5px] font-semibold transition-all ${
                      plan.ctaVariant === "solid"
                        ? "bg-[#5B3EE6] text-white hover:bg-[#4A32BA] shadow-[0_4px_14px_rgba(91,62,230,0.35)]"
                        : "border border-violet-600 text-violet-600 hover:bg-violet-50"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {/* Features */}
                  <div>
                    {plan.featuresPrefix && (
                      <p className="mb-3 text-[12px] font-semibold text-slate-700">
                        {plan.featuresPrefix}
                      </p>
                    )}
                    {!plan.featuresPrefix && (
                      <p className="mb-3 text-[12px] font-semibold text-slate-700">Includes:</p>
                    )}
                    <ul className="space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <CheckCircle2
                            className={`h-4 w-4 shrink-0 ${
                              plan.highlight ? "text-violet-600" : "text-violet-500"
                            }`}
                            strokeWidth={2}
                          />
                          <span className="text-[12.5px] text-slate-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FEATURE COMPARISON TABLE
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 pr-4 text-[13px] font-bold text-slate-900 w-[45%]">
                    Features
                  </th>
                  <th className="pb-4 px-4 text-center text-[13px] font-bold text-slate-900 w-[18%]">
                    Starter
                  </th>
                  <th className="pb-4 px-4 text-center text-[13px] font-bold text-violet-600 w-[18%]">
                    Professional
                  </th>
                  <th className="pb-4 pl-4 text-center text-[13px] font-bold text-slate-900 w-[18%]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                  >
                    <td className="py-3.5 pr-4 text-[13px] text-slate-700">{row.label}</td>
                    <td className="py-3.5 px-4 text-center">
                      <CellIcon value={row.starter} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <CellIcon value={row.professional} />
                    </td>
                    <td className="py-3.5 pl-4 text-center">
                      <CellIcon value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FAQ SECTION
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-[22px] font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mb-8 h-0.5 w-10 rounded-full bg-violet-600" />
          <PricingFAQ faqs={faqs} />
        </section>

        {/* ══════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-[20px] border border-slate-100 bg-[#F8F9FE] px-8 py-8 sm:flex-row sm:justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <Headphones className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[16px] font-bold text-slate-900">
                  Need a custom solution for your organization?
                </p>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  Our team will help you find the perfect plan for your learning goals.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-[10px] bg-[#5B3EE6] px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#4A32BA] shadow-[0_4px_14px_rgba(91,62,230,0.35)]"
            >
              Talk to Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
