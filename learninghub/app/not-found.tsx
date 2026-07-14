"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, Rocket, Sparkles } from "lucide-react";
import { MouseEvent } from "react";

export default function NotFound() {
  /* ─── 3D Hover Effect State ────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // For glowing background
    mouseX.set(x);
    mouseY.set(y);

    // For 3D tilt (rotate from -10 to +10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -10);
    rotateY.set(((x - centerX) / centerX) * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const backgroundGlow = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(124, 58, 237, 0.15), transparent 80%)`;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 font-sans selection:bg-violet-500/30">
      
      {/* ── Background Orbs ────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/20 blur-[150px]" />
      </div>

      {/* ── Grid Pattern ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* ── Main 3D Card ───────────────────────────────── */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative z-10 w-full max-w-2xl perspective-1000"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: backgroundGlow }}
        />

        <div
          style={{ transform: "translateZ(40px)" }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-12 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl"
        >
          {/* Top highlight */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
            className="mx-auto mb-8 grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/25"
          >
            <Rocket className="size-10 text-white" />
          </motion.div>

          {/* Text */}
          <div style={{ transform: "translateZ(60px)" }}>
            <h1 className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl">
              Coming Soon
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
              We're crafting something extraordinary. This feature is currently under development and will be available shortly.
            </p>
          </div>

          {/* Action */}
          <div className="mt-12 flex justify-center" style={{ transform: "translateZ(30px)" }}>
            <Link
              href="/dashboard"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 font-bold text-slate-950 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-fuchsia-200 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
              <ArrowLeft className="relative z-10 size-4 transition-transform group-hover/btn:-translate-x-1" />
              <span className="relative z-10">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Branding Footer ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute bottom-8 z-10 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-500"
      >
        <Sparkles className="size-4 text-violet-400" />
        Powered By <span className="text-white">Kaishi Innovations</span>
      </motion.div>

    </div>
  );
}
