"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useAnimate,
  stagger,
} from "framer-motion";
import {
  ArrowLeft,
  Rocket,
  BookOpen,
  Route,
  Brain,
  Sparkles,
} from "lucide-react";
import { MouseEvent, useEffect } from "react";

/* ─── Floating particle data (static, no runtime randomness for SSR safety) ─── */
const PARTICLES = [
  { x: "12%",  y: "18%", size: 2,   delay: 0,    dur: 4.2 },
  { x: "88%",  y: "14%", size: 1.5, delay: 0.8,  dur: 5.1 },
  { x: "25%",  y: "72%", size: 2.5, delay: 1.4,  dur: 3.8 },
  { x: "70%",  y: "68%", size: 1.5, delay: 0.3,  dur: 4.7 },
  { x: "50%",  y: "10%", size: 2,   delay: 2.1,  dur: 5.5 },
  { x: "8%",   y: "50%", size: 1,   delay: 1.7,  dur: 4.0 },
  { x: "92%",  y: "55%", size: 1,   delay: 0.6,  dur: 3.5 },
  { x: "38%",  y: "85%", size: 2,   delay: 2.5,  dur: 4.9 },
  { x: "62%",  y: "88%", size: 1.5, delay: 1.1,  dur: 6.0 },
  { x: "78%",  y: "32%", size: 1,   delay: 3.0,  dur: 4.3 },
  { x: "18%",  y: "38%", size: 2.5, delay: 0.4,  dur: 5.8 },
  { x: "55%",  y: "28%", size: 1,   delay: 1.9,  dur: 3.6 },
];

/* ─── Feature chips shown below the heading ─────────────────────────────────── */
const FEATURES = [
  { icon: BookOpen, label: "Curated Courses"  },
  { icon: Route,    label: "Learning Paths"   },
  { icon: Brain,    label: "AI Insights"      },
];

/* ─── Props ─────────────────────────────────────────────────────────────────── */
interface ComingSoonProps {
  /** Override the back-navigation destination. Defaults to "/dashboard". */
  backHref?:  string;
  /** Override the back-navigation label. Defaults to "Back to Dashboard". */
  backLabel?: string;
  /** Feature name shown in the subtitle, e.g. "Bookmarks". */
  feature?:   string;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════════════════════════════ */
export default function ComingSoon({
  backHref  = "/dashboard",
  backLabel = "Back to Dashboard",
  feature,
}: ComingSoonProps) {

  /* ── Cursor-tracked glow ───────────────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useMotionValue(0), { damping: 25, stiffness: 180 });
  const bgGlow  = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.12), transparent 70%)`;

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
    rotateX.set(((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -8);
    rotateY.set(((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  8);
  }
  function onMouseLeave() { rotateX.set(0); rotateY.set(0); }

  /* ── Staggered text entrance ──────────────────────────────────────────── */
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      "[data-stagger]",
      { opacity: [0, 1], y: [18, 0] },
      { delay: stagger(0.1, { startDelay: 0.45 }), duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    );
  }, [animate]);

  return (
    <div
      ref={scope}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 font-sans selection:bg-violet-500/30"
    >

      {/* ── Background orbs (animated) ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-600 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-800 blur-[150px]"
        />
      </div>

      {/* ── Dot-grid overlay ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 50%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 50%, transparent 100%)",
        }}
      />

      {/* ── Floating star particles ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -12, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            className="absolute rounded-full bg-violet-300"
          />
        ))}
      </div>

      {/* ── 3-D tilt card ─────────────────────────────────────────────────── */}
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="group perspective-[1200px] relative z-10 w-full max-w-2xl"
      >
        {/* Cursor-tracked glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[36px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: bgGlow }}
        />

        <div
          style={{ transform: "translateZ(40px)" }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-10 text-center shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-14"
        >
          {/* Top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
          {/* Bottom shimmer line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />

          {/* ── Icon ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0   }}
            transition={{ type: "spring", delay: 0.25, bounce: 0.45 }}
            style={{ transform: "translateZ(60px)" }}
            className="mx-auto mb-8 grid size-[88px] place-items-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-xl shadow-violet-500/30 ring-1 ring-white/20"
          >
            <Rocket className="size-10 text-white drop-shadow" />
          </motion.div>

          {/* ── Heading ────────────────────────────────────────────────────── */}
          <div style={{ transform: "translateZ(50px)" }}>
            <p
              data-stagger
              className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400 opacity-0"
            >
              {feature ? `${feature} —` : ""} Under Development
            </p>

            <h1
              data-stagger
              className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-5xl font-black tracking-tight text-transparent opacity-0 sm:text-7xl"
            >
              Coming Soon
            </h1>

            <p
              data-stagger
              className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-slate-400 opacity-0 sm:text-base"
            >
              We&apos;re crafting something extraordinary. This feature is currently
              in development and will be available shortly.
            </p>

            {/* ── Feature chips ─────────────────────────────────────────── */}
            <div
              data-stagger
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5 opacity-0"
            >
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] font-semibold text-slate-300"
                >
                  <Icon className="size-3.5 text-violet-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Progress bar (indeterminate shimmer) ───────────────────── */}
          <motion.div
            data-stagger
            style={{ transform: "translateZ(30px)" }}
            className="mx-auto mt-10 max-w-xs opacity-0"
          >
            <div className="mb-2 flex justify-between text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
              <span>Building features</span>
              <span className="text-violet-400">In progress…</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-violet-500 to-fuchsia-500"
              />
            </div>
          </motion.div>

          {/* ── CTA Button ──────────────────────────────────────────────── */}
          <motion.div
            data-stagger
            style={{ transform: "translateZ(30px)" }}
            className="mt-10 flex justify-center opacity-0"
          >
            <Link
              href={backHref}
              className="group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/15 bg-white/8 px-7 py-3 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-violet-400/50 hover:bg-white/12 hover:shadow-lg hover:shadow-violet-500/20 active:scale-95"
            >
              {/* Hover fill */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover/btn:-translate-x-1" />
              {backLabel}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Branding footer ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 z-10 flex items-center gap-2 text-[12px] font-semibold tracking-wide text-slate-600"
      >
        <Sparkles className="size-3.5 text-violet-500" />
        Powered by{" "}
        <span className="text-slate-400">Kaishi Innovations</span>
      </motion.div>
    </div>
  );
}
