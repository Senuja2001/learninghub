"use client";

import { useState, useEffect } from "react";
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  MoreVertical,
  Star,
  Clock,
  Globe,
  BookOpen,
  Route,
  FileText,
  ArrowRight,
  Lightbulb,
  Bell,
  LayoutGrid,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────── */
type Category = "Courses" | "Learning Paths" | "Resources";

interface BookmarkItem {
  id: number;
  type: Category;
  title: string;
  provider: string;
  providerLogo: string;
  providerColor: string;
  level: string;
  duration: string;
  rating: number;
  reviews: string;
  category: string;
  thumbnail: string;
  thumbnailBg: string;
  thumbnailText?: string;
}

/* ─── Data ───────────────────────────────────────────────────── */
const ALL_BOOKMARKS: BookmarkItem[] = [
  {
    id: 1,
    type: "Courses",
    title: "React – The Complete Guide",
    provider: "Coursera",
    providerLogo: "C",
    providerColor: "bg-blue-600",
    level: "Intermediate",
    duration: "25h",
    rating: 4.8,
    reviews: "12.4K",
    category: "Web Development",
    thumbnail: "react",
    thumbnailBg: "bg-[#20232a]",
    thumbnailText: "React",
  },
  {
    id: 2,
    type: "Courses",
    title: "Node.js – From Basics to Advanced",
    provider: "Udemy",
    providerLogo: "U",
    providerColor: "bg-violet-600",
    level: "Intermediate",
    duration: "18.5h",
    rating: 4.7,
    reviews: "8.9K",
    category: "Web Development",
    thumbnail: "node",
    thumbnailBg: "bg-[#1a1a1a]",
    thumbnailText: "node",
  },
  {
    id: 3,
    type: "Courses",
    title: "AWS Cloud Practitioner Essentials",
    provider: "Coursera",
    providerLogo: "C",
    providerColor: "bg-blue-600",
    level: "Beginner",
    duration: "10h",
    rating: 4.6,
    reviews: "6.7K",
    category: "Cloud Computing",
    thumbnail: "aws",
    thumbnailBg: "bg-[#232f3e]",
    thumbnailText: "aws",
  },
  {
    id: 4,
    type: "Courses",
    title: "JavaScript: The Complete Guide 2024",
    provider: "Udemy",
    providerLogo: "U",
    providerColor: "bg-violet-600",
    level: "Intermediate",
    duration: "18.5h",
    rating: 4.7,
    reviews: "12.1K",
    category: "Programming Languages",
    thumbnail: "js",
    thumbnailBg: "bg-[#f7df1e]",
    thumbnailText: "JS",
  },
  {
    id: 5,
    type: "Courses",
    title: "System Design Basics – Full Course",
    provider: "YouTube",
    providerLogo: "▶",
    providerColor: "bg-red-600",
    level: "Intermediate",
    duration: "6.5h",
    rating: 4.8,
    reviews: "8.2K",
    category: "DevOps",
    thumbnail: "system",
    thumbnailBg: "bg-[#0f172a]",
    thumbnailText: "System Design",
  },
  {
    id: 6,
    type: "Courses",
    title: "Azure Fundamentals (AZ-900)",
    provider: "Microsoft Learn",
    providerLogo: "M",
    providerColor: "bg-blue-500",
    level: "Beginner",
    duration: "8h",
    rating: 4.7,
    reviews: "5.1K",
    category: "Cloud Computing",
    thumbnail: "azure",
    thumbnailBg: "bg-[#00a4ef]",
    thumbnailText: "Microsoft Learn",
  },
  {
    id: 7,
    type: "Courses",
    title: "Software Testing Fundamentals",
    provider: "Udemy",
    providerLogo: "U",
    providerColor: "bg-violet-600",
    level: "Beginner",
    duration: "7h",
    rating: 4.6,
    reviews: "3.9K",
    category: "Software Testing",
    thumbnail: "testing",
    thumbnailBg: "bg-[#1e1b4b]",
    thumbnailText: "Testing",
  },
  {
    id: 8,
    type: "Courses",
    title: "Next.js 14 Full Course – Build Production Apps",
    provider: "YouTube",
    providerLogo: "▶",
    providerColor: "bg-red-600",
    level: "Intermediate",
    duration: "14.5h",
    rating: 4.9,
    reviews: "10.3K",
    category: "Web Development",
    thumbnail: "next",
    thumbnailBg: "bg-[#f8fafc]",
    thumbnailText: "NEXT.js",
  },
  {
    id: 9,
    type: "Learning Paths",
    title: "Full-Stack Software Engineer Path",
    provider: "Learning Hub",
    providerLogo: "L",
    providerColor: "bg-violet-600",
    level: "Advanced",
    duration: "120h",
    rating: 4.9,
    reviews: "3.2K",
    category: "Web Development",
    thumbnail: "path1",
    thumbnailBg: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    thumbnailText: "Software Engineer",
  },
  {
    id: 10,
    type: "Learning Paths",
    title: "Cloud & DevOps Engineer Path",
    provider: "Learning Hub",
    providerLogo: "L",
    providerColor: "bg-violet-600",
    level: "Intermediate",
    duration: "80h",
    rating: 4.8,
    reviews: "2.1K",
    category: "DevOps",
    thumbnail: "path2",
    thumbnailBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    thumbnailText: "Cloud & DevOps",
  },
  {
    id: 11,
    type: "Resources",
    title: "The Complete Frontend Developer Handbook",
    provider: "freecodecamp.org",
    providerLogo: "f",
    providerColor: "bg-emerald-600",
    level: "All Levels",
    duration: "3h read",
    rating: 4.9,
    reviews: "5.5K",
    category: "Web Development",
    thumbnail: "resource1",
    thumbnailBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    thumbnailText: "Handbook",
  },
];

