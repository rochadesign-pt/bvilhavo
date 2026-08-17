import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // published, cached content; fine for a public site
    })
  : null;

/**
 * Safe fetch: returns `fallback` when Sanity isn't configured yet or the query
 * errors, so pages always render. Uses Next's tag-based caching via next-sanity.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
  opts: { revalidate?: number; tags?: string[] } = {},
): Promise<T> {
  if (!client) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: opts.revalidate ?? 60, tags: opts.tags },
    });
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return fallback;
  }
}
