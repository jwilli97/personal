import { NextResponse } from "next/server";
import { loadContributionData } from "@/lib/github-contributions.mjs";

export async function GET() {
  try {
    const data = await loadContributionData({ env: process.env });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
