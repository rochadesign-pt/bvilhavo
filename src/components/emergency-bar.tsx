"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import type { Weather } from "@/lib/weather";
import { WeatherPanel } from "@/components/weather-panel";
import { ThermometerIcon, WarningIcon, FlameIcon } from "@/components/weather-icons";

const EASE = [0.25, 1, 0.5, 1] as const;

// Light dot cores so they stay visible on the brand-red bar.
const DOT = ["bg-emerald-300", "bg-amber-300", "bg-orange-200", "bg-red-200"];

// A risk dot that emits a radar "ping" when the risk is high, so people
// actually notice it. Falls back to a static dot under reduced motion.
function RiskDot({ level, pulse }: { level: number; pulse: boolean }) {
  const color = DOT[level] ?? DOT[0];
  return (
    <span className="relative ml-0.5 inline-flex h-2 w-2">
      {pulse && (
        <motion.span
          aria-hidden
          className={`absolute inset-0 rounded-full ${color}`}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

// Full-width red bar at the very top. Left: emergency call-out (centred on
// mobile). Right (desktop): a live weather chip that expands, on hover/focus,
// into the fire-risk panel. On mobile — where the chip is hidden to keep the
// call-out centred — an active fire risk or the burning ban surfaces as a
// tappable strip below the bar.
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
  const critical = !!weather?.criticalPeriod;
  const official = weather?.official ?? null;
  const highRisk = !!risk && risk.level >= 2;
  const pulse = !reduce && highRisk;
  // Show the widget whenever there's anything worth surfacing — so it appears
  // even before OpenWeather returns data (e.g. a brand-new key still activating).
  const hasWidget = hasData || critical || !!official;

  // Mobile strip: urgent when high risk, otherwise a calm ban reminder.
  const stripVariant =
    risk && risk.level >= 3
      ? "bg-red-600 text-white"
      : risk && risk.level >= 2
        ? "bg-orange-500 text-white"
        : "bg-amber-100 text-amber-900";
  const stripLabel = highRisk
    ? `Risco de incêndio ${risk!.label}`
    : "Período crítico — queimadas proibidas";
  const showStrip = highRisk || critical;

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
            onMouseEnter={() => hasWidget && setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {hasWidget ? (
              <button
                type="button"
                aria-expanded={open}
                aria-label="Ver meteorologia e risco de incêndio em Ílhavo"
                onClick={() => setOpen((v) => !v)}
                onFocusCapture={() => setOpen(true)}
                className="flex items-center gap-1.5 rounded-full px-1 text-on-brand/90 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span className="font-medium">Ílhavo</span>
                <span aria-hidden>·</span>
                {hasData ? (
                  <>
                    <ThermometerIcon className="h-3.5 w-3.5" />
                    <span>{weather!.temp}°C</span>
                  </>
                ) : (
                  <>
                    <FlameIcon className="h-3.5 w-3.5" />
                    <span>Risco de incêndio</span>
                  </>
                )}
                {(risk || critical) && (
                  <RiskDot level={risk ? risk.level : 1} pulse={pulse} />
                )}
              </button>
            ) : (
              <span className="font-medium text-on-brand/90">Ílhavo</span>
            )}

            <AnimatePresence>
              {open && weather && hasWidget && (
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

      {/* Mobile strip — tap to expand the same panel */}
      {showStrip && (
        <div className={`sm:hidden ${stripVariant}`}>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="container-wide flex w-full items-center justify-center gap-2 py-2 text-center text-sm font-medium"
          >
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={pulse ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
              transition={
                pulse
                  ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0 }
              }
            >
              <WarningIcon className="h-4 w-4" />
            </motion.span>
            <span className="font-semibold">{stripLabel}</span>
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
