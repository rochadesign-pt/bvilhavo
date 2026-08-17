import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { sanityFetch } from "@/sanity/client";
import { veiculosQuery } from "@/sanity/queries";
import { veiculos as fallbackVeiculos } from "@/content/pages";

export const metadata: Metadata = {
  title: "Veículos",
  description:
    "Dezenas de viaturas de combate a incêndios, ambulâncias e meios náuticos, sempre prontas a responder em todo o concelho.",
};

type Veiculo = { _id: string; name: string; category: string; description?: string };

// Category value → human label (matches the Sanity `veiculo.category` enum).
const CATEGORY_LABELS: Record<string, string> = {
  incendios: "Combate a Incêndios",
  socorro: "Ambulâncias",
  apoio: "Meios Náuticos e Apoio",
};

export default async function VeiculosPage() {
  const fromSanity = await sanityFetch<Veiculo[]>(veiculosQuery, {}, [], {
    tags: ["veiculo"],
  });

  // Group Sanity vehicles by category; fall back to the static grouped list.
  const groups =
    fromSanity.length > 0
      ? Object.entries(
          fromSanity.reduce<Record<string, Veiculo[]>>((acc, v) => {
            (acc[v.category] ??= []).push(v);
            return acc;
          }, {}),
        ).map(([category, items]) => ({
          category: CATEGORY_LABELS[category] ?? category,
          intro: "",
          items: items.map((i) => i.name),
        }))
      : fallbackVeiculos;

  return (
    <>
      <PageHero
        eyebrow="Frota"
        heading="A nossa frota ao serviço de Ílhavo."
        subheading="Dezenas de viaturas de combate a incêndios, ambulâncias e meios náuticos, sempre prontas a responder em todo o concelho."
        image="/heroes/veiculos.jpg"
      />

      <Section className="container-page py-24 md:py-32">
        <div className="space-y-16">
          {groups.map((g) => (
            <div key={g.category}>
              <SectionHeader heading={g.category} body={g.intro || undefined} />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item, i) => (
                  <Reveal
                    as="li"
                    key={`${item}-${i}`}
                    delay={(i % 3) * 0.06}
                    className="rounded-2xl border border-stroke bg-surface-muted p-5 text-text-subtle transition-colors hover:border-brand/40"
                  >
                    {item}
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-16 max-w-2xl text-text-subtle">
          Uma frota de viaturas especializadas, disponível 24 horas por dia. Cada
          veículo representa anos de investimento da comunidade e dos nossos
          parceiros.
        </Reveal>
      </Section>
    </>
  );
}
