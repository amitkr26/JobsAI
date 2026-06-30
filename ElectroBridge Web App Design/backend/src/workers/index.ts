import 'dotenv/config';
import { supabase, isConfigured } from '../lib/supabase.js';
import { neonPool, checkConnection } from '../lib/neon.js';

async function expireOpportunities() {
  if (!isConfigured || !supabase) {
    console.log('Supabase not configured, skipping expire job');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('opportunities')
    .update({ is_active: false, verification_status: 'expired' })
    .eq('is_active', true)
    .lt('deadline', today)
    .select('id');

  if (error) {
    console.error('Expire job error:', error);
    return;
  }
  console.log(`Expired ${data?.length || 0} opportunities`);
}

async function sendDigest() {
  console.log('Digest job placeholder - requires Resend integration');
}

async function runAll() {
  console.log('ElectroBridge Worker starting...');
  console.log(`Supabase: ${isConfigured ? 'connected' : 'not configured'}`);
  console.log(`Neon: ${await checkConnection() ? 'connected' : 'not configured'}`);

  await expireOpportunities();
  await sendDigest();

  console.log('Worker cycle complete');
}

runAll().catch(console.error);
