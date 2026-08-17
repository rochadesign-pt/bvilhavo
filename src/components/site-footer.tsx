import Link from "next/link";
import { mainNav, ctaSecondary } from "@/lib/nav";
import { site } from "@/content/site";
import { AuroraBars } from "@/components/aurora-bars";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      {/* Aurora de fogo a subir no fundo do footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64">
        <AuroraBars />
      </div>

      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img src="/brand/crest.svg" alt="" width={44} height={44} className="h-11 w-11" />
            <span className="font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Ao serviço da comunidade de Ílhavo desde {site.foundedYear}. Vida por
            Vida, 24 horas por dia, 365 dias por ano.
          </p>
          {site.socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-white/70 transition-colors hover:text-white"
            >
              {s.platform} ↗
            </a>
          ))}
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs uppercase tracking-wide text-white/40">
            Navegação
          </span>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaSecondary.href}
            className="text-white/70 transition-colors hover:text-white"
          >
            {ctaSecondary.label}
          </Link>
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 text-xs uppercase tracking-wide text-white/40">
            Contactos
          </span>
          <p className="text-white/70">
            {site.address.street}
            <br />
            {site.address.postal}
          </p>
          <p className="text-white/70">
            Emergências:{" "}
            <a
              href={`tel:+351${site.phones.emergency.replace(/\s/g, "")}`}
              className="font-semibold text-white transition-colors hover:text-brand"
            >
              {site.phones.emergency}
            </a>
            <br />
            Secretaria:{" "}
            <a
              href={`tel:+351${site.phones.office.replace(/\s/g, "")}`}
              className="transition-colors hover:text-white"
            >
              {site.phones.office}
            </a>
          </p>
          <a
            href={`mailto:${site.emails.general}`}
            className="text-white/70 transition-colors hover:text-white"
          >
            {site.emails.general}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name} · Associação Humanitária de utilidade pública
          </p>
          <p>
            Emergência? Ligue{" "}
            <span className="font-semibold text-brand">112</span> ou{" "}
            {site.phones.emergency}
          </p>
        </div>
      </div>
    </footer>
  );
}
