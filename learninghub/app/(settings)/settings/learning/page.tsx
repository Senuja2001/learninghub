"use client";

import { useState } from "react";
import { Globe, BookOpen, ShieldCheck, Bell, Palette, Clock, ChevronDown } from "lucide-react";

export default function LearningPreferencesPage() {
  const [formData, setFormData] = useState({
    preferredLanguage: "English",
    weeklyGoal: "5 hours",
    contentType: "All Content",
    emailDigest: true,
    courseRecommendations: true,
    progressReminders: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = (key: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-7">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Learning Preferences</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1">Customize your learning experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
          
          {/* Left Prefs */}
          <div className="space-y-7">
            <div className="flex items-start gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-600">
                <Globe className="size-[18px]" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[13px] font-bold text-slate-900">Preferred Language</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Choose your preferred content language.</p>
              </div>
              <div className="relative shrink-0">
                <select 
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  className="h-[34px] w-[110px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-[12px] font-bold text-slate-700 outline-none transition focus:border-violet-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-[14px] text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <BookOpen className="size-[18px]" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[13px] font-bold text-slate-900">Weekly Learning Goal</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Set your weekly learning target.</p>
              </div>
              <div className="relative shrink-0">
                <select 
                  name="weeklyGoal"
                  value={formData.weeklyGoal}
                  onChange={handleInputChange}
                  className="h-[34px] w-[110px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-[12px] font-bold text-slate-700 outline-none transition focus:border-violet-500"
                >
                  <option value="2 hours">2 hours</option>
                  <option value="5 hours">5 hours</option>
                  <option value="10 hours">10 hours</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-[14px] text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-500">
                <ShieldCheck className="size-[18px]" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[13px] font-bold text-slate-900">Course Content Type</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Select the types of content you prefer.</p>
              </div>
              <div className="relative shrink-0">
                <select 
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleInputChange}
                  className="h-[34px] w-[110px] appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-[12px] font-bold text-slate-700 outline-none transition focus:border-violet-500"
                >
                  <option value="All Content">All Content</option>
                  <option value="Video Only">Video Only</option>
                  <option value="Text Only">Text Only</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-[14px] text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Prefs (Toggles) */}
          <div className="space-y-7">
            <div className="flex items-start gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-500">
                <Bell className="size-[18px]" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[13px] font-bold text-slate-900">Email Digest</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Get a weekly summary of your learning.</p>
              </div>
              <button 
                onClick={() => handleToggle('emailDigest')}
                className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.emailDigest ? 'bg-violet-600' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.emailDigest ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
                <Palette className="size-[18px]" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[13px] font-bold text-slate-900">Course Recommendations</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Receive personalized course suggestions.</p>
              </div>
              <button 
                onClick={() => handleToggle('courseRecommendations')}
                className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.courseRecommendations ? 'bg-violet-600' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.courseRecommendations ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-500">
                <Clock className="size-[18px]" />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[13px] font-bold text-slate-900">Progress Reminders</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">Get reminded to continue your learning.</p>
              </div>
              <button 
                onClick={() => handleToggle('progressReminders')}
                className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.progressReminders ? 'bg-violet-600' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.progressReminders ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
