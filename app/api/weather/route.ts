import { NextResponse } from "next/server";
import { loadCachedWeatherData } from "@/lib/cached-weather";
import { WEATHER_REVALIDATE_SECONDS } from "@/lib/weather";

export const revalidate = 600;

export async function GET() {
  const data = await loadCachedWeatherData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${WEATHER_REVALIDATE_SECONDS}, stale-while-revalidate=${WEATHER_REVALIDATE_SECONDS}`,
    },
  });
}
