import { 
  BookOpen, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Play, 
  Bookmark, 
  ChevronRight, 
  ArrowRight,
  Target
} from "lucide-react";
import Link from "next/link";
import { ContinueLearningTable } from "./components/ContinueLearningTable";
import { LearningProgressCharts } from "./components/LearningProgressCharts";

/* ─── Data ───────────────────────────────────────────────────── */

const STATS = [
  {
    title: "Overall Progress",
    value: "62%",
    sub: null,
    icon: BookOpen,
    color: "text-violet-600 bg-violet-50",
  },
  {
    title: "Courses Enrolled",
    value: "24",
    sub: <><span className="text-emerald-500 mr-1">▶</span>3 in progress</>,
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Certificates Earned",
    value: "6",
    sub: <><span className="text-amber-500 mr-1">▶</span>View all</>,
    icon: Shield,
    color: "text-amber-500 bg-amber-50",
  },
  {
    title: "Learning Time",
    value: "120h 30m",
    sub: <><span className="text-blue-500 mr-1">▶</span>This month</>,
    icon: Clock,
    color: "text-blue-600 bg-blue-50",
  },
];

const DEADLINES = [
  { month: "MAY", day: "22", title: "Complete: React Basics Quiz", due: "Due in 2 days", course: "React Basics", badge: "Quiz", badgeColor: "text-violet-600 bg-violet-50" },
  { month: "MAY", day: "25", title: "Submit: Project 1", due: "Due in 5 days", course: "JavaScript Fundamentals", badge: "Assignment", badgeColor: "text-blue-600 bg-blue-50" },
  { month: "MAY", day: "30", title: "Finish: Node.js Course", due: "Due in 10 days", course: "Backend Development", badge: "Course", badgeColor: "text-emerald-600 bg-emerald-50" },
];

const RECOMMENDED = [
  {
    title: "JavaScript: The Complete Guide 2024",
    provider: "Udemy",
    duration: "18.5h",
    level: "Intermediate",
    rating: 4.7,
    reviews: "12.1K",
    thumb: "js",
  },
  {
    title: "System Design Basics",
    provider: "YouTube",
    duration: "6.5h",
    level: "Intermediate",
    rating: 4.8,
    reviews: "8.2K",
    thumb: "system",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    provider: "Coursera",
    duration: "10h",
    level: "Beginner",
    rating: 4.6,
    reviews: "6.7K",
    thumb: "aws",
  },
];

const ACTIVITY = [
  { icon: CheckCircle2, title: "Completed \"Git & GitHub Basics\"", time: "2 hours ago", badge: "Completed", badgeColor: "text-emerald-600 bg-emerald-50", iconBg: "bg-emerald-50 text-emerald-500" },
  { icon: Play, title: "Started \"Docker for Beginners\"", time: "Yesterday", badge: "In Progress", badgeColor: "text-blue-600 bg-blue-50", iconBg: "bg-violet-50 text-violet-600" },
  { icon: Shield, title: "Earned a new certificate", desc: "AWS Cloud Practitioner Essentials", time: "2 days ago", badge: "Certificate", badgeColor: "text-amber-600 bg-amber-50", iconBg: "bg-amber-50 text-amber-500" },
  { icon: Bookmark, title: "Bookmarked \"System Design Basics\"", time: "3 days ago", badge: null, iconBg: "bg-blue-50 text-blue-500" },
];

/* ─── Components ────────────────────────────────────────────── */

