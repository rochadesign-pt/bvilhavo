import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/page-hero";
import { HeroSplit } from "@/components/heroes";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import {
  passosVoluntario,
  requisitosVoluntario,
  faqVoluntario,
} from "@/content/pages";

export const metadata: Metadata = {
  title: "Ser Voluntário",
  description:
    "Não pedimos experiência. Pedimos coragem, compromisso e vontade de fazer algo que realmente importa. A formação é nossa, a missão é tua.",
};

export default function VoluntarioPage() {
  return (
    <>
      <HeroSplit
        eyebrow="Voluntariado"
        heading="Não pedimos experiência. Pedimos coragem, compromisso e vontade de fazer algo que realmente importa."
        subheading="Há mais de 130 anos que ilhavenses comuns fazem coisas extraordinárias. Junta-te a eles. A formação é nossa, a missão é tua."
        image="/heroes/voluntario.jpg"
        ctas={[
          { label: "Quero inscrever-me", href: "/quartel" },
          { label: "Como apoiar", href: "/apoiar", variant: "secondary" },
        ]}
      />

      {/* Passos */}
      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="Do formulário ao primeiro turno"
          heading="Do interesse à ação. Sem complicações, sem barreiras."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {passosVoluntario.map((p, i) => (
            <Reveal
              key={p.step}
              delay={(i % 4) * 0.06}
              className="rounded-2xl border border-stroke p-6 transition-colors hover:border-brand/40"
            >
              <div className="text-3xl font-bold text-brand">{p.step}</div>
              <h3 className="mt-3 font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-subtle">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Requisitos */}
      <Section className="bg-surface-muted">
        <div className="container-page grid gap-10 py-20 md:grid-cols-2 md:py-24">
          <SectionHeader
            heading="Quem pode candidatar-se? A resposta curta: provavelmente tu."
          />
          <ul className="space-y-3">
            {requisitosVoluntario.map((r, i) => (
              <Reveal
                as="li"
                key={r}
                delay={(i % 2) * 0.06}
                y={20}
                className="flex items-start gap-3 text-text-subtle"
              >
                <span className="mt-1 text-brand" aria-hidden>
                  ✓
                </span>
                <span>{r}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="container-page py-20 md:py-24">
        <SectionHeader heading="Tens dúvidas? Nós ajudamos-te." />
        <div className="mt-10 max-w-2xl">
          <FaqAccordion items={faqVoluntario} />
        </div>
        <div className="mt-10">
          <ButtonLink href="/quartel">Quero ser bombeiro</ButtonLink>
        </div>
      </Section>
    </>
  );
}
