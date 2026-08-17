"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Item = { year: string; title: string; body: string };

// História timeline: a brand-red line draws itself top→bottom as the section
// scrolls through (scrubbed), with each entry fading up. Sober, institutional.
export function TimelineHistory({ items }: { items: Item[] }) {
  const container = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative mt-14 pl-8">
      {/* track + animated fill */}
      <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-stroke" />
      <div
        ref={fill}
        className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-brand"
      />
      <ol className="space-y-12">
        {items.map((t) => (
          <Reveal as="li" key={t.year} className="relative" y={20}>
            <span className="absolute -left-[35px] top-1 h-3 w-3 rounded-full bg-brand ring-4 ring-surface" />
            <div className="text-sm font-semibold uppercase tracking-wide text-brand">
              {t.year}
            </div>
            <h3 className="mt-1 text-xl font-semibold text-text">{t.title}</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-text-subtle">
              {t.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
