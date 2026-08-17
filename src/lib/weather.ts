// Weather + fire-risk data for the top-bar widget.
//
//  - OpenWeather (needs OPENWEATHER_API_KEY, server-side only): live
//    temperature + humidity, plus today's max/min from the forecast.
//  - IPMA (free, no key): official meteorological warning for Aveiro, shown
//    inside the same widget as a complement to the computed fire risk.
//  - Período crítico: legal ban on burning (1 Jul–30 Sep), surfaced even when
//    the weather-based risk is low.

const LAT = 40.6033;
const LON = -8.671;

const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const IPMA_WARNINGS_URL =
  "https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json";
const IPMA_AVEIRO_AREA = "AVR";

// Revalidate window (seconds). OpenWeather refreshes ~every 10 min.
export const WEATHER_REVALIDATE = 900;

// Período crítico de incêndios (ICNF) — habitualmente 1 Jul a 30 Set.
// Ajustar aqui se o ICNF alargar o período num ano de risco elevado.
const CRITICAL_START = { month: 7, day: 1 };
const CRITICAL_END = { month: 9, day: 30 };

export type RiskLevel = 0 | 1 | 2 | 3;
export type WarnLevel = "yellow" | "orange" | "red";

export type FireRisk = {
  level: RiskLevel;
  key: "reduzido" | "moderado" | "elevado" | "extremo";
  label: string;
  message: string;
};

export type OfficialWarning = {
  type: string; // awarenessTypeName, e.g. "Tempo Quente"
  level: WarnLevel;
  end: string;
};

export type Weather = {
  temp: number | null;
  tMin: number | null;
  tMax: number | null;
  humidity: number | null;
  hMin: number | null;
  hMax: number | null;
  risk: FireRisk | null;
  official: OfficialWarning | null;
  criticalPeriod: boolean;
  updated: string | null;
};

const RISK: Record<RiskLevel, Omit<FireRisk, "level">> = {
  0: {
    key: "reduzido",
    label: "Reduzido",
    message:
      "As condições atuais são pouco favoráveis à propagação de incêndios.",
  },
  1: {
    key: "moderado",
    label: "Moderado",
    message:
      "Calor e humidade moderada tornam a vegetação mais inflamável. Tenha cuidado com qualquer uso do fogo.",
  },
  2: {
    key: "elevado",
    label: "Elevado",
    message:
      "Temperatura alta e humidade baixa favorecem a rápida propagação do fogo. Não faça queimadas nem fogueiras.",
  },
  3: {
    key: "extremo",
    label: "Extremo",
    message:
      "Temperaturas muito elevadas e humidade muito baixa criam condições extremas de incêndio. Evite qualquer atividade que possa gerar faíscas.",
  },
};

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

// Month/day parts in Europe/Lisbon, independent of server timezone.
function lisbonMonthDay(d: Date): { month: number; day: number; date: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  const mm = parts.find((p) => p.type === "month")?.value ?? "";
  const dd = parts.find((p) => p.type === "day")?.value ?? "";
  return { month: get("month"), day: get("day"), date: `${year}-${mm}-${dd}` };
}

function inCriticalPeriod(d: Date): boolean {
  const { month, day } = lisbonMonthDay(d);
  const key = month * 100 + day;
  return (
    key >= CRITICAL_START.month * 100 + CRITICAL_START.day &&
    key <= CRITICAL_END.month * 100 + CRITICAL_END.day
  );
}

async function getOfficialWarning(): Promise<OfficialWarning | null> {
  try {
    const res = await fetch(IPMA_WARNINGS_URL, {
      next: { revalidate: WEATHER_REVALIDATE },
    });
    if (!res.ok) return null;
    const list = await res.json();
    if (!Array.isArray(list)) return null;
    const now = Date.now();
    const order: Record<string, number> = { green: 0, yellow: 1, orange: 2, red: 3 };
    const active = list
      .filter(
        (w) =>
          w?.idAreaAviso === IPMA_AVEIRO_AREA &&
          typeof w?.awarenessLevelID === "string" &&
          w.awarenessLevelID !== "green" &&
          (!w?.endTime || new Date(w.endTime).getTime() >= now),
      )
      .sort((a, b) => order[b.awarenessLevelID] - order[a.awarenessLevelID]);
    const top = active[0];
    if (!top) return null;
    return {
      type: String(top.awarenessTypeName ?? "Aviso meteorológico"),
      level: top.awarenessLevelID as WarnLevel,
      end: String(top.endTime ?? ""),
    };
  } catch {
    return null;
  }
}

// Always resolves — failures degrade to nulls so callers can render a
// graceful fallback instead of throwing during render.
export async function getWeather(): Promise<Weather> {
  const out: Weather = {
    temp: null,
    tMin: null,
    tMax: null,
    humidity: null,
    hMin: null,
    hMax: null,
    risk: null,
    official: null,
    criticalPeriod: inCriticalPeriod(new Date()),
    updated: null,
  };

  const key = process.env.OPENWEATHER_API_KEY;

  // IPMA has no key requirement, so fetch it regardless.
  const officialPromise = getOfficialWarning();

  if (key) {
    const params = `lat=${LAT}&lon=${LON}&units=metric&lang=pt&appid=${key}`;
    try {
      const [curRes, fcRes] = await Promise.all([
        fetch(`${CURRENT_URL}?${params}`, { next: { revalidate: WEATHER_REVALIDATE } }),
        fetch(`${FORECAST_URL}?${params}`, { next: { revalidate: WEATHER_REVALIDATE } }),
      ]);

      if (curRes.ok) {
        const cur = await curRes.json();
        out.temp = round(cur?.main?.temp);
        out.humidity = round(cur?.main?.humidity);
        out.updated =
          typeof cur?.dt === "number" ? new Date(cur.dt * 1000).toISOString() : null;
      }

      if (fcRes.ok) {
        const fc = await fcRes.json();
        const list: Array<{ dt: number; main?: { temp?: number; humidity?: number } }> =
          Array.isArray(fc?.list) ? fc.list : [];
        const today = lisbonMonthDay(new Date()).date;
        let sameDay = list.filter(
          (e) => lisbonMonthDay(new Date(e.dt * 1000)).date === today,
        );
        if (sameDay.length === 0) sameDay = list.slice(0, 8);

        const temps: number[] = [];
        const hums: number[] = [];
        for (const e of sameDay) {
          if (typeof e.main?.temp === "number") temps.push(e.main.temp);
          if (typeof e.main?.humidity === "number") hums.push(e.main.humidity);
        }
        if (out.temp != null) temps.push(out.temp);
        if (out.humidity != null) hums.push(out.humidity);

        if (temps.length) {
          out.tMax = Math.round(Math.max(...temps));
          out.tMin = Math.round(Math.min(...temps));
        }
        if (hums.length) {
          out.hMax = Math.round(Math.max(...hums));
          out.hMin = Math.round(Math.min(...hums));
        }
      }

      out.risk = computeRisk(out.temp, out.humidity);
    } catch {
      // Swallow — return whatever we have.
    }
  }

  out.official = await officialPromise;
  return out;
}
