import { NextRequest, NextResponse } from "next/server";

function generatePosts(q: string) {
  const isSearch = Boolean(q);
  // If searching, generate 15 specific results, otherwise 50 hot posts
  const count = isSearch ? 15 : 50;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const searchKeyword = isSearch ? capitalize(q) : "Tech";

  const TOPIC_DATA = [
    {
      topic: "Programming",
      subreddits: ["programming", "learnprogramming"],
      hotTitles: [
        "Why is everyone moving back to monoliths?",
        "Deep dive into Kubernetes cost optimization",
        "I built my own programming language in Rust",
        "Best resources for learning System Design?",
      ],
    },
    {
      topic: "Web Dev",
      subreddits: ["webdev", "reactjs", "nextjs"],
      hotTitles: [
        "How to implement auth in Next.js 16?",
        "Tailwind vs CSS Modules in 2026",
        "A guide to Server Actions in modern frameworks",
        "What are the best UI component libraries today?",
      ],
    },
    {
      topic: "AI",
      subreddits: ["MachineLearning", "LocalLLaMA", "artificial"],
      hotTitles: [
        "My thoughts on the latest AI models",
        "Running a 70B model on consumer hardware",
        "Will AI eventually replace junior developers?",
        "New paper on improving transformer context windows",
      ],
    },
    {
      topic: "Learning",
      subreddits: ["learnprogramming", "cs50"],
      hotTitles: [
        "What is the best way to avoid tutorial hell?",
        "My 6-month journey to learning Full Stack",
        "How do you stay motivated when projects get hard?",
        "Is it too late to learn programming at 35?",
      ],
    },
    {
      topic: "Career",
      subreddits: ["cscareerquestions", "ExperiencedDevs"],
      hotTitles: [
        "Best portfolio projects for junior devs in 2026?",
        "How to negotiate salary effectively as a mid-level dev",
        "Are tech interviews broken?",
        "Leaving a FAANG job for an early-stage startup",
      ],
    },
    {
      topic: "Games",
      subreddits: ["GamesOnReddit", "gamedev"],
      hotTitles: [
        "The state of indie game development in 2026",
        "Just launched my new indie game built with React",
        "What engine are you using for your 2D projects?",
        "Post-mortem: Why my first Steam game failed",
      ],
    },
  ];

  return Array.from({ length: count }).map((_, i) => {
    // Pick a topic at random
    const topicObj = TOPIC_DATA[Math.floor(Math.random() * TOPIC_DATA.length)];
    const topic = topicObj.topic;
    const subreddit = `r/${topicObj.subreddits[Math.floor(Math.random() * topicObj.subreddits.length)]}`;

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
      title = `${topicObj.hotTitles[i % topicObj.hotTitles.length]} (Thread ${i + 1})`;
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
