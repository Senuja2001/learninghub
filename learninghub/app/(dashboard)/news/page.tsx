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
  Loader2,
  MessageSquare,
  RefreshCcw,
  Search,
  ThumbsUp,
  X,
  BookOpen,
  Users,
  Share2,
  Pin,
  PinOff,
  Link as LinkIcon,
  Flame,
  BarChart3,
} from "lucide-react";
import { SiReddit } from "react-icons/si";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Tabs from "@radix-ui/react-tabs";

import { useUserStore } from "@/store";

/* ─── Reddit Types ───────────────────────────────────────────────── */
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

/* ─── Daily.dev Types ────────────────────────────────────────────── */
export interface DailyDevPost {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceIcon: string;
  author: string;
  publishedAt: number;
  readTime: number;
  upvotes: number;
  comments: number;
  tags: string[];
  topic: string;
  url: string;
  coverColor: string;
}

/* ─── Constants ──────────────────────────────────────────────────── */
const PER_PAGE = 5;

type RedditTopicKey = "All" | "Programming" | "Web Dev" | "AI" | "Learning" | "Career" | "Games";
const REDDIT_TOPICS: RedditTopicKey[] = ["All", "Programming", "Web Dev", "AI", "Learning", "Career", "Games"];

type DailyTopicKey = "All" | "Frontend" | "Backend" | "AI" | "DevOps" | "Career" | "Web3";
const DAILY_TOPICS: DailyTopicKey[] = ["All", "Frontend", "Backend", "AI", "DevOps", "Career", "Web3"];

const REDDIT_TOPIC_THUMB: Record<RedditTopicKey, { bg: string; accent: string }> = {
  All: { bg: "#1e1b4b", accent: "#a5b4fc" },
  Programming: { bg: "#0c1a2e", accent: "#38bdf8" },
  "Web Dev": { bg: "#052e16", accent: "#4ade80" },
  AI: { bg: "#1e0b3a", accent: "#d8b4fe" },
  Learning: { bg: "#1c1004", accent: "#fbbf24" },
  Career: { bg: "#2d0a0a", accent: "#f87171" },
  Games: { bg: "#0a1f0a", accent: "#86efac" },
};

const REDDIT_TOPIC_BADGE: Record<RedditTopicKey, string> = {
  All: "bg-violet-50 text-violet-600 border-violet-100",
  Programming: "bg-sky-50 text-sky-600 border-sky-100",
  "Web Dev": "bg-emerald-50 text-emerald-600 border-emerald-100",
  AI: "bg-purple-50 text-purple-600 border-purple-100",
  Learning: "bg-amber-50 text-amber-600 border-amber-100",
  Career: "bg-rose-50 text-rose-600 border-rose-100",
  Games: "bg-lime-50 text-lime-600 border-lime-100",
};

const DAILY_TOPIC_BADGE: Record<DailyTopicKey, string> = {
  All: "bg-violet-50 text-violet-600 border-violet-100",
  Frontend: "bg-sky-50 text-sky-600 border-sky-100",
  Backend: "bg-emerald-50 text-emerald-600 border-emerald-100",
  AI: "bg-purple-50 text-purple-600 border-purple-100",
  DevOps: "bg-orange-50 text-orange-600 border-orange-100",
  Career: "bg-rose-50 text-rose-600 border-rose-100",
  Web3: "bg-cyan-50 text-cyan-600 border-cyan-100",
};

