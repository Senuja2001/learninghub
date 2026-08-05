"use client";

import { Download, UserX, Trash2, ChevronDown } from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-7 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-4">
          <h2 className="text-[16px] font-bold text-slate-900 tracking-tight">Account Management</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1 tracking-wide">Manage your account data and status.</p>
        </div>
        
        <div className="space-y-1 mt-6">
          <button className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 transition hover:bg-slate-50 group">
            <div className="flex items-center gap-3.5">
              <Download className="size-[18px] text-slate-600 group-hover:text-slate-900" />
              <div className="text-left">
                <span className="block text-[13px] font-bold text-slate-700 group-hover:text-slate-900">Download My Data</span>
                <span className="block text-[11px] font-medium text-slate-500">Get a copy of all your platform data.</span>
              </div>
            </div>
            <ChevronDown className="size-[14px] -rotate-90 text-slate-400 group-hover:text-slate-600" />
          </button>
          
          <button className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 transition hover:bg-slate-50 group">
            <div className="flex items-center gap-3.5">
              <UserX className="size-[18px] text-slate-600 group-hover:text-slate-900" />
              <div className="text-left">
                <span className="block text-[13px] font-bold text-slate-700 group-hover:text-slate-900">Deactivate Account</span>
                <span className="block text-[11px] font-medium text-slate-500">Temporarily hide your profile and courses.</span>
              </div>
            </div>
            <ChevronDown className="size-[14px] -rotate-90 text-slate-400 group-hover:text-slate-600" />
          </button>
          
          <button className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 transition hover:bg-red-50 group mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3.5">
              <Trash2 className="size-[18px] text-red-500 group-hover:text-red-600" />
              <div className="text-left">
                <span className="block text-[13px] font-bold text-red-500 group-hover:text-red-600">Delete Account</span>
                <span className="block text-[11px] font-medium text-red-400">Permanently remove your account and all data.</span>
              </div>
            </div>
            <ChevronDown className="size-[14px] -rotate-90 text-slate-400 group-hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
