"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";

/* ─── Mock Data ─────────────────────────────────────────────── */

const PIE_DATA = [
  { name: "Completed", value: 15, color: "#7c3aed" }, // violet-600
  { name: "In Progress", value: 7, color: "#3b82f6" }, // blue-500
  { name: "Not Started", value: 10, color: "#94a3b8" }, // slate-400
];

const AREA_DATA = [
  { date: "Apr 1", progress: 0 },
  { date: "Apr 8", progress: 12 },
  { date: "Apr 15", progress: 24 },
  { date: "Apr 22", progress: 35 },
  { date: "Apr 29", progress: 50 },
  { date: "May 6", progress: 52 },
  { date: "May 13", progress: 62 },
];

/* ─── Components ────────────────────────────────────────────── */

export function LearningProgressCharts() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Learning Progress</h2>
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm">
          This Month
          <ChevronDown className="size-3.5 text-slate-400" />
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 min-w-0">
        
        {/* Left: Overall Progress (Pie) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 justify-center min-w-0">
          <div className="relative size-32 shrink-0 mx-auto sm:mx-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">62%</span>
              <span className="text-[9px] font-bold text-slate-500 mt-0.5">Overall Progress</span>
            </div>
          </div>

          <div className="flex-1 w-full max-w-50 mx-auto sm:mx-0 space-y-3 shrink-0">
            {PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2 font-semibold text-slate-600">
                  <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px]">
              <span className="font-bold text-slate-900">Total Courses</span>
              <span className="font-black text-slate-900">32</span>
            </div>
          </div>
        </div>

        {/* Right: Progress Over Time (Area) */}
        <div className="min-w-0 h-55 flex flex-col">
          <h3 className="text-[13px] font-bold text-slate-900 mb-4 px-1">Progress Over Time</h3>
          <div className="flex-1 min-w-0 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={AREA_DATA} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
                  tickFormatter={(val) => `${val}%`}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#64748b', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorProgress)"
                  activeDot={{ r: 5, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Custom 62% badge overlay for the final data point (optional eye-candy) */}
            <div className="absolute top-[28%] right-2.5 hidden sm:flex items-center justify-center rounded bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm pointer-events-none">
              62%
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
