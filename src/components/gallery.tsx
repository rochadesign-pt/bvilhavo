import Image from "next/image";
import { Reveal } from "@/components/reveal";

export type GalleryImage = { src: string; alt: string; wide?: boolean };

// Asymmetric photo grid with hover-zoom and scroll reveal. Wide tiles span two
// columns; square tiles fill one — alternating for an editorial rhythm.
export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((im, i) => (
        <Reveal
          key={im.src}
          delay={(i % 3) * 0.08}
          className={`group relative overflow-hidden rounded-2xl bg-surface-muted ${
            im.wide ? "aspect-[16/10] md:col-span-2" : "aspect-square"
          }`}
        >
          <Image
            src={im.src}
            alt={im.alt}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Reveal>
      ))}
    </div>
  );
}
