"use client";

import * as React from "react";
import { buildContributionWeeks } from "@/lib/contribution-calendar.mjs";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  count: number;
};

type ContributionData = {
  contributions: ContributionDay[];
  totalContributions: number;
  usernames: string[];
};

function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

const levelColors = [
  "bg-muted/50",
  "bg-chart-1/60",
  "bg-chart-2/70",
  "bg-chart-3/80",
  "bg-chart-4",
];

function ContributionCell({ count }: { count: number }) {
  const level = getContributionLevel(count);

  return (
    <div
      className={cn(
        "size-[10px] sm:size-[11px] rounded-[2px]",
        levelColors[level]
      )}
    />
  );
}

function ContributionGridSkeleton() {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 53 }).map((_, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="size-[10px] sm:size-[11px] rounded-[2px] bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ContributionGridMinimal() {
  const [data, setData] = React.useState<ContributionData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/contributions");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError("Failed to load contributions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <ContributionGridSkeleton />;
  }

  if (error || !data || data.contributions.length === 0) {
    return null;
  }

  const weeks = buildContributionWeeks(data.contributions);

  return (
    <div className="flex justify-center">
      <div className="flex gap-[3px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <ContributionCell key={day.date} count={day.count} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
