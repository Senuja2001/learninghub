"use client";

import { useState } from "react";
import { Mail, Smartphone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [formData, setFormData] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
  });

  const handleToggle = (key: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Preferences updated");
  };

  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-7">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Notification Preferences</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1">Control how you receive alerts and messages.</p>
        </div>

        <div className="space-y-7">
          <div className="flex items-start gap-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-600">
              <Mail className="size-[18px]" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] font-bold text-slate-900">Email Notifications</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Receive updates, course reminders, and digests via email.</p>
            </div>
            <button 
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.emailNotifications ? 'bg-violet-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.emailNotifications ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <Smartphone className="size-[18px]" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] font-bold text-slate-900">Push Notifications</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Get notified immediately on your device when someone replies to you.</p>
            </div>
            <button 
              onClick={() => handleToggle('pushNotifications')}
              className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.pushNotifications ? 'bg-violet-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.pushNotifications ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-500">
              <MessageSquare className="size-[18px]" />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] font-bold text-slate-900">SMS Alerts</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">Receive text messages for important security alerts only.</p>
            </div>
            <button 
              onClick={() => handleToggle('smsNotifications')}
              className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.smsNotifications ? 'bg-violet-600' : 'bg-slate-200'}`}
            >
              <span className={`pointer-events-none inline-block size-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.smsNotifications ? 'translate-x-[16px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
