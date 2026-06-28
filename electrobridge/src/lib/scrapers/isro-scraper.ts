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

export async function scrapeISRO(): Promise<ScrapedOpportunity[]> {
  try {
    const response = await fetch(
      "https://www.ursc.gov.in/careers.jsp",
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
        if (!cells || cells.length < 2) continue;

        const linkMatch = row.match(
          /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/i
        );
        const title = linkMatch?.[2]
          ?.replace(/<[^>]*>/g, "")
          .trim();
        const link = linkMatch?.[1]?.trim();

        if (!title) continue;

        opportunities.push({
          title,
          organization: "ISRO URSC",
          category: "JRF",
          location: "Bangalore",
          stipend: null,
          deadline: null,
          eligibility: null,
          description: null,
          apply_link: link
            ? link.startsWith("http")
              ? link
              : `https://www.ursc.gov.in/${link}`
            : "https://www.ursc.gov.in",
          tags: ["ISRO", "space"],
        });
      }
    }

    return opportunities;
  } catch (error) {
    console.error("Error scraping ISRO:", error);
    return [];
  }
}
