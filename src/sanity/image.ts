import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

// `builder.image` accepts asset refs, image objects, or URLs — kept loose so
// callers can pass whatever a GROQ image projection returns.
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
