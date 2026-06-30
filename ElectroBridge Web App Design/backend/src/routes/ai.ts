import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireDatabase } from '../middleware/auth.js';

export const aiRouter = Router();

aiRouter.post('/chat', requireDatabase, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let response: string | null = null;
    let provider = '';

    try {
      if (groqKey) {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'You are ElectroBridge AI, a career assistant specializing in electronics, semiconductor, VLSI, research, and government job opportunities in India. Help users find opportunities, review resumes, and plan careers.' },
              ...(history || []),
              { role: 'user', content: message },
            ],
          }),
          signal: AbortSignal.timeout(30000),
        });
        if (groqRes.ok) {
          const data = await groqRes.json();
          response = data.choices?.[0]?.message?.content || null;
          provider = 'groq';
        }
      }
    } catch { /* fall through */ }

    if (!response && geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: message }] }],
            }),
            signal: AbortSignal.timeout(30000),
          },
        );
        if (geminiRes.ok) {
          const data = await geminiRes.json();
          response = data.candidates?.[0]?.content?.parts?.[0]?.text || null;
          provider = 'gemini';
        }
      } catch { /* fall through */ }
    }

    if (!response) {
      return res.status(503).json({ error: 'AI service unavailable. No providers responded.' });
    }

    await supabase!.from('ai_usage_log').insert([{
      feature: 'chat',
      provider,
      success: true,
      user_id: (req as any).user?.id || null,
    }]).maybeSingle();

    res.json({ data: { message: response, provider } });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'AI chat failed' });
  }
});

aiRouter.post('/match', requireDatabase, async (req, res) => {
  try {
    const { skills, interests, experience } = req.body;
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Skills array is required' });
    }

    const { data: opportunities, error } = await supabase!
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .limit(50);

    if (error) throw error;

    const matches = (opportunities || []).map((opp) => {
      const tagMatch = (opp.tags || []).filter((t: string) =>
        skills.some((s: string) => t.toLowerCase().includes(s.toLowerCase()))
      ).length;
      const descMatch = skills.filter((s: string) =>
        (opp.description || '').toLowerCase().includes(s.toLowerCase())
      ).length;
      const score = Math.min(100, Math.round(((tagMatch * 3 + descMatch) / (skills.length * 3)) * 100));
      return { ...opp, matchScore: score };
    });

    const sorted = matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);

    await supabase!.from('ai_usage_log').insert([{
      feature: 'match',
      provider: 'local',
      success: true,
    }]).maybeSingle();

    res.json({ data: { matches: sorted } });
  } catch (error) {
    console.error('AI match error:', error);
    res.status(500).json({ error: 'Matching failed' });
  }
});

aiRouter.get('/search', requireDatabase, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }

    const query = q as string;
    const terms = query.split(/\s+/).filter(Boolean);

    let dbQuery = supabase!
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .limit(20);

    if (terms.length > 0) {
      const filters = terms.map(t => `title.ilike.%${t}%,organization.ilike.%${t}%,tags.cs.{${t}}`);
      dbQuery = dbQuery.or(filters.join(','));
    }

    const { data, error } = await dbQuery;
    if (error) throw error;

    res.json({ data: data || [] });
  } catch (error) {
    console.error('AI search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

aiRouter.post('/summarize', requireDatabase, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const groqKey = process.env.GROQ_API_KEY;
    let summary = '';

    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'Summarize the following text into 2-3 concise sentences and list 3-5 key points.' },
              { role: 'user', content: text },
            ],
          }),
          signal: AbortSignal.timeout(15000),
        });
        if (groqRes.ok) {
          const data = await groqRes.json();
          summary = data.choices?.[0]?.message?.content || '';
        }
      } catch { /* */ }
    }

    res.json({
      data: {
        summary: summary || 'Summary unavailable.',
        keyPoints: summary ? summary.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('*')) : [],
      },
    });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: 'Summarization failed' });
  }
});

aiRouter.get('/expire', requireDatabase, async (_req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data: expired, error: fetchError } = await supabase!
      .from('opportunities')
      .select('id')
      .eq('is_active', true)
      .lt('deadline', today);

    if (fetchError) throw fetchError;

    if (expired && expired.length > 0) {
      const ids = expired.map(o => o.id);
      const { error: updateError } = await supabase!
        .from('opportunities')
        .update({ is_active: false, verification_status: 'expired' })
        .in('id', ids);

      if (updateError) throw updateError;
    }

    res.json({ data: { expired: expired?.length || 0, updated: expired?.length || 0 } });
  } catch (error) {
    console.error('Expire error:', error);
    res.status(500).json({ error: 'Failed to expire opportunities' });
  }
});
