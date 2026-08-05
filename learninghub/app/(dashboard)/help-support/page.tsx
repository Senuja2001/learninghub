"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Monitor,
  CreditCard,
  PlayCircle,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  Clock,
  Globe,
  ArrowRight,
} from "lucide-react";

/* ────────────────────────────────────────────────
   DATA — exactly matching the screenshot
──────────────────────────────────────────────── */

const quickHelpCards = [
  {
    id: "getting-started",
    icon: PlayCircle,
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Getting Started",
    eyebrow: "New to Learning Hub?",
    description: "Start your learning journey with these guides.",
  },
  {
    id: "courses-learning",
    icon: BookOpen,
    bgColor: "bg-sky-100",
    iconColor: "text-sky-600",
    title: "Courses & Learning",
    eyebrow: null,
    description: "Access courses, track progress, and manage your learning paths.",
  },
  {
    id: "certificates",
    icon: GraduationCap,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Certificates",
    eyebrow: null,
    description: "Find help with certificates, downloads, and verification process.",
  },
  {
    id: "account-settings",
    icon: Monitor,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Account & Settings",
    eyebrow: null,
    description: "Manage your account, security, notifications, and preferences.",
  },
  {
    id: "billing-payments",
    icon: CreditCard,
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600",
    title: "Billing & Payments",
    eyebrow: null,
    description: "Subscription, payments, invoices, and refund related help.",
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, browse our course catalog and click on the course you're interested in, then click 'Enroll Now'. If it's a paid course, you'll be prompted to complete payment. Free courses are accessible immediately after clicking enroll.",
  },
  {
    id: "faq-2",
    question: "How can I track my learning progress?",
    answer:
      "Your learning progress is automatically tracked as you complete lessons and modules. Visit 'My Progress' in the navigation or your individual course page to see completion percentages, time spent, and quiz scores.",
  },
  {
    id: "faq-3",
    question: "Where can I download my certificate?",
    answer:
      "Once you complete a course with a passing grade, your certificate is automatically generated. Go to 'Certificates' in your sidebar, find the completed course, and click 'Download PDF'. Certificates are also shareable via a unique URL.",
  },
  {
    id: "faq-4",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your registered email address, and we'll send you a reset link. The link expires after 24 hours. If you don't see the email, check your spam folder.",
  },
  {
    id: "faq-5",
    question: "Can I access courses on mobile?",
    answer:
      "Yes! LearningHub is fully responsive and works on all modern mobile browsers. We also offer offline downloading for select courses through our mobile app available on iOS and Android.",
  },
];

const popularGuides = [
  { id: "g1", title: "How to Enroll in a Course", subtitle: "Step-by-step guide" },
  { id: "g2", title: "Understanding Learning Paths", subtitle: "Complete guide" },
  { id: "g3", title: "How to Earn a Certificate", subtitle: "Step-by-step guide" },
  { id: "g4", title: "Troubleshooting Course Access", subtitle: "Solutions and tips" },
  { id: "g5", title: "Managing Your Profile", subtitle: "Update your information" },
];

const popularSearches = [
  "Reset Password",
  "Certificates",
  "Course Access",
  "Payment & Billing",
  "Learning Paths",
];

/* ────────────────────────────────────────────────
   FAQ ACCORDION ITEM
──────────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3.5 text-left"
      >
        <span className="text-sm font-medium text-slate-800">{question}</span>
        <ChevronDown
          className={`ml-3 size-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180 text-violet-600" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-slate-500">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   SUBMIT TICKET MODAL
──────────────────────────────────────────────── */
function TicketModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ subject: "", category: "general", message: "" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-violet-100">
              <Mail className="size-4 text-violet-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Submit a Ticket</h3>
              <p className="text-xs text-slate-400">We'll get back to you within 24 hours</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 transition text-lg"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-emerald-100">
              <svg className="size-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Ticket Submitted!</p>
              <p className="mt-1 text-sm text-slate-500">
                We've received your request and will respond within 24 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-4 px-6 py-5"
          >
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Subject</label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Brief description of your issue"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
              >
                <option value="general">General Inquiry</option>
                <option value="billing">Billing &amp; Payments</option>
                <option value="courses">Courses &amp; Learning</option>
                <option value="technical">Technical Issue</option>
                <option value="certificates">Certificates</option>
                <option value="account">Account &amp; Settings</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your issue in detail..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   LIVE CHAT MODAL
