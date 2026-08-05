import Link from "next/link";
import { Play, CheckCircle2, Clock, BookOpen, Star, MoreVertical } from "lucide-react";

const COURSES = [
  {
    id: 1,
    title: "Advanced React Patterns & Performance",
    instructor: "Sarah Drasner",
    progress: 68,
    totalModules: 12,
    completedModules: 8,
    lastAccessed: "2 hours ago",
    thumbnail: "bg-linear-to-br from-violet-500 to-fuchsia-600",
    status: "in-progress",
  },
  {
    id: 2,
    title: "System Design Interview Prep",
    instructor: "Alex Xu",
    progress: 32,
    totalModules: 20,
    completedModules: 6,
    lastAccessed: "Yesterday",
    thumbnail: "bg-linear-to-br from-blue-500 to-cyan-500",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Mastering Tailwind CSS 4",
    instructor: "Adam Wathan",
    progress: 100,
    totalModules: 15,
    completedModules: 15,
    lastAccessed: "Last week",
    thumbnail: "bg-linear-to-br from-emerald-400 to-teal-500",
    status: "completed",
  },
  {
    id: 4,
    title: "Next.js 16 Full-Stack Architecture",
    instructor: "Lee Robinson",
    progress: 15,
    totalModules: 24,
    completedModules: 4,
    lastAccessed: "3 days ago",
    thumbnail: "bg-linear-to-br from-slate-800 to-slate-950",
    status: "in-progress",
  }
];

export default function MyCoursesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Courses</h1>
          <p className="mt-2 text-[14px] font-medium text-slate-500">
            Pick up right where you left off and track your progress.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/all-courses" 
            className="inline-flex h-[38px] items-center justify-center rounded-xl bg-violet-600 px-4 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-violet-700 active:scale-95"
          >
            Explore New Courses
          </Link>
        </div>
      </header>

      {/* ── Tabs ───────────────────────────────────────────── */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {["In Progress", "Completed", "Saved"].map((tab, i) => (
          <button
            key={tab}
            className={`relative px-4 py-3 text-[13px] font-bold transition-colors ${
              i === 0 ? "text-violet-700" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab}
            {i === 0 && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-violet-600" />
            )}
          </button>
        ))}
      </div>

      {/* ── Course Grid ────────────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.filter(c => c.status === "in-progress").map(course => (
          <div 
            key={course.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Thumbnail */}
            <div className={`relative h-[160px] w-full ${course.thumbnail} p-5`}>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/0" />
              
              {/* Top badges */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  <Clock className="size-3" />
                  {course.lastAccessed}
                </div>
                <button className="grid size-8 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20">
                  <MoreVertical className="size-4" />
                </button>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                <button className="grid size-12 translate-y-4 place-items-center rounded-full bg-white text-violet-600 shadow-xl transition-transform duration-300 group-hover:translate-y-0">
                  <Play className="size-5 ml-1" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-4">
                <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-bold leading-snug text-slate-900 group-hover:text-violet-700 transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1 text-[13px] font-medium text-slate-500">
                  by {course.instructor}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-[12px] font-bold">
                  <span className="text-slate-700">{course.progress}% Complete</span>
                  <span className="text-slate-400">
                    {course.completedModules}/{course.totalModules} Modules
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className="h-full rounded-full bg-violet-600 transition-all duration-1000 ease-out"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Clickable area link */}
            <Link href={`/courses/${course.id}`} className="absolute inset-0 z-0">
              <span className="sr-only">Continue course {course.title}</span>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
