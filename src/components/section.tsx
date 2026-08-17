"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;

// Section-level block reveal: the whole section settles in as one unit
// (gentle fade + a whisper of rise) when it scrolls into view. Kept
// deliberately soft — inner <Reveal> children still carry the stagger, so
// the two layers read as a coordinated settle, not a double animation.
export function Section({
  children,
  ...rest
}: ComponentProps<typeof motion.section>) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
