export type WeatherZone = {
  label: string;
  tz: string;
  latitude: number;
  longitude: number;
};

export type WeatherCondition = {
  emoji: string;
  label: string;
};

export type WeatherReading = {
  label: string;
  tz: string;
  tempF: number;
  tempC: number;
  condition: WeatherCondition;
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
  };
};

export const WEATHER_REVALIDATE_SECONDS = 10 * 60;

export const WEATHER_ZONES: WeatherZone[] = [
  {
    label: "HAWAII",
    tz: "Pacific/Honolulu",
    latitude: 21.3099,
    longitude: -157.8581,
  },
  {
    label: "CENTRAL",
    tz: "America/Chicago",
    latitude: 30.2672,
    longitude: -97.7431,
  },
  {
    label: "EASTERN",
    tz: "America/New_York",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    label: "UTC",
    tz: "UTC",
    latitude: 51.5072,
    longitude: -0.1276,
  },
];

export const FALLBACK_WEATHER: WeatherReading[] = [
  {
    label: "HAWAII",
    tz: "Pacific/Honolulu",
    tempF: 82,
    tempC: 28,
    condition: { emoji: "sun", label: "clear" },
  },
  {
    label: "CENTRAL",
    tz: "America/Chicago",
    tempF: 79,
    tempC: 26,
    condition: { emoji: "sun", label: "clear" },
  },
  {
    label: "EASTERN",
    tz: "America/New_York",
    tempF: 61,
    tempC: 16,
    condition: { emoji: "rain", label: "rain" },
  },
  {
    label: "UTC",
    tz: "UTC",
    tempF: 55,
    tempC: 13,
    condition: { emoji: "cloud", label: "cloudy" },
  },
];

function getCondition(weatherCode: number | undefined): WeatherCondition {
  if (weatherCode === undefined) {
    return { emoji: "cloud", label: "unknown" };
  }

  if (weatherCode === 0) return { emoji: "sun", label: "clear" };
  if ([1, 2].includes(weatherCode)) {
    return { emoji: "sun-cloud", label: "partly cloudy" };
  }
  if (weatherCode === 3) return { emoji: "cloud", label: "overcast" };
  if ([45, 48].includes(weatherCode)) return { emoji: "fog", label: "fog" };
  if (
    [
      51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
    ].includes(weatherCode)
  ) {
    return { emoji: "rain", label: "rain" };
  }
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return { emoji: "snow", label: "snow" };
  }

  return { emoji: "cloud", label: "cloudy" };
}

async function fetchZoneWeather(
  zone: WeatherZone,
  fetchImpl: typeof fetch = fetch,
): Promise<WeatherReading> {
  const params = new URLSearchParams({
    latitude: String(zone.latitude),
    longitude: String(zone.longitude),
    current: "temperature_2m,weather_code",
    temperature_unit: "fahrenheit",
    timezone: zone.tz,
  });

  const response = await fetchImpl(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    { next: { revalidate: WEATHER_REVALIDATE_SECONDS } },
  );

  if (!response.ok) {
    throw new Error(`Open-Meteo API error: ${response.status}`);
  }

  const json = (await response.json()) as OpenMeteoResponse;
  const tempF = Math.round(json.current?.temperature_2m ?? Number.NaN);

  if (!Number.isFinite(tempF)) {
    throw new Error(`Open-Meteo response missing temperature for ${zone.label}`);
  }

  return {
    label: zone.label,
    tz: zone.tz,
    tempF,
    tempC: Math.round(((tempF - 32) * 5) / 9),
    condition: getCondition(json.current?.weather_code),
  };
}

export async function loadWeatherData(
  fetchImpl: typeof fetch = fetch,
): Promise<WeatherReading[]> {
  try {
    return await Promise.all(
      WEATHER_ZONES.map((zone) => fetchZoneWeather(zone, fetchImpl)),
    );
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return FALLBACK_WEATHER;
  }
}
