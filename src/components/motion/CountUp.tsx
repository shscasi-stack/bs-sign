'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts from 0 up to `to` the first time it scrolls into view.
 * The server renders the final number (so it reads correctly without JS);
 * the client resets it to 0 on mount and counts up by writing the text
 * directly, avoiding a re-render per frame.
 */
export function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!reduceMotion && ref.current) ref.current.textContent = '0';
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString('ko-KR');
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration]);

  return <span ref={ref}>{to.toLocaleString('ko-KR')}</span>;
}
