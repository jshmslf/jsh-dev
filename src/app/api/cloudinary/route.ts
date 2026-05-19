import { NextRequest, NextResponse } from "next/server";

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME!;
const KEY = process.env.CLOUDINARY_API_KEY!;
const SECRET = process.env.CLOUDINARY_API_SECRET!;

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

function makeThumb(secureUrl: string) {
  return secureUrl.replace("/upload/", "/upload/w_600,c_fill,q_auto,f_auto/");
}

function toImage(r: CloudinaryResource) {
  return {
    publicId: r.public_id,
    url: r.secure_url,
    thumb: makeThumb(r.secure_url),
    width: r.width,
    height: r.height,
  };
}

async function fetchByFolder(folder: string) {
  const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        expression: `asset_folder="jshportfolio/${folder}"`,
        max_results: 100,
        sort_by: [{ public_id: "asc" }],
      }),
    }
  );
  if (!res.ok) throw new Error("cloudinary error");
  const data = await res.json();
  return (data.resources ?? []).map(toImage);
}

async function fetchByIds(ids: string[]) {
  if (!ids.length) return [];
  const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");
  // Search by public_id list using OR expression
  const expression = ids.map((id) => `public_id="${id}"`).join(" OR ");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({ expression, max_results: ids.length }),
    }
  );
  if (!res.ok) throw new Error("cloudinary error");
  const data = await res.json();
  // Return in the same order as ids
  const map = new Map((data.resources ?? []).map((r: CloudinaryResource) => [r.public_id, toImage(r)]));
  return ids.map((id) => map.get(id)).filter(Boolean);
}

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder");
  const ids = req.nextUrl.searchParams.get("ids");

  try {
    if (ids) {
      const list = ids.split(",").map((s) => s.trim()).filter(Boolean);
      const images = await fetchByIds(list);
      return NextResponse.json({ images });
    }
    if (folder) {
      const images = await fetchByFolder(folder);
      return NextResponse.json({ images });
    }
    return NextResponse.json({ error: "folder or ids required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "cloudinary error" }, { status: 500 });
  }
}
