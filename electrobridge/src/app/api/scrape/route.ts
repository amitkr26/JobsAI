import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isConfigured } from "@/lib/supabase";
import { fetchAllNews, fetchOpportunitiesFromRSS } from "@/lib/scrapers/rss-parser";
import { scrapeAllOpportunities } from "@/lib/scrapers/opportunity-scraper";

export async function GET(request: NextRequest) {
  if (!isConfigured) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Admin access not configured." }, { status: 503 });
    }

    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mode = request.nextUrl.searchParams.get("mode") || "all";

    const result: Record<string, any> = {};

    if (mode === "news" || mode === "all") {
      const articles = await fetchAllNews();
      let newsInserted = 0;
      let newsSkipped = 0;

      for (const article of articles) {
        const { data: existing } = await supabaseAdmin
          .from("news_articles")
          .select("id")
          .eq("source_url", article.source_url)
          .maybeSingle();

        if (existing) {
          newsSkipped++;
          continue;
        }

        const { error } = await supabaseAdmin
          .from("news_articles")
          .insert([article]);

        if (!error) newsInserted++;
      }

      result.news = {
        total_fetched: articles.length,
        inserted: newsInserted,
        skipped: newsSkipped,
      };
    }

    if (mode === "opportunities" || mode === "all") {
      const { opportunities: scrapedOpps, results: scrapeResults, total } = await scrapeAllOpportunities();
      const rssOpps = await fetchOpportunitiesFromRSS();
      const allOpportunities = [...scrapedOpps, ...rssOpps];
      let oppInserted = 0;
      let oppSkipped = 0;

      for (const opp of allOpportunities) {
        const { data: existing } = await supabaseAdmin
          .from("opportunities")
          .select("id")
          .eq("source_url", opp.source_url)
          .maybeSingle();

        if (existing) {
          oppSkipped++;
          continue;
        }

        const { error } = await supabaseAdmin
          .from("opportunities")
          .insert([
            {
              title: opp.title,
              organization: opp.organization,
              category: opp.category,
              location: opp.location,
              stipend: opp.stipend,
              deadline: opp.deadline,
              eligibility: opp.eligibility,
              description: opp.description,
              apply_link: opp.apply_link,
              source_url: opp.source_url,
              tags: opp.tags,
              is_active: true,
            },
          ]);

        if (!error) oppInserted++;
      }

      result.opportunities = {
        sources: scrapeResults,
        total_fetched: allOpportunities.length,
        inserted: oppInserted,
        skipped: oppSkipped,
        rss_sources: rssOpps.length,
      };
    }

    return NextResponse.json({
      message: `Scrape complete (${mode})`,
      ...result,
    });
  } catch (error) {
    console.error("Error in scrape endpoint:", error);
    return NextResponse.json(
      { error: "Failed to scrape" },
      { status: 500 }
    );
  }
}
