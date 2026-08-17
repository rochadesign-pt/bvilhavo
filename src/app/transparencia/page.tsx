import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { documentos } from "@/content/pages";

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "A confiança constrói-se com prestação de contas. Consulte os nossos estatutos, regulamentos, relatórios e orçamentos.",
};

export default function TransparenciaPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparência"
        heading="Contas claras com a comunidade."
        subheading="A confiança constrói-se com prestação de contas. Consulte os nossos estatutos, regulamentos, relatórios e orçamentos."
      />

      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          heading="Gerimos com rigor. Reportamos com orgulho."
          body="Desde 1893 que os Bombeiros Voluntários de Ílhavo existem pelo e para o povo ilhavense. Aqui encontra toda a documentação oficial, organizada e sempre atualizada."
        />

        <div className="mt-12 space-y-5">
          {documentos.map((d, i) => (
            <Reveal
              as="article"
              key={d.title}
              delay={(i % 2) * 0.06}
              className="rounded-2xl border border-stroke p-6 transition-colors hover:border-brand/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <h3 className="text-lg font-semibold text-text">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-subtle">
                    {d.description}
                  </p>
                </div>
              </div>
              {d.anos.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {d.anos.map((ano) => (
                    <li key={ano}>
                      <span className="inline-flex cursor-default items-center rounded-md border border-stroke bg-surface-muted px-3 py-1.5 text-sm text-text-subtle">
                        {ano}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="mt-5 inline-flex items-center rounded-md border border-stroke bg-surface-muted px-3 py-1.5 text-sm text-text-subtlest">
                  Documento
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-sm text-text-subtlest">
          Os ficheiros PDF serão disponibilizados para download assim que
          carregados no gestor de conteúdos.
        </Reveal>
      </Section>
    </>
  );
}
