import { unstable_cache } from "next/cache";
import { loadContributionData } from "@/lib/github-contributions.mjs";

export const CONTRIBUTIONS_REVALIDATE_SECONDS = 60 * 60;

export const loadCachedContributionData = unstable_cache(
  async () => loadContributionData({ env: process.env }),
  ["github-contributions-v1"],
  {
    revalidate: CONTRIBUTIONS_REVALIDATE_SECONDS,
    tags: ["github-contributions"],
  },
);
