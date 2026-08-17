import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Quartel",
  description:
    "Estamos no coração de Ílhavo, prontos a responder 24 horas por dia, 365 dias por ano.",
};

export default function QuartelPage() {
  const contactos = [
    { label: "Morada", value: `${site.address.street} · ${site.address.postal}` },
    { label: "Emergências", value: site.phones.emergency, href: `tel:+351${site.phones.emergency.replace(/\s/g, "")}` },
    { label: "Secretaria", value: site.phones.office, href: `tel:+351${site.phones.office.replace(/\s/g, "")}` },
    { label: "Email geral", value: site.emails.general, href: `mailto:${site.emails.general}` },
    { label: "Voluntariado", value: site.emails.volunteer, href: `mailto:${site.emails.volunteer}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Quartel"
        heading="Onde a ajuda começa."
        subheading="Estamos no coração de Ílhavo, prontos a responder 24 horas por dia, 365 dias por ano. Conheça a nossa casa e como falar connosco."
        image="/heroes/quartel.jpg"
      />

      <Section className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeader
              heading="Contactos e localização"
              body="Para emergências, ligue sempre 234 330 000. Para assuntos administrativos, contacte a secretaria."
            />
            <dl className="mt-10 space-y-5">
              {contactos.map((c, i) => (
                <Reveal
                  key={c.label}
                  delay={(i % 3) * 0.06}
                  y={16}
                  className="border-b border-stroke pb-4"
                >
                  <dt className="text-xs uppercase tracking-wide text-text-subtlest">
                    {c.label}
                  </dt>
                  <dd className="mt-1 text-lg text-text">
                    {c.href ? (
                      <a href={c.href} className="hover:text-brand">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </Reveal>
              ))}
              <Reveal delay={0.18} y={16}>
                <dt className="text-xs uppercase tracking-wide text-text-subtlest">
                  Horário
                </dt>
                <dd className="mt-1 text-text-subtle">
                  {site.hours.operational}
                  <br />
                  {site.hours.office}
                </dd>
              </Reveal>
            </dl>
          </div>

          <div className="flex flex-col">
            <Reveal className="flex flex-1 items-center justify-center rounded-2xl border border-stroke bg-surface-muted p-10 text-center text-text-subtlest">
              Mapa — {site.address.street}
            </Reveal>
            <ButtonLink
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              Abrir no Google Maps
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
