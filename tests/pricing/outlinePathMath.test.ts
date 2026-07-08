import { describe, expect, it } from 'vitest';
import { pathLength } from '@/lib/pricing/outlinePathMath';
import type { Path } from 'opentype.js';

function makePath(commands: Path['commands']): Path {
  return { commands } as Path;
}

describe('pathLength', () => {
  it('sums straight-line segments', () => {
    // A 10x10 square traced M->L->L->L->Z should have perimeter 40
    const path = makePath([
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 10, y: 0 },
      { type: 'L', x: 10, y: 10 },
      { type: 'L', x: 0, y: 10 },
      { type: 'Z' },
    ]);

    expect(pathLength(path)).toBeCloseTo(40, 5);
  });

  it('approximates a quarter-circle quadratic curve length reasonably', () => {
    // Straight-line distance from (0,0) to (10,10) via a bulging control point should exceed the chord length (~14.14)
    const path = makePath([
      { type: 'M', x: 0, y: 0 },
      { type: 'Q', x1: 10, y1: 0, x: 10, y: 10 },
    ]);

    const length = pathLength(path);
    const chord = Math.hypot(10, 10);
    expect(length).toBeGreaterThan(chord);
    expect(length).toBeLessThan(20); // sanity upper bound
  });

  it('treats a straight cubic curve (control points on the line) as a straight line', () => {
    const path = makePath([
      { type: 'M', x: 0, y: 0 },
      { type: 'C', x1: 3.33, y1: 0, x2: 6.67, y2: 0, x: 10, y: 0 },
    ]);

    expect(pathLength(path)).toBeCloseTo(10, 1);
  });

  it('closes multiple subpaths independently', () => {
    const path = makePath([
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 5, y: 0 },
      { type: 'Z' },
      { type: 'M', x: 20, y: 20 },
      { type: 'L', x: 20, y: 25 },
      { type: 'Z' },
    ]);

    // First subpath: 5 (line) + 5 (close back) = 10; second: 5 + 5 = 10
    expect(pathLength(path)).toBeCloseTo(20, 5);
  });

  it('returns 0 for an empty path', () => {
    expect(pathLength(makePath([]))).toBe(0);
  });
});
