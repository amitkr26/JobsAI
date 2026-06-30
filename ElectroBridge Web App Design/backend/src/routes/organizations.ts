import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireDatabase } from '../middleware/auth.js';

export const organizationsRouter = Router();

organizationsRouter.get('/', requireDatabase, async (_req, res) => {
  try {
    const { data, error } = await supabase!
      .from('opportunities')
      .select('organization, org_slug')
      .eq('is_active', true)
      .not('org_slug', 'is', null);

    if (error) throw error;

    const orgCounts = data.reduce<Record<string, { name: string; slug: string; count: number }>>((acc, item) => {
      const key = item.org_slug || item.organization;
      if (!acc[key]) {
        acc[key] = { name: item.organization, slug: item.org_slug || '', count: 0 };
      }
      acc[key].count++;
      return acc;
    }, {});

    const organizations = Object.values(orgCounts).sort((a, b) => b.count - a.count);
    res.json({ data: organizations });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

organizationsRouter.get('/:slug', requireDatabase, async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabase!
      .from('opportunities')
      .select('*')
      .eq('org_slug', slug)
      .eq('is_active', true);

    if (error) throw error;
    res.json({ data, total: data?.length || 0 });
  } catch (error) {
    console.error('Error fetching organization:', error);
    res.status(500).json({ error: 'Failed to fetch organization' });
  }
});
