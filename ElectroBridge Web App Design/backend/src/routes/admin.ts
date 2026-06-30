import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireAdmin, requireDatabase } from '../middleware/auth.js';

export const adminRouter = Router();

adminRouter.use(requireAdmin);

adminRouter.get('/stats', requireDatabase, async (_req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [opportunitiesRes, newsRes, subscribersRes, aiUsageRes] = await Promise.all([
      supabase!.from('opportunities').select('*', { count: 'exact', head: true }),
      supabase!.from('news_articles').select('*', { count: 'exact', head: true }),
      supabase!.from('subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase!.from('ai_usage_log').select('*', { count: 'exact', head: true }).gte('created_at', today),
    ]);

    res.json({
      data: {
        totalOpportunities: opportunitiesRes.count || 0,
        totalNews: newsRes.count || 0,
        totalSubscribers: subscribersRes.count || 0,
        aiRequestsToday: aiUsageRes.count || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

adminRouter.post('/add-opportunity', requireDatabase, async (req, res) => {
  try {
    const body = req.body;
    const { data, error } = await supabase!
      .from('opportunities')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    console.error('Error adding opportunity:', error);
    res.status(500).json({ error: 'Failed to add opportunity' });
  }
});

adminRouter.post('/add-news', requireDatabase, async (req, res) => {
  try {
    const body = req.body;
    const { data, error } = await supabase!
      .from('news_articles')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ error: 'Failed to add news' });
  }
});

adminRouter.post('/recheck-link', requireDatabase, async (req, res) => {
  try {
    const { opportunityId } = req.body;
    if (!opportunityId) {
      return res.status(400).json({ error: 'opportunityId is required' });
    }

    const { data: opp, error: fetchError } = await supabase!
      .from('opportunities')
      .select('apply_link, source_url')
      .eq('id', opportunityId)
      .single();

    if (fetchError) throw fetchError;

    const urls = [opp.apply_link, opp.source_url].filter(Boolean);
    const results = [];

    for (const url of urls) {
      try {
        const response = await fetch(url!, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
        const status = response.ok ? 'valid' : response.status >= 400 ? 'broken' : 'redirect';
        results.push({ url, status, statusCode: response.status });

        await supabase!.from('link_check_logs').insert([{
          opportunity_id: opportunityId,
          url,
          status,
          status_code: response.status,
          checked_at: new Date().toISOString(),
        }]);
      } catch {
        results.push({ url, status: 'error', statusCode: 0 });
      }
    }

    const allBroken = results.every(r => r.status === 'broken' || r.status === 'error');
    await supabase!
      .from('opportunities')
      .update({
        link_check_status: allBroken ? 'broken' : 'valid',
        last_link_checked: new Date().toISOString(),
      })
      .eq('id', opportunityId);

    res.json({ data: { results, status: allBroken ? 'broken' : 'valid' } });
  } catch (error) {
    console.error('Error rechecking link:', error);
    res.status(500).json({ error: 'Failed to recheck link' });
  }
});
