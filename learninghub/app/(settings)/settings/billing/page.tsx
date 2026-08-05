"use client";

import { CreditCard, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="max-w-[720px]">
      <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="mb-7">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Billing & Subscription</h2>
          <p className="text-[12px] font-medium text-slate-500 mt-1">Manage your plan and billing details.</p>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border-2 border-violet-600 bg-violet-50/50 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <CreditCard className="size-24 text-violet-600 -rotate-12" />
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold text-violet-700 uppercase tracking-wider mb-4">
                Current Plan
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pro Plan</h3>
              <p className="text-[13px] font-medium text-slate-600 mt-2 max-w-sm">
                You are currently on the Pro plan with full access to all premium courses and features.
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="h-10 rounded-lg bg-violet-600 px-5 text-[12px] font-bold text-white shadow-sm transition hover:bg-violet-700">
                  Upgrade Plan
                </button>
                <button className="h-10 rounded-lg border border-slate-200 bg-white px-5 text-[12px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-[14px] font-bold text-slate-900 mb-4">Payment Method</h4>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="grid size-10 place-items-center rounded-md bg-slate-50 border border-slate-200">
                  <CreditCard className="size-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">Visa ending in 4242</p>
                  <p className="text-[11px] font-medium text-slate-500">Expires 12/2028</p>
                </div>
              </div>
              <button className="h-[28px] rounded-md border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 shadow-sm transition hover:bg-slate-50">
                Update
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
