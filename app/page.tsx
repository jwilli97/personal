import { HomePageClient } from "@/components/home-page-client";
import { loadCachedContributionData } from "@/lib/cached-contributions";
import { loadCachedWeatherData } from "@/lib/cached-weather";
import { getFeaturedProjects } from "@/lib/projects";
import { now } from "@/lib/now";

export default async function Page() {
  const [contributionData, weather] = await Promise.all([
    loadCachedContributionData(),
    loadCachedWeatherData(),
  ]);

  return (
    <HomePageClient
      featured={getFeaturedProjects()}
      now={now}
      contributionData={contributionData}
      weather={weather}
    />
  );
}
