import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const [nowRes, recentRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // Currently playing
    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url,
          url: data.item.external_urls.spotify,
          playedAt: null,
        });
      }
    }

    // Recently played fallback
    if (recentRes.ok) {
      const data = await recentRes.json();
      const track = data.items?.[0];
      if (track) {
        return NextResponse.json({
          isPlaying: false,
          title: track.track.name,
          artist: track.track.artists.map((a: { name: string }) => a.name).join(", "),
          album: track.track.album.name,
          albumArt: track.track.album.images[0]?.url,
          url: track.track.external_urls.spotify,
          playedAt: track.played_at,
        });
      }
    }

    return NextResponse.json({ isPlaying: false, title: null });
  } catch (err) {
    console.error("Spotify API error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
