"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Eye,
  MessageCircle,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SiReddit } from "react-icons/si";

const STORAGE_KEY = "learninghub:saved-reddit-posts";
const POSTS_PER_PAGE = 4;

const topics = [
  "All",
  "Programming",
  "Web Dev",
  "AI",
  "Learning",
  "Career",
  "Games",
];

const topicColors: Record<string, string> = {
  All:         "from-violet-500 to-indigo-500",
  Programming: "from-blue-500 to-cyan-500",
  "Web Dev":   "from-emerald-500 to-teal-500",
  AI:          "from-fuchsia-500 to-purple-500",
  Learning:    "from-amber-500 to-orange-500",
  Career:      "from-rose-500 to-pink-500",
  Games:       "from-lime-500 to-green-500",
};

const topicBadge: Record<string, string> = {
  All:         "bg-violet-100 text-violet-700 border-violet-200",
  Programming: "bg-blue-100 text-blue-700 border-blue-200",
  "Web Dev":   "bg-emerald-100 text-emerald-700 border-emerald-200",
  AI:          "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  Learning:    "bg-amber-100 text-amber-700 border-amber-200",
  Career:      "bg-rose-100 text-rose-700 border-rose-200",
  Games:       "bg-lime-100 text-lime-700 border-lime-200",
};

const redditPosts = [
  {
    id: "reddit-games-devvit",
    title: "Launching a LearningHub app with Devvit",
    summary:
      "A developer thread about setting up a Reddit app, starting a playtest session, and building community features.",
    subreddit: "r/GamesOnReddit",
    time: "Now",
    upvotes: "1.8k",
    comments: "246",
    topic: "Games",
    url: "https://www.reddit.com/r/GamesOnReddit/",
  },
  {
    id: "reddit-programming-ai-assistant",
    title: "What's your go-to AI coding assistant?",
    summary:
      "Developers compare AI coding tools, IDE workflows, code review help, and productivity habits for 2026.",
    subreddit: "r/programming",
    time: "8h ago",
    upvotes: "4.2k",
    comments: "613",
    topic: "AI",
    url: "https://www.reddit.com/r/programming/",
  },
  {
    id: "reddit-webdev-nextjs-roadmap",
    title: "Best roadmap for learning modern Next.js?",
    summary:
      "Frontend developers share project ideas, docs, and practice paths for learning current Next.js patterns.",
    subreddit: "r/webdev",
    time: "12h ago",
    upvotes: "987",
    comments: "132",
    topic: "Web Dev",
    url: "https://www.reddit.com/r/webdev/",
  },
  {
    id: "reddit-learnprogramming-api-auth",
    title: "How do you practice API authentication safely?",
    summary:
      "Learners discuss JWTs, session auth, OAuth, refresh tokens, and small projects that make auth concepts stick.",
    subreddit: "r/learnprogramming",
    time: "14h ago",
    upvotes: "742",
    comments: "88",
    topic: "Learning",
    url: "https://www.reddit.com/r/learnprogramming/",
  },
  {
    id: "reddit-cscareerquestions-portfolio",
    title: "Portfolio projects that helped you get interviews",
    summary:
      "Engineers share practical portfolio ideas, how they wrote case studies, and what recruiters actually noticed.",
    subreddit: "r/cscareerquestions",
    time: "16h ago",
    upvotes: "2.1k",
    comments: "301",
    topic: "Career",
    url: "https://www.reddit.com/r/cscareerquestions/",
  },
  {
    id: "reddit-reactjs-state-management",
    title: "What are teams using for state management now?",
    summary:
      "React developers compare server state, local state, URL state, and when a dedicated store is still worth it.",
    subreddit: "r/reactjs",
    time: "18h ago",
    upvotes: "1.2k",
    comments: "175",
    topic: "Web Dev",
    url: "https://www.reddit.com/r/reactjs/",
  },
  {
    id: "reddit-nextjs-app-router",
    title: "Lessons learned after shipping with the App Router",
    summary:
      "A practical thread about route groups, server components, caching, data loading, and deployment surprises.",
    subreddit: "r/nextjs",
    time: "1d ago",
    upvotes: "856",
    comments: "119",
    topic: "Web Dev",
    url: "https://www.reddit.com/r/nextjs/",
  },
  {
    id: "reddit-machinelearning-agents",
    title: "What makes AI agents useful for real developer work?",
    summary:
      "Machine learning practitioners discuss evaluation, tool use, memory, reliability, and where agents still fail.",
    subreddit: "r/MachineLearning",
    time: "1d ago",
    upvotes: "3.6k",
    comments: "524",
    topic: "AI",
    url: "https://www.reddit.com/r/MachineLearning/",
  },
  {
    id: "reddit-devops-kubernetes",
    title: "Kubernetes mistakes you only learn in production",
    summary:
      "DevOps engineers share lessons about observability, resource limits, rollouts, secrets, and cluster cost control.",
    subreddit: "r/devops",
    time: "2d ago",
    upvotes: "1.5k",
    comments: "227",
    topic: "Programming",
    url: "https://www.reddit.com/r/devops/",
  },
  {
    id: "reddit-programming-side-projects",
    title: "Small side projects that made you a better programmer",
    summary:
      "A lively discussion about tiny apps, games, scripts, and tools that build confidence through repetition.",
    subreddit: "r/programming",
    time: "2d ago",
    upvotes: "5.8k",
    comments: "711",
    topic: "Programming",
    url: "https://www.reddit.com/r/programming/",
  },
  {
    id: "reddit-webdev-css-layouts",
    title: "CSS layouts that still trip people up",
    summary:
      "Web developers share debugging tips for grids, sticky sidebars, overflow, responsive cards, and mobile tables.",
    subreddit: "r/webdev",
    time: "3d ago",
    upvotes: "1.1k",
    comments: "204",
    topic: "Web Dev",
    url: "https://www.reddit.com/r/webdev/",
  },
  {
    id: "reddit-learnprogramming-study-plan",
    title: "How would you study programming for 90 days?",
    summary:
      "Mentors suggest study plans that balance fundamentals, projects, reading code, debugging, and consistent review.",
    subreddit: "r/learnprogramming",
    time: "3d ago",
    upvotes: "2.9k",
    comments: "386",
    topic: "Learning",
    url: "https://www.reddit.com/r/learnprogramming/",
  },
];

