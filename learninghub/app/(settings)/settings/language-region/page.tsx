"use client";

import { useState } from "react";
import { Globe, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function LanguageRegionPage() {
  const [formData, setFormData] = useState({
    language: "English (US)",
    timezone: "Asia/Colombo",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    toast.success("Preferences saved");
  };

  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-7">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Language & Region</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1">Set your language and timezone preferences.</p>
        </div>

        <div className="space-y-7">
          <div className="flex items-start gap-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-600">
              <Globe className="size-[18px]" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] font-bold text-slate-900">Platform Language</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Changes the language used in the platform UI.</p>
            </div>
            <div className="relative shrink-0 w-[160px]">
              <select 
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full h-[38px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-[13px] font-bold text-slate-700 outline-none transition focus:border-violet-500"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish">Spanish</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <Clock className="size-[18px]" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] font-bold text-slate-900">Timezone</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Used to display correct times for events and webinars.</p>
            </div>
            <div className="relative shrink-0 w-[160px]">
              <select 
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full h-[38px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-[13px] font-bold text-slate-700 outline-none transition focus:border-violet-500"
              >
                <option value="Asia/Colombo">Asia/Colombo</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="Europe/London">London GMT</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
