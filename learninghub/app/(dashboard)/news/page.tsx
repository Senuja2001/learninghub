"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "sonner";
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
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Tabs from "@radix-ui/react-tabs";

import { useUserStore } from "@/store";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface RedditPost {
  id: string;
  title: string;
  summary: string;
  subreddit: string;
  createdAt: number;
  upvotes: string;
  comments: string;
  topic: string;
  url: string;
}

type TopicKey = "All" | "Programming" | "Web Dev" | "AI" | "Learning" | "Career" | "Games";

/* ─── Constants ──────────────────────────────────────────────────── */
const PER_PAGE = 5;
const TOPICS: TopicKey[] = ["All", "Programming", "Web Dev", "AI", "Learning", "Career", "Games"];

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

/* ─── API Fetcher ────────────────────────────────────────────────── */
async function fetchRedditPosts(query: string, isFresh: boolean): Promise<RedditPost[]> {
  const url = query
    ? `/api/reddit?mode=search&q=${encodeURIComponent(query)}`
    : `/api/reddit?mode=hot${isFresh ? "&fresh=1" : ""}`;
  
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Failed to fetch Reddit posts.");
  return json.posts as RedditPost[];
}

/* ─── Skeleton ───────────────────────────────────────────────────── */
function PostSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <Skeleton circle width={72} height={72} containerClassName="shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton width="80%" height={18} />
        <Skeleton width="100%" height={12} />
        <Skeleton width="60%" height={12} />
        <div className="mt-3 flex gap-3">
          <Skeleton width={60} height={16} borderRadius={10} />
          <Skeleton width={60} height={16} borderRadius={10} />
          <div className="ml-auto">
            <Skeleton width={80} height={16} borderRadius={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function NewsPage() {
  /* State */
  const [activeTopic, setActiveTopic] = useState<TopicKey>("All");
  const [page, setPage]               = useState(1);
  const [query, setQuery]             = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [freshNonce, setFreshNonce]   = useState(0);

  /* Global Zustand Store */
  const savedIds = useUserStore((s) => s.savedRedditPostIds);
  const toggleSaved = useUserStore((s) => s.toggleSavedRedditPost);

  /* Debounce search */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 650);
    return () => clearTimeout(handler);
  }, [query]);

  /* TanStack Query */
  const { data: allPosts = [], isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["reddit", debouncedQuery, freshNonce],
    queryFn: () => fetchRedditPosts(debouncedQuery, freshNonce > 0),
    staleTime: 5 * 60 * 1000, // 5 mins
  });

  /* Derived data */
  const searchMode = Boolean(debouncedQuery.trim());
  const filtered = activeTopic === "All" ? allPosts : allPosts.filter((p) => p.topic === activeTopic);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const savedPosts = allPosts.filter((p) => savedIds.includes(p.id));

  const topicCounts = TOPICS.reduce<Record<string, number>>((acc, t) => {
    acc[t] = t === "All" ? allPosts.length : allPosts.filter((p) => p.topic === t).length;
    return acc;
  }, {});

  /* Actions */
  function handleRefresh() {
    setQuery("");
    setDebouncedQuery("");
    setActiveTopic("All");
    setFreshNonce((n) => n + 1);
    setPage(1);
    toast.success("Fetching fresh posts from Reddit...");
  }

  function handleBookmark(post: RedditPost) {
    toggleSaved(post.id);
    if (!savedIds.includes(post.id)) {
      toast.success("Thread bookmarked", {
        description: post.title,
      });
    } else {
      toast.info("Thread removed from bookmarks");
    }
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="space-y-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reddit Watch</h1>
            <p className="mt-1 text-sm text-slate-500">
              {searchMode
                ? `Search results for "${debouncedQuery}"`
                : "Live Reddit threads from top tech communities · refreshes on demand"}
            </p>
          </div>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isFetching}
                className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
              >
                <RefreshCcw
                  className={`size-3.5 ${isFetching ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"}`}
                />
                {isFetching ? "Refreshing…" : "New posts"}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg animate-in fade-in zoom-in-95" sideOffset={5}>
                Pull latest from Reddit directly
                <Tooltip.Arrow className="fill-slate-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

          {/* ── LEFT: Feed ─────────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              
              {/* Radix Tabs for Topics */}
              <Tabs.Root value={activeTopic} onValueChange={(v: string) => { setActiveTopic(v as TopicKey); setPage(1); }}>
                <Tabs.List className="flex flex-wrap gap-2">
                  {TOPICS.map((topic) => {
                    const count = topicCounts[topic] ?? 0;
                    return (
                      <Tabs.Trigger
                        key={topic}
                        value={topic}
                        className="group relative h-8 rounded-full px-4 text-xs font-semibold transition-all duration-300 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm data-[state=inactive]:border data-[state=inactive]:border-slate-200 data-[state=inactive]:bg-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:border-violet-200 data-[state=inactive]:hover:text-violet-600"
                      >
                        {/* Animated background for active tab using Framer Motion */}
                        {activeTopic === topic && (
                          <motion.div
                            layoutId="activeTopicBubble"
                            className="absolute inset-0 rounded-full bg-violet-100"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          {topic}
                          {!isLoading && count > 0 && activeTopic !== topic && (
                            <span className="text-slate-400 group-data-[state=inactive]:group-hover:text-violet-400 transition-colors">
                              {count}
                            </span>
                          )}
                        </span>
                      </Tabs.Trigger>
                    );
                  })}
                </Tabs.List>
              </Tabs.Root>

              {/* Search */}
              <label className="mt-3 flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition-all duration-200 focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">
                {isFetching && query ? (
                  <Loader2 className="size-4 shrink-0 animate-spin text-violet-400" />
                ) : (
                  <Search className="size-4 shrink-0 text-slate-400" />
                )}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  placeholder="Search Reddit — type to find live posts…"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-slate-400 transition hover:text-slate-600"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </label>

              {/* Meta row */}
              {!isLoading && (
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
            {error && !isLoading && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-semibold text-red-700">{(error as Error).message}</p>
                  <button type="button" onClick={() => refetch()} className="mt-1 text-xs font-semibold text-red-500 underline hover:text-red-700">
                    Try again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading skeletons */}
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
                  <PostSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && visible.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
                <div className="grid size-12 place-items-center rounded-xl bg-slate-100">
                  <Search className="size-5 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-500">No threads found</p>
                <p className="text-xs text-slate-400">Try a different topic or search term</p>
              </motion.div>
            )}

            {/* Post cards */}
            {!isLoading && !error && visible.length > 0 && (
              <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((post, i) => {
                    const saved = savedIds.includes(post.id);
                    const key   = (TOPICS.includes(post.topic as TopicKey) ? post.topic : "All") as TopicKey;
                    const badge = TOPIC_BADGE[key] ?? "bg-slate-50 text-slate-500 border-slate-200";
                    const { bg, accent } = TOPIC_THUMB[key];
                    const timeAgo = formatDistanceToNow(post.createdAt * 1000, { addSuffix: true });

                    return (
                      <motion.article
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        key={post.id}
                        className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/50"
                      >
                        {/* Topic thumbnail */}
                        <div className="flex size-18 shrink-0 flex-col items-center justify-center gap-1 rounded-xl" style={{ background: bg }}>
                          <SiReddit style={{ color: accent, fontSize: 30 }} />
                          <span className="text-[9px] font-bold tracking-wide" style={{ color: accent, opacity: 0.75 }}>
                            Reddit
                          </span>
                        </div>

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
                              <span className="font-semibold text-orange-500">{post.subreddit}</span>
                            </span>

                            <span className="inline-flex items-center gap-1 text-xs text-slate-400" title={new Date(post.createdAt * 1000).toLocaleString()}>
                              <Clock className="size-3" />
                              {timeAgo}
                            </span>

                            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badge}`}>
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
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <a href={post.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700">
                                    View
                                    <ExternalLink className="size-3" />
                                  </a>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg animate-in fade-in zoom-in-95" sideOffset={5}>
                                    Open thread in Reddit
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </div>
                          </div>
                        </div>

                        {/* Bookmark */}
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <button
                              type="button"
                              aria-pressed={saved}
                              onClick={() => handleBookmark(post)}
                              className={`grid size-8 shrink-0 self-start place-items-center rounded-xl transition-all duration-200 ${
                                saved ? "bg-violet-100 text-violet-600" : "text-slate-300 hover:bg-slate-100 hover:text-violet-500"
                              }`}
                            >
                              {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                            </button>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content className="rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg animate-in fade-in zoom-in-95" sideOffset={5}>
                              {saved ? "Remove bookmark" : "Save thread"}
                              <Tooltip.Arrow className="fill-slate-900" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination — up to 10 pages */}
            {!isLoading && pageCount > 1 && (
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3.5">
                <p className="text-xs text-slate-500">
                  Showing <span className="font-semibold text-slate-700">{visible.length}</span> of <span className="font-semibold text-slate-700">{filtered.length}</span> posts
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
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
                  <AnimatePresence>
                    {savedPosts.map((post) => {
                      const key = (TOPICS.includes(post.topic as TopicKey) ? post.topic : "All") as TopicKey;
                      const { bg, accent } = TOPIC_THUMB[key];
                      return (
                        <motion.a
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          key={post.id}
                          href={post.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-violet-200 hover:bg-violet-50 overflow-hidden"
                        >
                          <div className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ background: bg }}>
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
                        </motion.a>
                      );
                    })}
                  </AnimatePresence>
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

            {/* Feed stats */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="size-4 text-rose-500" />
                <h2 className="text-sm font-bold text-slate-900">Feed Stats</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Posts loaded", value: isLoading ? "—" : allPosts.length, icon: Sparkles, color: "text-violet-500" },
                  { label: "Topics", value: isLoading ? "—" : TOPICS.length - 1, icon: Hash, color: "text-sky-500" },
                  { label: "Saved", value: savedPosts.length, icon: BookmarkCheck, color: "text-emerald-500" },
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
                disabled={isLoading || isFetching}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-violet-600 shadow transition hover:bg-violet-50 active:scale-95 disabled:opacity-60"
              >
                <RefreshCcw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
                {isFetching ? "Loading…" : "Refresh Feed"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
