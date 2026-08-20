"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Img = { src: string; alt: string };

// Spotlight gallery — a scrim dims the grid; a soft circular "window" follows
// the cursor (lerped) to reveal the photo underneath. Desktop enhancement:
// on touch or reduced-motion the scrim is removed and the photos show fully.
export function SpotlightGallery({ images }: { images: Img[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const st = useRef({ tx: 0, ty: 0, tr: 0, cx: 0, cy: 0, cr: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    const scrim = scrimRef.current;
    const hint = hintRef.current;
    if (!stage || !scrim || !hint) return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduce) {
      scrim.style.display = "none";
      hint.style.display = "none";
      return;
    }

    const rect = stage.getBoundingClientRect();
    st.current.tx = st.current.cx = rect.width / 2;
    st.current.ty = st.current.cy = rect.height * 0.42;

    const onEnter = () => {
      st.current.tr = 260;
      hint.style.opacity = "0";
    };
    const onLeave = () => {
      st.current.tr = 0;
      hint.style.opacity = "1";
    };
    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      st.current.tx = e.clientX - r.left;
      st.current.ty = e.clientY - r.top;
    };

    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);
    stage.addEventListener("mousemove", onMove);

    const frame = () => {
      const s = st.current;
      s.cx += (s.tx - s.cx) * 0.11;
      s.cy += (s.ty - s.cy) * 0.11;
      s.cr += (s.tr - s.cr) * 0.08;
      scrim.style.setProperty("--sx", `${s.cx.toFixed(1)}px`);
      scrim.style.setProperty("--sy", `${s.cy.toFixed(1)}px`);
      scrim.style.setProperty("--sr", `${s.cr.toFixed(1)}px`);
      raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);

    return () => {
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      stage.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .spotlight-scrim{
          --sx:50%; --sy:42%; --sr:0px;
          -webkit-mask-image: radial-gradient(circle var(--sr) at var(--sx) var(--sy), transparent 0%, transparent 18%, rgba(0,0,0,.5) 60%, #000 100%);
          mask-image: radial-gradient(circle var(--sr) at var(--sx) var(--sy), transparent 0%, transparent 18%, rgba(0,0,0,.5) 60%, #000 100%);
        }
      `}</style>

      <div ref={stageRef} className="relative">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.src}
              className="relative h-64 overflow-hidden rounded-2xl bg-surface-muted md:h-72 lg:h-[300px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Scrim + spotlight window */}
        <div
          ref={scrimRef}
          aria-hidden
          className="spotlight-scrim pointer-events-none absolute inset-0 z-[1] bg-surface opacity-90"
        />

        {/* Hint */}
        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur transition-opacity duration-500"
        >
          Move o cursor para ver melhor
        </div>
      </div>
    </>
  );
}
