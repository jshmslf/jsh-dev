import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  const [{ total }] = await sql`SELECT total FROM likes_total`;

  let myCount = 0;
  if (token) {
    const rows = await sql`SELECT count FROM likes_visitors WHERE token = ${token}`;
    if (rows.length > 0) myCount = Number(rows[0].count);
  }

  return NextResponse.json({ total: Number(total), myCount });
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });

  await sql`
    INSERT INTO likes_visitors (token, count)
    VALUES (${token}, 1)
    ON CONFLICT (token)
    DO UPDATE SET count = likes_visitors.count + 1, updated_at = NOW()
  `;

  const [{ total }] = await sql`SELECT total FROM likes_total`;
  const [{ count }] = await sql`SELECT count FROM likes_visitors WHERE token = ${token}`;

  return NextResponse.json({ total: Number(total), myCount: Number(count) });
}
