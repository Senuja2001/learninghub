"use client";

import { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { toast } from "sonner";

export default function AppearancePage() {
  const [theme, setTheme] = useState("system");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success("Appearance updated");
  };

  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-7">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Appearance</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1">Customize how LearningHub looks on your device.</p>
        </div>

        <div className="space-y-6">
          <p className="text-[13px] font-bold text-slate-900">Theme</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button 
              onClick={() => handleThemeChange("light")}
              className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${theme === 'light' ? 'border-violet-600 bg-violet-50/50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
            >
              <div className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-700">
                <Sun className="size-5" />
              </div>
              <span className={`text-[12px] font-bold ${theme === 'light' ? 'text-violet-700' : 'text-slate-600'}`}>Light Mode</span>
            </button>

            <button 
              onClick={() => handleThemeChange("dark")}
              className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${theme === 'dark' ? 'border-violet-600 bg-violet-50/50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
            >
              <div className="grid size-10 place-items-center rounded-full bg-slate-900 text-slate-100">
                <Moon className="size-5" />
              </div>
              <span className={`text-[12px] font-bold ${theme === 'dark' ? 'text-violet-700' : 'text-slate-600'}`}>Dark Mode</span>
            </button>

            <button 
              onClick={() => handleThemeChange("system")}
              className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${theme === 'system' ? 'border-violet-600 bg-violet-50/50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
            >
              <div className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-700">
                <Monitor className="size-5" />
              </div>
              <span className={`text-[12px] font-bold ${theme === 'system' ? 'text-violet-700' : 'text-slate-600'}`}>System</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