type RedditPost = (typeof redditPosts)[number];

function shufflePosts(posts: RedditPost[]) {
  return [...posts].sort(() => Math.random() - 0.5);
}

function loadSavedPosts() {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as string[]) : [];
  } catch {
    return [];
  }
}

export default function NewsPage() {
  const [activeTopic, setActiveTopic] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedIds, setSavedIds] = useState<string[]>(loadSavedPosts);
  const [suggestedPosts, setSuggestedPosts] = useState(() =>
    typeof window === "undefined" ? redditPosts : shufflePosts(redditPosts),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = activeTopic === "All"
      ? suggestedPosts
      : suggestedPosts.filter((p) => p.topic === activeTopic);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subreddit.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q),
      );
    }
    return posts;
  }, [activeTopic, suggestedPosts, searchQuery]);

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );
  const savedPosts = redditPosts.filter((post) => savedIds.includes(post.id));

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  function refreshSuggestions() {
    setSuggestedPosts(shufflePosts(redditPosts));
    setCurrentPage(1);
  }

  function changeTopic(topic: string) {
    setActiveTopic(topic);
    setCurrentPage(1);
  }

  return (
    <div className="space-y-8">

      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950 px-8 py-10 shadow-2xl shadow-violet-900/30">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-10 size-48 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300">
              <SiReddit className="size-3.5" />
              Live Reddit Feed
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Reddit Watch
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300">
              Discover handpicked Reddit discussions worth reading. Save threads,
              filter by topic, and browse fresh picks on every refresh.
            </p>
          </div>

          <button
            type="button"
            onClick={refreshSuggestions}
            className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/20 hover:bg-white/20 active:scale-95"
          >
            <RefreshCw className="size-4 transition group-hover:rotate-180 duration-500" />
            New Suggestions
          </button>
        </div>

        {/* stat chips */}
        <div className="relative mt-7 flex flex-wrap gap-3">
          {[
            { icon: TrendingUp, label: `${redditPosts.length} posts`, color: "text-violet-300" },
            { icon: Sparkles, label: `${topics.length - 1} topics`, color: "text-orange-300" },
            { icon: Bookmark, label: `${savedIds.length} saved`, color: "text-sky-300" },
          ].map(({ icon: Icon, label, color }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
            >
              <Icon className={`size-3.5 ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

        {/* ── Left: Feed ── */}
        <div className="space-y-4">

          {/* Filter + Search bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            {/* Topic pills */}
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => {
                const active = activeTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => changeTopic(topic)}
                    className={`h-8 rounded-full px-4 text-xs font-bold transition-all duration-200 ${
                      active
                        ? `bg-gradient-to-r ${topicColors[topic]} text-white shadow-md shadow-violet-200`
                        : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <label className="mt-4 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">
              <Search className="size-4 shrink-0 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Search subreddits, posts or topics…"
              />
            </label>

            {/* Results count */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">
                {filteredPosts.length} thread{filteredPosts.length !== 1 ? "s" : ""} found
              </span>
              <span className="font-semibold">
                Page {currentPage} / {pageCount}
              </span>
            </div>
          </div>

          {/* Post cards */}
          <div className="space-y-3">
            {visiblePosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
                <p className="text-sm font-semibold text-slate-400">No posts match your filters.</p>
              </div>
            ) : (
              visiblePosts.map((post) => {
                const saved = savedIds.includes(post.id);
                const badge = topicBadge[post.topic] ?? "bg-slate-100 text-slate-600 border-slate-200";

                return (
                  <article
                    key={post.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100"
                  >
                    {/* subtle left accent */}
                    <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-orange-400 to-rose-500 opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="flex gap-4">
                      {/* Reddit icon */}
                      <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 text-orange-500 shadow-inner">
                        <SiReddit className="size-7" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-bold text-orange-500">{post.subreddit}</span>
                          <span className="text-slate-300">•</span>
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <Clock className="size-3" />
                            {post.time}
                          </span>
                          <span className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-bold ${badge}`}>
                            {post.topic}
                          </span>
                        </div>

                        <h2 className="mt-2 text-[15px] font-black leading-snug text-slate-900 transition group-hover:text-violet-700">
                          {post.title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                          {post.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-5">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <TrendingUp className="size-3.5 text-orange-400" />
                            {post.upvotes} upvotes
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <MessageCircle className="size-3.5 text-violet-400" />
                            {post.comments} comments
                          </span>
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
                          >
                            View thread
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      </div>

                      {/* Bookmark */}
                      <button
                        type="button"
                        aria-pressed={saved}
                        aria-label={`${saved ? "Remove saved" : "Save"} ${post.title}`}
                        onClick={() => toggleSaved(post.id)}
                        className={`grid size-9 shrink-0 place-items-center rounded-xl transition-all duration-200 ${
                          saved
                            ? "bg-violet-100 text-violet-600 shadow-sm shadow-violet-200"
                            : "text-slate-400 hover:bg-slate-100 hover:text-violet-600"
                        }`}
                      >
                        <Bookmark
                          className="size-4"
                          fill={saved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-100">
            <p className="text-xs font-semibold text-slate-500">
              Showing <span className="text-slate-800">{visiblePosts.length}</span> of{" "}
              <span className="text-slate-800">{filteredPosts.length}</span> posts
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-testid="reddit-page-previous"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>

              {/* page dots */}
              <div className="flex items-center gap-1">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`size-2 rounded-full transition-all duration-200 ${
                      currentPage === i + 1
                        ? "w-5 bg-violet-600"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                data-testid="reddit-page-next"
                onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
                disabled={currentPage === pageCount}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3.5 text-xs font-bold text-white shadow-md shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <aside className="space-y-5">

          {/* Saved Posts */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 shadow-inner">
                <Bookmark className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Saved Threads</h2>
                <p className="text-xs text-slate-500">
                  {savedPosts.length} post{savedPosts.length !== 1 ? "s" : ""} bookmarked
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {savedPosts.length > 0 ? (
                savedPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-violet-200 hover:bg-violet-50"
                  >
                    <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-orange-100 text-orange-500">
                      <SiReddit className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-xs font-bold leading-5 text-slate-800 group-hover:text-violet-700">
                        {post.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{post.subreddit}</p>
                    </div>
                  </a>
                ))
              ) : (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 py-8 text-center">
                  <Bookmark className="size-7 text-slate-300" />
                  <p className="text-xs leading-5 text-slate-400">
                    Bookmark posts to save them here permanently.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Topics overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <h2 className="text-base font-black text-slate-900">Browse Topics</h2>
            <p className="mt-0.5 text-xs text-slate-400">Filter the feed by category</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {topics.filter((t) => t !== "All").map((topic) => {
                const count = redditPosts.filter((p) => p.topic === topic).length;
                const active = activeTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => changeTopic(topic)}
                    className={`flex flex-col items-start gap-0.5 rounded-xl border p-3 text-left transition-all duration-150 ${
                      active
                        ? "border-violet-200 bg-violet-50"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`text-xs font-black ${active ? "text-violet-700" : "text-slate-700"}`}>
                      {topic}
                    </span>
                    <span className="text-xs text-slate-400">{count} post{count !== 1 ? "s" : ""}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950 p-5 text-white shadow-xl shadow-violet-900/20">
            <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-violet-500/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-6 left-4 size-28 rounded-full bg-orange-500/15 blur-2xl" />

            <div className="relative">
              <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Zap className="size-6 text-orange-300" />
              </div>
              <h2 className="text-lg font-black">Shuffle the feed</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Each shuffle picks a fresh random order. Use{" "}
                <span className="font-bold text-white">Next</span> to browse the
                current batch, or reshuffle for a whole new set.
              </p>
              <button
                type="button"
                onClick={refreshSuggestions}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-rose-500 px-5 text-sm font-black text-white shadow-lg shadow-orange-900/30 transition hover:from-orange-500 hover:to-rose-600 active:scale-95"
              >
                <RefreshCw className="size-4" />
                Shuffle Posts
              </button>
            </div>
          </div>

          {/* Eye candy tip */}
          <div className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50 p-4">
            <Eye className="mt-0.5 size-5 shrink-0 text-sky-500" />
            <div>
              <p className="text-xs font-bold text-sky-800">Pro tip</p>
              <p className="mt-0.5 text-xs leading-relaxed text-sky-600">
                Bookmark posts with the{" "}
                <span className="font-bold">
                  <Bookmark className="inline size-3" />
                </span>{" "}
                icon — they&apos;ll persist across refreshes in your browser.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