const CATEGORIES = [
  { name: "Web Development", count: 6, icon: Globe },
  { name: "Cloud Computing", count: 3, icon: Globe },
  { name: "Programming Languages", count: 3, icon: BookOpen },
  { name: "DevOps", count: 2, icon: Route },
  { name: "Software Testing", count: 2, icon: FileText },
  { name: "Others", count: 2, icon: LayoutGrid },
];

const SORT_OPTIONS = [
  "Recently Added",
  "Title (A–Z)",
  "Title (Z–A)",
  "Highest Rated",
  "Most Reviews",
];

/* ─── Thumbnail renderer ─────────────────────────────────────── */
function CourseThumbnail({ item }: { item: BookmarkItem }) {
  const base = `w-full h-[150px] flex items-center justify-center relative overflow-hidden ${item.thumbnailBg}`;

  if (item.thumbnail === "react") {
    return (
      <div className={base}>
        {/* React logo SVG */}
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-16 h-16 opacity-90" fill="none">
          <circle r="2.05" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
        <span className="absolute bottom-3 right-3 text-[11px] font-bold text-[#61dafb] tracking-wide">React</span>
      </div>
    );
  }
  if (item.thumbnail === "node") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="text-3xl font-black text-[#68a063] tracking-tight">node</div>
          <div className="mt-0.5 flex items-center justify-center gap-0.5">
            <div className="w-3 h-3 rounded-full bg-[#68a063]" />
            <div className="text-[10px] text-[#68a063] font-bold">js</div>
          </div>
        </div>
      </div>
    );
  }
  if (item.thumbnail === "aws") {
    return (
      <div className={base}>
        <div className="text-center space-y-1">
          <div className="text-3xl font-black text-[#ff9900] tracking-tight">aws</div>
          <div className="h-0.5 w-12 mx-auto bg-[#ff9900] rounded-full" />
          <div className="w-0 h-0 border-l-20 border-r-20 border-t-10 border-l-transparent border-r-transparent border-t-[#ff9900] mx-auto" />
        </div>
      </div>
    );
  }
  if (item.thumbnail === "js") {
    return (
      <div className={`${base} flex-col`}>
        <div className="text-[56px] font-black text-slate-900 leading-none tracking-tighter">JS</div>
        <div className="text-[11px] font-bold text-slate-800 mt-1">JavaScript</div>
      </div>
    );
  }
  if (item.thumbnail === "system") {
    return (
      <div className={base}>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-28 h-20 border border-slate-500 rounded-lg" />
          </div>
          <div className="text-center z-10">
            <div className="text-xs font-bold text-slate-400 mb-1">SYSTEM DESIGN</div>
            <div className="flex gap-1 justify-center">
              {["DB","API","UI"].map(t => (
                <div key={t} className="text-[9px] font-bold bg-slate-700 text-slate-300 rounded px-1.5 py-0.5">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (item.thumbnail === "azure") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="text-xl font-black text-white tracking-tight">Microsoft</div>
          <div className="text-xl font-black text-white tracking-tight mt-0.5">Learn</div>
          <div className="flex gap-0.5 justify-center mt-2">
            {["bg-red-500","bg-green-500","bg-blue-600","bg-yellow-400"].map((c,i)=>(
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (item.thumbnail === "testing") {
    return (
      <div className={base}>
        <div className="text-center">
          <div className="text-4xl mb-1">🐛</div>
          <div className="text-xs font-bold text-indigo-200 tracking-wider">SOFTWARE TESTING</div>
        </div>
      </div>
    );
  }
  if (item.thumbnail === "next") {
    return (
      <div className={`${base} border border-slate-200`}>
        <div className="text-[28px] font-black text-slate-800 tracking-tighter">NEXT.js</div>
      </div>
    );
  }

  // Generic gradient for paths/resources
  return (
    <div className={base}>
      <span className="text-[15px] font-black text-white drop-shadow text-center px-4 leading-tight">
        {item.thumbnailText}
      </span>
    </div>
  );
}

/* ─── 3-dot dropdown ─────────────────────────────────────────── */
function CardMenu({ onRemove }: { onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o); }}
        className="grid size-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
      >
        <MoreVertical className="size-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ExternalLink className="size-3.5" /> Open course
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-[12px] font-semibold text-red-500 hover:bg-red-50"
            >
              <X className="size-3.5" /> Remove bookmark
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Bookmark Card ──────────────────────────────────────────── */
function BookmarkCard({
  item,
  isBookmarked,
  onToggle,
  onRemove,
}: {
  item: BookmarkItem;
  isBookmarked: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative">
        <CourseThumbnail item={item} />
        {/* Bookmark toggle top-right */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
          className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-lg transition ${
            isBookmarked
              ? "bg-violet-600 text-white shadow-md"
              : "bg-white/90 text-slate-500 hover:bg-white hover:text-violet-600 shadow"
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Provider */}
        <div className="mb-2 flex items-center gap-1.5">
          <span className={`grid size-5 shrink-0 place-items-center rounded-sm text-[9px] font-black text-white ${item.providerColor}`}>
            {item.providerLogo}
          </span>
          <span className="text-[11px] font-bold text-slate-500">{item.provider}</span>
        </div>

        {/* Title */}
        <h3 className="mb-1.5 text-[14px] font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-violet-700 transition-colors">
          {item.title}
        </h3>

        {/* Level + Duration */}
        <p className="mb-3 text-[12px] font-medium text-slate-500">
          {item.level} · {item.duration}
        </p>

        {/* Rating + Reviews + Menu */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-[12px] font-bold text-slate-800">{item.rating}</span>
            <span className="text-[11px] text-slate-400">({item.reviews})</span>
          </div>
          <CardMenu onRemove={onRemove} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════════ */
const STORAGE_KEY = "lh_bookmarks";
const PAGE_SIZE = 8;

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState<"All Bookmarks" | Category>("All Bookmarks");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [sortOpen, setSortOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set(ALL_BOOKMARKS.map(b => b.id)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setBookmarkedIds(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookmarkedIds]));
    } catch {}
  }, [bookmarkedIds]);

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const removeBookmark = (id: number) => {
    setBookmarkedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  // Counts (only from bookmarked items)
  const bookmarkedItems = ALL_BOOKMARKS.filter(b => bookmarkedIds.has(b.id));
  const counts = {
    total: bookmarkedItems.length,
    courses: bookmarkedItems.filter(b => b.type === "Courses").length,
    paths: bookmarkedItems.filter(b => b.type === "Learning Paths").length,
    resources: bookmarkedItems.filter(b => b.type === "Resources").length,
  };

  const tabs = [
    { label: "All Bookmarks", count: counts.total },
    { label: "Courses", count: counts.courses },
    { label: "Learning Paths", count: counts.paths },
    { label: "Resources", count: counts.resources },
  ] as const;

  // Filter
  let filtered = bookmarkedItems;
  if (activeTab !== "All Bookmarks") filtered = filtered.filter(b => b.type === activeTab);
  if (activeCategory) filtered = filtered.filter(b => b.category === activeCategory);

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Title (A–Z)") return a.title.localeCompare(b.title);
    if (sortBy === "Title (Z–A)") return b.title.localeCompare(a.title);
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    if (sortBy === "Most Reviews") return parseFloat(b.reviews) - parseFloat(a.reviews);
    return b.id - a.id; // Recently Added
  });

  const visible = sorted.slice(0, visibleCount);

  return (
    <div className="pb-10">

      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-[26px] font-black tracking-tight text-slate-900">
          <Bookmark className="size-6 text-violet-600 fill-violet-600" />
          Bookmarks
        </h1>
        <p className="mt-1.5 text-[13px] font-medium text-slate-500">
          All the courses, resources, and content you've saved for later.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 min-w-0">

        {/* ── Left column ────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Tabs + Sort row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            {/* Tabs */}
            <div className="flex items-center gap-0 border-b border-slate-200 overflow-x-auto flex-1 min-w-0">
              {tabs.map(tab => (
                <button
                  key={tab.label}
                  onClick={() => { setActiveTab(tab.label as typeof activeTab); setVisibleCount(PAGE_SIZE); setActiveCategory(null); }}
                  className={`flex items-center gap-1.5 border-b-2 pb-3 pt-1 px-1 mr-6 text-[13px] font-bold transition-colors shrink-0 ${
                    activeTab === tab.label
                      ? "border-violet-600 text-violet-700"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                  <span className={`grid h-5 min-w-5.5 place-items-center rounded-full px-1.5 text-[10px] font-bold ${
                    activeTab === tab.label ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 h-9 text-[12px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 whitespace-nowrap"
              >
                Sort by: {sortBy}
                <ChevronDown className="size-3.5 text-slate-400" />
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-[12px] font-semibold transition ${
                          sortBy === opt ? "text-violet-700 bg-violet-50" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Category filter chips (when a category is active) */}
          {activeCategory && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[12px] font-medium text-slate-500">Filtered by:</span>
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-[12px] font-bold text-violet-700"
              >
                {activeCategory} <X className="size-3" />
              </button>
            </div>
          )}

          {/* Cards grid */}
          {visible.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 min-w-0">
              {visible.map(item => (
                <BookmarkCard
                  key={item.id}
                  item={item}
                  isBookmarked={bookmarkedIds.has(item.id)}
                  onToggle={() => toggleBookmark(item.id)}
                  onRemove={() => removeBookmark(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 grid size-16 place-items-center rounded-2xl bg-violet-50 text-violet-400">
                <Bookmark className="size-8" />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900">No bookmarks found</h3>
              <p className="mt-1 text-[13px] text-slate-500">
                {activeCategory ? "No bookmarks match this category." : "You haven't bookmarked anything here yet."}
              </p>
              {activeCategory && (
                <button onClick={() => setActiveCategory(null)} className="mt-4 text-[12px] font-bold text-violet-600 hover:underline">
                  Clear filter
                </button>
              )}
            </div>
          )}

          {/* Load More */}
          {visibleCount < sorted.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 h-10 text-[13px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Load More
                <ChevronDown className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── Right column ───────────────────────────────────────── */}
        <div className="w-full xl:w-70 shrink-0 space-y-5">

          {/* Bookmarks Overview */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-[15px] font-bold text-slate-900">Bookmarks Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Bookmark, label: "Total Bookmarks", value: counts.total, color: "text-violet-600 bg-violet-50" },
                { icon: BookOpen, label: "Courses", value: counts.courses, color: "text-emerald-600 bg-emerald-50" },
                { icon: Route, label: "Learning Paths", value: counts.paths, color: "text-blue-600 bg-blue-50" },
                { icon: FileText, label: "Resources", value: counts.resources, color: "text-amber-600 bg-amber-50" },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3 text-center">
                  <div className={`grid size-9 place-items-center rounded-lg ${stat.color}`}>
                    <stat.icon className="size-4" />
                  </div>
                  <p className="text-[22px] font-black leading-none text-slate-900">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-[15px] font-bold text-slate-900">Categories</h2>
            <div className="space-y-2">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(isActive ? null : cat.name);
                      setActiveTab("All Bookmarks");
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-bold transition ${
                      isActive
                        ? "bg-violet-50 text-violet-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`size-3.5 shrink-0 ${isActive ? "text-violet-600" : "text-slate-400"}`} />
                    <span className="flex-1 text-left">{cat.name}</span>
                    <span className={`text-[11px] font-bold ${isActive ? "text-violet-600" : "text-slate-400"}`}>{cat.count}</span>
                  </button>
                );
              })}
            </div>
            <button className="mt-3 flex items-center gap-1 text-[12px] font-bold text-violet-600 hover:text-violet-700 transition">
              View all categories <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* Quick Tips */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-[15px] font-bold text-slate-900">Quick Tips</h2>
            <div className="space-y-3.5">
              {[
                { icon: Bookmark, text: "Bookmark courses and content to access them quickly later." },
                { icon: LayoutGrid, text: "Use categories to filter your bookmarks easily." },
                { icon: Bell, text: "Enable notifications to get updates on bookmarked courses." },
              ].map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-600">
                      <Icon className="size-3.5" />
                    </div>
                    <p className="text-[12px] font-medium text-slate-600 leading-relaxed">{tip.text}</p>
                  </div>
                );
              })}
            </div>
            <Link
              href="/settings/notifications"
              className="mt-4 flex items-center gap-1 text-[12px] font-bold text-violet-600 hover:text-violet-700 transition"
            >
              Manage preferences <ArrowRight className="size-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
