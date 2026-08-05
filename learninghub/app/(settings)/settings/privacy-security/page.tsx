"use client";

import { Lock, ShieldCheck, MonitorSmartphone, Clock } from "lucide-react";

export default function PrivacySecurityPage() {
  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-8">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Account Security</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1 tracking-wide">Keep your account secure and protected.</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 border border-slate-100">
                <Lock className="size-[18px]" />
              </div>
              <div className="pt-0.5">
                <p className="text-[13px] font-bold text-slate-900 leading-none mb-1.5 mt-0.5">Password</p>
                <p className="text-[10px] font-bold tracking-widest text-slate-500">••••••••</p>
              </div>
            </div>
            <button className="h-[28px] flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-violet-700 shadow-sm transition hover:bg-slate-50">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                <ShieldCheck className="size-[18px]" />
              </div>
              <div className="pt-0.5">
                <p className="text-[13px] font-bold text-slate-900 leading-none mb-1.5 mt-0.5">Two-Factor Authentication</p>
                <p className="text-[11px] font-bold text-emerald-600 leading-none">Enabled</p>
              </div>
            </div>
            <button className="h-[28px] flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-violet-700 shadow-sm transition hover:bg-slate-50">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 border border-slate-100">
                <MonitorSmartphone className="size-[18px]" />
              </div>
              <div className="pt-0.5">
                <p className="text-[13px] font-bold text-slate-900 leading-none mb-1.5 mt-0.5">Active Sessions</p>
                <p className="text-[11px] font-medium text-slate-500 leading-none">3 active sessions</p>
              </div>
            </div>
            <button className="h-[28px] flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-violet-700 shadow-sm transition hover:bg-slate-50">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 border border-slate-100">
                <Clock className="size-[18px]" />
              </div>
              <div className="pt-0.5">
                <p className="text-[13px] font-bold text-slate-900 leading-none mb-1.5 mt-0.5">Login History</p>
                <p className="text-[11px] font-medium text-slate-500 leading-none">View recent logins</p>
              </div>
            </div>
            <button className="h-[28px] flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-violet-700 shadow-sm transition hover:bg-slate-50">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
