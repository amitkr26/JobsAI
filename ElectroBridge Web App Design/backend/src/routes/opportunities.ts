import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireDatabase } from '../middleware/auth.js';

export const opportunitiesRouter = Router();

opportunitiesRouter.get('/', requireDatabase, async (req, res) => {
  try {
    const {
      category, type, location, search, tags,
      verified, sort, page = '1', limit = '12',
    } = req.query;

    const today = new Date().toISOString().split('T')[0];
    let query = supabase!
      .from('opportunities')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .or(`deadline.gte.${today},deadline.is.null`);

    if (verified !== 'all') {
      query = query.eq('verification_status', 'verified');
    }
    if (category && category !== 'All') {
      query = query.eq('category', category as string);
    }
    if (type) {
      query = query.eq('type', type as string);
    }
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,organization.ilike.%${search}%,tags.cs.{${search}}`
      );
    }
    if (tags) {
      const tagList = (tags as string).split(',');
      query = query.contains('tags', tagList);
    }

    const sortField = sort === 'stipend_desc' ? 'min_stipend' : sort === 'newest' ? 'created_at' : 'deadline';
    const sortOrder = sort === 'stipend_desc' ? { ascending: false } : { ascending: true };
    query = query.order(sortField, sortOrder);

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const offset = (pageNum - 1) * limitNum;
    query = query.range(offset, offset + limitNum - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ data, total: count || 0, page: pageNum, limit: limitNum });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

opportunitiesRouter.get('/:id', requireDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase!
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .eq('verification_status', 'verified')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Opportunity not found' });
      }
      throw error;
    }
    res.json({ data });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    res.status(500).json({ error: 'Failed to fetch opportunity' });
  }
});

opportunitiesRouter.post('/', requireDatabase, async (req, res) => {
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
    console.error('Error creating opportunity:', error);
    res.status(500).json({ error: 'Failed to create opportunity' });
  }
});

opportunitiesRouter.patch('/:id', requireDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { data, error } = await supabase!
      .from('opportunities')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ data });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({ error: 'Failed to update opportunity' });
  }
});

opportunitiesRouter.delete('/:id', requireDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase!
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    res.status(500).json({ error: 'Failed to delete opportunity' });
  }
});
