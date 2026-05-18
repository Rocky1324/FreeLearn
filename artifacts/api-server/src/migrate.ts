import { pool } from "@workspace/db";

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      SELECT to_regclass('public.users') AS exists;
    `);

    const tableExists = rows[0]?.exists != null;

    if (!tableExists) {
      console.log("[migrate] users table not found — skipping column migration (schema push will create it).");
      return;
    }

    await client.query(`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE,
        ADD COLUMN IF NOT EXISTS google_access_token TEXT,
        ADD COLUMN IF NOT EXISTS google_refresh_token TEXT,
        ADD COLUMN IF NOT EXISTS google_token_expiry TIMESTAMP,
        ADD COLUMN IF NOT EXISTS google_picture TEXT;
    `);

    await client.query(`
      ALTER TABLE users
        ALTER COLUMN password_hash DROP NOT NULL;
    `);

    console.log("[migrate] Schema up to date.");
  } catch (err) {
    console.error("[migrate] Migration failed:", err);
    throw err;
  } finally {
    client.release();
  }
}
