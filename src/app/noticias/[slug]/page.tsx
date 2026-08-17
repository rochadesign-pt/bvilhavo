import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { noticiaBySlugQuery } from "@/sanity/queries";
import { PortableText } from "@/components/portable-text";
import { Reveal } from "@/components/reveal";
import type { PortableTextBlock } from "@portabletext/types";

type Noticia = {
  title: string;
  date?: string;
  excerpt?: string;
  cover?: string;
  body?: PortableTextBlock[];
  seo?: { title?: string; description?: string };
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

async function getNoticia(slug: string) {
  return sanityFetch<Noticia | null>(noticiaBySlugQuery, { slug }, null, {
    tags: ["noticia"],
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) return { title: "Notícia não encontrada" };
  return {
    title: noticia.seo?.title ?? noticia.title,
    description: noticia.seo?.description ?? noticia.excerpt,
  };
}

export default async function NoticiaPage({
  params,
}: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) notFound();

  return (
    <article className="container-page py-16 md:py-24">
      <Reveal y={14}>
        <Link
          href="/noticias"
          className="text-sm font-semibold text-brand hover:text-brand-dark"
        >
          ← Todas as notícias
        </Link>
      </Reveal>

      <Reveal as="section" y={20} delay={0.06} className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-text-subtlest">
          {formatDate(noticia.date)}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-display leading-tight md:text-4xl">
          {noticia.title}
        </h1>
      </Reveal>

      {noticia.cover && (
        <Reveal
          delay={0.12}
          className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-surface-muted"
        >
          <Image
            src={noticia.cover}
            alt={noticia.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </Reveal>
      )}

      <Reveal delay={0.18} className="mt-10 max-w-3xl">
        <PortableText value={noticia.body} />
      </Reveal>
    </article>
  );
}
