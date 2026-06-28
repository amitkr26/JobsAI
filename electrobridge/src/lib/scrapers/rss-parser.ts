import Parser from "rss-parser";

export const NEWS_SOURCES = [
  {
    name: "IEEE Spectrum",
    url: "https://spectrum.ieee.org/feeds/feed.rss",
    tags: ["IEEE", "electronics"],
  },
  {
    name: "EE Times",
    url: "https://www.eetimes.com/feed/",
    tags: ["semiconductor", "industry"],
  },
  {
    name: "Semiconductor Engineering",
    url: "https://semiengineering.com/feed/",
    tags: ["semiconductor", "design"],
  },
  {
    name: "Electronics Weekly",
    url: "https://www.electronicsweekly.com/feed/",
    tags: ["electronics", "news"],
  },
  {
    name: "The Hindu Science",
    url: "https://www.thehindu.com/sci-tech/science/feeder/default.rss",
    tags: ["India", "science"],
  },
  {
    name: "Physics World",
    url: "https://physicsworld.com/feed/",
    tags: ["physics", "research", "science"],
  },
  {
    name: "Nature Electronics",
    url: "https://www.nature.com/natelectron.rss",
    tags: ["electronics", "research", "nature"],
  },
];

export interface ParsedArticle {
  title: string;
  summary: string | null;
  source: string;
  source_url: string | null;
  published_at: string | null;
  image_url: string | null;
  tags: string[];
}

async function fetchRSSFeed(
  source: string,
  feedUrl: string,
  defaultTags: string[]
): Promise<ParsedArticle[]> {
  try {
    const parser = new Parser({
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ElectroBridge/1.0)",
      },
    });
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map((item) => ({
      title: item.title || "Untitled",
      summary: item.contentSnippet?.substring(0, 300) || null,
      source,
      source_url: item.link || null,
      published_at: item.pubDate || item.isoDate || null,
      image_url:
        item.enclosure?.url ||
        (item["media:content"] as any)?.$.url ||
        null,
      tags: defaultTags,
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedUrl}:`, error);
    return [];
  }
}

export async function fetchAllNews(): Promise<ParsedArticle[]> {
  const results: ParsedArticle[] = [];
  for (const source of NEWS_SOURCES) {
    try {
      const articles = await fetchRSSFeed(source.name, source.url, source.tags);
      results.push(...articles);
    } catch {
      // per-feed error already logged
    }
  }
  return results;
}