function SmallThumbnail({ type }: { type: string }) {
  if (type === "js") {
    return (
      <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-[#f7df1e] flex-col overflow-hidden relative">
        <div className="text-[26px] font-black text-slate-900 leading-none tracking-tighter">JS</div>
        <div className="text-[5px] font-bold text-slate-800 absolute bottom-1">JavaScript</div>
      </div>
    );
  }
  if (type === "system") {
    return (
      <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-8 h-6 border border-slate-500 rounded" />
        </div>
        <div className="text-center z-10 space-y-0.5">
          <div className="text-[5px] font-bold text-slate-400">SYSTEM DESIGN</div>
          <div className="flex gap-[2px] justify-center">
            {["DB","API"].map(t => (
              <div key={t} className="text-[4px] font-bold bg-slate-700 text-slate-300 rounded px-[2px]">{t}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (type === "aws") {
    return (
      <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-[#232f3e]">
        <div className="text-center">
          <div className="text-[14px] font-black text-[#ff9900] leading-none tracking-tight">aws</div>
          <div className="h-[1px] w-5 mx-auto bg-[#ff9900] rounded-full mt-0.5" />
        </div>
      </div>
    );
  }
  return <div className="size-14 rounded-lg bg-slate-100" />;
}

export default function DashboardPage() {
  return (
    <div className="pb-10">

      {/* ── Header & Stats ──────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-[26px] font-black tracking-tight text-slate-900 flex items-center gap-2">
          Welcome back, John! <span className="text-2xl">👋</span>
        </h1>
        <p className="mt-1.5 text-[13px] font-medium tracking-wide text-slate-500">
          Let's continue your learning journey today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {STATS.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className={`grid size-12 shrink-0 place-items-center rounded-xl ${stat.color}`}>
              <stat.icon className="size-5" />
            </div>
            <div>
              <p className="text-[20px] font-black leading-none text-slate-900 tracking-tight">{stat.value}</p>
              <p className="mt-1 text-[11px] font-bold text-slate-500 tracking-wide">{stat.title}</p>
              {stat.sub && (
                <p className="mt-1.5 text-[10px] font-bold text-slate-400 flex items-center">{stat.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8 min-w-0">
        
        {/* ── Left Column (Main) ──────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-8">
          <ContinueLearningTable />
          <LearningProgressCharts />
          
          {/* Bottom Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 md:p-8 shadow-sm">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-600 mt-1">
                  <Target className="size-6" />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Stay consistent, achieve your goals!</h3>
                  <p className="mt-1 text-[13px] font-medium text-slate-600">You're doing great! Keep going to complete your learning path.</p>
                </div>
              </div>
              <Link 
                href="/learning-paths"
                className="shrink-0 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 text-[13px] font-bold text-violet-700 shadow-sm transition hover:bg-violet-50"
              >
                View My Learning Path <ArrowRight className="size-3.5" />
              </Link>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-30 pointer-events-none">
               <div className="absolute right-[-10%] top-[-20%] size-32 rounded-full bg-violet-200 blur-3xl" />
               <div className="absolute right-[20%] bottom-[-20%] size-24 rounded-full bg-blue-200 blur-2xl" />
            </div>
          </div>
        </div>

        {/* ── Right Column (Sidebar) ──────────────────────────────── */}
        <div className="w-full xl:w-[340px] shrink-0 space-y-6">

          {/* Upcoming Deadlines */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-slate-900 tracking-tight">Upcoming Deadlines</h2>
              <Link href="/events" className="text-[11px] font-bold text-violet-600 hover:text-violet-700">View all</Link>
            </div>
            <div className="space-y-4">
              {DEADLINES.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 px-2 py-1.5 min-w-[42px] border border-slate-100 shrink-0">
                    <span className="text-[9px] font-bold text-violet-600">{d.month}</span>
                    <span className="text-[14px] font-black text-slate-900">{d.day}</span>
                  </div>
                  <div className="flex-1 pt-0.5 min-w-0">
                    <h4 className="text-[12px] font-bold text-slate-900 truncate">{d.title}</h4>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-500 truncate">{d.due} <span className="mx-1">•</span> {d.course}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide mt-1 ${d.badgeColor}`}>
                    {d.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for You */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-slate-900 tracking-tight">Recommended for You</h2>
              <Link href="/all-courses" className="text-[11px] font-bold text-violet-600 hover:text-violet-700">View all</Link>
            </div>
            <div className="space-y-4">
              {RECOMMENDED.map((r, i) => (
                <div key={i} className="group flex gap-3 relative">
                  <SmallThumbnail type={r.thumb} />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h4 className="text-[12px] font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-violet-600 transition">{r.title}</h4>
                    <p className="mt-1 text-[10px] font-medium text-slate-500 truncate">
                      {r.provider} <span className="mx-1">•</span> {r.duration} <span className="mx-1">•</span> {r.level}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-amber-400 text-[10px]">★</span>
                      <span className="text-[10px] font-bold text-slate-800">{r.rating}</span>
                      <span className="text-[9px] text-slate-400">({r.reviews})</span>
                    </div>
                  </div>
                  <button className="absolute right-0 top-1 text-slate-400 hover:text-violet-600 transition opacity-0 group-hover:opacity-100">
                    <Bookmark className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-slate-900 tracking-tight">Recent Activity</h2>
              <Link href="/profile" className="text-[11px] font-bold text-violet-600 hover:text-violet-700">View all</Link>
            </div>
            <div className="relative pl-2">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-100" />
              
              <div className="space-y-6 relative z-10">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`grid size-7 shrink-0 place-items-center rounded-full border-2 border-white ring-1 ring-slate-100 ${a.iconBg}`}>
                      <a.icon className="size-3.5" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[12px] font-bold text-slate-900 leading-snug">{a.title}</h4>
                        {a.badge && (
                          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold tracking-wide mt-px ${a.badgeColor}`}>
                            {a.badge}
                          </span>
                        )}
                      </div>
                      {a.desc && <p className="mt-0.5 text-[11px] font-medium text-slate-600">{a.desc}</p>}
                      <p className="mt-1 text-[10px] font-semibold text-slate-400">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