/* ─── API Fetchers ───────────────────────────────────────────────── */
async function fetchRedditPosts(query: string, isFresh: boolean): Promise<RedditPost[]> {
  const url = query
    ? `/api/reddit?mode=search&q=${encodeURIComponent(query)}`
    : `/api/reddit?mode=hot${isFresh ? "&fresh=1" : ""}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Failed to fetch Reddit posts.");
  return json.posts as RedditPost[];
}

async function fetchDailyDevPosts(query: string, isFresh: boolean): Promise<DailyDevPost[]> {
  const url = query
    ? `/api/dailydev?mode=search&q=${encodeURIComponent(query)}`
    : `/api/dailydev?mode=hot${isFresh ? "&fresh=1" : ""}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Failed to fetch Daily.dev posts.");
  return json.posts as DailyDevPost[];
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function estimateReadTime(text: string) {
  const words = text.split(" ").length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseK(val: string | number) {
  if (typeof val === "number") return val;
  const num = parseFloat(val.replace(/k/i, ""));
  if (val.toLowerCase().includes("k")) return num * 1000;
  return num;
}

/* ─── Skeletons ──────────────────────────────────────────────────── */
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

/* ─── Source Toggle ──────────────────────────────────────────────── */
type Source = "reddit" | "dailydev";

function SourceToggle({ value, onChange }: { value: Source; onChange: (s: Source) => void }) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      {(
        [
          {
            id: "reddit" as Source,
            label: "Reddit",
            icon: <SiReddit className="size-3.5 text-orange-500" />,
          },
          {
            id: "dailydev" as Source,
            label: "Daily.dev",
            icon: (
              <span className="flex size-3.5 items-center justify-center rounded-[3px] bg-black text-[7px] font-black leading-none text-white">
                d
              </span>
            ),
          },
        ] as const
      ).map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`relative flex h-9 items-center gap-2 rounded-xl px-5 text-xs font-semibold transition-all duration-300 ${
            value === id ? "text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {value === id && (
            <motion.div
              layoutId="sourceToggleBg"
              className="absolute inset-0 rounded-xl bg-slate-100"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {icon}
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function NewsPage() {
  /* Source toggle */
  const [source, setSource] = useState<Source>("reddit");

  /* Shared state */
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [freshNonce, setFreshNonce] = useState(0);

  /* Reddit tab state */
  const [redditTopic, setRedditTopic] = useState<RedditTopicKey>("All");

  /* Daily.dev tab state */
  const [dailyTopic, setDailyTopic] = useState<DailyTopicKey>("All");

  /* Global Zustand Store */
  const savedRedditIds = useUserStore((s) => s.savedRedditPostIds);
  const toggleSavedReddit = useUserStore((s) => s.toggleSavedRedditPost);
  const savedDailyIds = useUserStore((s) => s.savedDailyDevPostIds);
  const toggleSavedDaily = useUserStore((s) => s.toggleSavedDailyDevPost);
  const pinnedIds = useUserStore((s) => s.pinnedPostIds);
  const togglePinned = useUserStore((s) => s.togglePinnedPost);

  /* Debounce */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 650);
    return () => clearTimeout(handler);
  }, [query]);

  /* Reset page & query on source switch */
  function handleSourceChange(s: Source) {
    setSource(s);
    setQuery("");
    setDebouncedQuery("");
    setPage(1);
    setFreshNonce(0);
  }

  /* Reddit Query */
  const {
    data: redditPosts = [],
    isLoading: redditLoading,
    isFetching: redditFetching,
    error: redditError,
    refetch: refetchReddit,
  } = useQuery({
    queryKey: ["reddit", debouncedQuery, freshNonce],
    queryFn: () => fetchRedditPosts(debouncedQuery, freshNonce > 0),
    staleTime: 5 * 60 * 1000,
    enabled: source === "reddit",
  });

  /* Daily.dev Query */
  const {
    data: dailyPosts = [],
    isLoading: dailyLoading,
    isFetching: dailyFetching,
    error: dailyError,
    refetch: refetchDaily,
  } = useQuery({
    queryKey: ["dailydev", debouncedQuery, freshNonce],
    queryFn: () => fetchDailyDevPosts(debouncedQuery, freshNonce > 0),
    staleTime: 5 * 60 * 1000,
    enabled: source === "dailydev",
  });

  /* Derived — Reddit */
  const redditFilteredRaw =
    redditTopic === "All" ? redditPosts : redditPosts.filter((p) => p.topic === redditTopic);
  const redditPinned = redditFilteredRaw.filter((p) => pinnedIds.includes(p.id));
  const redditUnpinned = redditFilteredRaw.filter((p) => !pinnedIds.includes(p.id));
  const redditFiltered = [...redditPinned, ...redditUnpinned];
  
  const redditPageCount = Math.max(1, Math.ceil(redditFiltered.length / PER_PAGE));
  const redditVisible = redditFiltered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const savedRedditPosts = redditPosts.filter((p) => savedRedditIds.includes(p.id));
  const redditTopicCounts = REDDIT_TOPICS.reduce<Record<string, number>>((acc, t) => {
    acc[t] = t === "All" ? redditPosts.length : redditPosts.filter((p) => p.topic === t).length;
    return acc;
  }, {});

  /* Derived — Daily.dev */
  const dailyFilteredRaw =
    dailyTopic === "All" ? dailyPosts : dailyPosts.filter((p) => p.topic === dailyTopic);
  const dailyPinned = dailyFilteredRaw.filter((p) => pinnedIds.includes(p.id));
  const dailyUnpinned = dailyFilteredRaw.filter((p) => !pinnedIds.includes(p.id));
  const dailyFiltered = [...dailyPinned, ...dailyUnpinned];

  const dailyPageCount = Math.max(1, Math.ceil(dailyFiltered.length / PER_PAGE));
  const dailyVisible = dailyFiltered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const savedDailyPosts = dailyPosts.filter((p) => savedDailyIds.includes(p.id));
  const dailyTopicCounts = DAILY_TOPICS.reduce<Record<string, number>>((acc, t) => {
    acc[t] = t === "All" ? dailyPosts.length : dailyPosts.filter((p) => p.topic === t).length;
    return acc;
  }, {});

  /* Convenient derived */
  const isLoading = source === "reddit" ? redditLoading : dailyLoading;
  const isFetching = source === "reddit" ? redditFetching : dailyFetching;
  const error = source === "reddit" ? redditError : dailyError;
  const pageCount = source === "reddit" ? redditPageCount : dailyPageCount;
  const searchMode = Boolean(debouncedQuery.trim());

  /* Trending computation (top 5 by upvotes in current feed) */
  const activeFeed = source === "reddit" ? redditFilteredRaw : dailyFilteredRaw;
  const trendingNow = [...activeFeed]
    .sort((a, b) => parseK(b.upvotes) - parseK(a.upvotes))
    .slice(0, 5);

  /* Actions */
  function handleRefresh() {
    setQuery("");
    setDebouncedQuery("");
    if (source === "reddit") setRedditTopic("All");
    else setDailyTopic("All");
    setFreshNonce((n) => n + 1);
    setPage(1);
    toast.success(
      source === "reddit"
        ? "Fetching fresh posts from Reddit…"
        : "Fetching fresh articles from Daily.dev…"
    );
  }

  function handleRedditBookmark(post: RedditPost) {
    toggleSavedReddit(post.id);
    if (!savedRedditIds.includes(post.id)) {
      toast.success("Thread bookmarked", { description: post.title });
    } else {
      toast.info("Thread removed from bookmarks");
    }
  }

  function handleDailyBookmark(post: DailyDevPost) {
    toggleSavedDaily(post.id);
    if (!savedDailyIds.includes(post.id)) {
      toast.success("Article bookmarked", { description: post.title });
    } else {
      toast.info("Article removed from bookmarks");
    }
  }

  function handlePin(id: string, title: string) {
    togglePinned(id);
    if (!pinnedIds.includes(id)) {
      toast.success("Pinned to team feed", { description: title });
    } else {
      toast.info("Unpinned from team feed");
    }
  }

  function handleShare(post: { title: string; url: string }) {
    const text = `📰 Interesting read: ${post.title}\n${post.url}\n— shared via LearningHub`;
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!", { description: "Ready to share with your team." });
  }

  function handleCopyLink(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  }

  /* Pagination */
  const renderPagination = (count: number) =>
    !isLoading && count > 1 ? (
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3.5">
        <p className="text-xs text-slate-500">
          Page <span className="font-semibold text-slate-700">{page}</span> of{" "}
          <span className="font-semibold text-slate-700">{count}</span>
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
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(count, 10) }).map((_, i) => {
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
            onClick={() => setPage((p) => Math.min(count, p + 1))}
            disabled={page === count}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    ) : null;

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="space-y-6">
        {/* ── Page header ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {source === "reddit" ? "Reddit Watch" : "Daily.dev Feed"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {searchMode
                ? `Search results for "${debouncedQuery}"`
                : source === "reddit"
                  ? "Live Reddit threads from top tech communities · refreshes on demand"
                  : "Curated developer articles from top engineering blogs · refreshes on demand"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SourceToggle value={source} onChange={handleSourceChange} />
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isFetching}
                  className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCcw
                    className={`size-3.5 ${isFetching ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"}`}
                  />
                  {isFetching ? "Refreshing…" : "New posts"}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg"
                  sideOffset={5}
                >
                  {source === "reddit" ? "Pull latest from Reddit" : "Pull latest from Daily.dev"}
                  <Tooltip.Arrow className="fill-slate-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </div>

        {/* ── Main grid ────────────────────────────────────────── */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* LEFT: Feed */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {/* Topic tabs */}
              <AnimatePresence mode="wait">
                {source === "reddit" ? (
                  <motion.div
                    key="reddit-tabs"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Tabs.Root
                      value={redditTopic}
                      onValueChange={(v) => {
                        setRedditTopic(v as RedditTopicKey);
                        setPage(1);
                      }}
                    >
                      <Tabs.List className="flex flex-wrap gap-2">
                        {REDDIT_TOPICS.map((topic) => {
                          const count = redditTopicCounts[topic] ?? 0;
                          return (
                            <Tabs.Trigger
                              key={topic}
                              value={topic}
                              className="group relative h-8 rounded-full px-4 text-xs font-semibold transition-all duration-300 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm data-[state=inactive]:border data-[state=inactive]:border-slate-200 data-[state=inactive]:bg-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:border-violet-200 data-[state=inactive]:hover:text-violet-600"
                            >
                              {redditTopic === topic && (
                                <motion.div
                                  layoutId="activeRedditBubble"
                                  className="absolute inset-0 rounded-full bg-violet-100"
                                  initial={false}
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                              )}
                              <span className="relative z-10 flex items-center gap-1.5">
                                {topic}
                                {!redditLoading && count > 0 && redditTopic !== topic && (
                                  <span className="text-slate-400 transition-colors group-data-[state=inactive]:group-hover:text-violet-400">
                                    {count}
                                  </span>
                                )}
                              </span>
                            </Tabs.Trigger>
                          );
                        })}
                      </Tabs.List>
                    </Tabs.Root>
                  </motion.div>
                ) : (
                  <motion.div
                    key="daily-tabs"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Tabs.Root
                      value={dailyTopic}
                      onValueChange={(v) => {
                        setDailyTopic(v as DailyTopicKey);
                        setPage(1);
                      }}
                    >
                      <Tabs.List className="flex flex-wrap gap-2">
                        {DAILY_TOPICS.map((topic) => {
                          const count = dailyTopicCounts[topic] ?? 0;
                          return (
                            <Tabs.Trigger
                              key={topic}
                              value={topic}
                              className="group relative h-8 rounded-full px-4 text-xs font-semibold transition-all duration-300 data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=inactive]:border data-[state=inactive]:border-slate-200 data-[state=inactive]:bg-white data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:border-slate-900 data-[state=inactive]:hover:text-slate-900"
                            >
                              {dailyTopic === topic && (
                                <motion.div
                                  layoutId="activeDailyBubble"
                                  className="absolute inset-0 rounded-full bg-slate-900"
                                  initial={false}
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                              )}
                              <span
                                className={`relative z-10 flex items-center gap-1.5 ${
                                  dailyTopic === topic ? "text-white" : ""
                                }`}
                              >
                                {topic}
                                {!dailyLoading && count > 0 && dailyTopic !== topic && (
                                  <span className="text-slate-400">{count}</span>
                                )}
                              </span>
                            </Tabs.Trigger>
                          );
                        })}
                      </Tabs.List>
                    </Tabs.Root>
                  </motion.div>
                )}
              </AnimatePresence>

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
                  placeholder={
                    source === "reddit"
                      ? "Search Reddit — type to find live posts…"
                      : "Search Daily.dev — type to find articles…"
                  }
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
                    <span className="font-semibold text-slate-600">
                      {source === "reddit" ? redditFiltered.length : dailyFiltered.length}
                    </span>{" "}
                    {searchMode ? "results" : source === "reddit" ? "threads" : "articles"} ·{" "}
                    {source === "reddit" ? redditPosts.length : dailyPosts.length} loaded
                  </span>
                  <span>
                    Page {page} / {pageCount}
                  </span>
                </div>
              )}
            </div>

            {/* Error */}
            {error && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-semibold text-red-700">{(error as Error).message}</p>
                  <button
                    type="button"
                    onClick={() => (source === "reddit" ? refetchReddit() : refetchDaily())}
                    className="mt-1 text-xs font-semibold text-red-500 underline hover:text-red-700"
                  >
                    Try again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
                  <PostSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty */}
            {!isLoading &&
              !error &&
              (source === "reddit" ? redditVisible : dailyVisible).length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-slate-100">
                    <Search className="size-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">No posts found</p>
                  <p className="text-xs text-slate-400">Try a different topic or search term</p>
                </motion.div>
              )}

            {/* ── Reddit Cards ─────────────────────────────────── */}
            {source === "reddit" && !isLoading && !error && redditVisible.length > 0 && (
              <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {redditVisible.map((post, i) => {
                    const saved = savedRedditIds.includes(post.id);
                    const pinned = pinnedIds.includes(post.id);
                    const key = (
                      REDDIT_TOPICS.includes(post.topic as RedditTopicKey) ? post.topic : "All"
                    ) as RedditTopicKey;
                    const badge = REDDIT_TOPIC_BADGE[key] ?? "bg-slate-50 text-slate-500 border-slate-200";
                    const { bg, accent } = REDDIT_TOPIC_THUMB[key];
                    const timeAgo = formatDistanceToNow(post.createdAt * 1000, { addSuffix: true });
                    const readTime = estimateReadTime(post.summary);

                    return (
                      <motion.article
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        key={post.id}
                        className={`group flex gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-violet-100/50 ${
                          pinned ? "border-amber-300 bg-amber-50/10" : "border-slate-200 hover:border-violet-200"
                        }`}
                      >
                        <div
                          className="flex size-18 shrink-0 flex-col items-center justify-center gap-1 rounded-xl"
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
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h2 className="line-clamp-2 text-[15px] leading-snug font-bold text-slate-900 transition-colors duration-200 group-hover:text-violet-700">
                              {pinned && <Pin className="mr-1.5 mb-0.5 inline size-3.5 text-amber-500" />}
                              {post.title}
                            </h2>
                            {/* Card Actions (Share, Bookmark, Pin) */}
                            <div className="flex shrink-0 items-center gap-1">
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => handlePin(post.id, post.title)}
                                    className={`grid size-7 place-items-center rounded-lg transition-all ${
                                      pinned ? "bg-amber-100 text-amber-600" : "text-slate-400 hover:bg-slate-100 hover:text-amber-500"
                                    }`}
                                  >
                                    {pinned ? <PinOff className="size-3.5" /> : <Pin className="size-3.5" />}
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg" sideOffset={5}>
                                    {pinned ? "Unpin post" : "Pin for team"}
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>

                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => handleShare(post)}
                                    className="grid size-7 place-items-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-blue-500"
                                  >
                                    <Share2 className="size-3.5" />
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg" sideOffset={5}>
                                    Share with team
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>

                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => handleRedditBookmark(post)}
                                    className={`grid size-7 place-items-center rounded-lg transition-all ${
                                      saved ? "bg-violet-100 text-violet-600" : "text-slate-400 hover:bg-slate-100 hover:text-violet-500"
                                    }`}
                                  >
                                    {saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg" sideOffset={5}>
                                    {saved ? "Remove bookmark" : "Save thread"}
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </div>
                          </div>

                          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500">
                            {post.summary}
                          </p>

                          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                            <span className="inline-flex items-center gap-1.5 text-xs">
                              <SiReddit className="size-3 text-orange-400" />
                              <span className="font-semibold text-orange-500">{post.subreddit}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-slate-400" title={new Date(post.createdAt * 1000).toLocaleString()}>
                              <Clock className="size-3" />
                              {timeAgo}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                              <BookOpen className="size-3" />
                              ~{readTime}m read
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
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleCopyLink(post.url)}
                                  className="grid size-6 place-items-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                  title="Copy Link"
                                >
                                  <LinkIcon className="size-3" />
                                </button>
                                <a
                                  href={post.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex h-6 items-center gap-1 rounded bg-slate-50 px-2 text-xs font-semibold text-violet-600 transition-colors hover:bg-violet-50 hover:text-violet-700"
                                >
                                  Open <ExternalLink className="size-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── Daily.dev Cards ───────────────────────────────── */}
            {source === "dailydev" && !isLoading && !error && dailyVisible.length > 0 && (
              <motion.div layout className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {dailyVisible.map((post, i) => {
                    const saved = savedDailyIds.includes(post.id);
                    const pinned = pinnedIds.includes(post.id);
                    const key = (
                      DAILY_TOPICS.includes(post.topic as DailyTopicKey) ? post.topic : "All"
                    ) as DailyTopicKey;
                    const badge = DAILY_TOPIC_BADGE[key] ?? "bg-slate-50 text-slate-500 border-slate-200";
                    const timeAgo = formatDistanceToNow(post.publishedAt * 1000, { addSuffix: true });
                    return (
                      <motion.article
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        key={post.id}
                        className={`group flex gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-slate-200/80 ${
                          pinned ? "border-amber-300 bg-amber-50/10" : "border-slate-200 hover:border-slate-900/30"
                        }`}
                      >
                        <div
                          className="flex size-18 shrink-0 flex-col items-center justify-center gap-1 rounded-xl"
                          style={{ background: post.coverColor }}
                        >
                          <span className="text-[13px] font-black tracking-tight text-white/90">
                            {post.sourceIcon}
                          </span>
                          <span className="text-[8px] font-bold tracking-wide text-white/50">
                            {post.source.length > 7 ? post.source.slice(0, 7) : post.source}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h2 className="line-clamp-2 text-[15px] leading-snug font-bold text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
                              {pinned && <Pin className="mr-1.5 mb-0.5 inline size-3.5 text-amber-500" />}
                              {post.title}
                            </h2>
                            {/* Card Actions (Share, Bookmark, Pin) */}
                            <div className="flex shrink-0 items-center gap-1">
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => handlePin(post.id, post.title)}
                                    className={`grid size-7 place-items-center rounded-lg transition-all ${
                                      pinned ? "bg-amber-100 text-amber-600" : "text-slate-400 hover:bg-slate-100 hover:text-amber-500"
                                    }`}
                                  >
                                    {pinned ? <PinOff className="size-3.5" /> : <Pin className="size-3.5" />}
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg" sideOffset={5}>
                                    {pinned ? "Unpin post" : "Pin for team"}
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>

                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => handleShare(post)}
                                    className="grid size-7 place-items-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-blue-500"
                                  >
                                    <Share2 className="size-3.5" />
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg" sideOffset={5}>
                                    Share with team
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>

                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={() => handleDailyBookmark(post)}
                                    className={`grid size-7 place-items-center rounded-lg transition-all ${
                                      saved ? "bg-slate-900 text-white" : "text-slate-300 hover:bg-slate-100 hover:text-slate-700"
                                    }`}
                                  >
                                    {saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="animate-in fade-in zoom-in-95 rounded bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg" sideOffset={5}>
                                    {saved ? "Remove bookmark" : "Save article"}
                                    <Tooltip.Arrow className="fill-slate-900" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </div>
                          </div>

                          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500">
                            {post.summary}
                          </p>

                          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                            <span className="inline-flex items-center gap-1.5 text-xs">
                              <Users className="size-3 text-slate-400" />
                              <span className="font-semibold text-slate-600">{post.author}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-slate-400" title={new Date(post.publishedAt * 1000).toLocaleString()}>
                              <Clock className="size-3" />
                              {timeAgo}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                              <BookOpen className="size-3" />
                              {post.readTime}m read
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
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleCopyLink(post.url)}
                                  className="grid size-6 place-items-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                  title="Copy Link"
                                >
                                  <LinkIcon className="size-3" />
                                </button>
                                <a
                                  href={post.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex h-6 items-center gap-1 rounded bg-slate-50 px-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                >
                                  Open <ExternalLink className="size-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                          {/* Tags */}
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {renderPagination(pageCount)}
          </div>

          {/* ── RIGHT: Sidebar ────────────────────────────────── */}
          <aside className="space-y-4">
            
            {/* Trending Now Widget */}
            {!isLoading && trendingNow.length > 0 && (
              <div className="rounded-2xl border border-orange-200 bg-linear-to-b from-orange-50 to-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-lg bg-orange-100 text-orange-600">
                    <Flame className="size-4" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">Trending Now</h2>
                </div>
                <div className="space-y-3">
                  {trendingNow.map((post, i) => (
                    <a
                      key={`trending-${post.id}`}
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block"
                    >
                      <div className="flex gap-3">
                        <span className="mt-0.5 text-xs font-bold text-orange-300">
                          #{i + 1}
                        </span>
                        <div>
                          <p className="line-clamp-2 text-xs font-semibold text-slate-700 group-hover:text-orange-600 group-hover:underline">
                            {post.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {post.upvotes} upvotes
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Top Topics Chart */}
            {!isLoading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-lg bg-sky-100 text-sky-600">
                    <BarChart3 className="size-4" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">Top Topics</h2>
                </div>
                <div className="space-y-3">
                  {Object.entries(source === "reddit" ? redditTopicCounts : dailyTopicCounts)
                    .filter(([topic]) => topic !== "All")
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([topic, count]) => {
                      const maxCount = Math.max(
                        ...Object.entries(source === "reddit" ? redditTopicCounts : dailyTopicCounts)
                          .filter(([t]) => t !== "All")
                          .map(([, c]) => c)
                      );
                      const width = Math.max(5, (count / maxCount) * 100);
                      return (
                        <div key={`chart-${topic}`} className="text-xs">
                          <div className="mb-1 flex justify-between text-slate-600">
                            <span>{topic}</span>
                            <span className="font-semibold">{count}</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${width}%` }}
                              transition={{ duration: 1, type: "spring" }}
                              className={`h-full rounded-full ${
                                source === "reddit" ? "bg-violet-400" : "bg-slate-800"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Saved posts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div
                  className={`grid size-9 place-items-center rounded-xl shadow-md ${
                    source === "reddit" ? "bg-violet-600 shadow-violet-200" : "bg-slate-900 shadow-slate-200"
                  }`}
                >
                  <BookmarkCheck className="size-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    {source === "reddit" ? "Saved Threads" : "Saved Articles"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {source === "reddit"
                      ? `${savedRedditPosts.length} post${savedRedditPosts.length !== 1 ? "s" : ""} bookmarked`
                      : `${savedDailyPosts.length} article${savedDailyPosts.length !== 1 ? "s" : ""} bookmarked`}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {source === "reddit" ? (
                  <motion.div key="reddit-saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {savedRedditPosts.length > 0 ? (
                      <div className="space-y-2">
                        <AnimatePresence>
                          {savedRedditPosts.map((post) => {
                            const key = (
                              REDDIT_TOPICS.includes(post.topic as RedditTopicKey) ? post.topic : "All"
                            ) as RedditTopicKey;
                            const { bg, accent } = REDDIT_TOPIC_THUMB[key];
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
                                className="group flex items-start gap-2.5 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-violet-200 hover:bg-violet-50"
                              >
                                <div className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ background: bg }}>
                                  <SiReddit className="size-4" style={{ color: accent }} />
                                </div>
                                <div className="min-w-0">
                                  <p className="line-clamp-2 text-xs leading-4 font-semibold text-slate-800 group-hover:text-violet-700">
                                    {post.title}
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-slate-400">{post.subreddit}</p>
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
                        <p className="text-xs leading-relaxed text-slate-400">Bookmark threads to save them here.</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="daily-saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {savedDailyPosts.length > 0 ? (
                      <div className="space-y-2">
                        <AnimatePresence>
                          {savedDailyPosts.map((post) => (
                            <motion.a
                              layout
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              key={post.id}
                              href={post.url}
                              target="_blank"
                              rel="noreferrer"
                              className="group flex items-start gap-2.5 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-slate-300 hover:bg-slate-100"
                            >
                              <div
                                className="grid size-8 shrink-0 place-items-center rounded-lg text-[10px] font-black text-white"
                                style={{ background: post.coverColor }}
                              >
                                {post.sourceIcon}
                              </div>
                              <div className="min-w-0">
                                <p className="line-clamp-2 text-xs leading-4 font-semibold text-slate-800 group-hover:text-slate-900">
                                  {post.title}
                                </p>
                                <p className="mt-0.5 text-[11px] text-slate-400">{post.source}</p>
                              </div>
                            </motion.a>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2.5 rounded-xl border border-dashed border-slate-200 py-8 text-center">
                        <div className="grid size-10 place-items-center rounded-xl bg-slate-100">
                          <Bookmark className="size-5 text-slate-300" />
                        </div>
                        <p className="text-xs leading-relaxed text-slate-400">Bookmark articles to save them here.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </aside>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
