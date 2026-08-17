import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { servicosQuery, noticiasQuery } from "@/sanity/queries";
import { site, stats } from "@/content/site";
import { servicos as fallbackServicos, duasFormas } from "@/content/pages";
import { SectionHeader } from "@/components/page-hero";
import { HomeHero } from "@/components/home-hero";
import { ButtonLink, ArrowLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { Gallery } from "@/components/gallery";
import { ContactForm } from "@/components/contact-form";

type Servico = { _id: string; title: string; summary?: string };
type Noticia = { _id: string; title: string; slug: string; date?: string; excerpt?: string };

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function Home() {
  const [servicos, noticias] = await Promise.all([
    sanityFetch<Servico[]>(servicosQuery, {}, fallbackServicos, { tags: ["servico"] }),
    sanityFetch<Noticia[]>(noticiasQuery, {}, [], { tags: ["noticia"] }),
  ]);

  return (
    <>
      <HomeHero
        eyebrow="Fundados em 1893 · Ílhavo, Aveiro"
        subheading="Há mais de 130 anos a proteger a nossa comunidade. Vida por Vida. 24 horas por dia, 365 dias por ano."
      />

      {/* História + stats — the red frame "flows" into a full brand-red block */}
      <section className="bg-brand text-on-brand">
        <div className="container-page py-16 text-center md:py-20">
          <Reveal>
            <h2 className="text-display mx-auto max-w-2xl text-3xl md:text-5xl">
              Uma história de dedicação e coragem.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-on-brand/85">
              Mais de um século de serviço. Milhares de intervenções. Centenas de
              vidas salvas. Mas para nós, cada número tem um rosto. Cada chamada é
              uma vida. E cada vida merece o nosso melhor.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Duas formas de apoiar */}
      <section className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="Faz parte"
          heading="Duas formas de apoiar. Uma missão que nunca pára."
          body="Há várias formas de fazer parte desta missão. Seja com o teu tempo ou com um contributo, estás a apoiar quem nunca vira as costas."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {duasFormas.map((f, i) => (
            <Reveal
              key={f._id}
              delay={i * 0.08}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-10"
            >
              <div>
                <h3 className="text-2xl font-semibold tracking-display md:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 max-w-md text-white/70">{f.description}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={f.cta.href} size="sm">
                  {f.cta.label}
                </ButtonLink>
                <ButtonLink href={f.more.href} variant="onDark" size="sm">
                  {f.more.label}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Momentos — galeria em ação */}
      <section className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="Em ação"
          heading="Momentos que definem quem somos."
          body="Cada fotografia conta uma história de coragem, sacrifício e compromisso com Ílhavo."
        />
        <div className="mt-14">
          <Gallery
            images={[
              { src: "/gallery/acao-1.jpg", alt: "Bombeiros em combate a incêndio", wide: true },
              { src: "/gallery/acao-4.jpg", alt: "Operacional dos Bombeiros de Ílhavo" },
              { src: "/gallery/acao-3.jpg", alt: "Equipa em intervenção" },
              { src: "/gallery/acao-2.jpg", alt: "Ação no terreno", wide: true },
            ]}
          />
        </div>
      </section>

      {/* História teaser */}
      <section className="bg-surface-muted">
        <div className="container-page grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <div>
            <SectionHeader
              eyebrow="A nossa história"
              heading="Uma história de coragem que começou em 1893."
            />
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-text-subtle">
              <p>
                A Associação Humanitária dos Bombeiros Voluntários de Ílhavo nasceu
                do mesmo espírito que levou os ilhavenses ao mar — coragem,
                solidariedade e dever comunitário. Ao longo de 130 anos, crescemos
                de um punhado de voluntários para uma corporação moderna.
              </p>
              <p>
                Somos parceiros da Câmara Municipal e da ANEPC na proteção do
                concelho. Mas acima de tudo, somos vizinhos dos 39 mil ilhavenses a
                quem servimos todos os dias.
              </p>
            </div>
            <ArrowLink href="/about" className="mt-8">
              Conhecer a nossa história
            </ArrowLink>
          </div>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface md:aspect-[4/5]">
            <Image
              src="/gallery/historia.jpg"
              alt="Bombeiros Voluntários de Ílhavo em intervenção"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Parceiros institucionais */}
      <section className="container-page py-16 md:py-20">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-text-subtlest">
            Em parceria com
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {[
              "Câmara Municipal de Ílhavo",
              "ANEPC",
              "Proteção Civil",
              "INEM · SIEM",
            ].map((p) => (
              <span
                key={p}
                className="text-lg font-semibold tracking-tight text-text-subtle"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Serviços */}
      <section className="container-page py-24 md:py-32">
        <SectionHeader
          eyebrow="O que fazemos"
          heading="Muito mais do que combater incêndios."
          body="Respondemos a mais de 1.400 ocorrências por mês, desde incêndios e emergências médicas a acidentes rodoviários e riscos industriais."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s, i) => (
            <Reveal
              key={s._id}
              delay={(i % 3) * 0.08}
              className="group h-full rounded-2xl border border-stroke bg-surface-muted p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-black/5"
            >
              <h3 className="text-lg font-semibold text-text">{s.title}</h3>
              {s.summary && (
                <p className="mt-2 text-sm leading-relaxed text-text-subtle">
                  {s.summary}
                </p>
              )}
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <ArrowLink href="/servicos">Ver todos os serviços</ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* Bloco de impacto */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/heroes/impacto.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/75" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 90% at 15% 100%, rgba(230,23,23,0.4) 0%, rgba(23,23,23,0) 55%)",
          }}
        />
        <div className="container-page py-28 text-white md:py-40">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Vida por Vida
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display mt-5 max-w-2xl text-3xl md:text-5xl">
              Cada chamada é uma vida. Cada segundo conta.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              Estamos de prontidão 24 horas por dia, 365 dias por ano. Em caso de
              emergência, não hesite.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href={`tel:+351${site.phones.emergency.replace(/\s/g, "")}`}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 font-semibold text-on-brand transition-colors hover:bg-brand-dark"
            >
              Emergência — {site.phones.emergency}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Notícias teaser */}
      <section className="bg-surface-muted">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Atualidade"
              heading="Em ação com a comunidade"
              body="Acompanha as nossas últimas intervenções, campanhas, formações e momentos que marcam o dia a dia."
            />
            <ArrowLink href="/noticias">Ver todas</ArrowLink>
          </div>
          {noticias.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-stroke bg-surface p-12 text-center text-text-subtle">
              As primeiras notícias aparecem aqui assim que forem publicadas no
              gestor de conteúdos.
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.slice(0, 3).map((n, i) => (
                <Reveal
                  as="article"
                  key={n._id}
                  delay={(i % 3) * 0.08}
                  className="rounded-2xl border border-stroke bg-surface p-6"
                >
                  <p className="text-xs uppercase tracking-wide text-text-subtlest">
                    {formatDate(n.date)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-text">
                    <Link href={`/noticias/${n.slug}`} className="hover:text-brand">
                      {n.title}
                    </Link>
                  </h3>
                  {n.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-text-subtle">
                      {n.excerpt}
                    </p>
                  )}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fale connosco — contactos + formulário */}
      <section className="bg-surface-muted">
        <div className="container-page grid gap-12 py-24 md:grid-cols-2 md:py-32">
          <div>
            <SectionHeader
              eyebrow="Contactos"
              heading="Fale connosco."
              body="Estamos aqui para ajudar. Para informações, voluntariado ou donativos, escreva-nos. Em caso de emergência, ligue diretamente."
            />
            <dl className="mt-10 space-y-6">
              {[
                {
                  label: "Morada",
                  value: `${site.address.street}, ${site.address.postal}`,
                },
                {
                  label: "Horário",
                  value: "Administrativo: Seg a Sex, 09h00–18h00 · Operacional: 24h",
                },
                {
                  label: "Telefone",
                  value: `Emergências ${site.phones.emergency} · Secretaria ${site.phones.office}`,
                },
                {
                  label: "Email",
                  value: `${site.emails.general} · ${site.emails.volunteer}`,
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={(i % 4) * 0.06} y={16}>
                  <dt className="text-xs uppercase tracking-wide text-brand">
                    {c.label}
                  </dt>
                  <dd className="mt-1 text-text-subtle">{c.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 120% at 50% 120%, rgba(230,23,23,0.35) 0%, rgba(23,23,23,0) 60%)",
          }}
        />
        <div className="container-page grid gap-6 py-24 text-center md:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-display md:text-4xl">
              Aqui, todos podemos salvar vidas.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto max-w-2xl text-white/70">
              Com o seu tempo. Com um donativo. Com a sua coragem. Há sempre uma
              forma de ajudar — e juntos garantimos que ninguém fica sem resposta.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/voluntario">Quero ser bombeiro</ButtonLink>
              <ButtonLink href="/apoiar" variant="onDark">
                Quero apoiar
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
