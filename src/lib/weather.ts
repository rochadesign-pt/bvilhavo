// IPMA (Instituto Português do Mar e da Atmosfera) open-data helpers.
// Official, free, no API key. Docs: https://api.ipma.pt/
//
// Ílhavo pertence ao distrito de Aveiro:
//   - previsão diária por concelho:  globalIdLocal 1010500 (Aveiro)
//   - avisos meteorológicos por área: idAreaAviso "AVR" (Aveiro)

const DAILY_URL =
  "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1010500.json";
const WARNINGS_URL =
  "https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json";

const AVEIRO_AREA = "AVR";

// Revalidate window (seconds) — IPMA updates a few times a day.
export const WEATHER_REVALIDATE = 1800;

export type WarningLevel = "green" | "yellow" | "orange" | "red";

export type WeatherWarning = {
  type: string; // awarenessTypeName, e.g. "Tempo Quente"
  level: Exclude<WarningLevel, "green">;
  start: string;
  end: string;
};

export type Weather = {
  tMin: number | null;
  tMax: number | null;
  label: string;
  icon: string;
  warnings: WeatherWarning[];
  updated: string | null;
};

// idWeatherType → { label, emoji } (subset that actually occurs in Aveiro).
const WEATHER_TYPES: Record<number, { label: string; icon: string }> = {
  1: { label: "Céu limpo", icon: "☀" },
  2: { label: "Céu pouco nublado", icon: "🌤" },
  3: { label: "Céu parcialmente nublado", icon: "⛅" },
  4: { label: "Céu muito nublado", icon: "☁" },
  5: { label: "Céu nublado", icon: "☁" },
  6: { label: "Aguaceiros", icon: "🌦" },
  7: { label: "Aguaceiros fracos", icon: "🌦" },
  8: { label: "Aguaceiros fortes", icon: "🌧" },
  9: { label: "Chuva", icon: "🌧" },
  10: { label: "Chuva fraca", icon: "🌦" },
  11: { label: "Chuva forte", icon: "🌧" },
  12: { label: "Períodos de chuva", icon: "🌧" },
  13: { label: "Chuva fraca", icon: "🌦" },
  14: { label: "Chuva forte", icon: "🌧" },
  15: { label: "Chuvisco", icon: "🌦" },
  16: { label: "Neblina", icon: "🌫" },
  17: { label: "Nevoeiro", icon: "🌫" },
  18: { label: "Neve", icon: "🌨" },
  19: { label: "Trovoada", icon: "⛈" },
  20: { label: "Aguaceiros e trovoada", icon: "⛈" },
  21: { label: "Granizo", icon: "🌨" },
  22: { label: "Geada", icon: "❄" },
  23: { label: "Chuva e trovoada", icon: "⛈" },
  24: { label: "Nebulosidade convectiva", icon: "☁" },
  25: { label: "Céu com períodos de muito nublado", icon: "⛅" },
  26: { label: "Nevoeiro", icon: "🌫" },
  27: { label: "Céu nublado", icon: "☁" },
};

const LEVEL_ORDER: Record<string, number> = {
  green: 0,
  yellow: 1,
  orange: 2,
  red: 3,
};

function toNumber(value: unknown): number | null {
  const n = typeof value === "string" ? parseFloat(value) : Number(value);
  return Number.isFinite(n) ? n : null;
}

// Fetches today's forecast + active Aveiro warnings from IPMA.
// Always resolves — network/parse failures degrade to nulls so the UI can
// fall back gracefully instead of throwing during render.
export async function getWeather(): Promise<Weather> {
  const empty: Weather = {
    tMin: null,
    tMax: null,
    label: "",
    icon: "☀",
    warnings: [],
    updated: null,
  };

  try {
    const [dailyRes, warnRes] = await Promise.all([
      fetch(DAILY_URL, { next: { revalidate: WEATHER_REVALIDATE } }),
      fetch(WARNINGS_URL, { next: { revalidate: WEATHER_REVALIDATE } }),
    ]);

    if (dailyRes.ok) {
      const daily = await dailyRes.json();
      const today = Array.isArray(daily?.data) ? daily.data[0] : undefined;
      if (today) {
        empty.tMin = toNumber(today.tMin);
        empty.tMax = toNumber(today.tMax);
        const type = WEATHER_TYPES[Number(today.idWeatherType)];
        if (type) {
          empty.label = type.label;
          empty.icon = type.icon;
        }
      }
      empty.updated = typeof daily?.dataUpdate === "string" ? daily.dataUpdate : null;
    }

    if (warnRes.ok) {
      const warnings = await warnRes.json();
      if (Array.isArray(warnings)) {
        const now = Date.now();
        empty.warnings = warnings
          .filter(
            (w) =>
              w?.idAreaAviso === AVEIRO_AREA &&
              typeof w?.awarenessLevelID === "string" &&
              w.awarenessLevelID !== "green" &&
              // keep only warnings that have not yet ended
              (!w?.endTime || new Date(w.endTime).getTime() >= now),
          )
          .map((w) => ({
            type: String(w.awarenessTypeName ?? "Aviso meteorológico"),
            level: w.awarenessLevelID as WeatherWarning["level"],
            start: String(w.startTime ?? ""),
            end: String(w.endTime ?? ""),
          }))
          .sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]);
      }
    }
  } catch {
    // Swallow — return whatever we have (possibly all-null).
  }

  return empty;
}
