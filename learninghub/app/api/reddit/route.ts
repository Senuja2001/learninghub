import { NextRequest, NextResponse } from "next/server";

/* ─── Subreddits to pull from ─────────────────────────────────────── */
const SUBREDDITS = [
  "programming",
  "webdev",
  "learnprogramming",
  "MachineLearning",
  "devops",
  "cscareerquestions",
  "reactjs",
  "nextjs",
  "artificial",
  "technology",
  "GamesOnReddit",
  "gamedev",
].join("+");

/* ─── Subreddit → topic map ─────────────────────────────────────────── */
const SUB_TO_TOPIC: Record<string, string> = {
  programming:        "Programming",
  webdev:             "Web Dev",
  learnprogramming:   "Learning",
  machinelearning:    "AI",
  artificial:         "AI",
  technology:         "Programming",
  devops:             "Programming",
  kubernetes:         "Programming",
  cscareerquestions:  "Career",
  reactjs:            "Web Dev",
  nextjs:             "Web Dev",
  gamesonreddit:      "Games",
  gamedev:            "Games",
};

/* ─── Helpers ─────────────────────────────────────────────────────── */
function formatTime(utc: number): string {
  const diff = Date.now() / 1000 - utc;
  if (diff < 60)    return "Just now";
  if (diff < 3600)  return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/* ─── Route handler ──────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode  = searchParams.get("mode") ?? "hot";
  const q     = (searchParams.get("q") ?? "").trim();
  const fresh = searchParams.get("fresh") === "1"; // cache-buster flag

  /* Build Reddit URL */
  let redditUrl: string;
  if (mode === "search" && q) {
    // Search across all of Reddit with tech bias
    redditUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(q)}&sort=relevance&limit=50&type=link&restrict_sr=false`;
  } else {
    // Hot posts from our curated multi-subreddit
    redditUrl = `https://www.reddit.com/r/${SUBREDDITS}/hot.json?limit=50`;
  }

  try {
    const res = await fetch(redditUrl, {
      headers: {
        "User-Agent": "LearningHub/1.0 (educational dashboard)",
        Accept:       "application/json",
      },
      // Fresh fetches bypass Next.js data cache; otherwise cache 5 min
      ...(fresh
        ? { cache: "no-store" }
        : { next: { revalidate: 300 } }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Reddit returned ${res.status}` },
        { status: 502 },
      );
    }

    const json = await res.json();
    const children: any[] = json?.data?.children ?? [];

    const posts = children
      .filter((c) => {
        const d = c?.data;
        return (
          d &&
          typeof d.title === "string" &&
          d.title.trim() !== "" &&
          !d.stickied &&
          !d.over_18 // exclude NSFW
        );
      })
      .map((c) => {
        const d = c.data;
        const subLower = (d.subreddit as string).toLowerCase();
        const topic    = SUB_TO_TOPIC[subLower] ?? "Programming";

        /* Build a readable summary */
        let summary = "";
        const text = (d.selftext ?? "").replace(/\n+/g, " ").trim();
        if (text.length > 20) {
          summary = text.slice(0, 220) + (text.length > 220 ? "…" : "");
        } else {
          summary = "Click to read the full discussion on Reddit.";
        }

        return {
          id:        d.id as string,
          title:     d.title as string,
          summary,
          subreddit: `r/${d.subreddit as string}`,
          time:      formatTime(d.created_utc as number),
          upvotes:   formatNum(Math.max(0, d.score as number)),
          comments:  formatNum(d.num_comments as number),
          topic,
          url:       `https://www.reddit.com${d.permalink as string}`,
        };
      });

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("[reddit route]", err);
    return NextResponse.json(
      { error: "Could not reach Reddit. Please try again." },
      { status: 502 },
    );
  }
}
