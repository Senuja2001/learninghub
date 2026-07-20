"use client";

import { useEffect, useState } from "react";

const DURATION = 2400; // ms — how long progress bar takes to fill

export function LoadingScreen() {
  const [mounted, setMounted]   = useState(false); // controls entrance fade
  const [barFull, setBarFull]   = useState(false); // triggers CSS transition
  const [counter, setCounter]   = useState(0);     // displayed percentage
  const [exiting, setExiting]   = useState(false); // controls exit fade
  const [gone, setGone]         = useState(false);  // unmounts entirely

  useEffect(() => {
    // Tiny delay so the initial paint is complete before the bar starts
    const mountId = requestAnimationFrame(() => {
      setMounted(true);

      // Start the bar on the next frame so the CSS transition fires
      requestAnimationFrame(() => setBarFull(true));
    });

    // ── Smooth counter via rAF ─────────────────────────────────────────────
    let raf: number;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      // Use the same ease-out cubic as the bar so they stay in sync
      const t = Math.min(elapsed / DURATION, 1);
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2; // ease-in-out cubic
      setCounter(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ── Exit sequence ──────────────────────────────────────────────────────
    const exitTimer = setTimeout(() => setExiting(true), DURATION + 200);
    const goneTimer = setTimeout(() => setGone(true),    DURATION + 900);

    return () => {
      cancelAnimationFrame(mountId);
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        transition: exiting
          ? "opacity 600ms ease, transform 600ms cubic-bezier(0.4,0,0.2,1)"
          : "opacity 350ms ease",
        opacity:   exiting ? 0 : mounted ? 1 : 0,
        transform: exiting ? "translateY(-24px)" : "translateY(0)",
      }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-white"
      aria-label="Loading LearningHub"
      aria-live="polite"
    >
      {/* ── Soft ambient blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-mesh-drift absolute -top-20 right-0 h-125 w-125 rounded-full bg-linear-to-bl from-blue-100/70 via-violet-100/50 to-transparent blur-3xl" />
        <div className="animate-mesh-drift-slow absolute top-24 right-36 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="animate-mesh-drift-mid absolute -bottom-10 left-8 h-72 w-72 rounded-full bg-linear-to-tr from-violet-100/40 via-blue-100/30 to-transparent blur-3xl" />
      </div>

      {/* ── Content card ── */}
      <div
        style={{
          transition: "opacity 400ms ease 80ms, transform 400ms cubic-bezier(0.34,1.56,0.64,1) 80ms",
          opacity:   mounted ? 1 : 0,
          transform: mounted ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
        }}
        className="relative z-10 flex w-full max-w-xs flex-col items-center px-6 text-center"
      >
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaishi-logo.png"
            alt="Kaishi Innovations"
            className="h-14 w-auto object-contain md:h-20"
          />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Powered by Kaishi Innovations
          </p>
        </div>

        {/* Label row */}
        <div className="mb-2.5 flex w-full items-center justify-between text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">
          <span>Loading Platform…</span>
          <span
            className="tabular-nums text-violet-600"
            aria-label={`${counter} percent loaded`}
          >
            {counter}%
          </span>
        </div>

        {/* Progress track */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
          {/* Bar — animated by a single CSS transition for perfect smoothness */}
          <div
            style={{
              width: barFull ? "100%" : "0%",
              transition: barFull
                ? `width ${DURATION}ms cubic-bezier(0.45, 0, 0.15, 1)`
                : "none",
            }}
            className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-600 shadow-[0_0_10px_2px_rgba(139,92,246,0.35)]"
          />
        </div>

        {/* Subtle "dots" pulse below the bar */}
        <div className="mt-6 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 220}ms` }}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}