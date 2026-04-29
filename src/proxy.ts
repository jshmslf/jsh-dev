import { NextRequest, NextResponse } from "next/server";

// Routes accessible without a key
const PUBLIC_API_ROUTES = [
  "/api/likes",
  "/api/spotify",
  "/api/testimonial",
  "/api/testimonial-forms",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/")) return NextResponse.next();

  // Allow public routes
  if (PUBLIC_API_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // All other /api/* routes — return 404
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export const config = {
  matcher: "/api/:path*",
};
