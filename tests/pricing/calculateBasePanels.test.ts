import { describe, expect, it } from 'vitest';
import { calculateBasePanels } from '@/lib/pricing/calculateBasePanels';

describe('calculateBasePanels', () => {
  it('returns exact tiling when dimensions are multiples of 300', () => {
    expect(calculateBasePanels(600, 600)).toBe(4);
    expect(calculateBasePanels(300, 300)).toBe(1);
  });

  it('rounds up partial panels', () => {
    // 1200x600 -> 4 across x 2 down = 8
    expect(calculateBasePanels(1200, 600)).toBe(8);
    // 400x300 -> ceil(400/300)=2 across x 1 down = 2
    expect(calculateBasePanels(400, 300)).toBe(2);
  });

  it('handles the max allowed dimensions', () => {
    // 1200/300=4, 2400/300=8 -> 32
    expect(calculateBasePanels(1200, 2400)).toBe(32);
  });
});
