"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [exit, setExit] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smoothly animate progress 0 to 100% over ~2.5s (100 steps * 25ms = 2500ms)
    let p = 0;
    const pInterval = setInterval(() => {
      p += 1;
      if (p >= 100) {
        setProgress(100);
        clearInterval(pInterval);
      } else {
        setProgress(p);
      }
    }, 25);

    // Trigger curtain slide-up exit at 2.5s
    const exitTimer = setTimeout(() => setExit(true), 2500);
    
    // Completely unmount the component after the exit transition completes
    const hideTimer = setTimeout(() => setShow(false), 3200);

    return () => {
      clearInterval(pInterval);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-white/80 backdrop-blur-xl transition-transform duration-700 ease-in-out ${
        exit ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background Mesh (Behind the Glass) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[-1]">
        <div className="animate-mesh-drift absolute top-0 right-0 h-125 w-125 rounded-full bg-linear-to-bl from-blue-100/60 via-violet-100/50 to-transparent blur-3xl" />
        <div className="animate-mesh-drift-slow absolute top-20 right-40 h-75 w-75 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="animate-mesh-drift-mid absolute bottom-0 left-10 h-72 w-72 rounded-full bg-linear-to-tr from-violet-100/40 via-blue-100/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 text-center animate-in fade-in-0 zoom-in-95 duration-500">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <img
            src="/kaishi-logo.png"
            alt="Kaishi Innovations"
            className="h-12 md:h-20 w-auto object-contain"
          />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Powered by Kaishi Innovations
          </p>
        </div>

        {/* Thematic Progress Bar */}
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500">
            <span>Loading Platform...</span>
            <span className="text-blue-600 transition-all">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/50 shadow-inner">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-600 transition-all duration-75 ease-linear shadow-lg shadow-blue-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}