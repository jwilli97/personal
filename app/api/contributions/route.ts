import { NextResponse } from "next/server";
import { loadCachedContributionData, CONTRIBUTIONS_REVALIDATE_SECONDS } from "@/lib/cached-contributions";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await loadCachedContributionData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${CONTRIBUTIONS_REVALIDATE_SECONDS}, stale-while-revalidate=${CONTRIBUTIONS_REVALIDATE_SECONDS}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
