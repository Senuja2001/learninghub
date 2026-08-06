"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

type Course = {
  id: string;
  title: string;
  provider: string;
  level: string;
  progress: number;
  thumbnail: "react" | "node" | "aws";
};

const mockData: Course[] = [
  {
    id: "1",
    title: "React - The Complete Guide",
    provider: "Coursera",
    level: "Intermediate",
    progress: 65,
    thumbnail: "react",
  },
  {
    id: "2",
    title: "Node.js - From Basics to Advanced",
    provider: "Udemy",
    level: "Intermediate",
    progress: 40,
    thumbnail: "node",
  },
  {
    id: "3",
    title: "AWS Cloud Practitioner Essentials",
    provider: "Coursera",
    level: "Beginner",
    progress: 20,
    thumbnail: "aws",
  },
];

function Thumbnail({ type }: { type: Course["thumbnail"] }) {
  if (type === "react") {
    return (
      <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#20232a] relative overflow-hidden">
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 opacity-90" fill="none">
          <circle r="2.05" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </div>
    );
  }
  if (type === "node") {
    return (
      <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#1a1a1a]">
        <div className="text-center">
          <div className="text-xl font-black text-[#68a063] leading-none tracking-tight">node</div>
        </div>
      </div>
    );
  }
  if (type === "aws") {
    return (
      <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#232f3e]">
        <div className="text-center space-y-0.5">
          <div className="text-xl font-black text-[#ff9900] leading-none tracking-tight">aws</div>
          <div className="h-[2px] w-8 mx-auto bg-[#ff9900] rounded-full" />
        </div>
      </div>
    );
  }
  return <div className="size-16 rounded-xl bg-slate-100" />;
}

const columnHelper = createColumnHelper<Course>();

const columns = [
  columnHelper.accessor("title", {
    header: "Course",
    cell: (info) => {
      const course = info.row.original;
      return (
        <div className="flex items-center gap-4">
          <Thumbnail type={course.thumbnail} />
          <div>
            <h4 className="text-[14px] font-bold text-slate-900">{course.title}</h4>
            <p className="mt-1 text-[12px] font-medium text-slate-500">
              {course.provider} <span className="mx-1.5">•</span> {course.level}
            </p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("progress", {
    header: "Progress",
    cell: (info) => {
      const progress = info.getValue();
      return (
        <div className="flex items-center gap-4 w-full max-w-[200px] xl:max-w-[260px] mx-auto xl:mx-0 xl:ml-auto">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-[12px] font-bold text-slate-700">
            {progress}%
          </span>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "action",
    header: "Action",
    cell: () => (
      <div className="flex justify-end">
        <Link
          href="/courses"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-violet-200 bg-white px-4 text-[12px] font-bold text-violet-700 shadow-sm transition hover:bg-violet-50 hover:border-violet-300"
        >
          Continue
        </Link>
      </div>
    ),
  }),
];

export function ContinueLearningTable() {
  const [data] = useState(() => mockData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Continue Learning</h2>
        <Link href="/courses" className="text-[12px] font-bold text-violet-600 hover:text-violet-700 transition">
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-violet-100"
          >
            {/* We map the cells manually to completely control the responsive layout without table tags */}
            <div className="flex-1 min-w-0">
              {flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}
            </div>
            <div className="w-full sm:w-auto shrink-0 flex items-center justify-between sm:justify-end sm:gap-6 lg:gap-12">
              <div className="flex-1 sm:w-[140px] md:w-[180px] lg:w-[220px]">
                {flexRender(row.getVisibleCells()[1].column.columnDef.cell, row.getVisibleCells()[1].getContext())}
              </div>
              <div className="shrink-0 ml-4 sm:ml-0">
                {flexRender(row.getVisibleCells()[2].column.columnDef.cell, row.getVisibleCells()[2].getContext())}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
