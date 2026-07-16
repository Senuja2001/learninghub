"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
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
  Sparkles,
  UserPlus,
  Compass,
  Trophy,
  Play,
  Check
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HomeNavbar } from "@/components/layout/HomeNavbar";
import { HomeFooter } from "@/components/layout/HomeFooter";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const stats = [
  { value: "5000+", label: "Active Learners", icon: Users },
  { value: "300+",  label: "Curated Courses", icon: BookOpen },
  { value: "50+",   label: "Learning Paths",  icon: Route },
  { value: "98%",   label: "Satisfaction Rate", icon: Star },
];

const features = [
  {
    icon: BookOpen,
    title: "Curated Courses",
    desc: "Access industry-leading courses from YouTube, Udemy, Coursera and more.",
    gradient: "from-blue-500 to-cyan-400",
    delay: "0ms",
  },
  {
    icon: Route,
    title: "Learning Paths",
    desc: "Follow structured learning paths designed by industry experts.",
    gradient: "from-teal-500 to-emerald-400",
    delay: "80ms",
  },
  {
    icon: BarChart2,
    title: "Track Progress",
    desc: "Monitor your learning progress with detailed analytics.",
    gradient: "from-sky-500 to-blue-400",
    delay: "160ms",
  },
  {
    icon: GraduationCap,
    title: "Certificates",
    desc: "Earn certificates and showcase your new skills to employers.",
    gradient: "from-amber-500 to-orange-400",
    delay: "240ms",
  },
  {
    icon: Brain,
    title: "Skill Assessment",
    desc: "Test your knowledge and track your skill improvement over time.",
    gradient: "from-rose-500 to-pink-400",
    delay: "320ms",
  },
  {
    icon: Users,
    title: "Team Learning",
    desc: "Learn with your team and achieve more together.",
    gradient: "from-violet-500 to-purple-400",
    delay: "400ms",
  },
];

const trustedLogos = [
  {
    name: "Microsoft",
    render: () => (
      <div className="flex items-center gap-2 text-slate-400 transition-colors cursor-default">
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
      <span className="text-[22px] font-medium tracking-tight text-slate-400 cursor-default">
        Google
      </span>
    ),
  },
  {
    name: "AWS",
    render: () => (
      <div className="flex flex-col items-center cursor-default">
        <span className="text-[18px] font-black tracking-tight text-slate-400 leading-none">aws</span>
        <div className="mt-0.5 h-0.5 w-10 bg-slate-400 rounded" />
      </div>
    ),
  },
  {
    name: "IBM",
    render: () => (
      <span className="text-[22px] font-black tracking-widest text-slate-400 cursor-default">
        IBM
      </span>
    ),
  },
  {
    name: "Oracle",
    render: () => (
      <span className="text-[18px] font-bold text-slate-400 cursor-default uppercase">
        ORACLE
      </span>
    ),
  },
  {
    name: "Infosys",
    render: () => (
      <span className="text-[18px] font-semibold text-slate-400 cursor-default">
        Infosys
      </span>
    ),
  },
];

const ctaAvatars = [
  { initials: "ST", gradient: "from-violet-400 to-indigo-500" },
  { initials: "MJ", gradient: "from-teal-400 to-emerald-500" },
  { initials: "PN", gradient: "from-rose-400 to-pink-500" },
  { initials: "AR", gradient: "from-amber-400 to-orange-500" },
  { initials: "KC", gradient: "from-sky-400 to-blue-500" },
];

const howItWorksSteps = [
  { icon: UserPlus, title: "Create Your Account", desc: "Sign up free in under 60 seconds." },
  { icon: Compass, title: "Choose Your Path", desc: "Browse 300+ courses & expert paths." },
  { icon: Trophy, title: "Earn Certificates", desc: "Complete, certify, and grow your career." }
];

const instructors = [
  { name: "Sarah Drasner", role: "Vue Core Team", courses: 14, rating: "4.9", avatar: "SD", color: "from-emerald-400 to-teal-500" },
  { name: "Kent C. Dodds", role: "React Expert", courses: 22, rating: "4.9", avatar: "KD", color: "from-blue-400 to-indigo-500" },
  { name: "Wes Bos", role: "Full Stack Dev", courses: 18, rating: "4.8", avatar: "WB", color: "from-amber-400 to-orange-500" },
  { name: "Cassidy Williams", role: "UI/UX Engineer", courses: 10, rating: "4.9", avatar: "CW", color: "from-rose-400 to-pink-500" },
];

