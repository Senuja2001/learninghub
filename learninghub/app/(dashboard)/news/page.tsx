"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Hash,
  Loader2,
  MessageSquare,
  RefreshCcw,
  Search,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { SiReddit } from "react-icons/si";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface RedditPost {
  id: string;
  title: string;
  summary: string;
  subreddit: string;
  time: string;
  upvotes: string;
  comments: string;
  topic: string;
  url: string;
}

type TopicKey =
  | "All"
  | "Programming"
  | "Web Dev"
  | "AI"
  | "Learning"
  | "Career"
  | "Games";

/* ─── Constants ──────────────────────────────────────────────────── */
const STORAGE_KEY = "learninghub:saved-reddit-v2";
const PER_PAGE    = 5;
const TOPICS: TopicKey[] = [
  "All", "Programming", "Web Dev", "AI", "Learning", "Career", "Games",
];

const TOPIC_THUMB: Record<TopicKey, { bg: string; accent: string }> = {
  All:         { bg: "#1e1b4b", accent: "#a5b4fc" },
  Programming: { bg: "#0c1a2e", accent: "#38bdf8" },
  "Web Dev":   { bg: "#052e16", accent: "#4ade80" },
  AI:          { bg: "#1e0b3a", accent: "#d8b4fe" },
  Learning:    { bg: "#1c1004", accent: "#fbbf24" },
  Career:      { bg: "#2d0a0a", accent: "#f87171" },
  Games:       { bg: "#0a1f0a", accent: "#86efac" },
};

const TOPIC_BADGE: Record<TopicKey, string> = {
  All:         "bg-violet-50 text-violet-600 border-violet-100",
  Programming: "bg-sky-50 text-sky-600 border-sky-100",
  "Web Dev":   "bg-emerald-50 text-emerald-600 border-emerald-100",
  AI:          "bg-purple-50 text-purple-600 border-purple-100",
  Learning:    "bg-amber-50 text-amber-600 border-amber-100",
  Career:      "bg-rose-50 text-rose-600 border-rose-100",
  Games:       "bg-lime-50 text-lime-600 border-lime-100",
};

/* ─── Local storage helpers ─────────────────────────────────────── */
function loadSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? (JSON.parse(s) as string[]) : [];
  } catch {
    return [];
  }
}

