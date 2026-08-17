import { site } from "@/content/site";

// Full-width red bar at the very top (matches the Framer design). Left:
// emergency call-out. Right: a lightweight location chip.
export function EmergencyBar() {
  const tel = `tel:+351${site.phones.emergency.replace(/\s/g, "")}`;
  return (
    <div className="bg-brand text-on-brand">
      <div className="container-wide flex items-center justify-between gap-4 py-2.5 text-sm">
        <p className="flex items-center gap-1.5">
          <span className="opacity-90">Emergência?</span>
          <a href={tel} className="font-semibold hover:underline">
            Ligue agora — {site.phones.emergency}
          </a>
        </p>
        <div className="hidden items-center gap-2 text-on-brand/90 sm:flex">
          <span className="font-medium">Ílhavo</span>
          <span aria-hidden>·</span>
          <span aria-hidden>☀</span>
          <span>27°C</span>
        </div>
      </div>
    </div>
  );
}
