export interface ScrapedOpportunity {
  title: string;
  organization: string;
  category: string;
  location: string | null;
  stipend: string | null;
  deadline: string | null;
  eligibility: string | null;
  description: string | null;
  apply_link: string | null;
  tags: string[];
}

export async function scrapeCSIR(): Promise<ScrapedOpportunity[]> {
  try {
    const response = await fetch(
      "https://www.csir.res.in/funding-opportunities",
      { signal: AbortSignal.timeout(10000) }
    );
    const html = await response.text();
    const opportunities: ScrapedOpportunity[] = [];

    const rows = html.match(
      /<tr[^>]*>[\s\S]*?<\/tr>/gi
    );

    if (rows) {
      for (const row of rows.slice(0, 10)) {
        const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
        if (!cells || cells.length < 3) continue;

        const titleMatch = cells[0]?.match(
          /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/i
        );
        const title = titleMatch?.[2]
          ?.replace(/<[^>]*>/g, "")
          .trim();
        const link = titleMatch?.[1]?.trim();

        if (!title) continue;

        opportunities.push({
          title,
          organization: "CSIR",
          category: "JRF",
          location: "India",
          stipend: null,
          deadline: null,
          eligibility: null,
          description: null,
          apply_link: link || "https://www.csir.res.in",
          tags: ["CSIR", "funding"],
        });
      }
    }

    return opportunities;
  } catch (error) {
    console.error("Error scraping CSIR:", error);
    return [];
  }
}