/* ─── Skeleton card ─────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="flex animate-pulse gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="size-[72px] shrink-0 rounded-xl bg-slate-200" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="h-4 w-3/4 rounded-lg bg-slate-200" />
        <div className="h-3 w-full rounded-lg bg-slate-100" />
        <div className="h-3 w-1/2 rounded-lg bg-slate-100" />
        <div className="mt-3 flex gap-3">
          <div className="h-5 w-16 rounded-full bg-slate-100" />
          <div className="h-5 w-12 rounded-full bg-slate-100" />
          <div className="ml-auto h-5 w-20 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

/* ─── Reddit thumbnail chip ─────────────────────────────────────── */
function RedditThumb({ topic }: { topic: string }) {
  const key = (TOPICS.includes(topic as TopicKey) ? topic : "All") as TopicKey;
  const { bg, accent } = TOPIC_THUMB[key];
  return (
    <div
      className="flex size-[72px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl"
      style={{ background: bg }}
    >
      <SiReddit style={{ color: accent, fontSize: 30 }} />
      <span
        className="text-[9px] font-bold tracking-wide"
        style={{ color: accent, opacity: 0.75 }}
      >
        Reddit
      </span>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function NewsPage() {
  /* State */
  const [allPosts, setAllPosts]       = useState<RedditPost[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [activeTopic, setActiveTopic] = useState<TopicKey>("All");
  const [page, setPage]               = useState(1);
  const [savedIds, setSavedIds]       = useState<string[]>(loadSaved);
  const [query, setQuery]             = useState("");
  const [searchMode, setSearchMode]   = useState(false); // true = results are from search
  const [refreshing, setRefreshing]   = useState(false);

  /* Debounce ref for search */
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Persist saved IDs */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  /* ── Fetch helpers ─────────────────────────────────────────────── */
  const fetchHot = useCallback(async (fresh = false) => {
    setLoading(true);
    setError("");
    setSearchMode(false);
    try {
      const url = `/api/reddit?mode=hot${fresh ? "&fresh=1" : ""}`;
      const res  = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to fetch");
      setAllPosts(json.posts as RedditPost[]);
      setPage(1);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchSearch = useCallback(async (q: string) => {
    if (!q.trim()) { fetchHot(); return; }
    setLoading(true);
    setError("");
    setSearchMode(true);
    try {
      const res  = await fetch(`/api/reddit?mode=search&q=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Search failed");
      setAllPosts(json.posts as RedditPost[]);
      setPage(1);
    } catch (e: any) {
      setError(e.message ?? "Search failed");
    } finally {
      setLoading(false);
    }
  }, [fetchHot]);

  /* Initial load */
  useEffect(() => { fetchHot(); }, [fetchHot]);

  /* Debounced search — fires 650 ms after user stops typing */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      if (searchMode) fetchHot();
      return;
    }
    debounceRef.current = setTimeout(() => fetchSearch(query), 650);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  /* Refresh */
  function handleRefresh() {
    setRefreshing(true);
    setQuery("");
    setActiveTopic("All");
    fetchHot(true);
  }

  /* Bookmark toggle */
  function toggleSaved(id: string) {
    setSavedIds((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }

  /* ── Filtered / paginated posts ───────────────────────────────── */
  const filtered =
    activeTopic === "All"
      ? allPosts
      : allPosts.filter((p) => p.topic === activeTopic);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const savedPosts = allPosts.filter((p) => savedIds.includes(p.id));

  /* Topic counts (from current post set) */
  const topicCounts = TOPICS.reduce<Record<string, number>>((acc, t) => {
    acc[t] = t === "All"
      ? allPosts.length
      : allPosts.filter((p) => p.topic === t).length;
    return acc;
  }, {});

  function changeTopic(t: TopicKey) {
    setActiveTopic(t);
    setPage(1);
  }

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reddit Watch</h1>
          <p className="mt-1 text-sm text-slate-500">
            {searchMode
              ? `Search results for "${query}"`
              : "Live Reddit threads from top tech communities · refreshes on demand"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
        >
          <RefreshCcw
            className={`size-3.5 ${refreshing ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"}`}
          />
          {refreshing ? "Refreshing…" : "New posts"}
        </button>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

        {/* ── LEFT: Feed ─────────────────────────────────────────── */}
        <div className="space-y-3">

          {/* Filter + search bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Topic pills */}
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => {
                const active = activeTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => changeTopic(topic)}
                    className={`h-8 rounded-full px-4 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600"
                    }`}
                  >
                    {topic}
                    {!loading && topicCounts[topic] > 0 && !active && (
                      <span className="ml-1.5 text-slate-400">
                        {topicCounts[topic]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <label className="mt-3 flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition-all duration-200 focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">
              {loading && query ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-violet-400" />
              ) : (
                <Search className="size-4 shrink-0 text-slate-400" />
              )}
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Search Reddit — type to find live posts…"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setPage(1); }}
                  className="text-slate-400 transition hover:text-slate-600"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </label>

            {/* Meta row */}
            {!loading && (
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                <span>
                  <span className="font-semibold text-slate-600">{filtered.length}</span>{" "}
                  {searchMode ? "results" : "threads"} · {allPosts.length} loaded
                </span>
                <span>Page {page} / {pageCount}</span>
              </div>
            )}
          </div>

          {/* Error state */}
          {error && !loading && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="mt-1 text-xs font-semibold text-red-500 underline hover:text-red-700"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-3">
              {Array.from({ length: PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && visible.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <div className="grid size-12 place-items-center rounded-xl bg-slate-100">
                <Search className="size-5 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-500">No threads found</p>
              <p className="text-xs text-slate-400">Try a different topic or search term</p>
            </div>
          )}

          {/* Post cards */}
          {!loading && !error && visible.length > 0 && (
            <div className="space-y-3">
              {visible.map((post) => {
                const saved = savedIds.includes(post.id);
                const key   = (TOPICS.includes(post.topic as TopicKey)
                  ? post.topic
                  : "All") as TopicKey;
                const badge = TOPIC_BADGE[key] ?? "bg-slate-50 text-slate-500 border-slate-200";

                return (
                  <article
                    key={post.id}
                    className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/50"
                  >
                    {/* Topic thumbnail */}
                    <RedditThumb topic={post.topic} />

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 text-[15px] font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-violet-700">
                        {post.title}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500">
                        {post.summary}
                      </p>

                      {/* Meta row */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <SiReddit className="size-3 text-orange-400" />
                          <span className="font-semibold text-orange-500">
                            {post.subreddit}
                          </span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="size-3" />
                          {post.time}
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badge}`}
                        >
                          {post.topic}
                        </span>

                        <div className="ml-auto flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                            <ThumbsUp className="size-3" />
                            {post.upvotes}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                            <MessageSquare className="size-3" />
                            {post.comments}
                          </span>
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
                          >
                            View
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark */}
                    <button
                      type="button"
                      aria-pressed={saved}
                      aria-label={`${saved ? "Remove" : "Save"} ${post.title}`}
                      onClick={() => toggleSaved(post.id)}
                      className={`grid size-8 shrink-0 self-start place-items-center rounded-xl transition-all duration-200 ${
                        saved
                          ? "bg-violet-100 text-violet-600"
                          : "text-slate-300 hover:bg-slate-100 hover:text-violet-500"
                      }`}
                    >
                      {saved ? (
                        <BookmarkCheck className="size-4" />
                      ) : (
                        <Bookmark className="size-4" />
                      )}
                    </button>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination — up to 10 pages */}
          {!loading && pageCount > 1 && (
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3.5">
              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">{visible.length}</span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
                posts
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-testid="reddit-page-previous"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-3.5" />
                  Prev
                </button>

                {/* Page dots / numbers — cap at 10 */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(pageCount, 10) }).map((_, i) => {
                    const p = i + 1;
                    const isCur = page === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={`rounded-full text-[10px] font-bold transition-all duration-200 ${
                          isCur
                            ? "size-6 bg-violet-600 text-white"
                            : "size-6 bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  data-testid="reddit-page-next"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="inline-flex h-8 items-center gap-1 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Sidebar ─────────────────────────────────────── */}
        <aside className="space-y-4">

          {/* Saved threads */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-violet-600 shadow-md shadow-violet-200">
                <BookmarkCheck className="size-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Saved Threads</h2>
                <p className="text-xs text-slate-400">
                  {savedPosts.length} post{savedPosts.length !== 1 ? "s" : ""} bookmarked
                </p>
              </div>
            </div>

            {savedPosts.length > 0 ? (
              <div className="space-y-2">
                {savedPosts.map((post) => {
                  const key = (TOPICS.includes(post.topic as TopicKey)
                    ? post.topic
                    : "All") as TopicKey;
                  const { bg, accent } = TOPIC_THUMB[key];
                  return (
                    <a
                      key={post.id}
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-violet-200 hover:bg-violet-50"
                    >
                      <div
                        className="grid size-8 shrink-0 place-items-center rounded-lg"
                        style={{ background: bg }}
                      >
                        <SiReddit className="size-4" style={{ color: accent }} />
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-xs font-semibold leading-4 text-slate-800 group-hover:text-violet-700">
                          {post.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {post.subreddit}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2.5 rounded-xl border border-dashed border-slate-200 py-8 text-center">
                <div className="grid size-10 place-items-center rounded-xl bg-slate-100">
                  <Bookmark className="size-5 text-slate-300" />
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Bookmark threads to save them here.
                </p>
              </div>
            )}
          </div>

          {/* Browse topics */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Hash className="size-4 text-slate-400" />
              <h2 className="text-sm font-bold text-slate-900">Browse Topics</h2>
            </div>
            <div className="space-y-1.5">
              {TOPICS.filter((t) => t !== "All").map((topic) => {
                const count  = topicCounts[topic] ?? 0;
                const active = activeTopic === topic;
                const badge  = TOPIC_BADGE[topic];
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => changeTopic(topic)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all ${
                      active
                        ? "border border-violet-200 bg-violet-50"
                        : "border border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        active ? "text-violet-700" : "text-slate-700"
                      }`}
                    >
                      {topic}
                    </span>
                    {loading ? (
                      <div className="h-4 w-6 animate-pulse rounded-full bg-slate-200" />
                    ) : (
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge}`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feed stats */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="size-4 text-rose-500" />
              <h2 className="text-sm font-bold text-slate-900">Feed Stats</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "Posts loaded",
                  value: loading ? "—" : allPosts.length,
                  icon: Sparkles,
                  color: "text-violet-500",
                },
                {
                  label: "Topics",
                  value: loading ? "—" : TOPICS.length - 1,
                  icon: Hash,
                  color: "text-sky-500",
                },
                {
                  label: "Saved",
                  value: savedPosts.length,
                  icon: BookmarkCheck,
                  color: "text-emerald-500",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                    <Icon className={`size-3.5 ${color}`} />
                    {label}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shuffle CTA */}
          <div className="overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 p-5 shadow-md shadow-violet-200">
            <div className="mb-3 grid size-10 place-items-center rounded-xl border border-white/10 bg-white/10">
              <Zap className="size-5 text-white" />
            </div>
            <h2 className="text-sm font-bold text-white">Get fresh posts</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-white/70">
              Pull a brand-new batch of hot threads from Reddit right now.
            </p>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-violet-600 shadow transition hover:bg-violet-50 active:scale-95 disabled:opacity-60"
            >
              <RefreshCcw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Loading…" : "Refresh Feed"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
