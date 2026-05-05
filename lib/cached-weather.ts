import { unstable_cache } from "next/cache";
import { loadWeatherData, WEATHER_REVALIDATE_SECONDS } from "@/lib/weather";

export const loadCachedWeatherData = unstable_cache(
  async () => loadWeatherData(),
  ["weather-v1"],
  {
    revalidate: WEATHER_REVALIDATE_SECONDS,
    tags: ["weather"],
  },
);
