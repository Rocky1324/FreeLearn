import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Render nécessite souvent SSL pour PostgreSQL en production
const ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: ssl
});

// Test de connexion pour le log au démarrage
pool.on('error', (err) => {
  console.error('Erreur inattendue sur le pool PostgreSQL :', err);
});

export const db = drizzle(pool, { schema });

export * from "./schema";
