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

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={cn(
          "size-[10px] sm:size-[11px] rounded-[2px] transition-colors",
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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
      </div>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}

export function ContributionGrid() {
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

  if (error || !data) {
    return (
      <div className="text-muted-foreground text-sm">
        {error || "No contribution data available"}
      </div>
    );
  }

  if (data.contributions.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        GitHub contributions are unavailable until a GitHub token is configured.
      </div>
    );
  }

  const weeks = buildContributionWeeks(data.contributions);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Calculate month labels positions
  const monthLabels: { month: string; position: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const firstDay = new Date(week[0].date + "T00:00:00");
    const month = firstDay.getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ month: months[month], position: index });
      lastMonth = month;
    }
  });

  // Calculate week width for positioning
  const weekWidth = 14; // 11px cell + 3px gap

  return (
    <div className="flex flex-col items-center pt-8 pb-4">
      <div className="inline-flex flex-col gap-3">
        {/* Header */}
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{data.totalContributions.toLocaleString()}</span> contributions in the last year
        </div>

        {/* Grid container */}
        <div className="overflow-visible">
          {/* Month labels */}
          <div className="relative h-5 ml-5">
            {monthLabels.map(({ month, position }, index) => (
              <span
                key={index}
                className="absolute text-xs text-muted-foreground"
                style={{ left: `${position * weekWidth}px` }}
              >
                {month}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] text-xs text-muted-foreground pr-1 shrink-0">
              <span className="h-[10px] sm:h-[11px]"></span>
              <span className="h-[10px] sm:h-[11px] leading-[10px] sm:leading-[11px]">M</span>
              <span className="h-[10px] sm:h-[11px]"></span>
              <span className="h-[10px] sm:h-[11px] leading-[10px] sm:leading-[11px]">W</span>
              <span className="h-[10px] sm:h-[11px]"></span>
              <span className="h-[10px] sm:h-[11px] leading-[10px] sm:leading-[11px]">F</span>
              <span className="h-[10px] sm:h-[11px]"></span>
            </div>

            {/* Grid */}
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

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          {levelColors.map((color, index) => (
            <div
              key={index}
              className={cn("size-[10px] rounded-[2px]", color)}
            />
          ))}
          <span>More</span>
        </div>

        {/* Usernames */}
        <div className="text-xs text-muted-foreground">
          Aggregated from: {data.usernames.join(", ")}
        </div>
      </div>
    </div>
  );
}
