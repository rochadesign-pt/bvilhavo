"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.25, 1, 0.5, 1] as const;
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

// Interior-page hero image: mask reveal (clip wipes up) + subtle Ken Burns on
// load. Reduced-motion safe. Matches the home hero's entrance.
export function HeroImage({ src }: { src: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0 -z-10 [will-change:transform,clip-path]"
      initial={{
        scale: reduce ? 1 : 1.12,
        clipPath: reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
      }}
      animate={{ scale: 1, clipPath: "inset(0% 0 0 0)" }}
      transition={{
        scale: { duration: reduce ? 0 : 1.6, ease: EASE },
        clipPath: { duration: reduce ? 0 : 1.1, ease: REVEAL_EASE },
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </motion.div>
  );
}
