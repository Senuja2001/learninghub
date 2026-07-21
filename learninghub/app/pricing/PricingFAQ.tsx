"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export function PricingFAQ({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-[14px] border border-slate-200 bg-white transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[13.5px] font-semibold text-slate-900">{faq.q}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-violet-600" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-5 pb-4 text-[13px] leading-[1.7] text-slate-500">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
