// OpenWeather integration — live temperature + humidity for Ílhavo, plus a
// computed fire-risk level (alta temperatura + baixa humidade).
//
// Requires OPENWEATHER_API_KEY (server-side only). Free tier is enough:
//   - Current Weather Data  → temp + humidity agora
//   - 5 day / 3 hour Forecast → máximos/mínimos do dia
//
// Set it in Vercel (Project → Settings → Environment Variables) and in a
// local .env.local. Without the key everything degrades to null and the UI
// simply hides the widget — never shows invented data.

const LAT = 40.6033;
const LON = -8.671;

const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Revalidate window (seconds). OpenWeather refreshes ~every 10 min.
export const WEATHER_REVALIDATE = 900;

export type RiskLevel = 0 | 1 | 2 | 3;

export type FireRisk = {
  level: RiskLevel;
  key: "reduzido" | "moderado" | "elevado" | "extremo";
  label: string;
  message: string;
};

export type Weather = {
  temp: number | null;
  tMin: number | null;
  tMax: number | null;
  humidity: number | null;
  hMin: number | null;
  hMax: number | null;
  risk: FireRisk | null;
  updated: string | null;
};

const RISK: Record<RiskLevel, Omit<FireRisk, "level">> = {
  0: {
    key: "reduzido",
    label: "Reduzido",
    message:
      "Risco reduzido de incêndio. Ainda assim, nunca deixe fogueiras sem vigilância.",
  },
  1: {
    key: "moderado",
    label: "Moderado",
    message:
      "Condições favoráveis a incêndios. Evite queimas e tenha cuidado com o uso do fogo.",
  },
  2: {
    key: "elevado",
    label: "Elevado",
    message:
      "Risco elevado de incêndio. Não realize queimadas nem fogueiras ao ar livre.",
  },
  3: {
    key: "extremo",
    label: "Extremo",
    message:
      "Temperaturas elevadas e humidade muito baixa criam condições extremas de incêndio. Evite qualquer queima ao ar livre.",
  },
};

// Fire-risk heuristic from current temperature (°C) + relative humidity (%).
// Thresholds are intentionally simple and easy to tune — não substituem os
// índices oficiais (FWI/ICNF), servem de indicador local.
function computeRisk(temp: number | null, humidity: number | null): FireRisk | null {
  if (temp == null || humidity == null) return null;
  let level: RiskLevel;
  if (temp >= 35 && humidity <= 20) level = 3;
  else if (temp >= 32 && humidity <= 30) level = 2;
  else if (temp >= 28 && humidity <= 45) level = 1;
  else level = 0;
  return { level, ...RISK[level] };
}

function round(n: unknown): number | null {
  const v = typeof n === "number" ? n : Number(n);
  return Number.isFinite(v) ? Math.round(v) : null;
}

// Local (Europe/Lisbon) calendar date, e.g. "2026-08-17".
function lisbonDate(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

// Always resolves — network/key/parse failures degrade to nulls so callers
// can render a graceful fallback instead of throwing during render.
export async function getWeather(): Promise<Weather> {
  const empty: Weather = {
    temp: null,
    tMin: null,
    tMax: null,
    humidity: null,
    hMin: null,
    hMax: null,
    risk: null,
    updated: null,
  };

  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) return empty;

  const params = `lat=${LAT}&lon=${LON}&units=metric&lang=pt&appid=${key}`;

  try {
    const [curRes, fcRes] = await Promise.all([
      fetch(`${CURRENT_URL}?${params}`, {
        next: { revalidate: WEATHER_REVALIDATE },
      }),
      fetch(`${FORECAST_URL}?${params}`, {
        next: { revalidate: WEATHER_REVALIDATE },
      }),
    ]);

    if (curRes.ok) {
      const cur = await curRes.json();
      empty.temp = round(cur?.main?.temp);
      empty.humidity = round(cur?.main?.humidity);
      empty.updated =
        typeof cur?.dt === "number"
          ? new Date(cur.dt * 1000).toISOString()
          : null;
    }

    if (fcRes.ok) {
      const fc = await fcRes.json();
      const list: Array<{ dt: number; main?: { temp?: number; humidity?: number } }> =
        Array.isArray(fc?.list) ? fc.list : [];

      const today = lisbonDate(new Date());
      let sameDay = list.filter((e) => lisbonDate(new Date(e.dt * 1000)) === today);
      // Late at night there may be no more entries for today — fall back to
      // the next 24h (8 × 3h slots).
      if (sameDay.length === 0) sameDay = list.slice(0, 8);

      const temps: number[] = [];
      const hums: number[] = [];
      for (const e of sameDay) {
        if (typeof e.main?.temp === "number") temps.push(e.main.temp);
        if (typeof e.main?.humidity === "number") hums.push(e.main.humidity);
      }
      // Fold the current reading into the range too.
      if (empty.temp != null) temps.push(empty.temp);
      if (empty.humidity != null) hums.push(empty.humidity);

      if (temps.length) {
        empty.tMax = Math.round(Math.max(...temps));
        empty.tMin = Math.round(Math.min(...temps));
      }
      if (hums.length) {
        empty.hMax = Math.round(Math.max(...hums));
        empty.hMin = Math.round(Math.min(...hums));
      }
    }

    empty.risk = computeRisk(empty.temp, empty.humidity);
  } catch {
    // Swallow — return whatever we have.
  }

  return empty;
}
