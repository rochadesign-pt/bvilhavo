"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame, useReducedMotion } from "framer-motion";

export interface AuroraBarsProps {
  /** @default 28 */
  barCount?: number;
  /** gradient stops, bottom → top — fire palette by default */
  colors?: string[];
  /** max bar height as fraction of container — @default 0.92 */
  maxHeightRatio?: number;
  /** min bar height as fraction of container — @default 0.16 */
  minHeightRatio?: number;
  /** undulation speed — @default 0.5 */
  speed?: number;
  /** @default 3 */
  gap?: number;
  /** px blur per bar (soft glow) — @default 8 */
  blur?: number;
  /** @default "transparent" */
  background?: string;
  className?: string;
}

// Two sine waves + an arch envelope → organic, taller-in-the-centre movement.
function barHeight(
  index: number,
  total: number,
  time: number,
  minH: number,
  maxH: number,
): number {
  const norm = index / (total - 1);
  const arch = Math.sin(norm * Math.PI);
  const phase1 = (index / total) * Math.PI * 2;
  const phase2 = (index / total) * Math.PI * 5.3;
  const wave =
    0.5 + 0.25 * Math.sin(time * 1.1 + phase1) + 0.25 * Math.sin(time * 0.7 + phase2);
  const blended = arch * 0.65 + wave * 0.35;
  return minH + blended * (maxH - minH);
}

export function AuroraBars({
  barCount = 28,
  colors = ["#ff9a3c", "#ff5a1e", "#e61717", "#7a0f0f", "#00000000"],
  maxHeightRatio = 0.92,
  minHeightRatio = 0.16,
  speed = 0.5,
  gap = 3,
  blur = 8,
  background = "transparent",
  className = "",
}: AuroraBarsProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const bars = useRef<Array<HTMLDivElement | null>>([]);
  const timeRef = useRef(0);
  const visible = useRef(true);

  // Pause the loop when the footer is off-screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => (visible.current = e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Direct DOM height updates — no per-frame React re-render.
  useAnimationFrame((_, delta) => {
    if (reduce || !visible.current) return;
    timeRef.current += (delta / 1000) * speed;
    const t = timeRef.current;
    for (let i = 0; i < barCount; i++) {
      const b = bars.current[i];
      if (b) {
        b.style.height = `${barHeight(i, barCount, t, minHeightRatio, maxHeightRatio) * 100}%`;
      }
    }
  });

  const stops = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`)
    .join(", ");
  const gradient = `linear-gradient(to top, ${stops})`;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background }}
    >
      <div className="absolute inset-0 flex items-end">
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            className="flex h-full flex-1 items-end"
            style={{ padding: `0 ${gap / 2}px` }}
          >
            <div
              ref={(el) => {
                bars.current[i] = el;
              }}
              style={{
                width: "100%",
                height: `${barHeight(i, barCount, 0, minHeightRatio, maxHeightRatio) * 100}%`,
                background: gradient,
                borderRadius: "9999px 9999px 0 0",
                filter: blur ? `blur(${blur}px)` : undefined,
                opacity: 0.8,
              }}
            />
          </div>
        ))}
      </div>

      {/* Vignette — fades the bars into ink at the edges, keeps text legible. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 100%, transparent 35%, #171717 100%)",
        }}
      />
    </div>
  );
}
