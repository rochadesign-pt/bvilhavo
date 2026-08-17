import { NextResponse } from "next/server";
import { getWeather } from "@/lib/weather";

// Same-origin proxy to IPMA — keeps the browser widget free of CORS concerns
// and lets Next cache the upstream response for the whole site.
// Must be a static literal for Next's segment-config analysis (matches
// WEATHER_REVALIDATE in @/lib/weather).
export const revalidate = 900;

export async function GET() {
  const weather = await getWeather();
  return NextResponse.json(weather, {
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
