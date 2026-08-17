import type { Weather } from "@/lib/weather";
import {
  ThermometerIcon,
  DropletIcon,
  WarningIcon,
  InfoIcon,
  FlameIcon,
  BanIcon,
} from "@/components/weather-icons";

// Per-level presentation. Low levels stay calm (info icon, soft tint) so a
// "Reduzido" never reads as a red alarm; the warning treatment is reserved
// for Elevado/Extremo.
const LEVEL = [
  {
    seg: "bg-emerald-500",
    text: "text-emerald-600",
    box: "bg-emerald-50 text-emerald-900 border-emerald-200",
    alarm: false,
  },
  {
    seg: "bg-amber-400",
    text: "text-amber-600",
    box: "bg-amber-50 text-amber-900 border-amber-200",
    alarm: false,
  },
  {
    seg: "bg-orange-500",
    text: "text-orange-600",
    box: "bg-orange-50 text-orange-900 border-orange-200",
    alarm: true,
  },
  {
    seg: "bg-red-500",
    text: "text-red-600",
    box: "bg-red-50 text-red-800 border-red-200",
    alarm: true,
  },
] as const;

const OFFICIAL: Record<string, { label: string; dot: string }> = {
  yellow: { label: "Amarelo", dot: "bg-amber-400" },
  orange: { label: "Laranja", dot: "bg-orange-500" },
  red: { label: "Vermelho", dot: "bg-red-500" },
};

function Metric({
  label,
  Icon,
  value,
  max,
  min,
  unit,
}: {
  label: string;
  Icon: typeof ThermometerIcon;
  value: number | null;
  max: number | null;
  min: number | null;
  unit: string;
}) {
  return (
    <div className="flex-1 p-5">
      <div className="flex items-center justify-between text-text-subtle">
        <span className="text-sm font-medium">{label}</span>
        <Icon className="h-4 w-4 opacity-60" />
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

// The expanded weather / fire-risk card. Presentational — receives fetched data.
export function WeatherPanel({ weather }: { weather: Weather }) {
  const { risk, official, criticalPeriod } = weather;
  const accent = risk ? LEVEL[risk.level] : null;
  const off = official ? OFFICIAL[official.level] : null;
  const hasFooter = !!risk || criticalPeriod || !!official;

  return (
    <div className="w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-stroke bg-surface text-left shadow-xl shadow-black/10">
      {/* Temperature + Humidity */}
      <div className="flex divide-x divide-stroke">
        <Metric
          label="Temperatura"
          Icon={ThermometerIcon}
          value={weather.temp}
          max={weather.tMax}
          min={weather.tMin}
          unit="°"
        />
        <Metric
          label="Humidade"
          Icon={DropletIcon}
          value={weather.humidity}
          max={weather.hMax}
          min={weather.hMin}
          unit="%"
        />
      </div>

      {hasFooter && (
        <div className="space-y-4 border-t border-stroke p-5">
          {risk && accent && (
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-text">
                  <FlameIcon className="h-4 w-4 text-text-subtle" />
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

              <div className={`mt-4 flex gap-3 rounded-xl border p-3 ${accent.box}`}>
                {accent.alarm ? (
                  <WarningIcon className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p className="text-sm leading-relaxed">{risk.message}</p>
              </div>
            </div>
          )}

          {/* Legal ban during the critical period — shown even at low risk. */}
          {criticalPeriod && (
            <div className="flex gap-3 rounded-xl border border-stroke bg-surface-muted p-3">
              <BanIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-text">
                <span className="font-semibold">
                  Período crítico (1 jul – 30 set):
                </span>{" "}
                queimadas e fogueiras estão proibidas por lei, mesmo com risco
                reduzido. Em caso de incêndio, ligue <strong>112</strong>.
              </p>
            </div>
          )}

          {/* Official IPMA warning for Aveiro (complements the computed risk). */}
          {official && off && (
            <div className="flex items-center gap-2 text-xs text-text-subtle">
              <span aria-hidden className={`h-2 w-2 rounded-full ${off.dot}`} />
              <span>
                Aviso oficial IPMA · <span className="font-medium">{off.label}</span>{" "}
                · {official.type}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
