import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-text-subtle">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-text">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-text">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-text">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand pl-4 italic text-text-subtle">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-text-subtle">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-text-subtle">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = value?.blank || /^https?:\/\//.test(href);
      return external ? (
        <a
          href={href}
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          className="text-brand underline underline-offset-2"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className="text-brand underline underline-offset-2">
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] | null }) {
  if (!value?.length) return null;
  return <BasePortableText value={value} components={components} />;
}
