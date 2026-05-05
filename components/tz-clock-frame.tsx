"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { WeatherReading } from "@/lib/weather";

// A web tribute to jwilli97/ascii-clock — terminal-styled timezone dashboard.
// Uses CSS grid for alignment (not text padding) so emoji width doesn't break
// the layout. Times tick once a minute on the client; SSR uses a fixed
// reference time to avoid hydration mismatch.

const BAR_CELLS = 14;
const WEATHER_REFRESH_MS = 10 * 60 * 1000;
const WEATHER_ICONS: Record<string, string> = {
  sun: "☀️",
  "sun-cloud": "⛅",
  cloud: "☁️",
  fog: "🌫️",
  rain: "🌧️",
  snow: "❄️",
};

function formatTime(date: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  })
    .format(date)
    .replace(/^24/, "00");
}

function formatHeaderDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getDayFraction(date: Date, tz: string): number {
  const hourStr = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(date);
  const [h, m] = hourStr.split(":").map(Number);
  return (h * 60 + m) / (24 * 60);
}

function ProgressBar({ frac }: { frac: number }) {
  const filled = Math.round(frac * BAR_CELLS);
  return (
    <span className="text-primary/70 tracking-tight">
      {"#".repeat(filled)}
      <span className="text-primary/20">{"-".repeat(BAR_CELLS - filled)}</span>
    </span>
  );
}

export function TzClockFrame({
  className,
  initialWeather,
}: {
  className?: string;
  initialWeather: WeatherReading[];
}) {
  const [now, setNow] = React.useState<Date | null>(null);
  const [weather, setWeather] = React.useState(initialWeather);

  React.useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    async function refreshWeather() {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) return;
        const nextWeather = (await response.json()) as WeatherReading[];
        if (!cancelled) {
          setWeather(nextWeather);
        }
      } catch (error) {
        console.error("Failed to refresh weather:", error);
      }
    }

    const id = setInterval(refreshWeather, WEATHER_REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Stable SSR/first-paint date so server and client markup match.
  const date = now ?? new Date("2026-05-05T14:32:00Z");

  return (
    <div
      role="img"
      aria-label="terminal timezone dashboard"
      className={cn(
        "inline-block border border-primary/40 font-mono text-[11px] leading-[1.5] text-primary/80 select-none bg-background/40",
        className,
      )}
    >
      {/* Header row — date */}
      <div className="px-3 py-1.5 border-b border-primary/40 text-primary/90">
        {formatHeaderDate(date)}
      </div>

      {/* Timezone rows */}
      <div className="px-3 py-1.5">
        {weather.map((z) => {
          const frac = getDayFraction(date, z.tz);
          const icon = WEATHER_ICONS[z.condition.emoji] ?? WEATHER_ICONS.cloud;
          return (
            <div
              key={z.label}
              className="grid grid-cols-[64px_44px_auto_24px_64px] gap-x-3 items-center py-[1px]"
            >
              <span className="text-primary/70">{z.label}</span>
              <span className="text-primary/90 tabular-nums">
                {formatTime(date, z.tz)}
              </span>
              <ProgressBar frac={frac} />
              <span className="text-center" aria-hidden>
                {icon}
              </span>
              <span className="text-primary/60 tabular-nums">
                {z.tempF}°F/{z.tempC}°C
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
