"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 2.5s, then unmount at 3s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const hideTimer = setTimeout(() => setShow(false), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center animate-in fade-in-0 zoom-in-95 duration-500">
        <img
          src="/kaishi-logo.png"
          alt="Kaishi Innovations"
          className="h-24 md:h-40 w-auto max-w-[90vw] object-contain"
        />

        <p className="mt-3 text-xs font-medium tracking-wide text-slate-400">
          Powered by Kaishi Innovations
        </p>
      </div>

      {/* Spinner */}
      <div className="relative h-14 w-14">
        <svg
          className="absolute inset-0 animate-spin"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#e2e8f0"
            strokeWidth="4"
          />

          <path
            d="M28 4a24 24 0 0 1 24 24"
            stroke="url(#spinGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient
              id="spinGrad"
              x1="28"
              y1="4"
              x2="52"
              y2="28"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1a2a5e" />
              <stop offset="1" stopColor="#2cb67d" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 animate-pulse rounded-full bg-linear-to-br from-[#1a2a5e] to-[#2cb67d]" />
        </div>
      </div>

      {/* Loading Label */}
      <p className="mt-5 animate-pulse text-sm font-semibold tracking-wide text-slate-400">
        Loading LearningHub…
      </p>
    </div>
  );
}