import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { apoios, contribui, faqApoiar } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Apoiar",
  description:
    "Os nossos bombeiros dão o seu tempo gratuitamente. O equipamento que os protege tem um custo real. O seu contributo faz a diferença.",
};

export default function ApoiarPage() {
  return (
    <>
      <PageHero
        eyebrow="Apoiar"
        heading="Quando precisar de nós, estaremos lá. Para estarmos lá, precisamos de si."
        subheading="Os nossos bombeiros dão o seu tempo gratuitamente. O equipamento que os protege — e que permite proteger Ílhavo — tem um custo real. O seu contributo faz a diferença."
        image="/heroes/apoiar.jpg"
      />

      {/* Formas de apoio */}
      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          heading="Uma pequena contribuição pode ter um impacto enorme."
          body="Há várias formas de fazer parte desta missão. Seja com um contributo financeiro ou com materiais úteis, está a apoiar quem nunca vira as costas."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {apoios.map((a, i) => (
            <Reveal
              as="article"
              key={a._id}
              delay={(i % 3) * 0.06}
              className="flex flex-col rounded-2xl border border-stroke bg-surface-muted p-6 transition-colors hover:border-brand/40"
            >
              <h3 className="text-lg font-semibold text-text">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-subtle">
                {a.description}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-subtlest">
          Para se tornar sócio ou combinar um donativo, contacte-nos por{" "}
          <a
            href={`mailto:${site.emails.general}`}
            className="text-brand underline underline-offset-2"
          >
            {site.emails.general}
          </a>{" "}
          ou {site.phones.office}. O IBAN para donativos será publicado em breve.
        </p>
      </Section>

      {/* Em que contribui */}
      <Section className="bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <SectionHeader
            heading="Em que contribui? A melhorar o nosso serviço."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {contribui.map((c, i) => (
              <Reveal
                as="li"
                key={c}
                delay={(i % 3) * 0.06}
                className="rounded-2xl border border-stroke bg-surface p-6 text-text-subtle transition-colors hover:border-brand/40"
              >
                {c}
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="container-page py-20 md:py-24">
        <SectionHeader heading="Tens dúvidas? Nós ajudamos-te." />
        <div className="mt-10 max-w-2xl">
          <FaqAccordion items={faqApoiar} />
        </div>
      </Section>
    </>
  );
}