──────────────────────────────────────────────── */
function LiveChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "agent", text: "Hi! Welcome to LearningHub Support. How can I help you today?", time: "Now" },
  ]);
  const [input, setInput] = useState("");

  const agentResponses = [
    "Let me look into that for you right away!",
    "I understand. Could you provide more details?",
    "That's a great question! Here's what you need to do...",
    "I've escalated this to our technical team. You'll hear back shortly.",
    "Is there anything else I can help you with?",
  ];

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: input, time: "Just now" }]);
    setInput("");
    setTimeout(() => {
      const reply = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "agent", text: reply, time: "Just now" }]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-slate-900/50 backdrop-blur-sm p-6">
      <div className="flex w-full max-w-sm flex-col rounded-2xl bg-white shadow-2xl" style={{ height: 480 }}>
        <div className="flex items-center gap-3 rounded-t-2xl bg-violet-600 px-4 py-3">
          <div className="relative">
            <div className="grid size-9 place-items-center rounded-full bg-white/20">
              <MessageCircle className="size-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-violet-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Live Support</p>
            <p className="text-xs text-violet-200">Agent is online · Avg reply 2 min</p>
          </div>
          <button onClick={onClose} className="grid size-7 place-items-center rounded-lg text-white/70 hover:bg-white/10 transition">✕</button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.from === "agent" && (
                <div className="grid size-7 shrink-0 place-items-center self-end rounded-full bg-violet-100">
                  <MessageCircle className="size-3.5 text-violet-600" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.from === "user"
                    ? "rounded-br-sm bg-violet-600 text-white"
                    : "rounded-bl-sm bg-slate-100 text-slate-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-100 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-violet-400 focus:bg-white"
          />
          <button type="submit" className="grid size-9 place-items-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700">
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────────── */
export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const filteredFaqs = faqs.filter(
    (f) =>
      !searchQuery ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGuides = popularGuides.filter(
    (g) => !searchQuery || g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6 pb-10">

        {/* ── Page Title ─────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-black text-slate-900">Help &amp; Support</h1>
          <p className="mt-1 text-sm text-slate-500">
            We&apos;re here to help you learn, grow, and succeed.
          </p>
        </div>

        {/* ── Hero Search Banner ──────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-violet-100 bg-linear-to-br from-indigo-50 via-violet-50 to-purple-50 px-6 py-7">
          {/* Background glow blobs */}
          <div className="pointer-events-none absolute -top-12 -left-12 size-52 rounded-full bg-violet-200/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 right-32 size-52 rounded-full bg-indigo-200/25 blur-3xl" />

          {/* Left: Bot avatar */}
          <div className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/help-bot.png"
              alt="Support bot"
              className="h-32 w-32 object-contain drop-shadow-md animate-wave-shake"
            />
          </div>

          {/* Right: Book illustration */}
          <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/help-book.png"
              alt="Help book"
              className="h-40 w-40 object-contain drop-shadow-md"
            />
          </div>

          {/* Content — centred on mobile, leaving space for left/right images on larger screens */}
          <div className="relative mx-auto max-w-xl text-center md:ml-40 md:text-left lg:mx-auto lg:px-8">
            <h2 className="text-xl font-black text-slate-900">How can we help you?</h2>
            <p className="mt-1 text-sm text-slate-500">
              Search for help articles, guides, and solutions.
            </p>

            {/* Search input */}
            <label className="mt-4 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
              <Search className="size-4 shrink-0 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help articles, topics or keywords..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>

            {/* Popular searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="text-xs font-semibold text-slate-500">Popular searches:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-600 transition hover:border-violet-600 hover:bg-violet-600 hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Help ──────────────────────────────── */}
        <div>
          <h2 className="text-base font-black text-slate-900">Quick Help</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Find solutions quickly with our most common support topics.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {quickHelpCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
                >
                  <div className={`mb-3 grid size-11 place-items-center rounded-xl ${card.bgColor}`}>
                    <Icon className={`size-5 ${card.iconColor}`} />
                  </div>
                  {card.eyebrow && (
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {card.eyebrow}
                    </p>
                  )}
                  <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{card.description}</p>
                  <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-violet-600 transition-all group-hover:gap-2">
                    View Articles
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Three-column section ────────────────────── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* FAQ */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">Frequently Asked Questions</h2>
              <button className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition">
                View all FAQs <ArrowRight className="size-3.5" />
              </button>
            </div>
            <div>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
                ))
              ) : (
                <p className="py-6 text-center text-sm text-slate-400">No FAQs match your search.</p>
              )}
            </div>
          </div>

          {/* Popular Guides */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">Popular Guides</h2>
              <button className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition">
                View all guides <ArrowRight className="size-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <button
                    key={guide.id}
                    className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-violet-50">
                      <FileText className="size-4 text-violet-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight text-slate-800">{guide.title}</p>
                      <p className="text-xs text-slate-400">{guide.subtitle}</p>
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-500" />
                  </button>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-slate-400">No guides match your search.</p>
              )}
            </div>
          </div>

          {/* Still Need Help */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-black text-slate-900">Still Need Help?</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Can&apos;t find what you&apos;re looking for? Our support team is ready to assist you.
            </p>

            <div className="mt-5 space-y-4">
              {/* Submit a Ticket */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-100">
                  <Mail className="size-4 text-violet-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">Submit a Ticket</p>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Send us a message and we&apos;ll get back to you.
                  </p>
                </div>
                <button
                  onClick={() => setShowTicketModal(true)}
                  className="shrink-0 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-700"
                >
                  Create Ticket
                </button>
              </div>

              {/* Live Chat */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-100">
                  <MessageCircle className="size-4 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">Live Chat</p>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Chat with our support team (Available during business hours)
                  </p>
                </div>
                <button
                  onClick={() => setShowChatModal(true)}
                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Start Chat
                </button>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-100">
                  <Phone className="size-4 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">Call Us</p>
                  <p className="text-xs text-slate-500">Mon - Fri, 9:00 AM - 6:00 PM (IST)</p>
                  <a
                    href="tel:+94778850895"
                    className="mt-0.5 block text-sm font-bold text-violet-600 hover:underline"
                  >
                    +94 77 885 0895
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer Info Strip ───────────────────────── */}
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-slate-200 bg-white">
              <Shield className="size-5 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Trusted &amp; Secure</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                Your privacy and data security are our top priorities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-slate-200 bg-white">
              <Clock className="size-5 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Support Hours</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                Mon - Fri: 9:00 AM - 6:00 PM (IST)
                <br />
                We usually respond within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-slate-200 bg-white">
              <Globe className="size-5 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Help Center</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                Explore our comprehensive help center for more resources.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Chat Button ──────────────────────── */}
      <button
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-6 right-6 z-40 grid size-16 place-items-center rounded-full bg-violet-50 text-white shadow-lg shadow-violet-600/30 transition-all hover:-translate-y-1 hover:shadow-xl"
        aria-label="Open live chat"
      >
        <div className="overflow-hidden rounded-full p-1 border-2 border-violet-100 bg-white">
          <img src="/help-bot.png" alt="Help Bot" className="size-12 object-cover animate-wave-shake" />
        </div>
      </button>

      {/* ── Modals ────────────────────────────────────── */}
      {showTicketModal && <TicketModal onClose={() => setShowTicketModal(false)} />}
      {showChatModal && <LiveChatModal onClose={() => setShowChatModal(false)} />}
    </>
  );
}
