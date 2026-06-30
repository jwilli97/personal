import { HomePageClient } from "@/components/home-page-client";
import { loadCachedContributionData } from "@/lib/cached-contributions";
import { now } from "@/lib/now";

export default async function Page() {
  const contributionData = await loadCachedContributionData();

  return <HomePageClient now={now} contributionData={contributionData} />;
}
