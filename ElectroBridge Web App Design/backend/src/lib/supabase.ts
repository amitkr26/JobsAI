import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const urlOk = supabaseUrl.startsWith('http');
const serviceOk = supabaseServiceRoleKey.length > 0;

export const isConfigured = urlOk && serviceOk;

export const supabase = urlOk && serviceOk
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
