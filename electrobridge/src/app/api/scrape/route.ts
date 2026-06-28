import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { fetchAllNews } from "@/lib/scrapers/rss-parser";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const articles = await fetchAllNews();

    let inserted = 0;
    let skipped = 0;

    for (const article of articles) {
      const { data: existing } = await supabaseAdmin
        .from("news_articles")
        .select("id")
        .eq("source_url", article.source_url)
        .maybeSingle();

      if (existing) {
        skipped++;
        continue;
      }

      const { error } = await supabaseAdmin
        .from("news_articles")
        .insert([article]);

      if (!error) inserted++;
    }

    return NextResponse.json({
      message: "Scrape complete",
      total_fetched: articles.length,
      inserted,
      skipped,
    });
  } catch (error) {
    console.error("Error scraping news:", error);
    return NextResponse.json(
      { error: "Failed to scrape news" },
      { status: 500 }
    );
  }
}
