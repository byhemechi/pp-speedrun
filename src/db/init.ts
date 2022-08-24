import db from ".";
import sql from "./sql";

export default async function initialise() {
  await sql`
    CREATE TABLE IF NOT EXISTS plays (
      id text PRIMARY KEY UNIQUE,
      info TEXT,
      score real,
      timeSet TIMESTAMP default CURRENT_TIMESTAmP
    );

    
  `;

  await sql`CREATE TABLE IF NOT EXISTS kv (
    key TEXT PRIMARY KEY,
    value TEXT
  )`;
}
