import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/page-hero";
import { HeroEditorial } from "@/components/heroes";
import { ArrowLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { Avatar } from "@/components/avatar";
import { TimelineHistory } from "@/components/timeline-history";
import { timeline, missaoVisaoValores, comando } from "@/content/pages";

export const metadata: Metadata = {
  title: "A Associação",
  description:
    "Desde 1893 que os Bombeiros Voluntários de Ílhavo servem a comunidade com coragem, dedicação e espírito de missão.",
};

export default function AboutPage() {
  return (
    <>
      <HeroEditorial
        eyebrow="Quem somos"
        heading="Uma história com mais de um século. Uma missão que não tem fim."
        subheading="Desde 1893 que os Bombeiros Voluntários de Ílhavo servem a comunidade com coragem, dedicação e espírito de missão. Esta é a nossa identidade. Este é o nosso compromisso."
        meta={["Fundada em 1893", "Ílhavo · Aveiro", "Associação de utilidade pública"]}
      />

      {/* Timeline */}
      <Section className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="A nossa história"
          heading="Uma história de coragem que começou em 1893."
          body="Do embrião na Fábrica da Vista-Alegre à corporação moderna de hoje, mais de 130 anos ao serviço de Ílhavo."
        />
        <TimelineHistory items={timeline} />
      </Section>

      {/* Missão / Visão / Valores */}
      <Section className="bg-surface-muted">
        <div className="container-page py-20 md:py-24">
          <SectionHeader
            heading="De ontem até hoje. Sempre prontos."
            body="Somos uma associação humanitária com mais de 130 anos de serviço voluntário, em constante evolução para responder aos desafios de um mundo em mudança."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal className="rounded-2xl border border-stroke bg-surface p-6">
              <h3 className="text-lg font-semibold text-brand">Missão</h3>
              <p className="mt-3 leading-relaxed text-text-subtle">
                {missaoVisaoValores.missao}
              </p>
            </Reveal>
            <Reveal delay={0.06} className="rounded-2xl border border-stroke bg-surface p-6">
              <h3 className="text-lg font-semibold text-brand">Visão</h3>
              <p className="mt-3 leading-relaxed text-text-subtle">
                {missaoVisaoValores.visao}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="rounded-2xl border border-stroke bg-surface p-6">
              <h3 className="text-lg font-semibold text-brand">Valores</h3>
              <ul className="mt-3 space-y-1 text-text-subtle">
                {missaoVisaoValores.valores.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Comando */}
      <Section className="container-page py-20 md:py-24">
        <SectionHeader
          eyebrow="Comando"
          heading="Quem está por trás da missão"
          body="A nossa força está nas pessoas. Comandantes, diretores, voluntários e operacionais — cada um tem um papel essencial."
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
        <div className="mt-10">
          <ArrowLink href="/equipa">Conhecer toda a equipa</ArrowLink>
        </div>
      </Section>
    </>
  );
}
