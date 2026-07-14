import { NextRequest, NextResponse } from "next/server";

/* ─── Realistic Reddit Mock Data Generator ─────────────────────────────────────── */
function generatePosts(q: string) {
  const isSearch = Boolean(q);
  // If searching, generate 15 specific results, otherwise 50 hot posts
  const count = isSearch ? 15 : 50;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const searchKeyword = isSearch ? capitalize(q) : "Tech";

  return Array.from({ length: count }).map((_, i) => {
    const topics = ["Programming", "Web Dev", "AI", "Learning", "Career", "Games"];
    const subreddits = [
      "programming",
      "webdev",
      "MachineLearning",
      "learnprogramming",
      "cscareerquestions",
      "GamesOnReddit",
    ];

    // Pick a topic at random
    const randIndex = Math.floor(Math.random() * topics.length);
    const topic = topics[randIndex];
    const subreddit = `r/${subreddits[randIndex]}`;

    // Generate a title that incorporates the search keyword if searching
    let title = "";
    if (isSearch) {
      const searchTitles = [
        `Has anyone used ${searchKeyword} recently?`,
        `The ultimate guide to mastering ${searchKeyword}`,
        `Why I stopped using ${searchKeyword}`,
        `Is ${searchKeyword} worth learning in 2026?`,
        `Showoff Saturday: I built this using ${searchKeyword}!`,
        `${searchKeyword} vs the alternatives — what are your thoughts?`,
      ];
      title = searchTitles[i % searchTitles.length];
    } else {
      const hotTitles = [
        `How to implement auth in Next.js 16?`,
        `My thoughts on the latest AI models`,
        `Just launched my new indie game built with React`,
        `Why is everyone moving back to monoliths?`,
        `Best portfolio projects for junior devs in 2026?`,
        `Deep dive into Kubernetes cost optimization`,
      ];
      title = `${hotTitles[i % hotTitles.length]} (Thread ${i + 1})`;
    }

    return {
      id: `mock-post-${isSearch ? "search" : "hot"}-${i}-${Date.now()}`,
      title,
      summary: `This is a realistic simulated discussion thread for ${topic}${isSearch ? ` revolving around ${searchKeyword}` : ""}. Users are discussing best practices, sharing code snippets, and debating the trade-offs of modern architectures...`,
      subreddit,
      createdAt: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400),
      upvotes: `${Math.floor(Math.random() * 50 + 1)}k`,
      comments: `${Math.floor(Math.random() * 500 + 10)}`,
      topic,
      url: `https://www.reddit.com/${subreddit}`,
    };
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const posts = generatePosts(q);

  // Shuffle the posts for a realistic feed
  posts.sort(() => Math.random() - 0.5);

  return NextResponse.json({ posts });
}
