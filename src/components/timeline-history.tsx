"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Item = { year: string; title: string; body: string };

// História timeline (two-column, evermind-style): a sticky header on the left,
// the entries on the right threaded by a brand-red line that draws itself
// top→bottom as the section is scrubbed. Each entry fades up. Reduced-motion
// shows the full line with no scrub.
export function TimelineHistory({
  eyebrow,
  heading,
  body,
  items,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  items: Item[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (fill.current) fill.current.style.transform = "scaleY(1)";
        return;
      }
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="grid gap-10 md:grid-cols-[0.85fr_1.4fr] md:gap-16"
    >
      {/* Sticky header */}
      <div className="md:sticky md:top-28 md:self-start">
        {eyebrow && (
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-3xl font-semibold tracking-display md:text-4xl">
            {heading}
          </h2>
        </Reveal>
        {body && (
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md leading-relaxed text-text-subtle">{body}</p>
          </Reveal>
        )}
      </div>

      {/* Timeline */}
      <div ref={track} className="relative pl-8">
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
              <p className="mt-2 leading-relaxed text-text-subtle">{t.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
