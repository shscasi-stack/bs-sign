'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  /** Seconds to delay the entrance (for lightly staggering siblings). */
  delay?: number;
}

/**
 * Thin scroll-reveal wrapper — fades and rises a section into view once.
 * Per the spec, this is the ONLY entrance motion we use: no parallax,
 * no autoplaying slides, no continuously moving text.
 */
export function FadeIn({ delay = 0, children, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
