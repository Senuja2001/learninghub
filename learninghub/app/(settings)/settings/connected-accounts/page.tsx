"use client";

import { Mail, Code, Briefcase } from "lucide-react";

export default function ConnectedAccountsPage() {
  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-7">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Connected Accounts</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1">Connect your social accounts for quick login.</p>
        </div>

        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="grid size-10 place-items-center rounded-full bg-blue-50 text-blue-600">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-900">Google</p>
                <p className="text-[11px] font-medium text-slate-500">Connected as john.doe@gmail.com</p>
              </div>
            </div>
            <button className="h-[28px] rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 shadow-sm transition hover:bg-slate-50">
              Disconnect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-700">
                <Code className="size-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-900">GitHub</p>
                <p className="text-[11px] font-medium text-slate-500">Not connected</p>
              </div>
            </div>
            <button className="h-[28px] rounded-md bg-violet-600 px-3 text-[11px] font-bold text-white shadow-sm transition hover:bg-violet-700">
              Connect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="grid size-10 place-items-center rounded-full bg-sky-50 text-sky-600">
                <Briefcase className="size-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-900">LinkedIn</p>
                <p className="text-[11px] font-medium text-slate-500">Not connected</p>
              </div>
            </div>
            <button className="h-[28px] rounded-md bg-violet-600 px-3 text-[11px] font-bold text-white shadow-sm transition hover:bg-violet-700">
              Connect
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
