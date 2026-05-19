import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const formId = req.nextUrl.searchParams.get("formId");

  // No formId → return all submitted testimonials
  if (!formId) {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      const rows = await sql`
        SELECT name, company, position, comment, stars, created_at
        FROM testimonials
        ORDER BY created_at DESC
      `;
      return NextResponse.json(rows);
    } catch (err) {
      console.error("GET /api/testimonial (list) error:", err);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    const [form] = await sql`SELECT id FROM testimonial_forms WHERE id = ${formId}`;
    if (!form) return NextResponse.json({ exists: false });

    const [testimonial] = await sql`
      SELECT name, email, company, position, comment, stars
      FROM testimonials WHERE form_id = ${formId}
      ORDER BY created_at DESC LIMIT 1
    `;

    if (!testimonial) return NextResponse.json({ exists: true, submitted: false });

    return NextResponse.json({ exists: true, submitted: true, testimonial });
  } catch (err) {
    console.error("GET /api/testimonial error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { formId, name, email, company, position, comment, stars } = await req.json();

    if (!formId || !name || !email || !comment || !stars) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO testimonials (form_id, name, email, company, position, comment, stars)
      VALUES (${formId}, ${name}, ${email}, ${company ?? null}, ${position ?? null}, ${comment}, ${stars})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/testimonial error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
