"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ElementType } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;

const MOTION = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  section: motion.section,
  article: motion.article,
  span: motion.span,
} as const;

type Tag = keyof typeof MOTION;

type RevealProps = ComponentProps<typeof motion.div> & {
  as?: Tag;
  delay?: number;
  y?: number;
};

// Default scroll-reveal: fade + short rise, once, reduced-motion safe.
export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = MOTION[as] as ElementType;
  return (
    <Comp
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduce ? 0.15 : 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
