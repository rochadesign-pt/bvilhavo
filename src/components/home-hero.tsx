"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/button";

const EASE = [0.25, 1, 0.5, 1] as const;

// Deliberate line break for reading rhythm (matches the Framer):
//   Quando Ílhavo precisa,
//   nós respondemos.
const HEADLINE_LINES = [
  ["Quando", "Ílhavo", "precisa,"],
  ["nós", "respondemos."],
];

export function HomeHero({
  eyebrow,
  subheading,
  image = "/hero/hero.png",
}: {
  eyebrow: string;
  subheading: string;
  image?: string;
}) {
  const reduce = useReducedMotion();

  return (
    // Inset, floating rounded card that straddles a white → red split. Solid
    // red base + a white block over the top half — so the red below is the exact
    // same solid brand as the next section (no gradient hairline seam).
    <section className="relative bg-brand px-4 pt-4 pb-16 md:px-6 md:pt-6 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-surface"
      />
      <div className="grain relative isolate flex min-h-[80vh] overflow-hidden rounded-[28px] bg-ink text-white">
        {/* Photo (subtle Ken Burns on load) */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ scale: reduce ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Legibility overlays — light, just enough for the text corner */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />

        {/* Content — anchored bottom-left with padding (not centered) */}
        <div className="relative flex w-full flex-col justify-end px-7 pb-12 sm:px-10 md:px-14 md:pb-16 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 text-base font-semibold tracking-tight text-white/90"
          >
            {eyebrow}
          </motion.p>

          <h1 className="font-semibold leading-[1.06] tracking-[-0.03em] text-[clamp(2.25rem,4.6vw,4.25rem)] text-white">
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => {
                  const idx = (li === 0 ? 0 : HEADLINE_LINES[0].length) + wi;
                  return (
                    <span
                      key={wi}
                      className="inline-block overflow-hidden align-bottom"
                    >
                      <motion.span
                        className="inline-block pr-[0.24em]"
                        initial={{ y: reduce ? 0 : "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: reduce ? 0.2 : 0.75,
                          ease: EASE,
                          delay: reduce ? 0 : 0.2 + idx * 0.07,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/80"
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.78 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <ButtonLink href="/voluntario">Quero ser bombeiro</ButtonLink>
            <ButtonLink href="/apoiar" variant="onDark">
              Quero apoiar
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
