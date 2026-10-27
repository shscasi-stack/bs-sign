'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

interface PopInProps extends HTMLMotionProps<'div'> {
  /** Seconds to wait after entering the viewport (to pop items one after another). */
  delay?: number;
  /** Starting scale; smaller means a bigger bounce. */
  from?: number;
}

/**
 * Sticker-style entrance: scales up from small with a springy overshoot.
 * Only `transform: scale` is animated, so Tailwind `rotate-*` utilities
 * (the separate CSS `rotate` property) keep their tilt.
 */
export function PopIn({ delay = 0, from = 0.6, children, ...props }: PopInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 320, damping: 14, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
