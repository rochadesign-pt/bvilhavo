"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Service = { _id: string; title: string; summary?: string };

// Martifer-style interactive list: hovering a service on the left highlights it
// and reveals its detail on the right. Keyboard-accessible, no divider lines.
export function ServicesInteractive({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <ul className="flex flex-col">
        {services.map((s, i) => (
          <li key={s._id}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group flex w-full items-center gap-4 py-4 text-left"
            >
              <span
                className={`text-sm font-semibold tabular-nums transition-colors ${
                  active === i ? "text-brand" : "text-text-subtlest"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-2xl font-semibold tracking-display transition-colors md:text-3xl ${
                  active === i
                    ? "text-text"
                    : "text-text-subtlest group-hover:text-text-subtle"
                }`}
              >
                {s.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="grain relative min-h-[18rem] overflow-hidden rounded-2xl bg-ink p-8 text-white md:p-10">
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-40"
            style={{
              background:
                "radial-gradient(90% 90% at 90% 10%, rgba(230,23,23,0.5) 0%, rgba(23,23,23,0) 60%)",
            }}
          />
          <div className="relative">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {String(active + 1).padStart(2, "0")} —{" "}
              {String(services.length).padStart(2, "0")}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                <h3 className="mt-5 text-2xl font-semibold tracking-display md:text-3xl">
                  {current.title}
                </h3>
                {current.summary && (
                  <p className="mt-3 max-w-md leading-relaxed text-white/70">
                    {current.summary}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
