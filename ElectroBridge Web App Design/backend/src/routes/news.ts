import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireDatabase } from '../middleware/auth.js';

export const newsRouter = Router();

newsRouter.get('/', requireDatabase, async (req, res) => {
  try {
    const { search, tags, category, source, page = '1', limit = '20' } = req.query;

    let query = supabase!
      .from('news_articles')
      .select('*', { count: 'exact' })
      .order('published_at', { ascending: false });

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,summary.ilike.%${search}%`
      );
    }
    if (category) {
      query = query.eq('category', category as string);
    }
    if (source) {
      query = query.eq('source', source as string);
    }
    if (tags) {
      const tagList = (tags as string).split(',');
      query = query.contains('tags', tagList);
    }

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const offset = (pageNum - 1) * limitNum;
    query = query.range(offset, offset + limitNum - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ data, total: count || 0, page: pageNum, limit: limitNum });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

newsRouter.get('/:slug', requireDatabase, async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabase!
      .from('news_articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'News article not found' });
      }
      throw error;
    }
    res.json({ data });
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).json({ error: 'Failed to fetch news article' });
  }
});
