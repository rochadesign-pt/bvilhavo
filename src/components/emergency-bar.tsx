"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import type { Weather, WeatherWarning } from "@/lib/weather";

// Warning-level → PT label + colours (kept distinct from the brand-red bar).
const LEVEL_STYLE: Record<
  WeatherWarning["level"],
  { bar: string; label: string }
> = {
  yellow: { bar: "bg-amber-300 text-amber-950", label: "Amarelo" },
  orange: { bar: "bg-orange-500 text-white", label: "Laranja" },
  red: { bar: "bg-red-700 text-white", label: "Vermelho" },
};

// "2026-08-17T18:00:00" → "17/08 18h00" (uses IPMA's local wall-clock as-is,
// so it is not shifted by the server timezone).
function formatEnd(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return "";
  const [, , mo, d, h, min] = m;
  return `${d}/${mo} ${h}h${min}`;
}

// Full-width red bar at the very top (matches the Framer design). Left:
// emergency call-out. Right (desktop): a live temperature chip from IPMA.
// When Aveiro is under an active weather warning, a prominent strip is shown
// below the bar on every breakpoint so the alert reaches everyone.
export function EmergencyBar() {
  const tel = `tel:+351${site.phones.emergency.replace(/\s/g, "")}`;
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/weather")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Weather | null) => {
        if (active && data) setWeather(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const warning = weather?.warnings[0];
  const style = warning ? LEVEL_STYLE[warning.level] : null;

  return (
    <>
      <div className="bg-brand text-on-brand">
        <div className="container-wide flex items-center justify-center gap-4 py-2.5 text-sm sm:justify-between">
          <p className="flex items-center gap-1.5">
            <span className="opacity-90">Emergência?</span>
            <a href={tel} className="font-semibold hover:underline">
              Ligue agora — {site.phones.emergency}
            </a>
          </p>
          <div className="hidden items-center gap-2 text-on-brand/90 sm:flex">
            <span className="font-medium">Ílhavo</span>
            {weather?.tMax != null && (
              <>
                <span aria-hidden>·</span>
                <span aria-hidden>{weather.icon}</span>
                <span>
                  {Math.round(weather.tMax)}°C
                  <span className="sr-only"> temperatura máxima em Ílhavo</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {warning && style && (
        <div className={style.bar} role="alert">
          <div className="container-wide flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-sm font-medium sm:justify-start">
            <span aria-hidden>⚠</span>
            <span className="font-semibold">
              Aviso {style.label} · {warning.type}
            </span>
            {warning.end && (
              <span className="opacity-90">
                (em vigor até {formatEnd(warning.end)})
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
