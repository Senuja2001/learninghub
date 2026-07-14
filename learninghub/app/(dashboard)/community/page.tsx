import {
  Calendar,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  MoreVertical,
  PenLine,
  Plus,
  Search,
  Send,
  Users,
} from "lucide-react";

const categories = ["All", "Discussions", "Questions", "Study Groups", "Events", "Announcements"];

const filters = ["Trending", "Latest", "Unanswered", "Most Liked"];

const posts = [
  {
    author: "Sarah Lee",
    role: "Frontend Developer",
    time: "2h ago",
    type: "Discussion",
    tone: "bg-violet-100 text-violet-700",
    title: "How should I learn Next.js in 2026?",
    body: "I'm planning to level up my Next.js skills. What roadmap or resources would you recommend for the latest version?",
    stats: { likes: 18, comments: 24, views: 356 },
    avatar: "SL",
  },
  {
    author: "Michael Chen",
    role: "Backend Engineer",
    time: "5h ago",
    type: "Question",
    tone: "bg-emerald-100 text-emerald-700",
    title: "Best practices for API authentication in Node.js?",
    body: "What are the industry best practices for secure API authentication in Node.js applications?",
    stats: { likes: 12, comments: 15, views: 289 },
    avatar: "MC",
  },
  {
    author: "Priya Sharma",
    role: "QA Engineer",
    time: "1d ago",
    type: "Study Group",
    tone: "bg-purple-100 text-purple-700",
    title: "QA Automation Study Group - Weekend Sessions",
    body: "We're a group of QA engineers learning Playwright together. Weekend sessions plus practice challenges. Join us!",
    stats: { likes: 22, comments: 8, views: 142 },
    avatar: "PS",
  },
  {
    author: "David Kim",
    role: "Cloud Architect",
    time: "2d ago",
    type: "Announcement",
    tone: "bg-amber-100 text-amber-700",
    title: "New cloud certification prep circle is open",
    body: "We are starting a weekly prep circle for cloud fundamentals and solution architecture discussions.",
    stats: { likes: 31, comments: 19, views: 411 },
    avatar: "DK",
  },
];

const groups = [
  { name: "React Builders", members: "2.4k", topic: "Frontend" },
  { name: "Cloud Labs", members: "1.8k", topic: "AWS" },
  { name: "QA Automation", members: "940", topic: "Testing" },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-normal text-slate-950">Community</h1>
          <p className="mt-2 text-sm text-slate-600">
            Connect, ask questions, share resources, and learn with other developers.
          </p>
        </div>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700">
          <Plus className="size-4" />
          Create Post
        </button>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`h-8 rounded-full px-4 text-sm font-bold transition ${
                      category === "All"
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-100"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-200 to-sky-200 text-sm font-black text-slate-700">
                  JD
                </div>
                <div className="min-w-0 flex-1">
                  <textarea
                    className="h-16 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm transition outline-none placeholder:text-slate-500 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    placeholder="Share something with the community..."
                  />
                  <div className="mt-3 flex flex-col gap-3 rounded-lg border border-slate-200 p-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid grid-cols-2 gap-1 sm:flex">
                      {[
                        ["Discussion", MessageCircle],
                        ["Question", Search],
                        ["Poll", Filter],
                        ["Event", Calendar],
                      ].map(([label, Icon]) => {
                        const TypedIcon = Icon as typeof MessageCircle;
                        return (
                          <button
                            key={label as string}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                          >
                            <TypedIcon className="size-4" />
                            {label as string}
                          </button>
                        );
                      })}
                    </div>
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700">
                      <Send className="size-4" />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`h-8 rounded-full px-4 text-sm font-semibold ${
                      filter === "Trending"
                        ? "border border-violet-200 bg-white text-violet-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                <Filter className="size-4" />
                Filter
              </button>
            </div>

            <div>
              {posts.map((post) => (
                <article key={post.title} className="border-b border-slate-100 p-5 last:border-b-0">
                  <div className="flex gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full bg-slate-900 text-sm font-black text-white">
                      {post.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="font-bold text-slate-950">{post.author}</span>
                        <span>{post.role}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                      <div className="mt-2 flex gap-3">
                        <h2 className="min-w-0 flex-1 text-base leading-6 font-black text-slate-950">
                          {post.title}
                        </h2>
                        <span
                          className={`h-6 shrink-0 rounded-full px-3 py-1 text-xs font-bold ${post.tone}`}
                        >
                          {post.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{post.body}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <Heart className="size-4" />
                          {post.stats.likes}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MessageCircle className="size-4" />
                          {post.stats.comments}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Eye className="size-4" />
                          {post.stats.views}
                        </span>
                      </div>
                    </div>
                    <button
                      aria-label="More options"
                      className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">Study Groups</h2>
              <button className="text-sm font-bold text-violet-700">View all</button>
            </div>
            <div className="mt-4 space-y-3">
              {groups.map((group) => (
                <div key={group.name} className="rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-lg bg-violet-100 text-violet-700">
                      <Users className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black">{group.name}</p>
                      <p className="text-xs text-slate-500">
                        {group.members} members • {group.topic}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white shadow-lg shadow-violet-100">
            <PenLine className="size-8" />
            <h2 className="mt-4 text-xl font-black">Share your knowledge</h2>
            <p className="mt-2 text-sm leading-6 text-violet-100">
              Start a discussion, ask for help, or invite learners to a study session.
            </p>
            <button className="mt-5 h-10 rounded-lg bg-white px-4 text-sm font-black text-violet-700">
              New Discussion
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
