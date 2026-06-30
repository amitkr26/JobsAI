import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireDatabase } from '../middleware/auth.js';

const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export const subscribeRouter = Router();

subscribeRouter.post('/', requireDatabase, async (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = ipRequestCounts.get(ip);

    if (record && now < record.resetAt) {
      if (record.count >= RATE_LIMIT) {
        return res.status(429).json({ error: 'Too many requests. Try again later.' });
      }
      record.count++;
    } else {
      ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    }

    const { email, keywords, categories } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const { data, error } = await supabase!
      .from('subscribers')
      .insert([{
        email,
        keywords: keywords || [],
        categories: categories || [],
        is_active: true,
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Already subscribed' });
      }
      throw error;
    }

    res.status(201).json({ data: { id: data.id } });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

subscribeRouter.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { error } = await supabase!
      .from('subscribers')
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
});
