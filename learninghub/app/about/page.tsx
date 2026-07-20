import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { HomeNavbar } from "@/components/layout/HomeNavbar";
import { AboutFooter } from "@/components/layout/AboutFooter";
import {
  Target,
  Eye,
  BookOpen,
  Route,
  Globe,
  Award,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Users,
  Lightbulb,
  Rocket,
  LayoutGrid,
  TrendingUp,
} from "lucide-react";

/* ─── Metadata ──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about LearningHub — an employee learning and development platform powered by Kaishi Innovations.",
};

/* ─── Data ───────────────────────────────────────────────────────────────────── */

const heroFeatures = [
  {
    icon: Rocket,
    title: "Curated Learning",
    desc: "Discover carefully selected learning resources from trusted global platforms.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    desc: "Follow role-based learning paths designed to support continuous professional development.",
  },
];

const stats = [
  { label: "Learning Resources", value: "5000+", icon: BookOpen },
  { label: "Curated Courses", value: "300+", icon: LayoutGrid },
  { label: "Learning Paths", value: "50+", icon: Route },
  { label: "Career Roles", value: "10+", icon: Briefcase },
  { label: "Learning Platforms", value: "Multiple", icon: Globe },
];

const journeyItems = [
  {
    year: "2019",
    title: "Idea & Research",
    desc: "LearningHub was founded with a small team and a big dream.",
  },
  {
    year: "2021",
    title: "Platform Development",
    desc: "Expanded our services and delivered our first enterprise solution.",
  },
  {
    year: "2023",
    title: "Learning Resource Integration",
    desc: "Reached 100+ successful projects and served clients internationally.",
  },
  {
    year: "2024",
    title: "Community & News Integration",
    desc: "Added news integration and active community boards.",
  },
  {
    year: "2026",
    title: "Continuous Improvement",
    desc: "Continuing our mission to innovate and empower businesses globally.",
  },
];

const coreValues = [
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    desc: "We believe in transparency, honesty, and doing the right thing.",
  },
  {
    icon: Award,
    title: "Accessibility",
    desc: "We are committed to delivering the highest quality in everything we do.",
  },
  {
    icon: Users,
    title: "Career Growth",
    desc: "We work as one team with our clients to achieve shared success.",
  },
  {
    icon: Briefcase,
    title: "Collaboration",
    desc: "Fostering an inclusive environment where everyone learns together.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We continuously explore new ideas and technologies to stay ahead.",
  },
];

