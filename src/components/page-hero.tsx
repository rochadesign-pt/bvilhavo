import { Reveal } from "@/components/reveal";
import { HeroImage } from "@/components/hero-image";

// Interior-page hero: rounded dark card with grain + red glow (or a photo),
// content aligned to the bottom-left — same language as the homepage hero.
export function PageHero({
  eyebrow,
  heading,
  subheading,
  image,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  image?: string;
}) {
  return (
    <section className="px-3 pt-4 md:px-5 md:pt-6">
      <div className="grain relative isolate flex min-h-[48vh] overflow-hidden rounded-[28px] bg-ink text-white">
        {image ? (
          <HeroImage src={image} />
        ) : (
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(90% 120% at 85% 110%, rgba(230,23,23,0.4) 0%, rgba(23,23,23,0) 55%), radial-gradient(80% 80% at 10% 0%, rgba(230,23,23,0.12) 0%, rgba(23,23,23,0) 50%)",
            }}
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />

        <div className="relative flex w-full flex-col justify-end px-6 py-14 sm:px-10 md:px-12 md:py-20 lg:px-16">
          {eyebrow && (
            <Reveal y={14}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal y={20} delay={0.06}>
            <h1 className="text-display max-w-[20ch] text-[clamp(2rem,3.6vw,3.25rem)] text-white">
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

export function SectionHeader({
  eyebrow,
  heading,
  body,
  align = "left",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div
        className={
          align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
        }
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 text-3xl font-semibold tracking-display md:text-4xl">
          {heading}
        </h2>
        {body && <p className="mt-4 leading-relaxed text-text-subtle">{body}</p>}
      </div>
    </Reveal>
  );
}
