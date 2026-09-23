import type { Transition, Variants } from "framer-motion";

export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 20,
  mass: 0.8,
};

/**
 * Panel rising into place. Deliberately 2D: a rotateX here, nested inside the
 * `.scene` perspective, made text and card edges shimmer while scrolling.
 */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_QUINT },
  },
};

/** Stagger container for grids and lists. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_QUINT },
  },
};
