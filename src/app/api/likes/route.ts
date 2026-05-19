import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const token = req.nextUrl.searchParams.get("token");

    const [{ total }] = await sql`SELECT total FROM likes_total`;

    let myCount = 0;
    if (token) {
      const rows = await sql`SELECT count FROM likes_visitors WHERE token = ${token}`;
      if (rows.length > 0) myCount = Number(rows[0].count);
    }

    return NextResponse.json({ total: Number(total), myCount });
  } catch (err) {
    console.error("GET /api/likes error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
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
  } catch (err) {
    console.error("POST /api/likes error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
