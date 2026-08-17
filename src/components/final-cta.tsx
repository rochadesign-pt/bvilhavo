"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/button";

gsap.registerPlugin(useGSAP);

// Firefighter photos we already ship — split across the two marquee columns.
const COL_A = [
  "/gallery/acao-1.jpg",
  "/gallery/acao-3.jpg",
  "/heroes/veiculos.jpg",
  "/gallery/historia.jpg",
  "/heroes/quartel.jpg",
];
const COL_B = [
  "/gallery/acao-2.jpg",
  "/heroes/impacto.jpg",
  "/gallery/acao-4.jpg",
  "/heroes/servicos.jpg",
  "/heroes/voluntario.jpg",
];

// One vertical marquee column. Track holds the images twice so a -50% shift
// loops seamlessly. GSAP-driven; disabled under reduced motion.
function Marquee({
  images,
  dir,
  className = "",
}: {
  images: string[];
  dir: "up" | "down";
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!track.current) return;
      if (dir === "up") {
        gsap.to(track.current, { yPercent: -50, duration: 45, ease: "none", repeat: -1 });
      } else {
        gsap.fromTo(
          track.current,
          { yPercent: -50 },
          { yPercent: 0, duration: 45, ease: "none", repeat: -1 },
        );
      }
    },
    { scope: track },
  );

  const loop = [...images, ...images];
  return (
    <div className={`h-full overflow-hidden ${className}`} aria-hidden>
      <div ref={track} className="flex flex-col gap-3 [will-change:transform]">
        {loop.map((src, i) => (
          <div
            key={i}
            className="relative h-52 w-44 flex-none overflow-hidden rounded-xl ring-1 ring-white/10"
          >
            <Image src={src} alt="" fill sizes="176px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Final call-to-action — dark card (ink + red glow) with the two firefighter
// photo marquees on the right. Replaces the plain centered CTA.
export function FinalCta() {
  return (
    <section className="container-page py-24 md:py-28">
      <div className="grain relative isolate flex min-h-[30rem] items-center justify-between gap-8 overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-white md:px-14">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 120% at 12% 120%, rgba(230,23,23,0.4) 0%, rgba(23,23,23,0) 58%)",
          }}
        />

        <div className="relative z-[5] flex max-w-xl flex-col items-start gap-5">
          <h2 className="text-display text-3xl md:text-5xl">
            Aqui, todos podemos <span className="text-brand">salvar vidas</span>.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-white/75">
            Com o seu tempo. Com um donativo. Com a sua coragem. Há sempre uma
            forma de ajudar — e juntos garantimos que ninguém fica sem resposta.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href="/voluntario">Quero ser bombeiro</ButtonLink>
            <ButtonLink href="/apoiar" variant="onDark">
              Quero apoiar
            </ButtonLink>
          </div>
        </div>

        {/* Photo marquees — desktop only, faded top/bottom */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden gap-3 pr-6 lg:flex xl:pr-10 [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]"
        >
          <Marquee images={COL_A} dir="up" />
          <Marquee images={COL_B} dir="down" className="hidden xl:block" />
        </div>
      </div>
    </section>
  );
}
