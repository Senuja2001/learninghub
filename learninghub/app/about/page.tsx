import React from "react";
import Link from "next/link";
import { HomeNavbar } from "@/components/layout/HomeNavbar";
import { HomeFooter } from "@/components/layout/HomeFooter";
import {
  Users,
  Target,
  Eye,
  BookOpen,
  Route,
  Globe,
  Award,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

// Raw SVGs for Social Icons (since lucide-react removed brand icons)
const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const metadata = {
  title: "About Us | LearningHub",
  description: "Learn more about LearningHub and Kaishi Innovations.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HomeNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24 lg:pb-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Left Column: Text & Features */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-600">
                About LearningHub
              </p>
              <h1 className="mb-6 text-4xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
                Empowering People Through <br className="hidden md:block" />
                <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Continuous Learning
                </span>
              </h1>
              <p className="mb-10 text-lg leading-relaxed text-slate-600">
                LearningHub is an employee learning and development platform powered by Kaishi Innovations, designed to help technology professionals discover trusted learning resources, develop new skills, and grow throughout their careers.
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-slate-900">Curated Learning</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Discover carefully selected learning resources from trusted global platforms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-slate-900">Career Growth</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Follow role-based learning paths designed to support continuous professional development.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Image & Floating Card */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative h-[400px] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl lg:h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-us.png"
                  alt="Modern Office"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Mission/Vision Card */}
              <div className="absolute -bottom-10 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-lg border border-white/40 sm:p-8 lg:-bottom-12">
                <div className="grid gap-6 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:gap-0">
                  <div className="pr-6 sm:pr-8">
                    <div className="mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-violet-600" />
                      <h4 className="font-bold text-slate-900">Our Mission</h4>
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-600">
                      To make continuous learning simple and accessible by connecting employees with high-quality learning opportunities.
                    </p>
                  </div>
                  <div className="pt-6 sm:pl-8 sm:pt-0">
                    <div className="mb-3 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <h4 className="font-bold text-slate-900">Our Vision</h4>
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-600">
                      To empower every employee to continuously develop their skills and achieve meaningful career growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS BAR */}
        <section className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center justify-center gap-y-10 divide-x-0 divide-slate-100 md:justify-between lg:divide-x">
              {[
                { label: "Active Learners", value: "5000+", icon: Users },
                { label: "Curated Courses", value: "300+", icon: BookOpen },
                { label: "Learning Paths", value: "50+", icon: Route },
                { label: "Career Roles", value: "10+", icon: Briefcase },
                { label: "Learning Platforms", value: "Multiple", icon: Globe },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex w-1/2 flex-col items-center gap-3 px-4 lg:w-auto lg:px-8">
                    <Icon className="h-7 w-7 text-violet-500" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                      <div className="mt-1 text-xs font-medium text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* THREE COLUMNS: STORY, JOURNEY, VALUES */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
            
            {/* 1. Our Story */}
            <div>
              <h2 className="mb-6 text-2xl font-black text-slate-900">Our Story</h2>
              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                LearningHub was created to centralize employee learning resources and make professional development easier for everyone. What started as an internal initiative to organize disjointed training materials has evolved into a comprehensive learning management platform.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-slate-600">
                Instead of hosting courses directly, LearningHub acts as an intelligent aggregator—connecting employees with trusted external resources, global platforms, and certification opportunities, all neatly organized into tailored career paths.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-sm"
              >
                Explore LearningHub
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 2. Our Journey */}
            <div>
              <h2 className="mb-6 text-2xl font-black text-slate-900">Our Journey</h2>
              <div className="relative ml-3 border-l-2 border-slate-100 py-2">
                {[
                  { phase: "Phase 1", title: "Idea & Research", desc: "Initial concept and employee needs assessment." },
                  { phase: "Phase 2", title: "Platform Development", desc: "Building the core LMS architecture." },
                  { phase: "Phase 3", title: "Resource Integration", desc: "Connecting external courses and platforms." },
                  { phase: "Phase 4", title: "Community Features", desc: "Adding social and news sharing capabilities." },
                  { phase: "Phase 5", title: "Continuous Growth", desc: "Ongoing platform enhancements." },
                ].map((item, i) => (
                  <div key={i} className="mb-8 pl-8 relative last:mb-0">
                    <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-violet-600 shadow-[0_0_0_4px_#f8fafc]" />
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-slate-800">{item.phase}</span>
                      <span className="text-sm font-semibold text-slate-600">{item.title}</span>
                    </div>
                    <p className="text-[13px] text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Our Core Values */}
            <div>
              <h2 className="mb-6 text-2xl font-black text-slate-900">Our Core Values</h2>
              <div className="space-y-6">
                {[
                  { icon: GraduationCap, title: "Continuous Learning", desc: "We believe education never stops." },
                  { icon: Globe, title: "Accessibility", desc: "Quality resources available to everyone." },
                  { icon: Briefcase, title: "Career Growth", desc: "Supporting meaningful professional development." },
                  { icon: Users, title: "Collaboration", desc: "Learning together and sharing knowledge." },
                  { icon: Sparkles, title: "Innovation", desc: "Embracing new ways to learn and grow." },
                ].map((value, i) => {
                  const Icon = value.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-violet-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{value.title}</h4>
                        <p className="mt-1 text-[13px] text-slate-500">{value.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* CONNECT WITH US */}
        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              
              <div className="max-w-sm">
                <h2 className="mb-3 text-xl font-black text-slate-900">Connect With Us</h2>
                <p className="text-sm leading-relaxed text-slate-500">
                  Follow Kaishi Innovations on our social media platforms to stay updated with our latest news, projects, and insights.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Facebook", handle: "@kaishiinnovations", icon: FacebookIcon, color: "text-blue-600" },
                  { name: "LinkedIn", handle: "Kaishi Innovations", icon: LinkedinIcon, color: "text-sky-600" },
                  { name: "YouTube", handle: "@kaishiinnovations", icon: YoutubeIcon, color: "text-red-500" },
                  { name: "GitHub", handle: "kaishiinnovations", icon: GithubIcon, color: "text-slate-900" },
                  { name: "Instagram", handle: "@kaishi.innovations", icon: InstagramIcon, color: "text-pink-600" },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href="#"
                      className="group flex w-[220px] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
                    >
                      <Icon className={`h-6 w-6 ${social.color} transition-transform group-hover:scale-110`} />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{social.name}</div>
                        <div className="text-xs text-slate-500">{social.handle}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

      </main>

      <HomeFooter />
    </div>
  );
}
