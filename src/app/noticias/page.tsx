import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { sanityFetch } from "@/sanity/client";
import { noticiasQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Acompanhe as nossas intervenções, novidades, equipamentos e iniciativas — com total transparência sobre a atividade operacional.",
};

type Noticia = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
  cover?: string;
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NoticiasPage() {
  const noticias = await sanityFetch<Noticia[]>(noticiasQuery, {}, [], {
    tags: ["noticia"],
  });

  return (
    <>
      <PageHero
        eyebrow="Notícias"
        heading="Em ação com a comunidade."
        subheading="Acompanhe as nossas intervenções, novidades, equipamentos e iniciativas. Publicamos relatórios com total transparência sobre a nossa atividade operacional."
      />

      <section className="container-page py-24 md:py-32">
        {noticias.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stroke p-12 text-center text-text-subtle">
            Ainda não há notícias publicadas. Assim que a equipa publicar a
            primeira notícia no gestor de conteúdos, ela aparece aqui
            automaticamente.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n) => (
              <article key={n._id} className="flex flex-col">
                <Link href={`/noticias/${n.slug}`} className="group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-muted">
                    {n.cover && (
                      <Image
                        src={n.cover}
                        alt={n.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wide text-text-subtlest">
                    {formatDate(n.date)}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-text group-hover:text-brand">
                    {n.title}
                  </h2>
                </Link>
                {n.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-text-subtle">
                    {n.excerpt}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
