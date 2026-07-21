import React from "react";
import type { Metadata } from "next";
import { HomeNavbar } from "@/components/layout/HomeNavbar";
import { AboutFooter } from "@/components/layout/AboutFooter";
import {
  Headphones,
  MessageCircle,
  Lightbulb,
  Briefcase,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./ContactForm";
/* ─── Metadata ──────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the LearningHub team for support, inquiries, and feedback.",
};

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const contactFeatures = [
  {
    icon: Headphones,
    title: "Support",
    desc: "Get help with your account, courses, or technical issues.",
  },
  {
    icon: MessageCircle,
    title: "General Inquiries",
    desc: "Ask about our platform, features or partnerships.",
  },
  {
    icon: Lightbulb,
    title: "Feedback",
    desc: "We value your feedback to improve your experience.",
  },
  {
    icon: Briefcase,
    title: "Business Solutions",
    desc: "Looking for corporate training or LMS solutions?",
  },
];

const reachUsItems = [
  {
    icon: Mail,
    title: "Email Us",
    content: "support@kaishiinnovations.com",
    subtext: "We typically reply within 24 hours",
    link: null,
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+94 77 885 0895",
    subtext: "Mon - Fri, 9:00 AM - 6:00 PM (IST)",
    link: null,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Kaishi Innovations (Pvt) Ltd,\nPiliyandala, Sri Lanka",
    subtext: "Mon - Fri, 9:00 AM - 6:00 PM (IST)",
    link: null,
  },
  {
    icon: Clock,
    title: "Help Center",
    content: "Browse our articles and find quick answers.",
    subtext: null,
    link: { text: "Visit Help Center", href: "#" },
  },
  {
    icon: Users,
    title: "Community",
    content: "Join our community to learn, share and grow together.",
    subtext: null,
    link: { text: "Join Community", href: "#" },
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FE]">
      <HomeNavbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div 
          className="absolute right-0 top-0 -z-10 h-200 w-200 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#4c1d95 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at right top, black 20%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(ellipse at right top, black 20%, transparent 60%)"
          }}
        />

        {/* ══════════════════════════════════════════════════
            HERO & FORM SECTION
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            
            {/* ── Left Column: Text & Features ── */}
            <div className="lg:col-span-5 lg:pt-4">
              {/* Label */}
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-600">
                CONTACT US
              </p>
              
              {/* Heading */}
              <h1 className="mb-4 text-[38px] font-bold leading-[1.12] tracking-tight text-slate-900 lg:text-[44px]">
                We&apos;re Here to Help<br />
                <span className="text-violet-600">You Learn and Grow</span>
              </h1>
              
              {/* Description */}
              <p className="mb-10 text-[14.5px] leading-[1.75] text-slate-500 max-w-105">
                Have a question, suggestion, or need support? Our team is here to help you on your learning journey.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {contactFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-50/80 text-violet-600">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="pt-0.5">
                        <h3 className="mb-1.5 text-[13.5px] font-bold text-slate-900">
                          {feat.title}
                        </h3>
                        <p className="text-[12px] leading-[1.6] text-slate-500">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right Column: Contact Form ── */}
            <div className="relative lg:col-span-7">
              <div className="rounded-[20px] border border-slate-100 bg-white p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
                <div className="mb-8">
                  <h2 className="text-[20px] font-bold text-slate-900">Send us a message</h2>
                  <p className="mt-1.5 text-[13.5px] text-slate-500">Fill out the form and we&apos;ll get back to you as soon as possible.</p>
                </div>

                <ContactForm />
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            OTHER WAYS TO REACH US
        ══════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h3 className="mb-6 text-[16.5px] font-bold text-slate-900">Other Ways to Reach Us</h3>
          
          <div className="rounded-[20px] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:divide-x lg:divide-slate-100">
              {reachUsItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`flex flex-col ${index !== 0 ? 'lg:pl-6' : ''}`}>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-violet-50/80 text-violet-600">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4 className="mb-2 text-[14px] font-bold text-slate-900">{item.title}</h4>
                    
                    {item.link ? (
                      <div className="flex flex-col flex-1">
                        <p className="mb-4 text-[12.5px] leading-[1.65] text-slate-500 pr-2">{item.content}</p>
                        <div className="mt-auto pt-2">
                          <Link href={item.link.href} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-violet-600 transition-colors hover:text-violet-700">
                            {item.link.text}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <p className={`text-[13px] whitespace-pre-line leading-[1.6] ${item.title === 'Email Us' || item.title === 'Call Us' ? 'font-medium text-slate-700' : 'text-slate-500'}`}>
                          {item.content}
                        </p>
                        {item.subtext && (
                          <p className="mt-2 text-[12px] leading-[1.6] text-slate-500 pr-2">{item.subtext}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <AboutFooter />
    </div>
  );
}
