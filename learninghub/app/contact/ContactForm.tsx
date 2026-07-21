"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, ChevronDown } from "lucide-react";

const SUBJECT_OPTIONS = [
  { label: "Support", value: "support" },
  { label: "Billing", value: "billing" },
  { label: "Partnership", value: "partnership" },
  { label: "Other", value: "other" },
];

export function ContactForm() {
  const [subject, setSubject] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSubject = SUBJECT_OPTIONS.find((opt) => opt.value === subject);

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-[12px] font-semibold text-slate-700">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            className="w-full rounded-[10px] border border-slate-200 px-4 py-3 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600"
          />
        </div>
        <div>
          <label className="mb-2 block text-[12px] font-semibold text-slate-700">Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full rounded-[10px] border border-slate-200 px-4 py-3 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[12px] font-semibold text-slate-700">Subject</label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex w-full items-center justify-between rounded-[10px] border px-4 py-3 text-[13.5px] transition-colors focus:outline-none focus:ring-1 focus:ring-violet-600 ${
              isDropdownOpen ? "border-violet-600 ring-1 ring-violet-600" : "border-slate-200"
            } ${selectedSubject ? "text-slate-900" : "text-slate-500"} bg-white`}
          >
            <span>{selectedSubject ? selectedSubject.label : "Select a subject"}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-[10px] border border-slate-100 bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-1 duration-150">
              {SUBJECT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSubject(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2.5 text-left text-[13.5px] text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-900"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[12px] font-semibold text-slate-700">Message</label>
        <textarea 
          rows={5}
          placeholder="Type your message here..."
          className="w-full resize-none rounded-[10px] border border-slate-200 px-4 py-3.5 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600"
        />
      </div>

      <button 
        type="button" 
        className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#5B3EE6] px-4 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#4A32BA] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        <Send className="h-4.5 w-4.5" />
        Send Message
      </button>
    </form>
  );
}
