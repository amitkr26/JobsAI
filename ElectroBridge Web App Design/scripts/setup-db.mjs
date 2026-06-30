#!/usr/bin/env node

/**
 * Database Setup Script
 * Run: node scripts/setup-db.mjs
 * 
 * Applies SQL migrations to Supabase and Neon.
 * Requires DATABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, '..', 'backend', 'migrations');

async function runMigrations(dbUrl, label, migrationFiles) {
  if (!dbUrl) {
    console.log(`Skipping ${label}: no database URL provided`);
    return;
  }

  const { default: pg } = await import('pg');
  const pool = new pg.Pool({ connectionString: dbUrl });

  for (const file of migrationFiles) {
    const filePath = join(migrationsDir, label, file);
    const sql = readFileSync(filePath, 'utf-8');
    console.log(`Running ${label}/${file}...`);
    try {
      await pool.query(sql);
      console.log(`  ✓ ${file}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  await pool.end();
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
  const neonUrl = process.env.NEON_DATABASE_URL;

  const supabaseFiles = readdirSync(join(migrationsDir, 'supabase')).sort();
  const neonFiles = readdirSync(join(migrationsDir, 'neon')).sort();

  console.log('=== ElectroBridge Database Setup ===\n');

  await runMigrations(supabaseUrl, 'supabase', supabaseFiles);
  await runMigrations(neonUrl, 'neon', neonFiles);

  console.log('\n=== Setup complete ===');
}

main().catch(console.error);
