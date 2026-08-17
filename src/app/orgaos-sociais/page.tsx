import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { orgaosSociais } from "@/content/pages";

export const metadata: Metadata = {
  title: "Órgãos Sociais",
  description:
    "A AHBVI é gerida por órgãos sociais eleitos: a Assembleia Geral, a Direção e o Conselho Fiscal.",
};

export default function OrgaosSociaisPage() {
  return (
    <>
      <PageHero
        eyebrow="Órgãos Sociais"
        heading="A estrutura que governa a Associação."
        subheading="Para além do comando operacional, a AHBVI é gerida por órgãos sociais eleitos: a Assembleia Geral, a Direção e o Conselho Fiscal."
      />

      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          heading="Eleitos pela e para a comunidade."
          body="A Associação Humanitária dos Bombeiros Voluntários de Ílhavo é governada por três órgãos sociais eleitos em Assembleia Geral para mandatos de três anos."
        />

        <Reveal
          role="note"
          delay={0.08}
          y={16}
          className="mt-8 rounded-lg border border-brand/30 bg-brand/5 px-5 py-4 text-sm text-text-subtle"
        >
          Os dados dos mandatos em vigor serão publicados em breve.
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {orgaosSociais.map((o, i) => (
            <Reveal
              key={o.orgao}
              delay={(i % 3) * 0.06}
              className="rounded-2xl border border-stroke p-6 transition-colors hover:border-brand/40"
            >
              <h3 className="text-lg font-semibold text-brand">{o.orgao}</h3>
              <dl className="mt-4 space-y-3">
                {o.cargos.map((c) => (
                  <div key={c.role}>
                    <dt className="text-xs uppercase tracking-wide text-text-subtlest">
                      {c.role}
                    </dt>
                    <dd className="text-text">{c.name}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
