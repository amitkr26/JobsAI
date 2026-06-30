import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.NEON_DATABASE_URL || '';

let pool: pg.Pool | null = null;

if (connectionString) {
  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

export const neonPool = pool;

export async function query(text: string, params?: unknown[]) {
  if (!pool) {
    throw new Error('Neon database not configured. Set NEON_DATABASE_URL.');
  }
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function checkConnection(): Promise<boolean> {
  if (!pool) return false;
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
