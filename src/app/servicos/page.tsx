import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/page-hero";
import { HeroImmersive } from "@/components/heroes";
import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { ServicesInteractive } from "@/components/services-interactive";
import { sanityFetch } from "@/sanity/client";
import { servicosQuery } from "@/sanity/queries";
import { servicos as fallbackServicos } from "@/content/pages";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Do combate a incêndios ao apoio à comunidade, a ação dos Bombeiros Voluntários de Ílhavo vai muito além da emergência.",
};

type Servico = { _id: string; title: string; summary?: string };

export default async function ServicosPage() {
  const servicos = await sanityFetch<Servico[]>(
    servicosQuery,
    {},
    fallbackServicos,
    { tags: ["servico"] },
  );

  return (
    <>
      <HeroImmersive
        eyebrow="Serviços"
        heading="Sempre prontos. Sempre em missão."
        subheading="Do combate a incêndios ao apoio à comunidade, a nossa ação vai muito além da emergência. Conhece as áreas onde fazemos a diferença, todos os dias."
        image="/heroes/servicos.jpg"
      />

      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          heading="Muito mais do que combater incêndios."
          body="Respondemos a mais de 1.400 ocorrências por mês, desde incêndios e emergências médicas a acidentes rodoviários e riscos industriais."
        />
        <div className="mt-14">
          <ServicesInteractive services={servicos} />
        </div>
      </Section>

      {/* Prevenção */}
      <Section className="bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <SectionHeader
            eyebrow="Prevenção e sensibilização"
            heading="O perigo das queimadas"
            body="A maioria dos incêndios rurais é evitável. A diferença está na prevenção e no bom senso de quem usa o fogo."
          />
          <Reveal
            delay={0.08}
            className="mt-8 max-w-2xl space-y-4 leading-relaxed text-text-subtle"
          >
            <p>
              Todos os anos, muitos incêndios rurais têm origem em queimadas e
              queimas mal executadas. Um gesto aparentemente simples — limpar
              terreno com fogo — pode transformar-se rapidamente numa ocorrência
              grave quando o vento aumenta ou a vegetação está seca.
            </p>
            <p>
              Antes de queimar, confirme as condições meteorológicas e respeite o
              período crítico. As queimas de sobrantes exigem comunicação prévia à
              Câmara Municipal ou à Junta de Freguesia; as queimadas extensivas
              carecem de acompanhamento técnico autorizado.
            </p>
            <p>
              Se detetar um incêndio, ligue de imediato para o{" "}
              <span className="font-semibold text-text">112</span>. Quanto mais
              cedo for dado o alerta, mais rápida e eficaz será a resposta.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="container-page py-20 text-center md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-display md:text-4xl">
            Um trabalho diário com impacto real.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-2xl text-text-subtle">
            Mais do que números — cada ação representa vidas protegidas, apoio
            prestado e confiança reforçada.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/voluntario">Quero ser bombeiro</ButtonLink>
            <ButtonLink href="/apoiar" variant="secondary">
              Quero apoiar
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