/* ─── Social Icon SVGs ───────────────────────────────────────────────────────── */
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const socialLinks = [
  {
    name: "Facebook",
    handle: "@kaishiinnovations",
    icon: FacebookIcon,
    color: "text-[#1877F2]",
    href: "#", // TODO: Replace with actual Facebook URL
  },
  {
    name: "LinkedIn",
    handle: "Kaishi Innovations",
    icon: LinkedinIcon,
    color: "text-[#0A66C2]",
    href: "#", // TODO: Replace with actual LinkedIn URL
  },
  {
    name: "YouTube",
    handle: "@kaishiinnovations",
    icon: YoutubeIcon,
    color: "text-[#FF0000]",
    href: "#", // TODO: Replace with actual YouTube URL
  },
  {
    name: "GitHub",
    handle: "kaishiinnovations",
    icon: GithubIcon,
    color: "text-slate-800",
    href: "#", // TODO: Replace with actual GitHub URL
  },
  {
    name: "Instagram",
    handle: "@kaishi.innovations",
    icon: InstagramIcon,
    color: "text-[#E4405F]",
    href: "#", // TODO: Replace with actual Instagram URL
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HomeNavbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">

            {/* ── Left Column ── */}
            <div className="lg:col-span-5 lg:pt-2">
              {/* Label */}
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-600">
                ABOUT LEARNINGHUB
              </p>

              {/* Heading */}
              <h1 className="mb-5 text-[38px] font-bold leading-[1.12] tracking-tight text-slate-900 lg:text-[42px] xl:text-[46px]">
                Empowering People Through{" "}
                <span className="text-violet-600">Continuous Learning</span>
              </h1>

              {/* Description */}
              <p className="mb-9 text-[14px] leading-[1.75] text-slate-500">
                LearningHub is an employee learning and development platform
                powered by Kaishi Innovations, designed to help technology
                professionals discover trusted learning resources, develop new
                skills, and grow throughout their careers.
              </p>

              {/* Feature Items */}
              <div className="flex flex-col gap-7">
                {heroFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.title} className="flex gap-4">
                      <div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                        <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                      </div>
                      <div className="pt-1">
                        <h3 className="mb-1 text-[14px] font-bold text-slate-900">
                          {feat.title}
                        </h3>
                        <p className="text-[13px] leading-[1.65] text-slate-500">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right Column (Image + Floating Card) ── */}
            <div className="relative lg:col-span-7">
              {/* Office Image */}
              <div className="relative h-87.5 w-full overflow-hidden rounded-[28px] sm:h-100 lg:h-110">
                <Image
                  src="/about-us.png"
                  alt="LearningHub — Kaishi Innovations Office"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>

              {/* Floating Mission / Vision Card */}
              <div
                className="
                  absolute -bottom-4 left-4 right-4
                  rounded-2xl border border-slate-100
                  bg-white/95 shadow-[0_12px_36px_rgba(0,0,0,0.10)]
                  backdrop-blur-sm
                  lg:bottom-4 lg:left-6 lg:right-6
                "
              >
                <div className="grid sm:grid-cols-2">
                  {/* Mission */}
                  <div className="flex gap-3.5 p-5 sm:p-6">
                    <div className="mt-0.5 shrink-0 text-violet-600">
                      <Target className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-[13px] font-bold text-slate-900">
                        Our Mission
                      </h4>
                      <p className="text-[11.5px] leading-[1.65] text-slate-500">
                        To make continuous learning simple and accessible by
                        connecting employees with high-quality learning
                        opportunities.
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-100" />

                  {/* Vision */}
                  <div className="flex gap-3.5 border-t border-slate-100 p-5 sm:border-l sm:border-t-0 sm:p-6">
                    <div className="mt-0.5 shrink-0 text-violet-600">
                      <Eye className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-[13px] font-bold text-slate-900">
                        Our Vision
                      </h4>
                      <p className="text-[11.5px] leading-[1.65] text-slate-500">
                        To empower every employee to continuously develop their
                        skills and achieve meaningful career growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            STATISTICS BAR
        ══════════════════════════════════════════════════ */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center justify-between">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <React.Fragment key={stat.label}>
                    {i > 0 && (
                      <div className="hidden h-12 w-px bg-slate-100 md:block" />
                    )}
                    <div className="flex min-w-40 flex-1 items-center gap-4 px-4 py-4 md:py-2">
                      <Icon
                        className="h-8 w-8 shrink-0 text-violet-500"
                        strokeWidth={1.5}
                      />
                      <div>
                        <div className="text-[22px] font-bold leading-tight text-slate-800">
                          {stat.value}
                        </div>
                        <div className="mt-0.5 text-[11px] font-medium text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            THREE-COLUMN: STORY · JOURNEY · VALUES
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-0">

            {/* ── Our Story ── */}
            <div className="lg:pr-10">
              <h2 className="mb-5 text-[20px] font-bold text-slate-900">
                Our Story
              </h2>
              <p className="mb-4 text-[13px] leading-[1.75] text-slate-500">
                LearningHub was created to centralize employee learning resources
                and make professional development easier for everyone. What
                started as a small initiative of passionate developers and
                designers has grown into a trusted learning partner for
                technology professionals around the world.
              </p>
              <p className="mb-8 text-[13px] leading-[1.75] text-slate-500">
                Instead of hosting courses directly, LearningHub connects
                employees with trusted external resources such as YouTube,
                Udemy, Coursera and Microsoft Learn, bridging the gap between
                ambition and high-quality education.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-violet-600 bg-transparent px-5 py-2 text-[13px] font-semibold text-violet-600 transition-colors hover:bg-violet-50"
              >
                Explore LearningHub
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* ── Our Journey ── */}
            <div className="border-slate-100 lg:border-l lg:border-r lg:px-10">
              <h2 className="mb-5 text-[20px] font-bold text-slate-900">
                Our Journey
              </h2>
              <div className="relative ml-1.5 border-l-2 border-slate-200">
                {journeyItems.map((item, i) => (
                  <div key={i} className="relative mb-7 pl-7 last:mb-0">
                    {/* Node */}
                    <div className="absolute -left-1.75 top-0.75 h-3.25 w-3.25 rounded-full bg-violet-600 ring-2 ring-white" />
                    {/* Year */}
                    <div className="mb-0.5 text-[13px] font-bold text-slate-800">
                      {item.year}
                    </div>
                    {/* Description */}
                    <p className="text-[12.5px] leading-[1.65] text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {item.title}.{" "}
                      </span>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Our Core Values ── */}
            <div className="lg:pl-10">
              <h2 className="mb-5 text-[20px] font-bold text-slate-900">
                Our Core Values
              </h2>
              <div className="space-y-5">
                {coreValues.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div key={val.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-slate-900">
                          {val.title}
                        </h4>
                        <p className="mt-0.5 text-[12px] leading-[1.65] text-slate-500">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            CONNECT WITH US
        ══════════════════════════════════════════════════ */}
        <section className="border-t border-slate-100 bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

              {/* Left: Heading */}
              <div className="shrink-0 lg:w-55">
                <h2 className="mb-1.5 text-[15px] font-bold text-slate-900">
                  Connect With Us
                </h2>
                <p className="text-[12px] leading-[1.7] text-slate-500">
                  Follow us on our social media platforms to stay updated with
                  our latest news, projects, and insights.
                </p>
              </div>

              {/* Right: Social Cards */}
              <div className="flex flex-wrap gap-3 lg:flex-1 lg:justify-end">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    // TODO: Replace href="#" with real social media URLs
                    <a
                      key={social.name}
                      href={social.href}
                      className="flex w-42 items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.07)]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                        <Icon className={`h-4.5 w-4.5 ${social.color}`} />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-slate-900">
                          {social.name}
                        </div>
                        <div className="text-[10.5px] text-slate-400">
                          {social.handle}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
      </main>

      <AboutFooter />
    </div>
  );
}