/* ─── Hooks & Utilities ──────────────────────────────────────────────────── */

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

function useCountUp(target: string, duration = 1800) {
  const [count, setCount]   = useState("0");
  const [glowing, setGlowing] = useState(false);
  const ref     = useRef(false);
  const elemRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = elemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ref.current) {
          ref.current = true;
          const numeric = parseInt(target.replace(/\D/g, ""));
          const suffix  = target.replace(/\d/g, "");
          if (!numeric) { setCount(target); return; }

          const steps     = 60;
          const increment = numeric / steps;
          let current     = 0;
          const interval  = setInterval(() => {
            current += increment;
            if (current >= numeric) {
              setCount(target);
              setGlowing(true);
              setTimeout(() => setGlowing(false), 2000);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current) + suffix);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, glowing, elemRef };
}

function useFadeUp() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("fade-up-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("fade-up-hidden");
          el.classList.add("animate-fade-up");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useLearnerCount() {
  const [count, setCount] = useState(42);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.min(70, Math.max(30, prev + change));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

/* ─── Micro-Interaction Components ───────────────────────────────────────── */

function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 h-0.75 z-9999 bg-linear-to-r from-blue-500 to-violet-600 transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
  );
}

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}>
      <div className="relative">
        <div className="animate-ring-pulse absolute inset-0 rounded-full bg-blue-400/40" />
        <Link
          href="/register"
          className="relative flex h-12 items-center rounded-full bg-linear-to-r from-blue-500 to-violet-600 px-6 text-sm font-bold text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          Get Started Free <span className="ml-2 font-normal">→</span>
        </Link>
      </div>
    </div>
  );
}

function RippleButton({ children, className, href }: { children: ReactNode, className: string, href: string }) {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples([...ripples, { x, y, id: Date.now() }]);
  };

  return (
    <Link href={href} className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      <span className="relative z-10 flex items-center justify-center gap-1.5 h-full w-full">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/40 animate-ripple pointer-events-none z-0"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
          }}
          onAnimationEnd={() => setRipples(ripples.filter(rip => rip.id !== r.id))}
        />
      ))}
    </Link>
  );
}

