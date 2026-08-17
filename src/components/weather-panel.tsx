import type { Weather } from "@/lib/weather";

// Per-level accents. `seg` colours the fixed 4-step scale; `text`/`box`/`icon`
// tint the label and alert box for the active level.
const LEVEL = [
  { seg: "bg-emerald-500", text: "text-emerald-600", box: "bg-emerald-50 text-emerald-800", border: "border-emerald-200" },
  { seg: "bg-amber-400", text: "text-amber-600", box: "bg-amber-50 text-amber-800", border: "border-amber-200" },
  { seg: "bg-orange-500", text: "text-orange-600", box: "bg-orange-50 text-orange-800", border: "border-orange-200" },
  { seg: "bg-red-500", text: "text-red-600", box: "bg-red-50 text-red-700", border: "border-red-200" },
] as const;

function Metric({
  label,
  icon,
  value,
  max,
  min,
  unit,
}: {
  label: string;
  icon: string;
  value: number | null;
  max: number | null;
  min: number | null;
  unit: string;
}) {
  return (
    <div className="flex-1 p-5">
      <div className="flex items-center justify-between text-text-subtle">
        <span className="text-sm font-medium">{label}</span>
        <span aria-hidden className="text-base opacity-70">
          {icon}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="text-4xl font-semibold tracking-tight text-text">
          {value != null ? `${value}${unit}` : "—"}
        </span>
        <dl className="text-xs leading-5 text-text-subtlest">
          <div className="flex gap-2">
            <dt>Máx</dt>
            <dd className="font-medium text-text-subtle">
              {max != null ? `${max}${unit}` : "—"}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt>Mín</dt>
            <dd className="font-medium text-text-subtle">
              {min != null ? `${min}${unit}` : "—"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

// The expanded weather / fire-risk card (matches the approved prototype).
// Presentational only — receives already-fetched data.
export function WeatherPanel({ weather }: { weather: Weather }) {
  const risk = weather.risk;
  const accent = risk ? LEVEL[risk.level] : null;

  return (
    <div className="w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-stroke bg-surface text-left shadow-xl shadow-black/10">
      {/* Temperature + Humidity */}
      <div className="flex divide-x divide-stroke">
        <Metric
          label="Temperatura"
          icon="🌡"
          value={weather.temp}
          max={weather.tMax}
          min={weather.tMin}
          unit="°"
        />
        <Metric
          label="Humidade"
          icon="💧"
          value={weather.humidity}
          max={weather.hMax}
          min={weather.hMin}
          unit="%"
        />
      </div>

      {risk && accent && (
        <div className="border-t border-stroke p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text">
              Risco de incêndio
            </span>
            <span className={`text-sm font-semibold ${accent.text}`}>
              {risk.label}
            </span>
          </div>

          {/* Fixed 4-step scale; steps up to the active level stay saturated. */}
          <div className="mt-3 flex gap-1.5" aria-hidden>
            {LEVEL.map((l, i) => (
              <span
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= risk.level ? l.seg : "bg-stroke"
                }`}
              />
            ))}
          </div>

          <div
            className={`mt-4 flex gap-3 rounded-xl border p-3 ${accent.box} ${accent.border}`}
          >
            <span aria-hidden className="mt-0.5 shrink-0">
              ⚠
            </span>
            <p className="text-sm leading-relaxed">{risk.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
