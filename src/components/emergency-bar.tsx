"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import type { Weather } from "@/lib/weather";
import { WeatherPanel } from "@/components/weather-panel";

const EASE = [0.25, 1, 0.5, 1] as const;

// Risk-level → small dot colour (desktop chip) + mobile strip styling.
const DOT = ["bg-emerald-400", "bg-amber-300", "bg-orange-400", "bg-red-400"];
const STRIP: Record<number, string> = {
  2: "bg-orange-500 text-white",
  3: "bg-red-600 text-white",
};

// Full-width red bar at the very top. Left: emergency call-out (centred on
// mobile). Right (desktop): a live weather chip from OpenWeather that expands,
// on hover/focus, into the fire-risk panel. On mobile — where the chip is
// hidden to keep the call-out centred — an active fire-risk (Elevado+) surfaces
// as a tappable strip below the bar, so the alert still reaches touch users.
export function EmergencyBar() {
  const tel = `tel:+351${site.phones.emergency.replace(/\s/g, "")}`;
  const reduce = useReducedMotion();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [open, setOpen] = useState(false);

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

  const hasData = weather?.temp != null;
  const risk = weather?.risk ?? null;
  const showStrip = !!risk && risk.level >= 2;

  const panelMotion = {
    initial: { opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.98 },
    transition: { duration: reduce ? 0.12 : 0.2, ease: EASE },
  };

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

          {/* Desktop weather chip + hover dropdown */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => hasData && setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {hasData ? (
              <button
                type="button"
                aria-expanded={open}
                aria-label="Ver meteorologia e risco de incêndio em Ílhavo"
                onClick={() => setOpen((v) => !v)}
                onFocus={() => setOpen(true)}
                className="flex items-center gap-2 rounded-full px-1 text-on-brand/90 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span className="font-medium">Ílhavo</span>
                <span aria-hidden>·</span>
                <span aria-hidden>🌡</span>
                <span>{weather!.temp}°C</span>
                {risk && risk.level >= 1 && (
                  <span
                    aria-hidden
                    className={`ml-0.5 h-2 w-2 rounded-full ${DOT[risk.level]}`}
                  />
                )}
              </button>
            ) : (
              <span className="font-medium text-on-brand/90">Ílhavo</span>
            )}

            <AnimatePresence>
              {open && hasData && weather && (
                <motion.div
                  {...panelMotion}
                  role="dialog"
                  aria-label="Meteorologia e risco de incêndio"
                  className="absolute right-0 top-full z-50 mt-2"
                  onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
                >
                  <WeatherPanel weather={weather} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile fire-risk strip (Elevado/Extremo) — tap to expand */}
      {showStrip && risk && (
        <div className={`sm:hidden ${STRIP[risk.level]}`}>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="container-wide flex w-full items-center justify-center gap-2 py-2 text-center text-sm font-medium"
          >
            <span aria-hidden>⚠</span>
            <span className="font-semibold">Risco de incêndio {risk.label}</span>
            <span aria-hidden className="opacity-80">
              {open ? "▲" : "▼"}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open && weather && (
              <motion.div
                initial={{ opacity: 0, height: reduce ? "auto" : 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: reduce ? "auto" : 0 }}
                transition={{ duration: reduce ? 0.12 : 0.25, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="container-wide px-4 pb-3">
                  <WeatherPanel weather={weather} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