function Tilt3DCard({ children, className }: { children: ReactNode, className?: string }) {
  const [style, setStyle] = useState({});
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;
    setStyle({ transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
  };
  const handleMouseLeave = () => setStyle({ transform: `perspective(800px) rotateX(0deg) rotateY(0deg)` });
  return (
    <div
      className={`transition-transform duration-200 ease-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const { count, glowing, elemRef } = useCountUp(value);
  return (
    <div className="flex flex-col items-start">
      <div className="mb-2">
        <Icon className="h-5 w-5 text-blue-400" strokeWidth={1.5} />
      </div>
      <span
        ref={elemRef}
        className={`text-[22px] font-black text-slate-900 leading-none transition-all ${glowing ? "animate-count-glow" : ""}`}
      >
        {count}
      </span>
      <span className="mt-1 text-[11px] text-slate-500 leading-tight">{label}</span>
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function HeroSection() {
  const learnerCount = useLearnerCount();
  const [glowPos, setGlowPos] = useState({ x: -500, y: -500 });
  const [showGlow, setShowGlow] = useState(false);
  
  const [progressVal, setProgressVal] = useState(0);
  const [certCount, setCertCount] = useState(0);

  useEffect(() => {
    let p = 0;
    const pInterval = setInterval(() => {
      p += 2;
      if (p >= 76) {
        setProgressVal(76);
        clearInterval(pInterval);
      } else {
        setProgressVal(p);
      }
    }, 25);

    let c = 0;
    const cInterval = setInterval(() => {
      c += 1;
      setCertCount(c);
      if (c >= 12) clearInterval(cInterval);
    }, 80);

    return () => {
      clearInterval(pInterval);
      clearInterval(cInterval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section 
      className="relative overflow-hidden bg-white pt-8 pb-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowGlow(true)}
      onMouseLeave={() => setShowGlow(false)}
    >
      {/* Background dot grid pattern */}
      <div className="hero-dot-grid absolute inset-0 pointer-events-none" 
           style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }} />

      {/* Cursor Glow */}
      {showGlow && (
        <div
          className="cursor-glow absolute pointer-events-none h-75 w-75 rounded-full z-0 hidden lg:block"
          style={{ left: glowPos.x - 150, top: glowPos.y - 150 }}
        />
      )}

      {/* Animated mesh background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="animate-mesh-drift absolute top-0 right-0 h-125 w-125 rounded-full bg-linear-to-bl from-blue-100/60 via-violet-100/50 to-transparent blur-3xl" />
        <div className="animate-mesh-drift-slow absolute top-20 right-40 h-75 w-75 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="animate-mesh-drift-mid absolute bottom-0 left-10 h-72 w-72 rounded-full bg-linear-to-tr from-violet-100/40 via-blue-100/30 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid items-start lg:grid-cols-[1fr_auto] gap-8">
          {/* Left copy */}
          <div className="pt-8 lg:pt-12 pb-10 max-w-130">
            <h1 className="font-black leading-tight tracking-tight">
              <span className="block text-[40px] sm:text-[48px] text-slate-900">
                Empower Your Career.
              </span>
              <span
                className="animate-shimmer block text-[40px] sm:text-[48px] bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)" }}
              >
                Learn. Grow. Succeed.
              </span>
            </h1>

            <p className="mt-5 text-[16px] leading-relaxed text-slate-500 max-w-100">
              LearnHub is your all-in-one learning management system for the IT industry. Access curated courses, track progress, earn certificates, and accelerate your career growth.
            </p>

            {/* Buttons with Ripple & Pulse */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="relative">
                <div className="animate-ring-pulse absolute inset-0 rounded-lg bg-blue-400/40" />
                <RippleButton
                  href="/register"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-violet-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-300/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-300/60"
                >
                  Get Started — <span className="ml-1 inline-flex items-center rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-black text-emerald-100 ring-1 ring-emerald-400/50 tracking-wide uppercase">Free</span>
                </RippleButton>
              </div>
              <RippleButton
                href="/all-courses"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:scale-105 hover:border-slate-300 shadow-sm"
              >
                <Play className="h-4 w-4 text-slate-400 fill-slate-400" />
                Explore Courses
              </RippleButton>
            </div>
            
            {/* Reassurance Checks */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> No credit card required</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> Free forever plan</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> Setup in 60s</span>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-start gap-10">
              {stats.map((s) => (
                <StatItem key={s.label} value={s.value} label={s.label} icon={s.icon} />
              ))}
            </div>
            
            {/* Live Learner Count */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {learnerCount} people learning right now
            </div>
          </div>

          {/* Right – hero image */}
          <div className="relative shrink-0 w-105 hidden lg:block">
            {/* SVGs ... */}
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

              <div className="animate-float-bob absolute top-6 -right-6 z-20 w-44 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/80">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Your Progress</p>
                  <span className="text-xs font-bold text-slate-700 transition-all">{progressVal}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-600 transition-all duration-75 ease-linear" style={{ width: `${progressVal}%` }} />
                </div>
              </div>

              <div className="animate-float-bob-reverse absolute top-32 -left-8 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-xl shadow-slate-200/80">
                <div className="relative">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping opacity-60" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800">New Course Added 🎉</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Docker & Kubernetes</p>
                </div>
              </div>

              <div className="animate-float-bob absolute bottom-16 -right-6 z-20 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-200/80">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-blue-500 to-violet-600 text-white shrink-0">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">Certificates Earned</p>
                  <p className="text-xl font-black text-slate-900 transition-all">{certCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trusted By ─────────────────────────────────────────────────────────── */
function TrustedSection() {
  const ref = useFadeUp();
  const doubled = [...trustedLogos, ...trustedLogos];

  return (
    <section className="bg-slate-50 py-10 border-t border-slate-100">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          TRUSTED BY LEADING IT COMPANIES
        </p>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="animate-marquee flex items-center gap-16 w-max">
          {doubled.map((c, i) => (
            <div key={`${c.name}-${i}`} className="shrink-0">
              {c.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ───────────────────────────────────────────────────── */
function FeaturesSection() {
  const headingRef = useFadeUp();
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.add("fade-up-hidden");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.remove("fade-up-hidden");
              el.classList.add("animate-fade-up");
            }, i * 80);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <section id="features" className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[28px] font-black tracking-tight text-slate-900 sm:text-3xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Powerful features designed to make learning simple, effective, and engaging.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} ref={(el) => { cardRefs.current[i] = el; }}>
                <Tilt3DCard className="group relative rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 overflow-hidden h-full z-10 flex flex-col">
                  {/* Animated Gradient Border Layer */}
                  <div className="animated-gradient-border absolute inset-0 rounded-xl" />
                  <div className="absolute inset-px bg-white rounded-xl z-[-1]" />
                  
                  {/* Icon */}
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br ${f.gradient} shadow-md`}>
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="mb-1.5 text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-500 flex-1">{f.desc}</p>

                  <p className="mt-3 text-[12px] font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transform">
                    Learn more →
                  </p>
                </Tilt3DCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works Section ───────────────────────────────────────────────── */
function HowItWorksSection() {
  const ref = useFadeUp();
  return (
    <section className="bg-slate-50 py-16 lg:py-20 border-t border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px] opacity-40"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-[28px] font-black tracking-tight text-slate-900 sm:text-3xl">
            Start Learning in 3 Steps
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            A simple, intuitive process to accelerate your tech career.
          </p>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3">
          {/* Dashed connector line for desktop */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-300 z-0" />
          
          {howItWorksSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 mb-5 relative">
                  <div className="absolute -top-3 -right-3 grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-blue-500 to-violet-600 text-xs font-black text-white shadow-sm ring-4 ring-slate-50">
                    {i + 1}
                  </div>
                  <Icon className="h-7 w-7 text-blue-500" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-[13px] text-slate-500 max-w-60 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Instructors Section ───────────────────────────────────────── */
function InstructorsSection() {
  const ref = useFadeUp();
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-[28px] font-black tracking-tight text-slate-900 sm:text-3xl">
              Learn from the Best
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Industry experts from top tech companies guiding your journey.
            </p>
          </div>
          <Link href="/instructors" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all instructors <span>→</span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((ins) => (
            <div key={ins.name} className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-slate-200 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br ${ins.color} text-sm font-black text-white shadow-inner`}>
                  {ins.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ins.name}</h3>
                  <p className="text-[11px] font-semibold text-slate-500">{ins.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400" /> {ins.courses} Courses
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> {ins.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────────────────── */
function CTASection() {
  const ref = useFadeUp();

  return (
    <section className="py-12 lg:py-16 bg-slate-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-indigo-600 to-violet-600 px-8 py-12 shadow-2xl shadow-violet-300/30 lg:px-14"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 right-40 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="mt-3 text-[13px] text-blue-100 leading-relaxed">
                Join thousands of IT professionals who are already learning and growing.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {ctaAvatars.map((a) => (
                    <div
                      key={a.initials}
                      className={`grid h-8 w-8 place-items-center rounded-full bg-linear-to-br ${a.gradient} text-[10px] font-black text-white ring-2 ring-white/30`}
                    >
                      {a.initials}
                    </div>
                  ))}
                </div>
                <p className="text-[12px] font-semibold text-blue-100">
                  Join <span className="text-white font-black">5,000+</span> IT professionals
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <RippleButton
                  href="/register"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:scale-105"
                >
                  Get Started Free
                </RippleButton>
                <RippleButton
                  href="/all-courses"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/30 bg-white/15 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-transform hover:bg-white/25 hover:scale-105"
                >
                  <Sparkles className="h-4 w-4" />
                  Watch Demo
                </RippleButton>
              </div>
            </div>

            <div className="animate-float-bob w-full max-w-65 shrink-0 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
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
      <ScrollProgressBar />
      <StickyCTA />
      <div className="flex min-h-screen flex-col">
        <HomeNavbar />
        <main className="flex-1">
          <HeroSection />
          <TrustedSection />
          <HowItWorksSection />
          <FeaturesSection />
          <InstructorsSection />
          <CTASection />
        </main>
        <HomeFooter />
      </div>
    </>
  );
}
