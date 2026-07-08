'use client';

import { useEffect, useState } from 'react';
import { calculateNeonPrice } from '@/lib/pricing/calculateNeonPrice';
import { estimateOutlineTubeLengthMm } from '@/lib/pricing/estimateOutlineTubeLength.client';
import type { NeonPriceBreakdown, NeonPriceInput } from '@/lib/pricing/pricing.types';

const DEBOUNCE_MS = 250;

function serializeInput(input: NeonPriceInput): string {
  return JSON.stringify(input);
}

export function useNeonPrice(input: NeonPriceInput) {
  const [breakdown, setBreakdown] = useState<NeonPriceBreakdown | null>(null);
  const [computedKey, setComputedKey] = useState<string | null>(null);
  const currentKey = serializeInput(input);
  const isStale = computedKey !== currentKey;

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      const hasOverride = input.tubeLengthMmOverride != null;
      const { lengthMm, usedFallbackFont } = hasOverride
        ? { lengthMm: input.tubeLengthMmOverride as number, usedFallbackFont: false }
        : await estimateOutlineTubeLengthMm(input.displayText, input.fontFamily, input.textHeightMm);

      if (cancelled) return;
      setBreakdown(calculateNeonPrice(input, lengthMm, { isEstimated: !hasOverride, usedFallbackFont }));
      setComputedKey(currentKey);
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKey]);

  return { breakdown, isStale };
}
