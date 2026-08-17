import { NextResponse } from "next/server";
import { getWeather } from "@/lib/weather";

// Dynamic on purpose: never bake a build-time (possibly null / key-not-yet-
// active) snapshot into a static file. The route runs per request and computes
// the critical-period flag fresh; the upstream OpenWeather/IPMA calls are still
// cached ~15 min via their own fetch revalidate, and the response is edge-cached
// by the Cache-Control header below.
export const dynamic = "force-dynamic";

export async function GET() {
  const weather = await getWeather();
  return NextResponse.json(weather, {
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
