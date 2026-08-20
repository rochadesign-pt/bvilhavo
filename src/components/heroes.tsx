import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HeroImage } from "@/components/hero-image";
import { ButtonLink } from "@/components/button";

type Cta = { label: string; href: string; variant?: "secondary" | "onDark" };

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/* ── A. Imersivo (foto) — Serviços, Veículos, Quartel ─────────────────────── */
export function HeroImmersive({
  eyebrow,
  heading,
  subheading,
  image,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  image: string;
}) {
  return (
    <section className="px-3 pt-4 md:px-5 md:pt-6">
      <div className="grain relative isolate flex min-h-[60vh] overflow-hidden rounded-[28px] bg-ink text-white">
        <HeroImage src={image} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

        <div className="relative flex w-full flex-col justify-end px-6 py-14 sm:px-10 md:px-12 md:py-20 lg:px-16">
          {eyebrow && (
            <Reveal y={14}>
              <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal y={20} delay={0.06}>
            <h1 className="text-display max-w-[18ch] text-[clamp(2.25rem,4.2vw,3.75rem)] text-white">
              {heading}
            </h1>
          </Reveal>
          {subheading && (
            <Reveal y={16} delay={0.12}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                {subheading}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── B. Editorial (claro, tipografia grande) — institucionais ─────────────── */
export function HeroEditorial({
  eyebrow,
  heading,
  subheading,
  meta,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  meta?: string[];
}) {
  return (
    <section className="border-b border-stroke bg-surface">
      <div className="container-page py-20 md:py-28">
        {eyebrow && (
          <Reveal y={12}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal y={20} delay={0.05}>
          <h1 className="mt-5 max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-display text-text">
            {heading}
          </h1>
        </Reveal>
        {subheading && (
          <Reveal y={16} delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-subtle">
              {subheading}
            </p>
          </Reveal>
        )}
        {meta && meta.length > 0 && (
          <Reveal y={12} delay={0.16}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-stroke pt-6 text-sm text-text-subtle">
              {meta.map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ── C. Split com apelo (CTA) — Apoiar, Voluntário ────────────────────────── */
export function HeroSplit({
  eyebrow,
  heading,
  subheading,
  image,
  ctas,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  image: string;
  ctas?: Cta[];
}) {
  return (
    <section className="border-b border-stroke bg-surface">
      <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          {eyebrow && (
            <Reveal y={12}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal y={20} delay={0.05}>
            <h1 className="mt-5 max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-display text-text">
              {heading}
            </h1>
          </Reveal>
          {subheading && (
            <Reveal y={16} delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-subtle">
                {subheading}
              </p>
            </Reveal>
          )}
          {ctas && ctas.length > 0 && (
            <Reveal y={12} delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((c) => (
                  <ButtonLink key={c.href} href={c.href} variant={c.variant}>
                    {c.label}
                  </ButtonLink>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal
          delay={0.1}
          className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink md:aspect-[5/6]"
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ── D. Notícias — editorial + destaque da última notícia ─────────────────── */
export function HeroNews({
  eyebrow,
  heading,
  subheading,
  featured,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  featured?: { title: string; slug: string; date?: string; excerpt?: string };
}) {
  return (
    <section className="border-b border-stroke bg-surface">
      <div className="container-page grid items-end gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          {eyebrow && (
            <Reveal y={12}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal y={20} delay={0.05}>
            <h1 className="mt-5 max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.03] tracking-display text-text">
              {heading}
            </h1>
          </Reveal>
          {subheading && (
            <Reveal y={16} delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-subtle">
                {subheading}
              </p>
            </Reveal>
          )}
        </div>

        {featured && (
          <Reveal delay={0.12}>
            <Link
              href={`/noticias/${featured.slug}`}
              className="group block rounded-[24px] border border-stroke bg-surface-muted p-6 transition-colors hover:border-brand/40 md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Última notícia · {formatDate(featured.date)}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-display text-text group-hover:text-brand">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-3 line-clamp-3 text-text-subtle">{featured.excerpt}</p>
              )}
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Ler notícia
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
