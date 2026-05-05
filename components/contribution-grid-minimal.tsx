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

function ContributionCell({
  date,
  count,
  weekIndex,
  totalWeeks,
}: {
  date: string;
  count: number;
  weekIndex: number;
  totalWeeks: number;
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const level = getContributionLevel(count);

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Position tooltip based on where we are in the grid
  const isLeftEdge = weekIndex < 5;
  const isRightEdge = weekIndex > totalWeeks - 5;

  let tooltipPosition = "left-1/2 -translate-x-1/2";
  if (isLeftEdge) {
    tooltipPosition = "left-0";
  } else if (isRightEdge) {
    tooltipPosition = "right-0";
  }

  const label = `${count} contribution${count !== 1 ? "s" : ""} on ${formattedDate}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <button
        type="button"
        aria-label={label}
        className={cn(
          "block size-[10px] sm:size-[11px] rounded-[2px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary",
          levelColors[level]
        )}
      />
      {showTooltip && count > 0 && (
        <div className={cn("absolute bottom-full mb-2 z-50 pointer-events-none", tooltipPosition)}>
          <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap border">
            <span className="font-medium">{count} contribution{count !== 1 ? "s" : ""}</span>
            <span className="text-muted-foreground"> on {formattedDate}</span>
          </div>
        </div>
      )}
    </div>
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

export function ContributionGridMinimal({
  initialData,
}: {
  initialData?: ContributionData;
}) {
  const [data, setData] = React.useState<ContributionData | null>(
    initialData ?? null,
  );
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(!initialData);

  React.useEffect(() => {
    if (initialData) {
      return;
    }

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
  }, [initialData]);

  if (loading) {
    return <ContributionGridSkeleton />;
  }

  if (error || !data || data.contributions.length === 0) {
    return null;
  }

  const weeks = buildContributionWeeks(data.contributions);

  return (
    <div
      className="flex justify-center py-8"
      role="group"
      aria-label={`GitHub contribution calendar aggregated from ${data.usernames.join(", ")}`}
    >
      <div className="flex gap-[3px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <ContributionCell
                key={day.date}
                date={day.date}
                count={day.count}
                weekIndex={weekIndex}
                totalWeeks={weeks.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
