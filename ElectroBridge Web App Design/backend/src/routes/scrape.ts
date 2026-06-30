import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireCronSecret, requireDatabase } from '../middleware/auth.js';

export const scrapeRouter = Router();

scrapeRouter.use(requireCronSecret);

scrapeRouter.get('/', requireDatabase, async (_req, res) => {
  try {
    res.json({ data: { scraped: 0, updated: 0, errors: [], message: 'Scraper endpoints ready. Individual scrapers will be ported from legacy.' } });
  } catch (error) {
    console.error('Scrape error:', error);
    res.status(500).json({ error: 'Scrape failed' });
  }
});

scrapeRouter.get('/opportunities', requireDatabase, async (_req, res) => {
  try {
    res.json({ data: { scraped: 0, errors: [], message: 'Scraper logic to be ported from legacy codebase.' } });
  } catch (error) {
    console.error('Scrape opportunities error:', error);
    res.status(500).json({ error: 'Scrape failed' });
  }
});

scrapeRouter.get('/check-links', requireDatabase, async (_req, res) => {
  try {
    const { data: opportunities, error } = await supabase!
      .from('opportunities')
      .select('id, apply_link, source_url')
      .eq('is_active', true)
      .limit(50);

    if (error) throw error;

    let broken = 0;
    for (const opp of opportunities || []) {
      const urls = [opp.apply_link, opp.source_url].filter(Boolean);
      for (const url of urls) {
        try {
          const response = await fetch(url!, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
          const status = response.ok ? 'valid' : 'broken';
          if (!response.ok) broken++;

          await supabase!.from('link_check_logs').insert([{
            opportunity_id: opp.id,
            url,
            status,
            status_code: response.status,
            checked_at: new Date().toISOString(),
          }]);
        } catch {
          broken++;
        }
      }
    }

    res.json({ data: { checked: opportunities?.length || 0, broken } });
  } catch (error) {
    console.error('Check links error:', error);
    res.status(500).json({ error: 'Link check failed' });
  }
});

scrapeRouter.get('/cleanup-news', requireDatabase, async (_req, res) => {
  try {
    const { data, error } = await supabase!
      .from('news_articles')
      .select('id, source_url');

    if (error) throw error;

    const seen = new Map<string, string[]>();
    const toRemove: string[] = [];

    for (const article of data || []) {
      if (!article.source_url) continue;
      const key = article.source_url.replace(/\/$/, '').trim().toLowerCase();
      if (seen.has(key)) {
        toRemove.push(article.id);
      } else {
        seen.set(key, [article.id]);
      }
    }

    if (toRemove.length > 0) {
      await supabase!.from('news_articles').delete().in('id', toRemove);
    }

    res.json({ data: { removed: toRemove.length } });
  } catch (error) {
    console.error('Cleanup news error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
});
