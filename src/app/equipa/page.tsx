import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { ArrowLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { Avatar } from "@/components/avatar";
import { comando, quadro } from "@/content/pages";

export const metadata: Metadata = {
  title: "Equipa",
  description:
    "Por trás de cada resposta está uma estrutura de comando experiente e centenas de voluntários dedicados.",
};

export default function EquipaPage() {
  return (
    <>
      <PageHero
        eyebrow="Equipa"
        heading="A equipa que lidera a missão."
        subheading="Por trás de cada resposta está uma estrutura de comando experiente e centenas de voluntários dedicados. Conheça quem lidera os Bombeiros Voluntários de Ílhavo."
      />

      {/* Comando Operacional */}
      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="Comando Operacional"
          heading="A linha da frente da decisão."
          body="Coordenam as operações de socorro e garantem que cada missão é cumprida com segurança."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {comando.map((m, i) => (
            <Reveal
              key={m._id}
              delay={(i % 4) * 0.06}
              className="rounded-2xl border border-stroke p-6 transition-colors hover:border-brand/40"
            >
              <Avatar name={m.name} className="mb-4 h-14 w-14" />
              <h3 className="font-semibold text-text">{m.name}</h3>
              <p className="text-sm text-text-subtlest">{m.role}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Quadro */}
      <Section className="bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <SectionHeader
            heading="O nosso quadro"
            body="Dezenas de homens e mulheres que vestem a farda e servem Ílhavo, organizados por categoria operacional."
          />
          <div className="mt-12 space-y-8">
            {quadro.map((g, gi) => (
              <Reveal key={g.rank} delay={(gi % 2) * 0.06}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-brand">
                  {g.rank}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-text-subtle">
                  {g.names.map((n, i) => (
                    <li key={`${n}-${i}`}>{n}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Cross-link */}
      <Section className="container-page py-16 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-display">
            E quem governa a Associação?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-3 max-w-2xl text-text-subtle">
            A Direção, a Assembleia Geral e o Conselho Fiscal garantem a gestão
            da AHBVI.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <ArrowLink href="/orgaos-sociais" className="mt-6">
            Ver Órgãos Sociais
          </ArrowLink>
        </Reveal>
      </Section>
    </>
  );
}
