import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      SELECT tf.id, tf.label, tf.created_at,
             EXISTS (SELECT 1 FROM testimonials t WHERE t.form_id = tf.id) AS submitted
      FROM testimonial_forms tf
      ORDER BY tf.created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/testimonial-forms error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, label } = await req.json();
    if (!id || !label) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO testimonial_forms (id, label) VALUES (${id}, ${label})
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/testimonial-forms error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM testimonials WHERE form_id = ${id}`;
    await sql`DELETE FROM testimonial_forms WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/testimonial-forms error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
