"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Count-up + blur-to-sharp stat, triggered on scroll into view (adapted from
// the BYQ "nextwell-stats-3" pattern to our brand). Handles a leading symbol
// prefix like "+" and a trailing suffix like "%" or "mil".
export function StatCounter({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const [display, setDisplay] = useState(reduce ? value : " ");
  const [sharp, setSharp] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      setSharp(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const m = value.match(/^(\D*)([\d.,]+)(.*)$/);
    const prefix = m?.[1] ?? "";
    const target = m ? parseInt(m[2].replace(/[.,]/g, ""), 10) : 0;
    const suffix = m?.[3] ?? "";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          setSharp(true);
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 2);
            setDisplay(prefix + Math.round(eased * target) + suffix);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduce]);

  return (
    <div ref={ref} className={className}>
      <div
        className={`text-4xl font-semibold tracking-display tabular-nums transition-[filter,opacity] duration-1000 md:text-5xl ${
          sharp ? "opacity-100 blur-0" : "opacity-70 blur-[6px]"
        }`}
      >
        {display}
      </div>
      <div className="mt-2 text-sm text-on-brand/70">{label}</div>
    </div>
  );
}
