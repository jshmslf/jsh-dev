import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS testimonials (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id     TEXT NOT NULL,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    company     TEXT,
    position    TEXT,
    comment     TEXT NOT NULL,
    stars       INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
console.log("✓ testimonials table created (or already exists)");

await sql`
  CREATE TABLE IF NOT EXISTS testimonial_forms (
    id         TEXT PRIMARY KEY,
    label      TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
console.log("✓ testimonial_forms table created (or already exists)");
